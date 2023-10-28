export const getMultiplesOfTen = (lengthNumber: number): string[] => {
  const arr = Array.from({ length: lengthNumber }, (_, index) => index + 1).filter(
    number => number === 1 || number === 100 || (number % 10 === 0 && number <= 50)
  )

  return arr.map(el => String(el))
}
