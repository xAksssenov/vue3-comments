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

    border-radius: 20px;

    color: white;
    background: rgb(206, 104, 104);
    border: none;
}

.btn:hover {
    cursor: pointer;
}
</style>