/** Newline-separated textarea ↔ string array (admin CRUD forms). */
export const listToText = (arr) => (arr || []).join('\n')

export const textToList = (str) =>
  str.split('\n').map(s => s.trim()).filter(Boolean)
