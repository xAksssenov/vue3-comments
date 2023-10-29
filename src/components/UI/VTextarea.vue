<template>
    <textarea name="textareaName" class="area" v-model="value"></textarea>
</template>

<script setup>
import { computed } from 'vue'
defineOptions({
    name: 'VTextarea',
})
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    textareaName: String,
    modelValue: String,
})
const value = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    },
})
</script>

<style scoped>
.area {
    width: 100%;
    height: 200px;
    resize: none;
    padding: 10px 15px;
    margin-top: 15px;

    border: 1px solid teal;
    border-radius: 20px;
}
</style>