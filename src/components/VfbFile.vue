<template>
    <input class="vfb-input" type="file" :multiple="multiple" @change="handleInput"
        :class="{'invalid': state === false, 'valid': state === true}">
</template>
<script src="./VfbFile.js"></script>