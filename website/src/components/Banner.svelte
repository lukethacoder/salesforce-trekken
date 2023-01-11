<script lang="ts">
	export let title = ""
</script>

<svelte:head>
  <title>{title} | Salesforce Trekken</title>
  <meta property="og:title" content={`${title} | Salesforce Trekken`} />
  <meta name="twitter:title" content={`${title} | Salesforce Trekken`}>
</svelte:head>

<header class="w-full text-center relative before:top-full before:h-24 before:absolute before:left-0 before:w-full md:before:bg-black before:z-10">
  <h1 class="text-5xl text-white font-semibold pt-32 pb-24 relative z-20">
    {title}
  </h1>
</header>