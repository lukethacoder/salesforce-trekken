import { FilterFn, Row } from '@tanstack/react-table'

import { rankItem } from '@tanstack/match-sorter-utils'

export const fuzzyFilter: FilterFn<any> = (
  row: Row<any>,
  columnId: string,
  value: string,
  addMeta
) => {
  const safeValue = (() => {
    const filterValue = row.getValue(columnId)
    return typeof filterValue === 'number' ? String(filterValue) : filterValue
  })()

  // Rank the item
  const itemRank = rankItem(safeValue, value)

  // Store the itemRank info
  addMeta({
    itemRank,
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

export const COLUMN_CONFIG = {
  minSize: 32,
  maxSize: 2440,
}
