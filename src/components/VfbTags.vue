<template>
    <div class="vfb-tags">
        <div class="vfb-group">
            <input
                v-model="query"
                :id="id"
                :placeholder="placeholder"
                class="vfb-input"
                type="text"
            />
        </div>
        <div
            class="vfb-group vfb-buttons"
            v-show="modelValue.length"
        >
            <!-- @vue-ignore -->
            <button
                v-for="(value, i) in modelValue"
                :key="i"
                @click="removeTag(value)"
                class="vfb-tag"
            >
                <span>{{ value }}</span>
                <span class="vfb-tag-x">x</span>
            </button>
        </div>
        <div v-if="searchResults.length == 0">
            <span>0 items matching search query...</span>
        </div>
        <ul
            v-else
            class="vfb-checkboxes"
            :class="{ invalid: state === false, valid: state === true }"
        >
            <li
                v-for="(option, i) in searchResults"
                :key="option.value"
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
<style src="./VfbTags.css"></style>
