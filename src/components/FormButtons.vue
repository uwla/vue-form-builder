<template>
    <div v-bind="wrapperAttr">
        <button v-bind="cancelButtonAttr">
            {{ cancelButtonText }}
        </button>

        &nbsp;&nbsp;

        <button v-bind="submitButtonAttr">
            {{ submitButtonText }}
        </button>
    </div>
</template>

<script src="./FormButtons.js"></script>

<style lang="scss">

.form-button-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;

    button {
        white-space: nowrap;
    }
}
</style>
