import LupaPasswordForm from '@/components/pages/auth/lupa-password/form'
import AuthWrapper from '@/components/shared/auth-layout/auth-wrapper'
import { metaObject } from '@/config/site.config'

export const metadata = {
  ...metaObject('Lupa Kata Sandi'),
}

export default function LupaPassword() {
  return (
    <AuthWrapper
      title={
        <>
          Bermasalah untuk masuk ke akun?{' '}
          <br className="hidden sm:inline-block" /> Silahkan reset kata sandi
          anda.
        </>
      }
      hideGoogleSignIn
    >
      <LupaPasswordForm />
    </AuthWrapper>
  )
}
