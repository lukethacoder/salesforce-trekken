import { useRef } from 'react'
import ReactSelect from 'react-select'
import {
  Options,
  ActionMeta,
  SelectInstance,
} from 'react-select/dist/declarations/src'

type Option = {
  label: string
  value: string | number
}

export function Select({
  options,
  setSelected,
}: {
  options: Options<Option>
  setSelected: (value: string | number) => void
}) {
  const selectRef = useRef<SelectInstance<Option> | null>(null)

  const handleOnChange = (
    option: Option | null,
    actionMeta: ActionMeta<Option>
  ) => {
    if (setSelected && option && actionMeta.action === 'select-option') {
      setSelected(option.value)
    }
  }

  return (
    <ReactSelect
      ref={selectRef}
      unstyled
      onChange={handleOnChange}
      menuPlacement='auto'
      classNames={{
        control: (state) => {
          const baseClasses = 'min-h-[44px] w-full'
          const { menuIsOpen, isFocused } = state
          if (menuIsOpen) {
            return `${baseClasses} focus:outline focus-within:outline focus-within:outline-2 focus-within:outline-primary outline-offset-2`
          }
          if (isFocused) {
            return `${baseClasses} overflow-visible outline outline-2 outline-primary outline-offset-2`
          }
          return `${baseClasses} border-primary`
        },
        valueContainer: () => `px-2`,
        container: (state) => {
          const { isFocused } = state
          const baseClasses =
            'min-h-[44px] flex items-center ring-2 ring-inset ring-jumbo-150 dark:ring-jumbo-400'

          if (isFocused) {
            return `${baseClasses} overflow-visible outline outline-2 outline-primary outline-offset-2`
          }
          return `${baseClasses}`
        },
        option: (state) => {
          const { isFocused, isSelected } = state
          const baseClasses = 'px-2 py-2'

          if (isFocused) {
            return `${baseClasses} text-white bg-primary-600 dark:bg-primary-700 ${
              isSelected ? 'font-bold' : ''
            }`
          }
          if (isSelected) {
            return `${baseClasses} text-white bg-primary font-bold`
          }

          return baseClasses
        },
        indicatorsContainer: () => `pr-2`,
        menu: () => {
          // TODO: fix once we get an answer for
          // https://github.com/JedWatson/react-select/discussions/4872
          // const borderPosition =
          //   state.selectProps.menuPlacement === 'top'
          //     ? 'border-t-2'
          //     : 'border-b-2'

          return `bg-white dark:bg-jumbo-800 text-jumbo-900 dark:text-white border-y-2 border-x-2 border-jumbo-150 dark:border-jumbo-400`
        },
      }}
      options={options}
    />
  )
}
