<template>
  <button type="button" class="btn">
    <slot></slot>
  </button>
</template>

<script setup>
defineOptions({
  name: "VButton",
})
</script>

<style scoped>
.btn {
  font-size: 20px;
  padding: 10px 15px;
  align-self: flex-end;

  border-radius: 20px;

  color: white;
  background: rgb(206, 104, 104);
  border: none;
}

@media(max-width: 500px) {
  .btn {
    font-size: 14px;
  }
}
.btn:hover {
  cursor: pointer;
}
</style>