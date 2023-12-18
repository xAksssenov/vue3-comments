<template>
  <label class="switch">
    <span class="switch__hidden">Переключатель</span>
    <input
      type="checkbox"
      v-model="value"
      class="switch__hidden"
    />
    <span class="switch"></span>
  </label>
</template>
  
<script setup>
import { computed } from 'vue'
defineOptions({
  name: "VSwitch",
});

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: Boolean,
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
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch {
  cursor: pointer;
  background-color: #9d9b9b;
  transition: .4s;
}

.switch:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
}

.switch__hidden {
  visibility: hidden;
}

.switch__hidden:checked + .switch {
  background-color: rgb(206, 104, 104);
}

.switch__hidden:checked + .switch:before {
  transform: translateX(26px);
}

.switch__hidden:first-of-type {
  display: none;
}
</style>