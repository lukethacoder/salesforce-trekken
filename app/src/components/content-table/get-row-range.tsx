import { Row } from '@tanstack/react-table'

export function getRowRange<T>(rows: Array<Row<T>>, idA: string, idB: string) {
  const range: Array<Row<T>> = []
  let foundStart = false
  let foundEnd = false
  for (let index = 0; index < rows.length; index += 1) {
    const row = rows[index]
    if (row.id === idA || row.id === idB) {
      if (foundStart) {
        foundEnd = true
      }
      if (!foundStart) {
        foundStart = true
      }
    }

    if (foundStart) {
      range.push(row)
    }

    if (foundEnd) {
      break
    }
  }

  return range
}
