<script>
	import PocketBase from '/node_modules/pocketbase/dist/pocketbase.es.mjs';
	import { browser } from '$app/environment';
	const pb = new PocketBase('https://api.decode.sh/');
	let user = {};
	let assets = [];
	let search = '';
	let name = '';
	if (browser) {
		pb.collection('users')
			.authWithPassword(localStorage.email, localStorage.password)
			.then(async (e) => {
				user = e.record;
				await getImages();
			})
			.catch((e) => {
				window.location.pathname = '/login';
			});
	}

	async function getImages() {
		let res = await pb.collection('assets').getList(1, 50, {
			filter: `author = "${user.id}"`
		});
		assets = res.items;
	}
	function upload() {
		const formData = new FormData();

		const fileInput = document.querySelector('#file');

		// listen to file input changes and add the selected files to the form data
		for (let file of fileInput.files) {
			formData.append('file', file);
		}

		// set some other regular text field value
		formData.append('author', user.id);
		formData.append('name', name);
		name = '';
		document.querySelector('#file').value = '';
		pb.collection('assets')
			.create(formData)
			.then(getImages)
			.catch((e) => {
				console.log(e);
			});
	}
</script>

<svelte:head>
	<title>DECODE Upload</title>
</svelte:head>

<nav>
	<ul>
		<li>
			<img id="favicon" src="/favicon.png" alt="Logo" /><strong><a href="/">DECODE</a></strong>
		</li>
	</ul>
</nav>

<main>
	<article>
		<!-- Search -->
		<input type="search" id="search" name="search" bind:value={search} placeholder="Search" />
		<div class="pbh">
			<div class="pb" />
			or
			<div class="pb" />
		</div>
		<div id="uploader">
			<!-- File browser -->
			<label for="file"
				>Upload
				<input type="file" id="file" name="file" />
			</label>
			<label for="name">
				File Name
				<input
					type="text"
					id="name"
					name="name"
					placeholder="File Name"
					bind:value={name}
					required
				/>
			</label>
		</div>
		<button on:click={upload}>Upload</button>
	</article>
	<article id="images">
		{#each assets as asset}
			{#if search == '' || asset.name.toLowerCase().indexOf(search.toLowerCase()) > -1}
				<div class="imgCont">
					<img
						src="/assets/{asset.collectionId}/{asset.id}/{asset.file}"
						alt={asset.name}
						title={asset.name}
					/>
				</div>
			{/if}
		{/each}
	</article>
</main>

<style>
	nav > ul > li {
		margin-left: 30px;
		font-size: 30px;
	}
	main {
		width: 90%;
		max-width: 700px;
		margin: auto;
		display: flex;
		flex-direction: column;
	}
	#images {
		display: flex;
		flex-wrap: wrap;
	}
	.imgCont {
		margin-bottom: 20px;
		width: 45%;
		margin: 2.5%;
		display: flex;
		align-items: center;
	}
	a {
		color: #fff !important;
	}
	#favicon {
		height: 25px;
		margin-top: -5px;
		margin-right: 5px;
	}
	#uploader {
		display: flex;
	}
	.pb {
		width: 46%;
		height: 5px;
		background: var(--muted-color);
		margin-top: 13px;
		border-radius: 10px;
	}
	.pbh {
		display: flex;
		justify-content: space-evenly;
		color: var(--muted-color);
	}
</style>
