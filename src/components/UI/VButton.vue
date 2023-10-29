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
    align-self: flex-end;

    border: 1px solid teal;
    border-radius: 20px;

    background: none;
    color: teal;
}

.btn:hover {
    cursor: pointer;
}
</style>