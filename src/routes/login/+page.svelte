<script>
	import { sha256 } from 'js-sha256';
	let email = '';
	let password = '';
	function submit() {
		localStorage.email = email;
		localStorage.password = sha256(password);
		history.back();
	}
</script>

<svelte:head>
	<title>DECODE Login</title>
</svelte:head>

<nav>
	<ul>
		<li><strong>DECODE</strong></li>
	</ul>
</nav>

<main>
	<form>
		<!-- Grid -->
		<div class="grid">
			<!-- Markup example 1: input is inside label -->
			<label for="email">
				Email
				<input
					type="email"
					id="email"
					name="email"
					bind:value={email}
					placeholder="hello@world.com"
					required
				/>
			</label>

			<label for="password">
				Password
				<input
					type="password"
					id="password"
					name="password"
					bind:value={password}
					placeholder="Password"
					required
				/>
			</label>
		</div>

		<!-- Button -->
		<button on:click={submit}>Login</button>
	</form>
</main>

<style>
	nav,
	ul,
	li {
		margin-left: 30px;
		font-size: 30px;
	}
	main {
		margin: auto;
		width: 90%;
		max-width: 700px;
		margin-top: 200px;
	}
</style>
