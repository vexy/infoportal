<script lang="ts">
    import Footer from "$lib/components/Footer.svelte";
</script>

<background>
    <slot />
</background>
<Footer />

<style>
    background {
        display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0.5em;

		height: 100vh;
		overflow-y: scroll;

		/* background-image: linear-gradient(to top, #a3bded 0%, #6991c7 100%); */
		background: #667db6;  /* fallback for old browsers */
		background: -webkit-linear-gradient(to top, #667db6, #0082c8, #0082c8, #667db6);  /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(to top, #667db6, #0082c8, #0082c8, #667db6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
	
    @media (min-width: 600px) {
		background {
			/* background-image: linear-gradient(60deg, #64b3f4 0%, #c2e59c 100%); */
			/* background-image: linear-gradient(60deg, #4ca3eb 0%, #dce9ce 100%); */
			/* justify-content: center; */
            background-image: radial-gradient(circle farthest-corner at 10% 20%,  rgba(0,160,187,1) 0%, rgba(0,188,219,0.90) 90% );
		}
	}

	@media (min-width: 280px) {
        /* add if needed  */
	}
</style>