import * as tanstackTableCore from '@tanstack/table-core'
import { ContentNodeType } from './enums'

declare module '@tanstack/table-core' {
  interface TableMeta<TData extends RowData> {
    nodeType: null | string
    cmsType: null | string
    lastSelectedId: null | string
  }
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
  interface ColumnMeta<any, any> {
    cmsType: string
  }
}

type Content = {
  contentKey: string
  contentNodes: {
    [key: string]: {
      [key: string]: string | object
      nodeType: ContentNodeType
    }
    altText?: string
    source?: {
      fileName: string
      is_external: boolean
      mediaType: string
      mimeType: string
      nodeType: string
      referenceId: string
      resourceUrl: string
      unauthenticatedUrl: string
      url: string
    }
    title?: {
      nodeType: string
      value: string
    }
  }
  contentUrlName: string
  language: string
  managedContentId: string
  publishedDate: string
  title: string | null
  type: string
  typeLabel: string
  unauthenticatedUrl: string | null
}

type ManagedContentType = {
  label: string
  name: string
  nodeTypes: {
    [key: string]: {
      label: string
      name: string
      nodeType: string
    }
  }
}

type Org = {
  accessToken: string
  clientId: string
  created: string
  createdOrgInstance: string
  devHubUsername: string
  expirationDate: string
  instanceApiVersion: string
  instanceApiVersionLastRetrieved: string
  instanceUrl: string
  isDevHub: boolean
  loginUrl: string
  orgId: string
  refreshToken: string
  username: string
}

type Channel = {
  channelId: string
  channelName: string
  channelType: string
  domain: string | null
  domainName: string | null
  isChannelSearchable: boolean
  isDomainLocked: boolean
}

type SfdxDisplay = {
  id: string
  clientId: string
  accessToken: string
  alias: string
  connectedStatus: string
  status: string
  instanceUrl: string
  username: string
}

// Export Schema
// handled here in TS instead of Rust as we already have all the JSON data
// might as well send back the smallest payload we need to Rust

type ContentExport = {
  contentKey: string
  urlName: string
  type: string
  body: {
    [key: string]: string | object
  }
}

type ContentImageExport = {
  contentKey: string
  urlName: string
  type: string
  body: {
    altText?: string
    source: {
      ref: string
    }
    title: string
  }
}
