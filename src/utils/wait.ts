export const wait = async (time: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, time)
  })

export const waitRandomSuccess = async (time: number) =>
  new Promise((resolve, reject) => {
    setTimeout(Math.floor(Math.random() * 2) ? resolve : reject, time)
  })
