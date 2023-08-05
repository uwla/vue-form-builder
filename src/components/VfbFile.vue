<template>
    <input class="vfb-input" type="file" :multiple="multiple" @change="handleInput"
        :class="{'is-invalid': state === false, 'is-valid': state === true}">
</template>
<script src="./VfbFile.js"></script>