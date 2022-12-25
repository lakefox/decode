<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>DECODE</title>
</svelte:head>

<nav>
	<ul>
		<li><img id="favicon" src="/favicon.png" alt="Logo" /><strong>DECODE</strong></li>
	</ul>
</nav>

<main>
	{#each data.docs as doc}
		{#if doc.active}
			<article>
				<hgroup>
					<a href="/{doc.slug}">
						<h1>{doc.title}</h1>
					</a>
					<h2>{doc.description}</h2>
				</hgroup>
			</article>
		{/if}
	{/each}
</main>

<style>
	nav > ul > li {
		margin-left: 30px;
		font-size: 30px;
	}
	main {
		width: 90%;
		max-width: 1100px;
		margin: auto;
		display: flex;
		flex-direction: column;
	}
	section > main > img {
		margin-bottom: 20px;
	}
	#favicon {
		height: 25px;
		margin-top: -5px;
		margin-right: 5px;
	}
</style>
