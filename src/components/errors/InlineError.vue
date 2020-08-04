<template>
	<div class="help-block invalid-feedback" v-if="hasError">
		<span v-for="(error, i) in errors" :key="i">
			{{ error }}
		</span>
	</div>
</template>

<script src="./InlineError.js"></script>

<style lang="css" scoped>
.help-block.invalid-feedback span {
	display: block;
}
</style>
