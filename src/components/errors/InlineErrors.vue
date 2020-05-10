<template>
	<div class="help-block invalid-feedback" v-if="hasError">
		<span v-for="(error, index) in errors" :key="index">
			{{ error }}
		</span>
	</div>
</template>

<script src="./InlineErrors.js"></script>

<style lang="css">
.help-block.invalid-feedback span {
	display: block;
}
</style>
