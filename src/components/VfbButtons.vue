<template>
    <div class="vfb-buttons">
        <button v-if="showReset" class="danger" type="reset">
            {{ resetText }}
        </button>
        <button v-if="showSubmit" class="success" type="submit">
            {{ submitText }}
        </button>
    </div>
</template>
<script src="./VfbButtons.js"></script>
<style src="./VfbButtons.css"></style>