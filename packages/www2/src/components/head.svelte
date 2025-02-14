<script lang="ts">
  let { title, description = "Grantly", image = "/logo_transparent.png" } = $props();
</script>

<svelte:head>
  <title>{title}</title>
  <meta charset="utf-8" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <meta name="viewport" content="width=device-width" />
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Grantly" />
</svelte:head>