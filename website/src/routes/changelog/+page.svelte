<script lang="ts">
  import Banner from '../../components/Banner.svelte'
  import type { PageData } from './$types'

  export let data: PageData

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)

    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Australia/Sydney',
    }).format(date)
  }
</script>

<title>Changelog | Salesforce Trekken</title>

<Banner title="Changelog" />

<div class="bg-black relative z-20 pt-20 min-h-[60vh]">
  <div class="w-full mx-auto max-w-5xl px-4">
    <div class="text-white">
      {#each data.changelog as release}
        <section class="md:flex">
          <h2 class="pl-7 text-sm leading-6 text-gray-500 md:w-1/4 md:pl-0 md:pr-12 md:text-right">
            {formatDate(release.date)}
          </h2>
          <div class="relative pt-2 pl-7 pb-16 md:w-3/4 md:pt-0 md:pl-12">
            <span class="absolute bottom-0 left-0 -top-6 w-px bg-gray-200 md:top-0" />
            <span
              class="absolute -top-[1.0625rem] -left-1 h-[0.5625rem] w-[0.5625rem] rounded-full border-2 border-gray-300 bg-gray-900 md:top-[0.4375rem]"
            />

            <h2 class="text-2xl font-semibold mb-4">
              {release.version}{#if release.title}: {release.title}{/if}
            </h2>
            {#each Object.keys(release.items) as item}
              <p class="mb-3 font-semibold">{item}</p>
              <ul class="mb-6 ml-2">
                {#each release.items[item] as dot}
                  <li class="list-disc list-inside text-sm mb-1">{dot}</li>
                {/each}
              </ul>
            {/each}
          </div>
        </section>
      {/each}
    </div>
  </div>
</div>
