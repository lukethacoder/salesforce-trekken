<script>
  import { page } from '$app/stores'
  import '../app.css'

  const DOMAIN = 'trekken.lukesecomb.digital';
  const BASE_URL = `https://${DOMAIN}`;
  const SEO_DESCRIPTION = 'Salesforce CMS Migration Tool with a focus on user experience and ease of use.'
  const SEO_OPEN_GRAPH_IMAGE = `${BASE_URL}/thumbnail.png`  
</script>

<svelte:head>
  <meta name="description" content={SEO_DESCRIPTION}>

  <!-- Facebook Meta Tags -->
  <meta property="og:url" content={BASE_URL} />
  <meta property="og:type" content="website" />
  <meta property="og:description" content={SEO_DESCRIPTION} />
  <meta property="og:image" content={SEO_OPEN_GRAPH_IMAGE} />
  <meta property='og:image:width' content='1200' />
  <meta property='og:image:height' content='620' />
  <meta property='og:image:alt'content='Logo for Salesforce Trekken' />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:description" content={SEO_DESCRIPTION}>
  <meta name="twitter:image" content={SEO_OPEN_GRAPH_IMAGE}>
  <meta property="twitter:domain" content={DOMAIN}>
  <meta property="twitter:url" content={BASE_URL}>
  <meta property='twitter:widgets:new-embed-design' content='on' />

  <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet">

  <script data-goatcounter="https://salesforce-trekken.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-N1V44LXT7Q"></script>

  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'G-N1V44LXT7Q');
  </script>
</svelte:head>

<header
  class="w-full mx-auto flex max-w-5xl items-center py-4 px-6 text-base sm:justify-between"
>
  <a href="/" class="sm:w-32 py-2 flex items-center">
    <img src='/logo.png' alt="Salesforce Trekken logo" class="w-8 flex"/>
    <h1 class="whitespace-nowrap text-white font-medium ml-2">Salesforce Trekken</h1>
  </a>
  <nav class="mx-2">
    <a
      class:active={$page.url.pathname == '/'}
      href="/"
      class="ease-md mx-2 py-2 text-sm transition-colors duration-200 text-gray-500 hover:text-white font-medium sm:text-base"
    >
      Home
    </a>
    <a
      class:active={$page.url.pathname == '/changelog'}
      href="/changelog"
      class="ease-md mx-2 py-2 text-sm transition-colors duration-200 text-gray-500 hover:text-white font-medium sm:text-base"
    >
      Changelog
    </a>
  </nav>
  <div class="ml-auto flex justify-end sm:ml-0 sm:w-32">
    <a href="https://github.com/lukethacoder/salesforce-trekken" target="_blank" rel="noreferrer">
      <svg height="24" width="24" viewBox="-2 -2 28 28" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
          fill="none"
          stroke="#ffffff"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
      </svg>
    </a>
  </div>
</header>

<main class="overflow-hidden">
  <slot />
  
  <div class="w-full flex justify-center z-0 opacity-90 absolute left-0 top-20">
    <span
      style="filter: blur(240px);"
      class="flex w-[720px] h-[720px] bg-gradient-to-b from-black to-primary rounded-full"
    />
  </div>
</main>

<footer class="bg-black relative z-50 py-8 flex items-center justify-center">
  <a
    href="/about"
    class:active={$page.url.pathname == '/about'}
    class="ease-md mx-4 py-2 text-sm transition-colors duration-200 text-gray-500 hover:text-white font-medium sm:text-base"
  >
    About
  </a>
  <a
    href="/license"
    class:active={$page.url.pathname == '/license'}
    class="ease-md mx-4 py-2 text-sm transition-colors duration-200 text-gray-500 hover:text-white font-medium sm:text-base"
  >
    License
  </a>
</footer>