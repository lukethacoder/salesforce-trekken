import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { ContentExport, ContentImageExport } from './types'

interface BearState {
  orgs: string[]
  accessToken: string | null
  instanceUrl: string | null
  channels: string[]
  channelId: string | null
  contentZipFile?: string | null
  imageZipFile?: string | null
  content: ContentExport[]
  contentImages: ContentImageExport[]
  withImages: boolean
  outputFolder?: string
  rowSelection?: { [key: number]: boolean }
  dispatch: (args: ReducerInput) => void
}

const types = {
  reset: 'reset',
  setAccessToken: 'setAccessToken',
  setInstanceUrl: 'setInstanceUrl',
  setChannelId: 'setChannelId',
  setContentZipFile: 'setContentZipFile',
  setImageZipFile: 'setImageZipFile',
  setRowSelection: 'setRowSelection',
  setContent: 'setContent',
  setContentImages: 'setContentImages',
  setWithImages: 'setWithImages',
  setOutputFolder: 'setOutputFolder',
}

interface ReducerInput {
  type: string
  payload: any
}

const DEFAULT_STATE = {
  orgs: [],
  channels: [],
  accessToken: null,
  instanceUrl: null,
  channelId: null,
  withImages: false,
  content: [],
  rowSelection: {},
  contentImages: [],
  outputFolder: '',
}

const reducer = (state: any, { type, payload }: ReducerInput) => {
  switch (type) {
    case types.reset:
      return {
        ...state,
        ...DEFAULT_STATE,
      }
    case types.setAccessToken:
      return { ...state, accessToken: payload }
    case types.setInstanceUrl:
      return { ...state, instanceUrl: payload }
    case types.setChannelId:
      return { ...state, channelId: payload }
    case types.setContentZipFile:
      return { ...state, contentZipFile: payload }
    case types.setImageZipFile:
      return { ...state, imageZipFile: payload }
    case types.setRowSelection:
      return { ...state, rowSelection: payload }
    case types.setContent:
      return { ...state, content: payload }
    case types.setContentImages:
      return { ...state, contentImages: payload }
    case types.setWithImages:
      return { ...state, withImages: payload }
    case types.setOutputFolder:
      return { ...state, outputFolder: payload }
  }
}

export const useBearStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        ...DEFAULT_STATE,
        dispatch: (payload) => set((state) => reducer(state, payload)),
      }),
      {
        name: 'bear-storage',
      }
    )
  )
)
