const ALPHABET_LENGTH = 26
const UPPERCASE_START_INDEX = 65
const UPPERCASE_END_INDEX = UPPERCASE_START_INDEX + ALPHABET_LENGTH - 1;
const LOWERCASE_START_INDEX = 97
const LOWERCASE_END_INDEX = LOWERCASE_START_INDEX + ALPHABET_LENGTH - 1;

const isLowerCase = (code) => {
  return code >= LOWERCASE_START_INDEX
}

const getShiftedCode = (code, shift) => {
  let shiftIndex;

  if (isLowerCase(code)) {
    shiftIndex = (code - LOWERCASE_START_INDEX + shift) % ALPHABET_LENGTH
    return shiftIndex < 0
      ? LOWERCASE_END_INDEX + shiftIndex + 1
      : LOWERCASE_START_INDEX + shiftIndex
  } else {
    shiftIndex = (code - UPPERCASE_START_INDEX + shift) % ALPHABET_LENGTH
    return shiftIndex < 0
      ? UPPERCASE_END_INDEX + shiftIndex + 1
      : UPPERCASE_START_INDEX + shiftIndex

  }
}

const caesarCipher = (data, initialShift, decode = false) => {
  const split = data.split('')
  return split.reduce((result, currentChar) => {
    if (/[A-Za-z]/i.test(currentChar)) {
      const charCode = currentChar.charCodeAt(0)
      const shift = !decode ? initialShift : -initialShift
      result += String.fromCharCode(getShiftedCode(charCode, shift))
      return result
    }
    result += currentChar
    return result
  }, '')
}

module.exports = { caesarCipher }
