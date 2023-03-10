/** @type {import('./$types').PageLoad} */
export function load() {
  return {
    changelog: CHANGELOG,
  }
}

type ChangeLogItem = {
  title: string
  date: string
  version: string
  items: {
    [key: string]: string[]
  }
}

/**
 * NOTE: version here should relate to a git tag
 * https://github.com/lukethacoder/salesforce-trekken/releases/tag/{TAG_HERE}
 */
const CHANGELOG: ChangeLogItem[] = [
  {
    title: '',
    date: '2023-03-08',
    version: 'v0.1.1',
    items: {
      '✨ Features': ['Minor UI updates'],
      '🐛 Bug fixes': [
        'Fix RichText HTML Markup migration',
        'Fix Text escaping',
        'Fix org search box disappears when no results found after inputting text',
      ],
    },
  },
  {
    title: 'MVP',
    date: '2022-12-30',
    version: 'v0.1.0',
    items: {
      '✨ Features': [
        'SFDX CLI Authentication',
        'Access Token Authentication',
        'Opt-in include Images',
        'CMS Type Filter',
        'Global String Filter',
        'Column Sorting',
      ],
      // '🐛 Bugfixes': ['Initial release'],
    },
  },
]
