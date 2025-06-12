'use client'

import DaftarKelasSection from './daftar-kelas-card'
import LinimasaSesiSection from './linimasa-sesi-section'

export default function AkademikBody() {
  return (
    <div className="grid grid-cols-12 gap-x-5 gap-y-12">
      <LinimasaSesiSection className="col-span-12 md:col-span-7 lg:col-span-5" />
      <DaftarKelasSection className="col-span-12 md:col-span-5 lg:col-span-7" />
    </div>
  )
}
