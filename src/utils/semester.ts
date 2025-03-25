export const deskripsiSemester = (semester: string) => {
  const tahun = parseInt(semester.substring(0, 4))
  const smt = parseInt(semester.substring(4, 5))

  if (![1, 2].includes(smt)) return semester

  return `${tahun}/${tahun + 1} ${smt === 1 ? 'Ganjil' : 'Genap'}`
}
