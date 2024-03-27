import { metaObject } from '@/config/site.config'
import AuthWrapper from '@/app/shared/auth-layout/auth-wrapper'
import SignUpForm from './sign-up-form'

export const metadata = {
  ...metaObject('Masuk'),
}

export default function SignIn() {
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
      <SignUpForm />
    </AuthWrapper>
  )
}
