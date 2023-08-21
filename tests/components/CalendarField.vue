<template>
    <div class="calendar-field">
        Suppose there is something useful here.
    </div>
</template>
<script>
export default {
    name: 'CalendarField',
    props: {
        theme: String,
        enableTransitions: Boolean,
        range: Array,
        calendar: Object,
        value: String,
    },
}
</script>