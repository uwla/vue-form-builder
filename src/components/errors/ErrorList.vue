<template>
	<div v-show="hasError" class="alert alert-danger alert-dismissible" role="alert">
		<button v-if="dismissible" @click="dismiss()" type="button" class="close" aria-label="Close">
			<span aria-hidden="true">
				&times;
			</span>
		</button>

		<div v-if="shouldDisplayMessage">
			{{ errorMessage }}
		</div>

		<ul v-if="(errors.length > 0)">
			<li v-for="(error, i) in errors" :key="i">
				{{ error }}
			</li>
		</ul>
	</div>
</template>

<script src="./ErrorList.js"></script>

<style lang="css" scoped>
.alert-danger ul {
	margin: 0;
	padding: 0 0 0 20px;
}
</style>
