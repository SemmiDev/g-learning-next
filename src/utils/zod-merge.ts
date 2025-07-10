/**
 * @description
 * Allow the merging of object schemas and union schemas with objects.
 * @example
 * ```ts
 * const egressParams = z.union([
 *   z.object({ returnUrl: z.string() }),
 *   z.object({ vid: z.number() })
 * ]);
 *
 * const pageModeParams = z.object({
 *   mode: z.union([z.literal("frame"), z.undefined()]),
 *   foobar: z.string()
 * })
 *
 * const paramsSchema = merge(pageModeParams, egressParams)
 * // {
 * //     mode?: "frame" | undefined;
 * //     returnUrl: string;
 * //     foobar: string;
 * // } | {
 * //     mode?: "frame" | undefined;
 * //     vid: number;
 * //     foobar: string;
 * // }
 * ```
 */

import assert from 'assert'
import { z } from 'zod'

type ZodAnyObject = z.ZodObject<any, any, any>
type ZodObjectUnion = z.ZodUnion<readonly [ZodAnyObject, ...ZodAnyObject[]]>

type ZodMergable = ZodAnyObject | ZodObjectUnion

type ZodMergeEach<
  T extends ZodAnyObject[],
  O extends ZodAnyObject
> = T extends [infer X, ...infer Y]
  ? X extends ZodAnyObject
    ? Y extends ZodAnyObject[]
      ? [ZodMergeObjects<X, O>, ...ZodMergeEach<Y, O>]
      : never
    : never
  : T

// zod union types are sometimes in tuple form, e.g. [x, y, ...rest], which
// is correct, but makes for zany looking types
type ZodMergeObjectUnionWithObject<
  X extends ZodObjectUnion,
  Y extends ZodAnyObject
> = X extends z.ZodUnion<infer Options>
  ? Options extends readonly [infer A, infer B, ...infer Rest]
    ? A extends ZodAnyObject // ZodObject<one>
      ? B extends ZodAnyObject // ZodObject<three>
        ? Rest extends ZodAnyObject[] // [ZodObject<two>]
          ? z.ZodUnion<
              readonly [
                ZodMergeObjects<A, Y>,
                ZodMergeObjects<B, Y>,
                ...ZodMergeEach<Rest, Y>
              ]
            >
          : never
        : never
      : never
    : never
  : never

type identity<T> = T
type flatten<T> = identity<{
  [k in keyof T]: T[k]
}>
type extendShape<A, B> = flatten<Omit<A, keyof B> & B>

type ZodMergeObjects<
  X extends ZodAnyObject,
  Y extends ZodAnyObject
> = z.ZodObject<extendShape<X['shape'], Y['shape']>>

type ZodMergeCombinations<
  X extends readonly ZodAnyObject[],
  Y extends readonly ZodAnyObject[]
> = X extends readonly [infer X0, ...infer Xr]
  ? Y extends readonly [infer Y0, ...infer Yr]
    ? X0 extends ZodAnyObject
      ? Y0 extends ZodAnyObject
        ? [
            ZodMergeObjects<X0, Y0>,
            // add all Ys for this X0
            ...ZodMergeCombinations<X, Yr extends ZodAnyObject[] ? Yr : never>,
            // add repeat for every Xi
            ...ZodMergeCombinations<Xr extends ZodAnyObject[] ? Xr : never, Y>
          ]
        : never
      : never
    : []
  : []

type ZodMergeCombinationsTop<
  X extends readonly [ZodAnyObject, ZodAnyObject, ...ZodAnyObject[]],
  Y extends readonly [ZodAnyObject, ZodAnyObject, ...ZodAnyObject[]]
> = X extends readonly [infer X0, infer X1, ...infer Xr]
  ? Y extends readonly [infer Y0, ...infer Yr]
    ? X0 extends ZodAnyObject
      ? Y0 extends ZodAnyObject
        ? X1 extends ZodAnyObject
          ? [
              ZodMergeObjects<X0, Y0>,
              ZodMergeObjects<X1, Y0>,
              // add all Ys for this X0
              ...ZodMergeCombinations<
                X,
                Yr extends ZodAnyObject[] ? Yr : never
              >,
              // add repeat for every Xi
              ...ZodMergeCombinations<Xr extends ZodAnyObject[] ? Xr : never, Y>
            ]
          : never
        : never
      : never
    : never
  : never

type ZodMergeObjectUnionWithObjectUnion<
  X extends ZodObjectUnion,
  Y extends ZodObjectUnion
> = X extends z.ZodUnion<infer Xi>
  ? Y extends z.ZodUnion<infer Yi>
    ? Xi extends readonly [ZodAnyObject, ZodAnyObject, ...ZodAnyObject[]]
      ? Yi extends readonly [ZodAnyObject, ZodAnyObject, ...ZodAnyObject[]]
        ? z.ZodUnion<ZodMergeCombinationsTop<Xi, Yi>>
        : never
      : never
    : never
  : never

type ZodMergeObjectOrUnion<
  X extends ZodMergable,
  Y extends ZodMergable
> = X extends ZodAnyObject
  ? Y extends ZodAnyObject
    ? // case 1/4: object, object
      ZodMergeObjects<
        X extends ZodAnyObject ? X : never,
        Y extends ZodAnyObject ? Y : never
      >
    : // case 2/4: object, union
      ZodMergeObjectUnionWithObject<Y extends ZodObjectUnion ? Y : never, X>
  : Y extends ZodAnyObject
  ? // case 3/4: union, object
    ZodMergeObjectUnionWithObject<X extends ZodObjectUnion ? X : never, Y>
  : // case 4/4: union, union
    ZodMergeObjectUnionWithObjectUnion<
      X extends ZodObjectUnion ? X : never,
      Y extends ZodObjectUnion ? Y : never
    >

const mergeObjectAndUnion = <X extends ZodAnyObject, Y extends ZodObjectUnion>(
  x: X,
  y: Y
): ZodMergeObjectUnionWithObject<Y, X> => {
  const [y0, y1, ...ys] = y.options
  assert(y0)
  assert(y1)
  const params = [
    y0.merge(x) as ZodAnyObject,
    y1.merge(x) as ZodAnyObject,
    ...(ys.map((yi) => yi.merge(x)) as ZodAnyObject[]),
  ] as const
  return z.union(params) as ZodMergeObjectUnionWithObject<Y, X>
}

const mergeUnionAndUnion = <X extends ZodObjectUnion, Y extends ZodObjectUnion>(
  x: X,
  y: Y
): z.ZodUnion<ZodMergeObjectUnionWithObjectUnion<X, Y>> => {
  const [first, second, ...rest] = x.options.flatMap((xi) =>
    y.options.map((yi) => [xi, yi] as const)
  )
  assert(first, 'missing first')
  assert(second, 'missing second')
  const [x0, y0] = first
  const [x1, y1] = second
  return z.union([
    x0.merge(y0),
    x1.merge(y1),
    ...rest.map(([xi, yi]) => xi.merge(yi)),
  ]) as ZodMergeObjectUnionWithObjectUnion<X, Y>
}

export const zodMerge = <X extends ZodMergable, Y extends ZodMergable>(
  x: X,
  y: Y
): ZodMergeObjectOrUnion<X, Y> =>
  'shape' in x
    ? 'shape' in y
      ? (x.merge(y) as ZodMergeObjectOrUnion<X, Y>)
      : (mergeObjectAndUnion(x, y) as ZodMergeObjectOrUnion<X, Y>)
    : 'shape' in y
    ? (mergeObjectAndUnion(y, x) as ZodMergeObjectOrUnion<X, Y>)
    : (mergeUnionAndUnion(x, y) as ZodMergeObjectOrUnion<X, Y>)
