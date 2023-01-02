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

const CHANGELOG: ChangeLogItem[] = [
  {
    title: 'MVP',
    date: '2022-12-30',
    version: '0.1.0',
    items: {
      '✨ Features': [
        'SFDX CLI Authentication',
        'Access Token Authentication',
        'Opt-in include Images',
        'CMS Type Filter',
        'Global String Filter',
      ],
      // '🐛 Bugfixes': ['Initial release'],
    },
  },
]
