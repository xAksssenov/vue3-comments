<template>
  <input v-model="value" class="input" type="text">
</template>

<script setup>
import { computed } from 'vue';

defineOptions({
  name: 'VInput',
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
    }
})
</script>

<style scoped>
.input {
  width: 100%;
  padding: 15px;
  margin-top: 15px;
  font-size: 20px;

  border-radius: 20px;
  border: 2px solid rgb(209, 59, 25);
}
</style>