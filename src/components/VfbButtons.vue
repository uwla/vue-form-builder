<template>
    <div>
        <b-button v-if="showReset" variant="danger" type="reset">
            {{ resetText }}
        </b-button>
        <b-button v-if="showSubmit" variant="success" type="submit">
            {{ submitText }}
        </b-button>
    </div>
</template>
<script src="./VfbButtons.js"></script>