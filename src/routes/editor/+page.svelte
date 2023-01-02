<script>
	import SvelteMarkdown from 'svelte-markdown';
	import PocketBase from '/node_modules/pocketbase/dist/pocketbase.es.mjs';
	import { browser } from '$app/environment';
	import autosize from 'svelte-autosize';
	import urlSlug from 'url-slug';

	const pb = new PocketBase('https://api.decode.sh/');
	let user = {};
	let docs = [
		{
			title: 'Title',
			description: 'Description',
			content: ''
		}
	];

	let showEditor = true;
	let buttonText = 'Article';
	let docIndex = 0;
	let update = 0;

	if (browser) {
		pb.collection('users')
			.authWithPassword(localStorage.email, localStorage.password)
			.then(async (e) => {
				user = e.record;
				getPosts();
			})
			.catch(() => {
				window.location.pathname = '/login';
			});
	}

	function tab(e) {
		if (e.key == 'Tab') {
			e.preventDefault();
			const textArea = e.currentTarget;
			textArea.setRangeText('\t', textArea.selectionStart, textArea.selectionEnd, 'end');
		}
	}
	function save() {
		let doc = {
			title: docs[docIndex].title,
			content: docs[docIndex].content,
			description: docs[docIndex].description,
			author: docs[docIndex].author,
			active: docs[docIndex].active,
			slug: docs[docIndex].slug
		};
		pb.collection('posts').update(docs[docIndex].id, doc);
	}
	function add() {
		let doc = {
			title: 'Title',
			description: 'Description',
			content: 'Content',
			author: user.id,
			active: false
		};
		pb.collection('posts')
			.create(doc)
			.then(async (e) => {
				await getPosts();
				docIndex = docs.length - 1;
				update++;
			});
	}
	function deletePost() {
		pb.collection('posts')
			.delete(docs[docIndex].id)
			.then(async () => {
				docIndex = 0;
				await getPosts();
				update++;
			});
	}

	async function getPosts(e) {
		const resultList = await pb.collection('posts').getList(1, 50, {
			filter: `author = "${user.id}"`
		});
		docs = resultList.items.map((a) => {
			return {
				title: a.title,
				description: a.description,
				content: a.content,
				id: a.id,
				active: a.active,
				slug: a.slug
			};
		});
	}

	function publish() {
		docs[docIndex].active = !docs[docIndex].active;
		save();
	}

	$: docs[docIndex].slug = urlSlug(docs[docIndex].title);
</script>

<svelte:head>
	<title>DECODE Editor</title>
</svelte:head>

<nav>
	<ul>
		<li>
			<img id="favicon" src="/favicon.png" alt="Logo" /><strong><a href="/">DECODE</a></strong>
		</li>
	</ul>
</nav>

<body>
	<main>
		{#key update}
			<div class="sticky">
				<div id="selector">
					<select bind:value={docIndex}>
						{#each docs as d, i}
							<option value={i}>{d.title}</option>
						{/each}
					</select>
					<button class="blue fitW" on:click={add}> New </button>
					{#if docs[docIndex].active}
						<button class="fitW" style="background: center;" on:click={publish}>Unpublish</button>
					{:else}
						<button class="fitW" on:click={publish}>Publish</button>
					{/if}
					<button class="red fitW" on:click={deletePost}>Delete</button>
				</div>
			</div>
			<div class="sticky wM320">
				<div id="buttonCont">
					<input type="text" bind:value={docs[docIndex].slug} on:keyup={save} />
					<button
						on:click={() => {
							showEditor = !showEditor;
							buttonText = showEditor ? 'Article' : 'Editor';
						}}>View {buttonText}</button
					>
				</div>
			</div>
			<div class="content">
				<hgroup>
					<h1
						contenteditable="true"
						id="title"
						on:keyup={save}
						bind:innerHTML={docs[docIndex].title}
					>
						Title
					</h1>
					<h2
						contenteditable="true"
						id="sub-title"
						on:keyup={save}
						bind:innerHTML={docs[docIndex].description}
					>
						Description
					</h2>
				</hgroup>
				<div id="editorCont">
					{#if showEditor}
						<textarea
							use:autosize
							bind:value={docs[docIndex].content}
							cols="30"
							rows="50"
							on:keydown={tab}
							on:keyup={save}
						/>
					{:else}
						<SvelteMarkdown source={docs[docIndex].content} />
					{/if}
				</div>
			</div>
		{/key}
	</main>
</body>

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
		flex-wrap: wrap;
	}
	#title {
		margin-bottom: 10px;
	}
	#editorCont {
		min-height: 632px;
	}
	div > button {
		width: 200px;
	}
	#buttonCont {
		display: flex;
		justify-content: flex-end;
		width: 100%;
	}
	#selector {
		display: flex;
		flex-direction: column;
		width: 300px;
		margin-right: 20px;
	}
	.red {
		background: #dc3a3a;
		border-color: #dc3a3a;
	}
	.blue {
		background: #3500ff;
		border-color: #3500ff;
	}
	.fitW {
		width: 100% !important;
	}
	a {
		color: #fff !important;
	}
	#favicon {
		height: 25px;
		margin-top: -5px;
		margin-right: 5px;
	}
	.sticky {
		position: -webkit-sticky;
		position: sticky;
		top: 10px;
		height: min-content;
	}
	.content {
		margin-left: 320px;
		margin-top: -250px;
		width: 100%;
		max-width: 780px;
	}
	.wM320 {
		width: calc(100% - 320px);
	}
</style>
