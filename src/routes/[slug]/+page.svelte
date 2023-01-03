<script>
	import SvelteMarkdown from 'svelte-markdown';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	/** @type {import('./$types').PageData} */
	export let data;
	let images = (
		data.content.match(/!\[[^\]]*\]\((?<filename>.*?)(?=\"|\))(?<optionalpart>\".*\")?\)/g) || []
	).map((e) => {
		let a = e.slice(2, -1).split('](');
		return { name: a[0], url: a[1] };
	});

	let assignedVars = {};
	let assignedHidden = {};
	let assignedItterators = {};

	function parseInputs(content) {
		// itters
		content = content
			.replace(/\#\[[a-zA-Z0-9\.\s]+\]\{[a-zA-Z0-9\.\s\,]+\}/g, (e) => {
				let vars = e.slice(2, -1).split(']{');
				assignedItterators[vars[0]] = {
					value: 1,
					params: vars[1].split(',')
				};
				return `<input type="number" data-name="${vars[0]}" onchange="fillVars(this)" value="${
					assignedItterators[vars[0]].value
				}">`;
			})
			.replace(/\#\{[a-zA-Z0-9\.\s]+\}[\s\S]+\#\{\/[a-zA-Z0-9\.\s]+\}/g, (e) => {
				let name = e.slice(2, e.indexOf('}'));
				let cont = e.slice(3 + name.length, -4 - name.length);
				let text = '';
				for (let i = 0; i < assignedItterators[name].value; i++) {
					if (assignedItterators[name].params.length > 1) {
						cont = cont.replaceAll(`#{${assignedItterators[name].params[1].trim()}}`, i);
					}
					text += cont.replaceAll(
						`#{${assignedItterators[name].params[0].trim()}}`,
						assignedItterators[name].value
					);
				}
				return text;
			});
		// hidden
		content = content
			.replace(/\!\[[a-zA-Z0-9\.\s]+\]\{[a-zA-Z0-9\.\s]+\}/g, (e) => {
				let vars = e.slice(2, -1).split(']{');
				if (vars[1] == 'true') {
					assignedHidden[vars[0]] = true;
				} else {
					assignedHidden[vars[0]] = false;
				}
				return `<input type="checkbox" data-name="${
					vars[0]
				}" onchange="fillVars(this)" id="switch" name="switch" role="switch" ${
					assignedHidden[vars[0]] ? 'checked' : ''
				}>`;
			})
			.replace(/\!\{[a-zA-Z0-9\.\s]+\}[\s\S]+\!\{\/[a-zA-Z0-9\.\s]+\}/g, (e) => {
				let name = e.slice(2, e.indexOf('}'));
				if (assignedHidden[name]) {
					return e.slice(3 + name.length, -4 - name.length);
				} else {
					return '';
				}
			});
		// vars
		content = content
			.replace(/\@\[[a-zA-Z0-9\.\s]+\]\{[a-zA-Z0-9\.\s]+\}/g, (e) => {
				let vars = e.slice(2, -1).split(']{');
				assignedVars[vars[0]] = vars[1];
				return `<input type="text" data-name="${vars[0]}" onkeyup="fillVars(this)" value="${vars[1]}">`;
			})
			.replace(/\$\{[a-zA-Z0-9\.\s]+\}/g, (e) => {
				return assignedVars[e.slice(2, -1)];
			});
		return content;
	}

	let contentCopy = parseInputs(data.content);

	if (browser) {
		window.fillVars = (e) => {
			if (e.type == 'text') {
				assignedVars[e.dataset.name] = e.value;
			} else if (e.type == 'checkbox') {
				assignedHidden[e.dataset.name] = e.checked;
			} else if (e.type == 'number') {
				assignedItterators[e.dataset.name].value = parseInt(e.value);
			}
			contentCopy = data.content
				.replace(/\#\{[a-zA-Z0-9\.\s]+\}[\s\S]+\#\{\/[a-zA-Z0-9\.\s]+\}/g, (e) => {
					let name = e.slice(2, e.indexOf('}'));
					let cont = e.slice(3 + name.length, -4 - name.length);
					let text = '';
					for (let i = 0; i < assignedItterators[name].value; i++) {
						let contCopy = cont.toString();
						if (assignedItterators[name].params.length > 1) {
							contCopy = contCopy.replaceAll(
								`#{${assignedItterators[name].params[1].trim()}}`,
								i.toString()
							);
						}
						text += contCopy.replaceAll(
							`#{${assignedItterators[name].params[0].trim()}}`,
							assignedItterators[name].value
						);
					}
					return text;
				})
				.replace(/\#\[[a-zA-Z0-9\.\s]+\]\{[a-zA-Z0-9\.\s\,]+\}/g, (e) => {
					let vars = e.slice(2, -1).split(']{');
					return `<input type="number" data-name="${vars[0]}" onchange="fillVars(this)" value="1">`;
				})
				.replace(/\!\{[a-zA-Z0-9\.\s]+\}[\s\S]+\!\{\/[a-zA-Z0-9\.\s]+\}/g, (e) => {
					let name = e.slice(2, e.indexOf('}'));
					if (assignedHidden[name]) {
						return e.slice(3 + name.length, -4 - name.length);
					} else {
						return '';
					}
				})
				.replace(/\!\[[a-zA-Z0-9\.\s]+\]\{[a-zA-Z0-9\.\s]+\}/g, (e) => {
					let vars = e.slice(2, -1).split(']{');
					return `<input type="checkbox" data-name="${
						vars[0]
					}" onchange="fillVars(this)" id="switch" name="switch" role="switch" ${
						assignedHidden[vars[0]] ? 'checked' : ''
					}>`;
				})
				.replace(/\$\{[a-zA-Z0-9\.\s]+\}/g, (e) => {
					return assignedVars[e.slice(2, -1)];
				})
				.replace(/\@\[[a-zA-Z0-9\.\s]+\]\{[a-zA-Z0-9\.\s]+\}/g, (e) => {
					let vars = e.slice(2, -1).split(']{');
					return `<input type="text" data-name="${vars[0]}" onkeyup="fillVars(this)" value="${vars[1]}">`;
				});
			parseCodes();
		};

		function parseCodes() {
			let code = document.querySelectorAll('code');
			for (let i = 0; i < code.length; i++) {
				code[i].setAttribute('data-before', 'COPY');
				code[i].onclick = (e) => {
					navigator.clipboard.writeText(code[i].innerText);
					e.target.setAttribute('data-before', 'COPIED!');
				};
				code[i].onmouseleave = (e) => {
					e.target.setAttribute('data-before', 'COPY');
				};
			}
		}

		onMount(() => {
			parseCodes();
			let a = document.querySelectorAll('a');
			for (let i = 0; i < a.length; i++) {
				if (a[i].target == '') {
					a[i].target = '_top';
				}
			}
		});
	}
</script>

<svelte:head>
	<title>DECODE - {data.title}</title>
	<meta property="og:title" content={data.title} />
	<meta property="og:description" content={data.description} />
	<meta property="description" content={data.description} />
	<meta name="keywords" content={data.slug.split('-').join(' ')} />
	{#if images.length > 0}
		<meta property="og:image" content={images[0].url} />
	{/if}
</svelte:head>

<nav>
	<ul>
		<li>
			<img id="favicon" src="/favicon.png" alt="Logo" /><strong><a href="/">DECODE</a></strong>
		</li>
	</ul>
</nav>

<main>
	<div id="timestamp">
		{data.timestamp}
	</div>
	<hgroup>
		<h1 id="title">
			{data.title}
		</h1>
		<h2 id="sub-title">{data.description}</h2>
	</hgroup>
	<div id="editorCont">
		<SvelteMarkdown source={contentCopy} />
	</div>
	{#if data.recommendations.length > 0}
		<div id="recommendations">
			<h1>Read More</h1>
			{#each data.recommendations as rec}
				<article>
					{#if rec.images.length > 0}
						<img
							class="prevImgTop"
							src={rec.images[0].url}
							alt={rec.images[0].name}
							title={rec.images[0].name}
						/>
					{/if}
					<hgroup>
						<a href="/{rec.slug}" target="_top">
							{#if rec.images.length > 0}
								<img
									class="prevImgSide"
									src={rec.images[0].url + '?thumb=100x100'}
									alt={rec.images[0].name}
									title={rec.images[0].name}
								/>
							{/if}
							<h1>
								{rec.title}
							</h1>
						</a>
						{#if rec.description.length > 200}
							<h2>{rec.description.slice(0, -100)}...</h2>
						{:else}
							<h2>{rec.description}</h2>
						{/if}
					</hgroup>
				</article>
			{/each}
		</div>
	{/if}
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
	#title {
		margin-bottom: 10px;
	}
	a {
		color: #fff !important;
	}
	#editorCont {
		margin-bottom: 200px;
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
	#timestamp {
		text-align: right;
		color: var(--muted-color);
	}
</style>
