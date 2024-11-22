'use client'

import { Button, Text, Title } from '@/components/ui'
import imageBanner from '@public/auth-banner.png'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { ReactNode } from 'react'
import { FcGoogle } from 'react-icons/fc'
import OrSeparation from './or-separation'

type AuthWrapperProps = {
  children: ReactNode
  title?: ReactNode
  description?: string
  hideGoogleSignIn?: boolean
}

export default function AuthWrapper({
  children,
  title,
  description,
  hideGoogleSignIn,
}: AuthWrapperProps) {
  const googleSignIn = async () => {
    signIn('google')
  }

  return (
    <div className="min-h-screen justify-between gap-x-8 lg:flex [&>div]:min-h-[calc(100vh-80px)]">
      <div className="relative flex w-full items-center justify-center px-2 py-8 lg:ps-4 lg:pe-0 lg:w-6/12 2xl:pe-24">
        <div className=" w-full max-w-sm md:max-w-md lg:py-7 lg:ps-3 lg:pt-16 2xl:w-[630px] 2xl:max-w-none 2xl:ps-20 2xl:pt-7">
          {(title || description) && (
            <div className="mb-7 px-6 pt-3 text-center md:pt-0 lg:px-0 lg:text-start xl:mb-8 2xl:mb-10">
              <Title
                as="h2"
                className="mb-5 text-base leading-snug md:text-lg md:!leading-normal lg:mb-7 lg:text-xl xl:text-2xl 2xl:text-3xl"
              >
                {title}
              </Title>
              <Text
                weight="medium"
                className="xs:text-xs md:text-sm text-gray-700"
              >
                {description}
              </Text>
            </div>
          )}
          {!hideGoogleSignIn && (
            <>
              <Button
                variant="outline"
                onClick={() => googleSignIn()}
                className="h-11 w-full"
              >
                <FcGoogle className="size-4 shrink-0 me-2" />
                <span className="truncate">Masuk dengan Google</span>
              </Button>
              <OrSeparation title="Atau" className="mb-5 2xl:mb-7" isCenter />
            </>
          )}
          {children}
        </div>
      </div>
      <div className="hidden w-6/12 lg:flex">
        <Image
          src={imageBanner}
          alt="Auth Banner"
          className="object-cover"
          priority
        />
      </div>
    </div>
  )
}
