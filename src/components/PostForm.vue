<template>
    <form @submit.prevent>
        <h4>Создание поста</h4>

        <VInput v-model="post.title" type="text" placeholder="Имя" />
        <VTextarea v-model="post.body" type="text" placeholder="Комментарий" />

        <VButton class="btn-create" @click="createPost">Создать</VButton>
    </form>
</template>
  
<script setup>
import { ref } from 'vue'

const post = ref({
    title: '',
    body: ''
})

const emit = defineEmits(['create'])

function createPost() {
    post.value = {
        title: post.value.title,
        body: post.value.body,
        id: Date.now()
    }
    emit('create', post.value)
    post.value = {
        title: '',
        body: '',
        id: null,
    }
}
</script>
  
<style scoped>
form {
    display: flex;
    flex-direction: column;
}

.btn-create {
    align-self: flex-end;
    margin-top: 15px
}
</style>