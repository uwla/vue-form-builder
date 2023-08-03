<template>
    <div class="vfb-feedback" v-if="showFeedback">
        <component :is="invalidFeedbackComponent" :state="state"
            v-if="errors">
            {{ errors }}
        </component>
        <component :is="validFeedbackComponent" :state="state"
            v-if="message">
            {{ message }}
        </component>
    </div>
</template>
<script src="./VfbFeedback.js"></script>
<style src="./VfbFeedback.css"></style>