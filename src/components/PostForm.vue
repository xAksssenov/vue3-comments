<template>
    <form method="post" @submit.prevent="createPost">
        <h2 class="form__name">Создание поста</h2>

        <div>
            <span v-if="!titleLength">
                <p class="form__text">Введите ваше имя</p>
            </span>

            <span v-if="titleLength > 20 || titleLength < 0">
                <p class="form__text">Ваше имя слишком длинное или слишком короткое</p>
            </span>
            <VInput v-model="post.title" type="text" placeholder="Введите имя" />
        </div>

        <div>
            <span v-if="!bodyLength">
                <p class="form__text">Введите ваш комментарий</p>
            </span>
            <VTextarea v-model="post.body" type="text" placeholder="Введите комментарий" />
        </div>


        <span v-if="!titleLength || titleLength > 20 || titleLength < 0 || !bodyLength">
            <VButton class="btn-create" @click="createPost" :disabled="true">Создать</VButton>
        </span>

        <span v-else>
            <VButton class="btn-create active" @click="createPost" :disabled="false">Создать</VButton>
        </span>
    </form>
</template>
  
<script setup>
import { ref, computed } from 'vue'

const post = ref({
    title: '',
    body: ''
})
const titleLength = computed(() => {
    return post.value.title.length
})
const bodyLength = computed(() => {
    return post.value.body.length
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
.btn-create {
    width: 100%;
    margin-top: 15px;
    background: grey !important;
}

.btn-create.active {
    background: rgb(206, 104, 104) !important;
}

.form__text {
    text-align: center;
    font-weight: 600;
    margin-top: 20px;
    color: rgb(211, 94, 94);
}

.form__name {
    text-align: center;
    margin-bottom: 10px;
}
</style>