<script>
	import SvelteMarkdown from 'svelte-markdown';
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>DECODE - {data.title}</title>
	<meta name="description" content={data.description} />
	<meta name="keywords" content={data.slug.split('-').join(' ')} />
</svelte:head>

<nav>
	<ul>
		<li>
			<img id="favicon" src="/favicon.png" alt="Logo" /><strong><a href="/">DECODE</a></strong>
		</li>
	</ul>
</nav>

<main>
	<hgroup>
		<h1 id="title">
			{data.title}
		</h1>
		<h2 id="sub-title">{data.description}</h2>
	</hgroup>
	<div id="editorCont">
		<SvelteMarkdown source={data.content} />
	</div>
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
	section > main > img {
		margin-bottom: 20px;
	}
	#title {
		margin-bottom: 10px;
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
