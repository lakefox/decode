<script>
	import autosize from 'svelte-autosize';
	import Action from './Action.svelte';
	export let edit = false;
	let contents = '<Action />';
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
{:else}
	{@html contents}
{/if}

<style>
	#mode {
		width: 300px;
		height: 55px;
	}
	#inputs {
		display: flex;
		justify-content: right;
	}
</style>
