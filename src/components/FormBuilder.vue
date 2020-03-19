
<template>
    <form @submit.prevent="$emit('submit')">
        <!-- <form-field v-for="(field, index) in formFields" :key="index"
            :parameters="field" @update="updateForm" :form="form">
        </form-field> -->

        <slot></slot>

    </form>
</template>

<script src="./FormBuilder.js"></script>
