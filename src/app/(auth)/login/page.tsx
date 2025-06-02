import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import LoginForm from '@/components/pages/auth/login/form'
import AuthWrapper from '@/components/shared/auth-layout/auth-wrapper'
import { metaObject } from '@/config/site.config'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const metadata = {
  ...metaObject('Masuk'),
  // other: {
  //   'google-site-verification': [],
  // },
}

export default async function LoginPage() {
  const session = await getServerSession(authOptions)
  if (session) return redirect('/')

  return (
    <AuthWrapper
      title={
        <>
          Saatnya{' '}
          <span className="text-primary">terhubung dengan para pembelajar</span>{' '}
          dan nikmati <i>resource</i> pembelajaran yang berlimpah
        </>
      }
      description="Dengan mendaftar di Smart Campus, jelajahi sumber belajar yang beragam dan juga dapat terhubung dengan guru, dosen, siswa dan mahasiswa diseluruh indonesia"
    >
      <LoginForm
        devMode={
          process.env.NODE_ENV === 'development' ||
          process.env.DEV_MODE === 'true'
        }
      />
    </AuthWrapper>
  )
}
