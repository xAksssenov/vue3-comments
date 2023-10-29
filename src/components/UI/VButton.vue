<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script setup>
defineOptions({
    name: 'VButton',
})
</script>

<style scoped>
.btn {
    padding: 10px 15px;
    background: none;
    color: teal;
    border: 1px solid teal;
    align-self: flex-end;
}
</style>