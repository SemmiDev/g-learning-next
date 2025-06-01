import { Text, TextSpan, Title } from '@/components/ui'
import { siteConfig } from '@/config/site.config'
import Image from 'next/image'
import Link from 'next/link'
import { BsEnvelope, BsPinMap } from 'react-icons/bs'

export default function KebijakanPrivasiPage() {
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
              Kebijakan Privasi Smart Campus
            </Title>
            <Text weight="medium">Tanggal Berlaku: 15 April 2025</Text>
            <Text>
              Privasi Anda penting bagi kami. Kebijakan Privasi ini menjelaskan
              bagaimana Smart Campus mengumpulkan, menggunakan, menyimpan, dan
              melindungi informasi pribadi Anda saat menggunakan layanan kami.
            </Text>
          </div>
          <div className="flex flex-col gap-1">
            <Title as="h4" className="mt-1">
              1. Informasi yang Kami Kumpulkan
            </Title>
            <Text>
              Kami dapat mengumpulkan beberapa jenis informasi, antara lain:
            </Text>
            <ol className="text-base list-[lower-alpha] ml-4">
              <li>
                Informasi Pribadi
                <ul className="text-base list-disc ml-4">
                  <li>Nama lengkap</li>
                  <li>Alamat email</li>
                  <li>Nomor telepon (jika diperlukan)</li>
                  <li>Informasi institusi (sekolah/kampus/perusahaan)</li>
                </ul>
              </li>
              <li>
                Informasi Aktivitas
                <ul className="text-base list-disc ml-4">
                  <li>Riwayat login dan penggunaan sistem</li>
                  <li>Materi yang diakses, dikirim, atau diunggah</li>
                  <li>Interaksi dalam forum atau ruang diskusi</li>
                </ul>
              </li>
              <li>
                Informasi Perangkat
                <ul className="text-base list-disc ml-4">
                  <li>Jenis browser, perangkat, dan sistem operasi</li>
                  <li>Alamat IP</li>
                  <li>Cookie dan data pelacakan lainnya</li>
                </ul>
              </li>
            </ol>
          </div>
          <div className="flex flex-col gap-1">
            <Title as="h4" className="mt-1">
              2. Cara Kami Menggunakan Informasi
            </Title>
            <Text>Informasi yang kami kumpulkan digunakan untuk:</Text>
            <ul className="text-base list-disc ml-4">
              <li>Menyediakan dan mengelola akses ke platform pembelajaran.</li>
              <li>Meningkatkan performa dan pengalaman pengguna.</li>
              <li>Memberikan dukungan teknis dan bantuan pengguna.</li>
              <li>
                Mengirimkan notifikasi penting terkait akun dan aktivitas
                pembelajaran.
              </li>
              <li>Menjaga keamanan sistem dan mencegah penyalahgunaan.</li>
            </ul>
            <Text>
              Kami tidak menjual atau menyewakan informasi pribadi Anda kepada
              pihak ketiga.
            </Text>
          </div>
          <div className="flex flex-col gap-1">
            <Title as="h4" className="mt-1">
              3. Berbagi Informasi
            </Title>
            <Text>Kami hanya membagikan informasi pribadi dengan:</Text>
            <ul className="text-base list-disc ml-4">
              <li>
                Institusi pendidikan atau perusahaan Anda (jika Anda tergabung
                dalam sebuah lembaga).
              </li>
              <li>
                Penyedia layanan pihak ketiga yang membantu operasional teknis
                Smart Campus, dan telah setuju untuk menjaga kerahasiaan
                informasi.
              </li>
              <li>
                Pihak berwenang, jika diwajibkan oleh hukum atau dalam rangka
                penegakan hukum.
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-1">
            <Title as="h4" className="mt-1">
              4. Penyimpanan dan Keamanan Data
            </Title>
            <Text>
              Kami menggunakan langkah-langkah teknis dan organisasi untuk
              melindungi informasi Anda, termasuk:
            </Text>
            <ul className="text-base list-disc ml-4">
              <li>Enkripsi data saat transmisi dan penyimpanan.</li>
              <li>Pembatasan akses terhadap data pribadi.</li>
              <li>Audit dan pemantauan sistem secara berkala.</li>
            </ul>
            <Text>
              Data disimpan selama akun Anda aktif atau selama diperlukan untuk
              menyediakan layanan.
            </Text>
          </div>
          <div className="flex flex-col gap-1">
            <Title as="h4" className="mt-1">
              5. Hak Anda atas Data
            </Title>
            <Text>Anda memiliki hak untuk:</Text>
            <ul className="text-base list-disc ml-4">
              <li>Mengakses data pribadi yang kami simpan.</li>
              <li>Memperbarui atau memperbaiki informasi Anda.</li>
              <li>
                Meminta penghapusan akun dan datanya (dengan konsekuensi
                penghentian layanan).
              </li>
            </ul>
            <Text>
              Permintaan dapat diajukan melalui email:{' '}
              <TextSpan weight="medium">support@smartcampus.co.id</TextSpan>
            </Text>
          </div>
          <div className="flex flex-col gap-1">
            <Title as="h4" className="mt-1">
              6. Cookie dan Pelacakan
            </Title>
            <Text>
              Kami menggunakan cookie untuk meningkatkan fungsionalitas dan
              pengalaman pengguna. Anda dapat mengatur browser Anda untuk
              menolak cookie, namun hal ini dapat mempengaruhi performa layanan.
            </Text>
          </div>
          <div className="flex flex-col gap-1">
            <Title as="h4" className="mt-1">
              7. Layanan Pihak Ketiga
            </Title>
            <Text>
              Layanan kami dapat berisi tautan ke situs atau alat pihak ketiga.
              Kami tidak bertanggung jawab atas kebijakan privasi mereka. Harap
              tinjau kebijakan masing-masing layanan tersebut secara terpisah.
            </Text>
          </div>
          <div className="flex flex-col gap-1">
            <Title as="h4" className="mt-1">
              8. Perubahan Kebijakan Privasi
            </Title>
            <Text>
              Kebijakan ini dapat diperbarui dari waktu ke waktu. Setiap
              perubahan signifikan akan kami informasikan melalui email atau
              pemberitahuan di platform.
            </Text>
          </div>
          <div className="flex flex-col gap-1">
            <Title as="h4" className="mt-1">
              9. Kontak Kami
            </Title>
            <Text>
              Jika Anda memiliki pertanyaan atau kekhawatiran mengenai kebijakan
              ini, silakan hubungi:
            </Text>
            <div className="font-medium">
              <TextSpan className="inline-flex items-center gap-1.5">
                <BsEnvelope className="size-3" /> Email:
                support@smartcampus.co.id
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
