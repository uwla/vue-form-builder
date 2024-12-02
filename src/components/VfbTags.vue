<template>
    <div class="vfb-tags">
        <div class="vfb-group">
            <input
                class="vfb-input"
                v-model="query"
                :placeholder="placeholder || 'search...'"
                type="text"
            >
        </div>
        <div class="vfb-group vfb-buttons" v-show="modelValue.length">
            <button
                class="btn btn-success"
                v-for="(value) in modelValue" :key="value"
                @click="removeTag(value)"
            >
                {{ value}}
            </button>
        </div>
        <ul
            class="vfb-checkboxes"
            :class="{ 'invalid': state === false, 'valid': state === true }"
        >
            <li
                v-for="(option, i) in options"
                v-show="option.text.includes(query) && !modelValue.includes(option.value)"
                :key="i"
            >
                <input
                    type="checkbox"
                    class="vfb-checkbox"
                    :name="name"
                    :id="`${id}_${i}`"
                    :value="option.value"
                    :checked="modelValue.includes(option.value)"
                    @change="handleInput"
                />
                <label :for="`${id}_${i}`">
                    {{ option.text }}
                </label>
            </li>
        </ul>
    </div>
</template>
<script src="./VfbTags.ts" lang="ts"></script>
