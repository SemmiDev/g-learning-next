import { Breadcrumb, Title } from '@/components/ui'
import cn from '@/utils/class-names'

export type BreadcrumbType = {
  name: string
  href?: string
}

export type PageHeaderProps = {
  title: string
  breadcrumb?: BreadcrumbType[]
  className?: string
}

export default function PageHeader({
  title,
  breadcrumb,
  children,
  className,
}: React.PropsWithChildren<PageHeaderProps>) {
  console.log(breadcrumb)

  return (
    <header className={cn('mb-6 @container xs:-mt-2 lg:mb-7', className)}>
      <div className="flex flex-col @lg:flex-row @lg:items-center @lg:justify-between">
        <div>
          <Title
            as="h2"
            variant="dark"
            className="mb-2 text-[22px] lg:text-2xl 4xl:text-[26px]"
          >
            {title}
          </Title>

          {breadcrumb && !!breadcrumb.length && (
            <Breadcrumb
              separator=""
              separatorVariant="circle"
              className="flex-wrap"
            >
              {breadcrumb?.map((item) => (
                <Breadcrumb.Item
                  key={item.name}
                  {...(item?.href && { href: item?.href })}
                >
                  {item.name}
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
          )}
        </div>
        {children}
      </div>
    </header>
  )
}
