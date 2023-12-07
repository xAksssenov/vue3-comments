<template>
  <div class="test" v-if="show" :class="{ test__error: !contentStatus }">
    <button class="test__close" @click="hideToasts">x</button>
    <p class="test__header">{{ content.status }}</p>
    <p class="test__text">{{ content.message }}</p>
  </div>
</template>
  
<script setup>
import { computed, watch } from "vue";
const emit = defineEmits(["update:show"]);
const props = defineProps({
  content: Object,
  show: {
    type: Boolean,
    default: false,
  },
});
const show = computed(() => props.show);
const contentStatus = computed(() => {
  if (props.content.status === "Error") {
    return false;
  }
  return true;
});
function deferredClose() {
  setTimeout(() => {
    hideToasts();
  }, 3000);
}
function hideToasts() {
  emit("update:show", false);
}
watch(show, deferredClose);
</script>
  
<style scoped>
.test {
  padding: 1.5rem;
  position: fixed;
  border-radius: 10px;
  bottom: 50px;
  right: 50px;
  background-color: rgb(7, 122, 7);
}
.test:active {
  display: block;
}

.test__header {
  margin: 0;
  color: #ffffff;
}
.test__text {
  color: #fff;
  margin: 0;
}
.test__close {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  border: none;
  border-radius: 50px;
}
.test__error {
  background-color: rgb(246, 81, 81);
}
</style>