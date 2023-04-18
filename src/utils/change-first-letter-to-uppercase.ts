export const changeFirstLetterToUppercase = (letter: string) => {
  const firstLetter = letter.substring(0, 1).toUpperCase()
  const restOfLetters = letter.substring(1)
  return `${firstLetter}${restOfLetters}`
}
