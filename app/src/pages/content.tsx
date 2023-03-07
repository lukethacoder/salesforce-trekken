import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { invoke } from '@tauri-apps/api/tauri'
import toast from 'react-hot-toast'
import he from 'he'

import {
  BackButton,
  ContentTable,
  ErrorMessage,
  Loader,
  OutputModal,
} from '@app/components'
import { useBearStore } from '../state'
import { ColumnDef } from '@tanstack/react-table'
import {
  Content as ContentType,
  ContentExport,
  ContentImageExport,
  ManagedContentType,
} from '../types'
import { ContentNodeType } from '../enums'

type ContentByChannelId = [ContentType[], ManagedContentType[]]

const convertToExport = (
  payload: ContentType[],
  withImages: boolean
): [ContentExport[], ContentImageExport[]] => {
  // tuple of Content to export and CMS Image contentKeys
  const exportRes = payload.reduce<[ContentExport[], ContentImageExport[]]>(
    (acc, item) => {
      const { contentKey, contentUrlName: urlName, type, contentNodes } = item

      // CMS items require their image data to be fetched on the Rust side,
      // save the contentKey in an array for rust to handle later
      if (type === 'cms_image') {
        if (withImages && contentNodes.title && contentNodes.source) {
          const title = contentNodes.title.value
          const fileName = contentNodes.source.fileName
          const altText = contentNodes.altText || {
            value: '',
          }

          acc[1].push({
            contentKey,
            urlName,
            type: 'cms_image',
            body: {
              altText,
              source: {
                ref: fileName,
              },
              title,
            },
          })
        }
        return acc
      }

      const contentExport: ContentExport = {
        contentKey,
        urlName,
        type,
        body: Object.keys(contentNodes).reduce<{
          [key: string]: string | object
        }>((nodes, nodeKey) => {
          const nodeObject = contentNodes[nodeKey]
          const { nodeType } = nodeObject

          switch (nodeType) {
            case ContentNodeType.DateTime:
              nodes[nodeKey] = {
                dateTimeValue: nodeObject.dateTimeValue,
                timeZone: nodeObject.timeZone,
              }
              break
            case ContentNodeType.Media:
              nodes[nodeKey] = {
                ref: nodeObject.contentKey,
              }
              break
            case ContentNodeType.NameField:
            case ContentNodeType.RichText:
            case ContentNodeType.Text:
              nodes[nodeKey] = he.decode(contentNodes[nodeKey].value as string)
              break
            default:
              nodes[nodeKey] = contentNodes[nodeKey].value
              break
          }

          return nodes
        }, {}),
      }
      acc[0].push(contentExport)

      return acc
    },
    [[], []]
  )

  return exportRes
}

export function Content() {
  const [content, setContent] = useState<ContentType[]>()
  const [channelId, setChannelId] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [contentTypes, setContentTypes] = useState<ManagedContentType[]>()
  const [extraColumns, setExtraColumns] = useState<ColumnDef<any>[]>()
  const [errorMessage, setErrorMessage] = useState<string>()
  const [isOutputModalOpen, setIsOutputModalOpen] = useState<boolean>(false)
  const [isLoadingZip, setIsLoadingZip] = useState<boolean>(false)

  const store = useBearStore()
  const params = useParams()

  useEffect(() => {
    if (params.channelId !== channelId) {
      setChannelId(params.channelId)
    }
  }, [params])

  useEffect(() => {
    if (channelId === 'test') {
      setContent([
        {
          contentKey: '12341234',
          contentNodes: {
            Test: {
              value: 'test text value here',
              nodeType: ContentNodeType.Text,
            },
            title: {
              nodeType: ContentNodeType.Text,
              value: 'test',
            },
          },
          contentUrlName: 'test-item',
          language: 'English',
          managedContentId: '12341234',
          publishedDate: '12341234',
          title: '12341234',
          type: 'Article',
          typeLabel: 'Article',
          unauthenticatedUrl: null,
        },
      ])

      setContentTypes([
        {
          label: 'Article',
          name: 'Article',
          nodeTypes: {
            Title: {
              label: 'Title',
              name: 'title',
              nodeType: ContentNodeType.Text,
            },
          },
        },
      ])

      setExtraColumns([
        {
          accessorKey: `title`,
          header: () => `item.label`,
          enableColumnFilter: true,
          enableSorting: false,
          enableResizing: true,
          minSize: 32,
          maxSize: 720,
          cell: (info) => {
            return info.getValue()
          },
          meta: {
            nodeType: 'Text',
            cmsType: 'Article',
          },
        },
      ])

      setIsLoading(false)
    } else if (channelId) {
      fetchContentJSON()
    }
  }, [channelId])

  async function fetchContentJSON() {
    const toastId = toast.loading('Fetching CMS data')

    try {
      const contentMetadata: ContentByChannelId = await invoke(
        'content_all_by_channel_id',
        {
          channelId,
          baseUrl: store.instanceUrl,
          accessToken: store.accessToken,
        }
      )
      setContent(contentMetadata[0])
      setContentTypes(contentMetadata[1])

      console.log('contentMetadata ', contentMetadata[0])

      const extraCols = contentMetadata[1].reduce<ColumnDef<any>[]>(
        (acc, type) => {
          const colsForType = Object.values(type.nodeTypes).reduce<
            ColumnDef<any>[]
          >((accItem, item) => {
            if (item.name !== 'title' && item.name !== 'Title') {
              const enableColumnFilter = !(item.nodeType === 'MediaSource')

              const columnDef: ColumnDef<any> = {
                accessorKey: `${type.name}_${item.name}`,
                header: () => item.label,
                enableColumnFilter,
                enableSorting: item.nodeType !== 'MediaSource',
                enableResizing: true,
                ...(item.nodeType === 'MediaSource' ? { size: 64 } : {}),
                minSize: 32,
                maxSize: 720,
                accessorFn: (originalRow) => {
                  const original = originalRow

                  // handle cms_image source
                  // or non-cms_image item that relates to a cms_image item
                  if (
                    item.nodeType === 'MediaSource' ||
                    item.nodeType === 'Media'
                  ) {
                    return (
                      original.contentNodes[item.name]?.url &&
                      original.contentNodes[item.name]?.url
                    )
                  }
                  return original.contentNodes[item.name]?.value
                },
                cell: (info) => {
                  const { original } = info.row

                  // handle cms_image source
                  // or non-cms_image item that relates to a cms_image item
                  if (
                    item.nodeType === 'MediaSource' ||
                    item.nodeType === 'Media'
                  ) {
                    return (
                      original.contentNodes[item.name]?.url && (
                        <img
                          src={original.contentNodes[item.name]?.url}
                          className='w-full'
                        />
                      )
                    )
                  }

                  return he.decode(original.contentNodes[item.name]?.value)
                },
                meta: {
                  nodeType: item.nodeType,
                  cmsType: type.name,
                },
              }
              accItem.push(columnDef)
            }
            return accItem
          }, [])
          return [...colsForType, ...acc]
        },
        []
      )

      setExtraColumns(extraCols)

      toast.remove(toastId)
    } catch (error) {
      console.error('Error fetching content ', error)

      toast.error('Error fetching content', {
        id: toastId,
      })
      setErrorMessage(
        'Error fetching CMS Content for channel. This may occur if the channel has no data.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleConfirmSelection = async (
    payload: ContentType[],
    withImages = true
  ) => {
    const exportData = convertToExport(payload, withImages)

    store.dispatch({
      type: 'setContent',
      payload: exportData[0],
    })
    store.dispatch({
      type: 'setWithImages',
      payload: withImages,
    })
    if (withImages) {
      store.dispatch({
        type: 'setContentImages',
        payload: exportData[1],
      })
    }

    setIsOutputModalOpen(true)
  }

  return (
    <div>
      <header className='w-full max-w-[1024px] mx-auto px-4 mt-4 mb-8'>
        <div className='mb-4'>
          <BackButton />
        </div>

        <h1 className='text-3xl font-bold'>CMS Content</h1>
        {!isLoading && !errorMessage && (
          <p className='mb-4 text-jumbo-700 dark:text-jumbo-200'>
            Select content for export. Use the settings to show/hide columns.
          </p>
        )}
      </header>

      {isLoadingZip && (
        <div className='z-[10] top-0 left-0 fixed h-full w-full'>
          <Loader />
        </div>
      )}
      {isLoading ? (
        <ul className='flex flex-col gap-2 px-2'>
          {[...Array(10).keys()].map((item) => (
            <li key={item} className='skeleton w-full h-10'></li>
          ))}
        </ul>
      ) : errorMessage ? (
        <div className='w-full max-w-[1024px] mx-auto px-2'>
          <ErrorMessage>{errorMessage}</ErrorMessage>
        </div>
      ) : (
        content &&
        extraColumns &&
        contentTypes && (
          <ContentTable
            data={content}
            extraColumns={extraColumns}
            contentTypes={contentTypes}
            confirmSelection={handleConfirmSelection}
          />
        )
      )}

      <OutputModal
        isOpen={isOutputModalOpen && !isLoadingZip}
        setIsOpen={setIsOutputModalOpen}
        onIsLoading={(isLoadingZipValue) => setIsLoadingZip(isLoadingZipValue)}
      />
    </div>
  )
}
