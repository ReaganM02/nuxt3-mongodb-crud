<script setup lang="ts">
defineProps({
    error: Object
})
</script>
<template>
    <div>
        {{ error }}
    </div>
</template>