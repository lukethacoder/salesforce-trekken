import { useState, useMemo, useEffect } from 'react'
import { toast } from 'react-hot-toast'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  Table,
  Row,
  Cell,
  HeaderGroup,
  useReactTable,
  Column,
} from '@tanstack/react-table'

import {
  IconChevronsLeft,
  IconChevronLeft,
  IconChevronsRight,
  IconChevronRight,
  IconSettings,
  IconChevronUp,
  IconChevronDown,
} from '@tabler/icons'

import { ManagedContentType, Content as ContentType } from 'src/types'
import { Button, Select } from '@app/components'
import { useBearStore } from '../../state'
import { TableSettingsModal } from '../table-settings-modal'

import { fuzzyFilter, COLUMN_CONFIG } from './utils'
import { getRowRange } from './get-row-range'
import { DebouncedInput } from './debounced-input'
import { IndeterminateCheckbox } from './indeterminate-checkbox'

export function ContentTable({
  data = [],
  extraColumns = [],
  contentTypes = [],
  confirmSelection,
}: {
  data: ContentType[]
  extraColumns: ColumnDef<any>[]
  contentTypes: ManagedContentType[]
  confirmSelection: (payload: ContentType[]) => void
}) {
  const store = useBearStore()
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [isWrapText, setIsWrapText] = useState(false)
  const [settingsModalIsOpen, setSettingsModalIsOpen] = useState(false)

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: 'select',
        size: 32,
        enableResizing: false,
        enableHiding: false,
        header: ({ table }: { table: Table<any> }) => (
          <IndeterminateCheckbox
            {...{
              id: 'select-all',
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row, table }: { row: Row<any>; table: Table<any> }) => (
          <IndeterminateCheckbox
            {...{
              id: `select-row-${row.id}`,
              checked: row.getIsSelected(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
              onClick: (e) => {
                let lastSelectedIdValue =
                  window.localStorage.getItem('lastSelectedId')

                if (e.shiftKey && lastSelectedIdValue) {
                  const { rows, rowsById } = table.getRowModel()
                  const rowsToToggle = getRowRange(
                    rows,
                    row.id,
                    lastSelectedIdValue
                  )

                  const isLastSelected =
                    rowsById[lastSelectedIdValue].getIsSelected()
                  rowsToToggle.forEach((row) =>
                    row.toggleSelected(isLastSelected)
                  )
                }

                window.localStorage.setItem('lastSelectedId', row.id)
              },
            }}
          />
        ),
      },
      {
        accessorKey: 'title',
        header: () => 'Title',
        enableResizing: true,
        enableHiding: false,
        size: 256,
        footer: (props: any) => props.column.id,
        ...COLUMN_CONFIG,
      },
      {
        accessorKey: 'contentKey',
        header: () => 'Content Key',
        enableResizing: true,
        size: 256,
        footer: (props: any) => props.column.id,
        ...COLUMN_CONFIG,
      },
      {
        accessorKey: 'managedContentId',
        header: () => 'Managed Content Id',
        enableResizing: true,
        footer: (props: any) => props.column.id,
        ...COLUMN_CONFIG,
      },
      {
        accessorKey: 'type',
        header: 'Type',
        enableResizing: true,
        footer: (props: any) => props.column.id,
        ...COLUMN_CONFIG,
      },
      {
        accessorKey: 'publishedDate',
        header: 'Published Date',
        enableResizing: true,
        size: 256,
        footer: (props: any) => props.column.id,
        ...COLUMN_CONFIG,
      },
      ...extraColumns,
    ],
    []
  )

  useEffect(() => {
    // if returning, set the checked items back
    if (store.rowSelection && Object.keys(rowSelection).length === 0) {
      setRowSelection(store.rowSelection)
    }
  }, [])

  useEffect(() => {
    store.dispatch({
      type: 'setRowSelection',
      payload: rowSelection,
    })
  }, [rowSelection])

  // console.log('data ', data)

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    initialState: {
      columnVisibility: extraColumns.reduce((acc, item) => {
        // keep the "Image Source" column visible
        if ((item as any).accessorKey === 'cms_image_source') {
          return acc
        }

        return {
          ...acc,
          [(item as any).accessorKey as string]: false,
        }
      }, {}),
    },
    state: {
      sorting,
      rowSelection,
      globalFilter,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    enableColumnResizing: true,
    columnResizeMode: 'onEnd',
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
  })

  const cmsTypeColumn = table.getColumn('type')

  const columnsAsObject = table
    .getAllLeafColumns()
    .filter((column) => column.id !== 'select' && column.id !== 'title')
    .reduce<{ [key: string]: Column<any, any>[] }>((acc, item) => {
      if (item.columnDef?.meta?.cmsType) {
        const typeKey: string = item.columnDef?.meta?.cmsType

        const itemArray = Object.hasOwn(acc, typeKey) ? acc[typeKey] : []
        acc[typeKey] = [item, ...itemArray]

        return acc
      }
      return acc
    }, {})

  const handleConfirmSelection = () => {
    const selectedRows: Row<ContentType>[] =
      table.getSelectedRowModel().flatRows

    if (selectedRows.length === 0) {
      toast.error('No rows selected, please select at least one row for export')
      return
    }

    confirmSelection(selectedRows.map((item) => item.original))
  }

  return (
    <div className='w-full px-1 md:px-4'>
      <div className='flex flex-col md:flex-row md:justify-between gap-2 px-1'>
        <div className='flex gap-2'>
          <div className='w-48'>
            <Select
              setSelected={cmsTypeColumn.setFilterValue}
              options={[
                {
                  label: 'All Content Types',
                  value: '',
                },
                ...contentTypes.map((item) => ({
                  label: item.label,
                  value: item.name,
                })),
              ]}
            />
          </div>
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={(value) => setGlobalFilter(String(value))}
            className='bg-transparent p-2 border-2 border-jumbo-150 dark:border-jumbo-400 px-2 py-2 focus:outline focus:border-primary focus-within:outline focus-within:outline-2 focus-within:outline-primary outline-offset-2'
            placeholder='Search all columns...'
          />
        </div>

        <div className='flex flex-wrap gap-2 items-center justify-end'>
          <div className='flex items-center whitespace-nowrap text-sm'>
            {Object.keys(rowSelection).length} of{' '}
            {table.getPreFilteredRowModel().rows.length} Items Selected
          </div>
          <Button
            type='primary'
            ariaLabel='Confirm content selection'
            className='h-9'
            onClick={handleConfirmSelection}
          >
            Confirm Selection
          </Button>
          <Button
            type='primary'
            ariaLabel='Open table settings'
            onClick={() => setSettingsModalIsOpen(!settingsModalIsOpen)}
            className='flex items-center justify-center h-9 w-9'
          >
            <span className='flex items-center justify-center text-white h-8 w-8'>
              <IconSettings />
            </span>
          </Button>
        </div>
      </div>

      <div className='h-2' />
      <div className='overflow-x-auto text-sm'>
        <div
          {...{
            role: 'table',
            style: {
              width: table.getCenterTotalSize(),
            },
          }}
        >
          <div role='thead' className='thead'>
            {table.getHeaderGroups().map((headerGroup: HeaderGroup<any>) => (
              <div
                key={headerGroup.id}
                role='tr'
                className='tr min-w-full border-b-2 border-jumbo-150 dark:border-jumbo-600'
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <div
                      role='th'
                      key={header.id}
                      data-resizing={header.column.getIsResizing()}
                      className='th text-left relative overflow-hidden whitespace-nowrap'
                      style={{
                        width: header.getSize(),
                      }}
                    >
                      {header.isPlaceholder ? null : (
                        <div className='relative'>
                          {header.column.getCanSort() ? (
                            <button
                              {...{
                                'aria-label': `Sort column ${
                                  typeof header.column.columnDef.header ===
                                  'function'
                                    ? (header.column.columnDef as any).header()
                                    : header.column.columnDef.header
                                }`,
                                className: `py-2 hover:underline max-w-full rounded border border-transparent overflow-hidden text-left focus:outline focus-within:outline focus-within:outline-2 focus-within:outline-primary outline-offset-0 before:content-[''] before:absolute before:w-full before:h-full ${
                                  isWrapText
                                    ? 'break-all whitespace-normal'
                                    : 'whitespace-nowrap text-ellipsis'
                                } cursor-pointer select-none`,
                                onClick:
                                  header.column.getToggleSortingHandler(),
                              }}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {{
                                asc: (
                                  <span className='inline-flex ml-1 absolute top-[-1px] items-center h-full w-5'>
                                    <IconChevronUp />
                                  </span>
                                ),
                                desc: (
                                  <span className='inline-flex ml-1 absolute top-[-1px] items-center h-full w-5'>
                                    <IconChevronDown />
                                  </span>
                                ),
                              }[header.column.getIsSorted() as string] ?? null}
                            </button>
                          ) : (
                            <div
                              className={`py-2 border border-transparent ${
                                isWrapText
                                  ? 'break-all whitespace-normal'
                                  : 'whitespace-nowrap text-ellipsis'
                              } ${
                                header.column.id !== 'select' &&
                                'overflow-hidden'
                              }`}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </div>
                          )}
                        </div>
                      )}
                      {header.column.getCanResize() && (
                        <div
                          {...{
                            onMouseDown: header.getResizeHandler(),
                            onTouchStart: header.getResizeHandler(),
                            className: `header-resizer opacity-0 absolute right-0 top-0 h-full w-1 select-none touch-none  cursor-col-resize ${
                              header.column.getIsResizing()
                                ? 'bg-jumbo-700 hover:bg-jumbo-700 dark:bg-jumbo-200 dark:hover:bg-jumbo-200'
                                : 'bg-primary-300 hover:bg-jumbo-700 dark:hover:bg-jumbo-200'
                            }`,
                            style: {
                              transform: header.column.getIsResizing()
                                ? `translateX(${
                                    table.getState().columnSizingInfo
                                      .deltaOffset
                                  }px)`
                                : '',
                            },
                          }}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
          <div role='tbody' className='tbody'>
            {table.getRowModel().rows.map((row: Row<any>) => (
              <div
                key={row.id}
                role='tr'
                className='tr min-w-full py-2 border-b border-jumbo-150 dark:border-jumbo-600 hover:bg-jumbo-25 dark:hover:bg-jumbo-800'
              >
                {row.getVisibleCells().map((cell: Cell<any, any>) => (
                  <div
                    {...{
                      key: cell.id,
                      role: 'td',
                      className: `td flex items-center ${
                        cell.column.columnDef.id === 'select'
                          ? 'pl-1'
                          : 'overflow-hidden'
                      }`,
                      style: {
                        width: cell.column.getSize(),
                      },
                    }}
                  >
                    <div
                      className={`border border-transparent text-ellipsis ${
                        isWrapText ? 'break-all' : 'whitespace-nowrap'
                      } ${
                        cell.column.columnDef.id !== 'select'
                          ? 'overflow-hidden'
                          : ''
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='tfoot flex justify-between'>
        <div className='flex items-center'>
          <div className='p-1'>
            <IndeterminateCheckbox
              {...{
                checked: table.getIsAllPageRowsSelected(),
                indeterminate: table.getIsSomePageRowsSelected(),
                onChange: table.getToggleAllPageRowsSelectedHandler(),
              }}
            />
          </div>
          <div className='select-none mt-1 ml-1 text-sm'>
            Select visible rows ({table.getRowModel().rows.length})
          </div>
        </div>

        <div className='flex items-center mt-1 text-sm'>
          <p>
            {Object.keys(rowSelection).length} of{' '}
            {table.getPreFilteredRowModel().rows.length} Items Selected
          </p>
        </div>
      </div>

      <div className='w-full mt-2 mb-4 flex flex-col md:flex-row items-start lg:items-center justify-between gap-2'>
        <div className='w-full flex flex-wrap items-center justify-start gap-2'>
          <button
            className='w-6 h-7 flex items-center justify-center hover:text-primary disabled:hover:text-white focus-visible:ring-2 focus-visible:ring-primary focus:outline-none rounded disabled:opacity-20'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <IconChevronsLeft />
          </button>
          <button
            className='w-6 h-7 flex items-center justify-center hover:text-primary disabled:hover:text-white focus-visible:ring-2 focus-visible:ring-primary focus:outline-none rounded disabled:opacity-20'
            onClick={() => {
              const index = table.getState().pagination.pageIndex

              // users can manually type numbers higher than the max page count.
              // let the arrow bring them back to reality.
              if (index > table.getPageCount()) {
                table.setPageIndex(table.getPageCount() - 1)
              } else {
                table.previousPage()
              }
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <IconChevronLeft />
          </button>
          <button
            className='w-6 h-7 flex items-center justify-center hover:text-primary disabled:hover:text-white focus-visible:ring-2 focus-visible:ring-primary focus:outline-none rounded disabled:opacity-20'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <IconChevronRight />
          </button>
          <button
            className='w-6 h-7 flex items-center justify-center hover:text-primary disabled:hover:text-white focus-visible:ring-2 focus-visible:ring-primary focus:outline-none rounded disabled:opacity-20'
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <IconChevronsRight />
          </button>
          <span className='flex items-center gap-1 whitespace-nowrap'>
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1 < table.getPageCount()
                ? table.getState().pagination.pageIndex + 1
                : table.getPageCount()}{' '}
              of {table.getPageCount()}
            </strong>
          </span>
          <span className='flex items-center gap-1 whitespace-nowrap'>
            | Go to page:
            <input
              type='number'
              min='1'
              max={table.getPageCount()}
              value={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                table.setPageIndex(page)
              }}
              className='w-20 bg-transparent p-2 border-2 border-jumbo-150 dark:border-jumbo-400 px-2 py-2 focus:outline focus:border-primary focus-within:outline focus-within:outline-2 focus-within:outline-primary outline-offset-2'
            />
          </span>
          <Select
            options={[5, 10, 25, 50, 100, 250].map((item) => ({
              label: `Show ${item}`,
              selected: item == table.getState().pagination.pageSize,
              value: item,
            }))}
            setSelected={(value) => table.setPageSize(Number(value))}
          />
        </div>

        <div className='w-full flex justify-end'>
          <Button
            type='primary'
            ariaLabel='Confirm content selection'
            onClick={handleConfirmSelection}
          >
            Confirm Selection
          </Button>
        </div>
      </div>

      <TableSettingsModal
        isOpen={settingsModalIsOpen}
        setIsOpen={setSettingsModalIsOpen}
      >
        <div className='mb-4'>
          <label className='cursor-pointer select-none'>
            <input
              type='checkbox'
              checked={isWrapText}
              onChange={() => setIsWrapText(!isWrapText)}
              className='table-checkbox mr-2 mb-1'
            />
            Wrap Text
          </label>
        </div>

        <div className='mb-4'>
          <h3 className='text-xl font-bold mb-2'>Field visibility</h3>
          <div className='pr-1 mb-1'>
            <label className='cursor-pointer select-none'>
              <input
                type='checkbox'
                checked={table.getIsAllColumnsVisible()}
                onChange={table.getToggleAllColumnsVisibilityHandler()}
                className='table-checkbox mr-2 mb-1'
              />
              Toggle All
            </label>
          </div>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
            {Object.keys(columnsAsObject).map((cmsType) => (
              <div key={cmsType}>
                <h4 className='font-semibold mb-1'>{cmsType}</h4>
                <ul className='flex flex-col gap-1'>
                  {columnsAsObject[cmsType].map((column, key) => (
                    <li key={`${key}_${column.id}`}>
                      <label className='cursor-pointer select-none'>
                        <input
                          type='checkbox'
                          checked={column.getIsVisible()}
                          onChange={column.getToggleVisibilityHandler()}
                          className='table-checkbox mr-2 mb-1'
                        />
                        {typeof column.columnDef.header === 'function'
                          ? (column.columnDef as any).header()
                          : column.columnDef.header}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </TableSettingsModal>
    </div>
  )
}
