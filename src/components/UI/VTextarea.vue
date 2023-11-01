<template>
    <textarea class="area" v-model="value"></textarea>
</template>

<script setup>
import { computed } from 'vue'
defineOptions({
    name: 'VTextarea'
})
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: [String, Number]
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
    font-size: 20px;
    
    resize: none;
    padding: 10px 15px;
    margin-top: 15px;

    border: 2px solid rgb(209, 59, 25);
    border-radius: 20px;
}
</style>