<script>
	import '../app.css';
	import MetalIcon from '$lib/MetalIcon.svelte';
	import CrystalIcon from '$lib/CrystalIcon.svelte';
	import EnergyIcon from '$lib/EnergyIcon.svelte';
</script>

<head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
	<link
		href="https://fonts.googleapis.com/css2?family=Titillium+Web&display=swap"
		rel="stylesheet"
	/>
</head>

<div>
	<MetalIcon --color="cadetblue" /><CrystalIcon --color="aquamarine" /><EnergyIcon
		--color="yellow"
	/>
</div>

<slot />
