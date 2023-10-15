<script lang="ts">
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";
</script>

<Header />
<main>
	<slot />
</main>
<Footer />

<style>
    main {
		display: flex;
		flex-direction: column;
		/* justify-content: stretch; */

		/* position: absolute; */
		/* width: 100vw;  */
		height: 100vh;
		overflow-y: scroll;

		/* background-image: linear-gradient(to top, #a3bded 0%, #6991c7 100%); */
		background: #667db6;  /* fallback for old browsers */
		background: -webkit-linear-gradient(to top, #667db6, #0082c8, #0082c8, #667db6);  /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(to top, #667db6, #0082c8, #0082c8, #667db6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	}


	@media (min-width: 640px) {
		main {
			/* background-image: linear-gradient(60deg, #64b3f4 0%, #c2e59c 100%); */
			background-image: linear-gradient(60deg, #4ca3eb 0%, #dce9ce 100%);
			max-width: none;
			max-height: none;
		}
	}

	@media (min-width: 280px) {
		main {
			max-width: none;
			max-height: none;
		}
	}
</style>
