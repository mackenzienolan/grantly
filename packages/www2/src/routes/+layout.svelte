<script lang="ts">
	import { ClerkProvider } from 'svelte-clerk';
	import '../app.css';
	let { children } = $props();
</script>

<ClerkProvider>
  {@render children()}
</ClerkProvider>
