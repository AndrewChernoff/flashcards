export const getMultiplesOfTen = (lengthNumber: number): string[] => {
  const numbers = []

  // Add each tenth number
  for (let i = 10; i <= 100; i += 10) {
    numbers.push(String(i))
  }

  // Add each hundredth number
  for (let i = 100; i <= lengthNumber; i += 100) {
    numbers.push(String(i))
  }

  return numbers
}
