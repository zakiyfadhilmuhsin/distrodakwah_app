<template>
	<div class="flex-container">
		<h5
			style="font-size: 21px; margin: 0; font-family: 'Open Sans'; font-weight: bold"
		>
			Catatan
		</h5>
		<span>
		{{notesProp}}
		</span>
	</div>
</template>

<script>
import { postToOrderUrl, getHeader } from "../../config";
export default {
	name: "Notes",
	props: {
		orderIdProp: Number,
		notesProp: String
	},
};
</script>

<style></style>
