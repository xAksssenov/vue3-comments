<template>
  <div class="dialog" v-if="show" @mousedown="$emit('update:show', false)">
    <div @mousedown.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: "VDialog",
})

const props = defineProps({
  show: Boolean,
})

const emit = defineEmits(["update:show"])
</script>

<style scored>
.dialog {
  position: fixed;
  display: flex;

  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  background: rgba(0, 0, 0, 0.6);
}

.dialog__content {
  margin: auto;
  padding: 20px;
  border-radius: 20px;

  min-height: 50px;
  width: 450px;
}
</style>