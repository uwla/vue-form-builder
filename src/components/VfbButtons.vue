<template>
    <div class="vfb-buttons">
        <button v-if="showReset" class="btn btn-danger" type="reset">
            {{ resetText }}
        </button>
        <button v-if="showSubmit" class="btn btn-success" type="submit">
            {{ submitText }}
        </button>
    </div>
</template>
<script lang="ts" src="./VfbButtons.ts"></script>
<style src="./VfbButtons.css"></style>