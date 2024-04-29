import AuthWrapper from '@/components/shared/auth-layout/auth-wrapper'
import ForgetPasswordForm from './forgot-password-form'

export default function ForgotPassword() {
  return (
    <AuthWrapper
      title={
        <>
          Bermasalah untuk masuk ke akun?{' '}
          <br className="hidden sm:inline-block" /> Silahkan reset password
          anda.
        </>
      }
    >
      <ForgetPasswordForm />
    </AuthWrapper>
  )
}
