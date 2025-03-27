import AuthWrapper from '@/components/shared/auth-layout/auth-wrapper'
import { metaObject } from '@/config/site.config'
import LoginForm from '../../../components/page/auth/login/form'

export const metadata = {
  ...metaObject('Masuk'),
}

export default function LoginPage() {
  return (
    <AuthWrapper
      title={
        <>
          Saatnya{' '}
          <span className="text-primary">terhubung dengan para pembelajar</span>{' '}
          dan nikmati <i>resource</i> pembelajaran yang berlimpah
        </>
      }
      description="Dengan mendaftar di G-Learning, jelajahi sumber belajar yang beragam dan juga dapat terhubung dengan guru, dosen, siswa dan mahasiswa diseluruh indonesia"
    >
      <LoginForm devMode={process.env.NODE_ENV === 'development'} />
    </AuthWrapper>
  )
}
