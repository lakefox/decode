<script>
	import autosize from 'svelte-autosize';
	import { bind } from 'svelte/internal';
	import Action from './Action.svelte';
	export let edit = false;
	let contents = '<h1>test</h1>';
	let actions = [];
	let select_type = '';
	let update = 0;
	let start = 0;
	let end = 0;

	function add() {
		let action = {
			type: select_type,
			start: start,
			end: end
		};
		actions.push(action);
		console.log(actions);
		update++;
	}
</script>

{#if edit}
	<div id="inputs">
		<select id="mode">
			<option value="html" selected>HTML</option>
			<option value="js">JS</option>
			<option value="css">CSS</option>
		</select>
	</div>
	<textarea use:autosize bind:value={contents} name="editor" id="editor" cols="30" rows="20" />
	<!-- add a add action button -->

	<div id="addAction">
		<select id="type" bind:value={select_type}>
			<option value="scroll" selected>Scroll</option>
			<option value="click">Click</option>
			<option value="mouseMove">Mouse Move</option>
			<option value="text">Text</option>
		</select>
		<label for="start">
			<input type="number" min="0" name="start" bind:value={start} />
		</label>
		<label for="end">
			<input type="number" min="0" name="end" bind:value={end} />
		</label>
		<button id="add" on:click={add}> Add Action </button>
	</div>
	<div id="actions">
		{#key update}
			{#each actions as action}
				<div>
					{action.type}
				</div>
			{/each}
		{/key}
	</div>
{:else}
	{@html contents}
{/if}

<!-- <Builder>
<HTML>
	<div class="w-full">
		<h1 class="sticky">Sticky header 1</h1>
		<h1 class="sticky">Sticky header 2</h1>
		<h1 class="sticky">Sticky header 3</h1>
		<h1 class="sticky">Sticky header 4</h1>
	</div>
</HTML>
<ACTION type="scroll" value="400" start="0" end="5000">
<STYLE>
.sticky {
	position: sticky;
	margin-bottom: 100px;
}
.full {
	width: 100%;
	height: 2000px	
}
</STYLE>
</Builder> -->
<style>
	#mode {
		width: 300px;
		height: 55px;
	}
	#inputs {
		display: flex;
		justify-content: right;
	}
	#addAction {
		display: flex;
	}
	#add {
		width: 200px;
	}
</style>
