'use client'

import { listKomentarChildAction } from '@/actions/shared/komentar/list-child'
import { listKomentarParentAction } from '@/actions/shared/komentar/list-parent'
import { tambahKomentarAction } from '@/actions/shared/komentar/tambah'
import { Button, Text, TextSpan, Thumbnail, Time } from '@/components/ui'
import Loader from '@/components/ui/loader'
import { handleActionWithToast } from '@/utils/action'
import cn from '@/utils/class-names'
import {
  useInfiniteQuery,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useState } from 'react'
import { BsChatSquareText } from 'react-icons/bs'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import FormKomentar from './form-komentar'

export type KomentarType = {
  id: string
  idParent?: string
  idPengguna: string
  nama: string
  foto: string
  komentar: string
  jumlahBalasan: number
  waktu: string
  balasan?: KomentarType[]
}

export type KomentarProps = {
  idKelas: string
  idAktifitas: string
  total?: number
  firstShow?: number
  showPer?: number
  className?: string
}

export default function Komentar({
  idKelas,
  idAktifitas,
  total,
  firstShow = 1,
  showPer = 3,
  className,
}: KomentarProps) {
  const queryClient = useQueryClient()
  const [isLoadMore, setIsLoadMore] = useState(firstShow >= showPer)
  const [hasMoreThanFirst, setHasMoreThanFirst] = useState(firstShow >= showPer)
  const [komentarLv1, setKomentarLv1] = useState('')
  const [isSendingLv1, setIsSendingLv1] = useState(false)
  const [parentLv2, setParentLv2] = useState<KomentarType>()
  const [komentarLv2, setKomentarLv2] = useState('')
  const [isSendingLv2, setIsSendingLv2] = useState(false)
  const [showLv2, setShowLv2] = useState<{ [key: string]: boolean }>({})

  const { data: firstDataLv1, isLoading: isLoadingFirstLv1 } = useQuery<
    KomentarType[]
  >({
    queryKey: ['shared.komentar.firstLv1', idKelas, idAktifitas],
    queryFn: async () => {
      const { data } = await listKomentarParentAction({
        perPage: firstShow,
        idKelas,
        idAktifitas,
      })

      setHasMoreThanFirst(!!data?.pagination?.hasNextPage)

      return (data?.list ?? []).map(
        (item) =>
          ({
            id: item.id,
            idParent: item.id_parent,
            idPengguna: item.id_pengguna,
            nama: item.nama,
            foto: item.foto,
            komentar: item.diskusi,
            jumlahBalasan: item.jumlah_balasan,
            waktu: item.created_at,
            balasan: [],
          } as KomentarType)
      )
    },
    enabled: !isLoadMore,
  })

  const queryKeyLv1 = ['shared.komentar.lv1', idKelas, idAktifitas]

  const {
    data: dataLv1,
    isLoading: isLoadingLv1,
    hasNextPage: hasNextPageLv1,
    fetchNextPage: fetchNextPageLv1,
    isFetchingNextPage: isFetchingNextPageLv1,
  } = useInfiniteQuery({
    queryKey: queryKeyLv1,
    queryFn: async ({ pageParam: page }) => {
      const { data } = await listKomentarParentAction({
        page,
        perPage: showPer,
        idKelas,
        idAktifitas,
      })

      return {
        list: (data?.list ?? []).map(
          (item) =>
            ({
              id: item.id,
              idParent: item.id_parent,
              idPengguna: item.id_pengguna,
              nama: item.nama,
              foto: item.foto,
              komentar: item.diskusi,
              jumlahBalasan: item.jumlah_balasan,
              waktu: item.created_at,
              balasan: [],
            } as KomentarType)
        ),
        pagination: data?.pagination,
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination?.hasNextPage
        ? (lastPage.pagination?.page ?? 1) + 1
        : undefined,
    enabled: isLoadMore,
  })

  const listLv1 =
    isLoadMore && !isLoadingLv1
      ? dataLv1?.pages.flatMap((page) => page.list) || []
      : firstDataLv1 || []

  const dataLv2 = useQueries({
    queries: listLv1.map((item) => ({
      queryKey: ['shared.komentar.lv2', item.id],
      queryFn: async () => {
        const { data } = await listKomentarChildAction({
          idKelas,
          idAktifitas,
          idParent: item.id,
        })

        return (data?.list ?? []).map(
          (item) =>
            ({
              id: item.id,
              idParent: item.id_parent,
              idPengguna: item.id_pengguna,
              nama: item.nama,
              foto: item.foto,
              komentar: item.diskusi,
              jumlahBalasan: item.jumlah_balasan,
              waktu: item.created_at,
              balasan: [],
            } as KomentarType)
        )
      },
    })),
  })

  const handleKirimKomentarLv1 = async () => {
    if (!komentarLv1) return

    await handleActionWithToast(
      tambahKomentarAction(idKelas, idAktifitas, komentarLv1),
      {
        loading: 'Memberi komentar...',
        onStart: () => setIsSendingLv1(true),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: queryKeyLv1 })
          setKomentarLv1('')
        },
        onFinish: () => setIsSendingLv1(false),
      }
    )
  }

  const handleKirimKomentarLv2 = async () => {
    if (!komentarLv2 || !parentLv2?.id) return

    await handleActionWithToast(
      tambahKomentarAction(idKelas, idAktifitas, komentarLv2, parentLv2.id),
      {
        loading: 'Memberi komentar...',
        success: 'Komentar ditambahkan',
        onStart: () => setIsSendingLv2(true),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: queryKeyLv1 })
          queryClient.invalidateQueries({
            queryKey: ['shared.komentar.lv2', parentLv2.id],
          })
          setKomentarLv2('')
        },
        onFinish: () => {
          setIsSendingLv2(false)
          setParentLv2(undefined)
        },
      }
    )
  }

  const loadMore = () => {
    if (isLoadMore) {
      fetchNextPageLv1()
    } else {
      setIsLoadMore(true)
    }
  }

  return (
    <div className={cn('flex flex-col', className)}>
      <FormKomentar
        value={komentarLv1}
        onChange={(e) => setKomentarLv1(e.target.value)}
        onSend={handleKirimKomentarLv1}
        disabled={isSendingLv1}
      />
      <div className="flex py-2">
        <Text
          size="sm"
          className="flex space-x-1 items-center text-gray-dark py-2"
        >
          <BsChatSquareText size={14} />
          <TextSpan size="2xs" weight="bold">
            {total || 0} Komentar
          </TextSpan>
        </Text>
      </div>
      {isLoadingFirstLv1 ? (
        <Loader size="sm" className="pb-3" />
      ) : (
        <div className="flex flex-col space-y-2">
          {listLv1.map((item, idx) => {
            const listLv2 = dataLv2[idx]?.data ?? []

            return (
              <div key={item.id} className="flex space-x-2">
                <Thumbnail
                  src={item.foto || undefined}
                  alt="profil"
                  size={32}
                  rounded="md"
                  avatar={item.nama}
                  className="flex-shrink-0"
                />
                <div className="flex flex-col flex-1 items-start text-gray-dark">
                  <Text weight="semibold">{item.nama}</Text>
                  <Text weight="medium">{item.komentar}</Text>
                  <div className="flex space-x-2 my-1">
                    <Text size="sm" weight="medium">
                      <Time date={item.waktu} fromNow />
                    </Text>
                    {!(parentLv2 && parentLv2.id === item.id) && (
                      <Button
                        size="sm"
                        variant="text"
                        className="text-sm font-bold h-auto p-0"
                        onClick={() => setParentLv2(item)}
                      >
                        Balas
                      </Button>
                    )}
                  </div>
                  {!!item.jumlahBalasan && (
                    <Button
                      size="sm"
                      variant="text"
                      className="text-sm font-bold h-auto p-0 mt-1"
                      onClick={() =>
                        setShowLv2({
                          ...showLv2,
                          [item.id]: !showLv2[item.id],
                        })
                      }
                    >
                      {showLv2[item.id] ? (
                        <FaChevronUp className="me-1" />
                      ) : (
                        <FaChevronDown className="me-1" />
                      )}
                      {item.jumlahBalasan} balasan
                    </Button>
                  )}
                  {showLv2[item.id] && (
                    <div className="flex flex-col space-y-2 mt-1">
                      {listLv2.map((item2) => (
                        <div key={item2.id} className="flex space-x-2">
                          <Thumbnail
                            src={item2.foto || undefined}
                            alt="profil"
                            size={32}
                            rounded="md"
                            avatar={item2.nama}
                            className="flex-shrink-0"
                          />
                          <div className="flex flex-col flex-1 items-start text-gray-dark">
                            <Text weight="semibold">{item2.nama}</Text>
                            <Text weight="medium">{item2.komentar}</Text>
                            <div className="flex space-x-2 my-1">
                              <Text size="sm" weight="medium">
                                <Time date={item2.waktu} fromNow />
                              </Text>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {parentLv2 && parentLv2.id === item.id && (
                    <FormKomentar
                      value={komentarLv2}
                      onChange={(e) => setKomentarLv2(e.target.value)}
                      onSend={handleKirimKomentarLv2}
                      disabled={isSendingLv2}
                      className="w-full mt-1"
                    />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
      {(isFetchingNextPageLv1 ||
        hasNextPageLv1 ||
        isLoadingFirstLv1 ||
        hasMoreThanFirst) && (
        <div className="space-y-4 ps-4 mt-2">
          {isLoadingLv1 || isFetchingNextPageLv1 ? (
            <div className="flex justify-center">
              <Loader size="sm" />
            </div>
          ) : (
            (hasNextPageLv1 || (!isLoadMore && hasMoreThanFirst)) && (
              <div className="flex justify-center">
                <Button
                  variant="text-colorful"
                  color="primary"
                  className="h-auto p-0"
                  onClick={loadMore}
                >
                  Muat Lebih
                </Button>
              </div>
            )
          )}
        </div>
      )}
    </div>
  )
}
