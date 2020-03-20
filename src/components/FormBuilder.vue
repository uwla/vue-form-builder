
<template>
    <form @submit.prevent="$emit('submit')">
        <div class="form-group" v-for="(field, i) in formFields" :key="i">

            <label :for="(field.id || field.name)">
                {{ field.label || toTitleCase(field.name)  }}
            </label>
            
            <component :is="field.component" :field="field"></component>
        </div>

        <slot></slot>
    </form>
</template>

<script src="./FormBuilder.js"></script>
