<script>
	import { Builder } from '$lib/components';
	let edit = true;
	function preview() {
		edit = !edit;
	}
</script>

<svelte:head>
	<title>DECODE - Build</title>
</svelte:head>

<nav>
	<ul>
		<li>
			<img id="favicon" src="/favicon.png" alt="Logo" /><strong><a href="/">DECODE</a></strong>
		</li>
	</ul>
</nav>

<main>
	<button on:click={preview}>Edit</button>
	<Builder {edit} />
</main>

<style>
	nav > ul > li {
		margin-left: 30px;
		font-size: 30px;
		margin-bottom: 100px;
	}
	main {
		width: 90%;
		max-width: 900px;
		margin: auto;
		display: flex;
		flex-direction: column;
		margin-bottom: 200px;
	}
	a {
		color: #fff !important;
	}
	#favicon {
		height: 25px;
		margin-top: -5px;
		margin-right: 5px;
	}
</style>
