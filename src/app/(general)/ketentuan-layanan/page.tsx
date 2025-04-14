import { Text, TextSpan, Title } from '@/components/ui'
import { siteConfig } from '@/config/site.config'
import Image from 'next/image'
import Link from 'next/link'
import { BsEnvelope, BsPinMap } from 'react-icons/bs'

export default function KetentuanLayananPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-0">
      <div className="sticky top-0 z-40 flex justify-center bg-gray-0/80 backdrop-blur-lg py-8 lg:py-6">
        <Link href="/">
          <Image
            src={siteConfig.logo}
            alt={siteConfig.title}
            height={60}
            className="h-12 lg:h-24 dark:invert"
            priority
          />
        </Link>
      </div>

      <div className="flex items-center max-w-4xl px-6 mb-10 mx-auto lg:px-10">
        <div className="flex flex-col gap-2 mx-auto">
          <div className="flex flex-col gap-1">
            <Title
              as="h1"
              weight="bold"
              className="text-2xl leading-normal text-gray-dark"
            >
              Ketentuan Layanan Smartthink
            </Title>
            <Text weight="medium">Tanggal Berlaku: 15 April 2025</Text>
            <Text>
              Selamat datang di Smartthink, platform Learning Management System
              (LMS) berbasis web yang dirancang untuk mendukung proses belajar
              mengajar secara digital. Dengan menggunakan layanan kami, Anda
              menyetujui untuk terikat dengan ketentuan berikut ini. Harap baca
              dengan saksama.
            </Text>
          </div>
          <div className="flex flex-col gap-1">
            <Title as="h4" className="mt-1">
              1. Deskripsi Layanan
            </Title>
            <Text>
              Smartthink adalah platform LMS yang menyediakan layanan seperti:
            </Text>
            <ul className="text-base list-disc ml-4">
              <li>Pembuatan dan pengelolaan kursus online.</li>
              <li>Penugasan dan penilaian secara digital.</li>
              <li>
                Fasilitas diskusi dan kolaborasi antara pengajar dan peserta
                didik.
              </li>
              <li>Pelacakan perkembangan belajar peserta didik.</li>
            </ul>
            <Text>
              Layanan ini ditujukan untuk institusi pendidikan, perusahaan,
              maupun individu yang ingin mengelola kegiatan belajar secara
              efektif.
            </Text>
          </div>
          <div className="flex flex-col gap-1">
            <Title as="h4" className="mt-1">
              2. Akun Pengguna
            </Title>
            <Text>
              Untuk menggunakan Smartthink, Anda harus membuat akun. Dengan
              mendaftar:
            </Text>
            <ul className="text-base list-disc ml-4">
              <li>
                Anda menyatakan bahwa informasi yang Anda berikan adalah benar
                dan lengkap.
              </li>
              <li>
                Anda bertanggung jawab atas kerahasiaan akun dan kata sandi
                Anda.
              </li>
              <li>
                Anda wajib segera memberitahukan kami jika terdapat penggunaan
                tidak sah atas akun Anda.
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-1">
            <Title as="h4" className="mt-1">
              3. Hak dan Kewajiban Pengguna
            </Title>
            <Text>Sebagai pengguna Smartthink:</Text>
            <ul className="text-base list-disc ml-4">
              <li>
                Anda berhak mengakses materi pembelajaran sesuai dengan peran
                (peserta didik, pengajar, admin instansi).
              </li>
              <li>
                Anda wajib menggunakan platform ini sesuai dengan peraturan yang
                berlaku dan etika pendidikan.
              </li>
              <li>
                Anda tidak diperkenankan mengunggah konten yang melanggar hak
                cipta, mengandung SARA, kekerasan, atau pornografi.
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-1">
            <Title as="h4" className="mt-1">
              4. Kepemilikan Konten
            </Title>
            <Text>
              Konten pembelajaran yang diunggah oleh pengguna (pengajar atau
              institusi) tetap menjadi milik pengguna tersebut. Namun, dengan
              mengunggah ke platform Smartthink, Anda memberikan kami lisensi
              non-eksklusif untuk menyimpan dan menampilkan konten tersebut
              dalam konteks layanan.
            </Text>
          </div>
          <div className="flex flex-col gap-1">
            <Title as="h4" className="mt-1">
              5. Larangan Penggunaan
            </Title>
            <Text>Pengguna dilarang:</Text>
            <ul className="text-base list-disc ml-4">
              <li>Menggunakan Smartthink untuk aktivitas ilegal.</li>
              <li>
                Menyalin, menjual, atau mendistribusikan kembali konten atau
                materi tanpa izin.
              </li>
              <li>
                Mengganggu atau mencoba merusak sistem atau keamanan Smartthink.
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-1">
            <Title as="h4" className="mt-1">
              6. Pengakhiran Layanan
            </Title>
            <Text>
              Kami berhak menangguhkan atau menonaktifkan akun Anda jika
              ditemukan pelanggaran terhadap ketentuan ini. Jika Anda ingin
              menghentikan penggunaan layanan, Anda dapat menghapus akun Anda
              atau menghubungi tim dukungan kami.
            </Text>
          </div>
          <div className="flex flex-col gap-1">
            <Title as="h4" className="mt-1">
              7. Perubahan Ketentuan
            </Title>
            <Text>
              Ketentuan ini dapat diperbarui sewaktu-waktu. Setiap perubahan
              material akan diberitahukan melalui email atau notifikasi dalam
              aplikasi.
            </Text>
          </div>
          <div className="flex flex-col gap-1">
            <Title as="h4" className="mt-1">
              8. Penafian dan Batas Tanggung Jawab
            </Title>
            <Text>
              Smartthink disediakan sebagaimana adanya. Kami tidak menjamin
              bahwa layanan akan selalu tersedia tanpa gangguan. Kami tidak
              bertanggung jawab atas kerugian langsung atau tidak langsung
              akibat penggunaan layanan ini.
            </Text>
          </div>
          <div className="flex flex-col gap-1">
            <Title as="h4" className="mt-1">
              9. Kontak Kami
            </Title>
            <Text>
              Jika Anda memiliki pertanyaan mengenai Ketentuan Layanan ini,
              silakan hubungi kami:
            </Text>
            <div className="font-medium">
              <TextSpan className="inline-flex items-center gap-1.5">
                <BsEnvelope className="size-3" /> Email: support@smartthink.com
              </TextSpan>
              <br />
              <TextSpan className="inline-flex items-center gap-1.5">
                <BsPinMap className="size-3" /> Alamat: Jl. HR. Soebrantas,
                Sidomulyo Bar., Kec. Tampan, Kota Pekanbaru, Riau 28293
              </TextSpan>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
