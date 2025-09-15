import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import LoginForm from '@/components/pages/auth/login/form'
import AuthWrapper from '@/components/shared/auth-layout/auth-wrapper'
import { metaObject } from '@/config/site.config'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const testingUsers = [
  { level: 'Admin', username: 'admin@gmail.com' },
  { level: 'Instansi', username: 'adminuin' },
  { level: 'Fakultas Instansi', username: 'imron' },
  { level: 'Prodi Instansi', username: 'rusdi' },
  { level: 'Contoh Dosen', username: '1502021102950004' },
  { level: 'Contoh Mahasiswa 1', username: '1502020105060001' },
  { level: 'Contoh Mahasiswa 2', username: '1502082008050001' },
  { level: 'Rizky (Pengguna 1)', username: 'reazon7@gmail.com' },
  {
    level: 'Sammi (Pengguna 2)',
    username: 'sammidev4@gmail.com',
  },
  { level: 'STIE', username: 'adminstie' },
  {
    level: 'Contoh Dosen STIE',
    username: '1471080411670002',
    password: '1471080411670002',
  },
  {
    level: 'Contoh Mahasiswa STIE',
    username: '1406052211000006',
    password: '1406052211000006',
  },
]

export const metadata = {
  ...metaObject('Masuk'),
  // other: {
  //   'google-site-verification': [],
  // },
}

export default async function LoginPage() {
  const session = await getServerSession(authOptions)
  if (session) return redirect('/')

  const devMode =
    process.env.NODE_ENV === 'development' || process.env.DEV_MODE === 'true'

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
      <LoginForm testingUsers={devMode ? testingUsers : []} />
    </AuthWrapper>
  )
}
