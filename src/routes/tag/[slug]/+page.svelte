<script>
	/** @type {import('./$types').PageData} */
	export let data;
	let search = '';
</script>

<svelte:head>
	<title>DECODE</title>
	<meta
		name="description"
		content="Welcome to DECODE, a website featuring high quality tutorials on programming and other topics. Our goal is to help you learn and grow in your field, whether you're a beginner or an experienced developer. Our tutorials are carefully crafted to provide you with the knowledge and skills you need to succeed. Explore our diverse range of topics and start learning today!"
	/>
</svelte:head>

<nav>
	<ul>
		<li>
			<img id="favicon" src="/favicon.png" alt="Logo" /><a href="/"><strong>DECODE</strong></a>
		</li>
	</ul>
</nav>

<main>
	<div>
		<h1 id="title">{data.tag}</h1>
		{#each data.docs as doc}
			<article>
				{#if doc.images.length > 0}
					<img
						class="prevImgTop"
						src={doc.images[0].url}
						alt={doc.images[0].name}
						title={doc.images[0].name}
						loading="lazy"
					/>
				{/if}
				<hgroup>
					<a href="/{doc.slug}">
						{#if doc.images.length > 0}
							<img
								class="prevImgSide"
								src={doc.images[0].url + '?thumb=100x100'}
								alt={doc.images[0].name}
								title={doc.images[0].name}
								loading="lazy"
							/>
						{/if}
						<h1>
							{doc.title}
						</h1>
					</a>
					{#if doc.description.length > 200}
						<h2>{doc.description.slice(0, -100)}...</h2>
					{:else}
						<h2>{doc.description}</h2>
					{/if}
				</hgroup>
				<div class="timestamp">
					{doc.timestamp}
				</div>
			</article>
		{/each}
	</div>
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
	#favicon {
		height: 25px;
		margin-top: -5px;
		margin-right: 5px;
	}
	.prevImgSide {
		width: 100px;
		border-radius: 10px;
		margin-right: 20px;
	}
	.prevImgTop {
		display: none;
	}
	a {
		display: flex;
		align-items: center;
	}
	@media only screen and (max-width: 700px) {
		.prevImgSide {
			display: none;
		}
		.prevImgTop {
			display: block;
			width: 100%;
			border-radius: 10px;
			margin-right: 20px;
			margin-bottom: 15px;
		}
	}
	.timestamp {
		text-align: right;
		color: var(--muted-color);
	}
	#title {
		text-transform: uppercase;
	}
	a {
		color: #fff !important;
	}
</style>
