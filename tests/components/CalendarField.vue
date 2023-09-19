<template>
    <div class="calendar-field">
        Suppose there is something useful here.
    </div>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'CalendarField',
    props: {
        theme: String,
        enableTransitions: Boolean,
        range: Array,
        calendar: Object,
        value: String,
    },
})
</script>