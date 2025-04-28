import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import AuthWrapper from '@/components/shared/auth-layout/auth-wrapper'
import { metaObject } from '@/config/site.config'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import LoginForm from '../../../components/page/auth/login/form'

export const metadata = {
  ...metaObject('Masuk'),
  other: {
    'google-site-verification': [
      'u2vamwZ_XwoqB34XRg08XetvcpxnfEcDQqapnrMZ3Cs',
      '9IKeuVPZKi0xAsWzuS4oFbLdLX24R4_3HV47TwxDjV0',
    ],
  },
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
      description="Dengan mendaftar di Smartthink, jelajahi sumber belajar yang beragam dan juga dapat terhubung dengan guru, dosen, siswa dan mahasiswa diseluruh indonesia"
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
