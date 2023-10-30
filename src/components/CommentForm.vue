<template>
    <form method="post" @submit.prevent="createComment">
        <h2 class="form__name">Создание комментария</h2>

        <div>
            <span v-if="!authorLength">
                <p class="form__text">Введите ваше имя</p>
            </span>

            <span v-if="authorLength > 20 || authorLength < 0">
                <p class="form__text">Ваше имя слишком длинное или слишком короткое</p>
            </span>
            <VInput v-model="comment.author" type="text" placeholder="Введите имя" />
        </div>

        <div>
            <span v-if="!textLength">
                <p class="form__text">Введите ваш комментарий</p>
            </span>
            <VTextarea v-model="comment.text" type="text" placeholder="Введите комментарий" />
        </div>

        <span v-if="!authorLength || authorLength > 20 || authorLength < 0 || !textLength">
            <VButton class="forn__btn" @click="createComment" :disabled="true">Создать</VButton>
        </span>

        <span v-else>
            <VButton class="forn__btn active" @click="createComment" :disabled="false">Создать</VButton>
        </span>
    </form>
</template>
  
<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['create'])
const props = defineProps({
    parentCommentId: {
        type: Number,
        defualt: null
    }
})

const comment = ref({
    author: '',
    text: '',
    parentId: null
})

const authorLength = computed(() => {
    return comment.value.author.length
})

const textLength = computed(() => {
    return comment.value.text.length
})

function createComment() {
    comment.value = {
        author: comment.value.author,
        text: comment.value.text,
        parentId: props.parentCommentId
    }
    emit('create', comment.value)
    comment.value = {
        author: '',
        text: '',
        parentId: null
    }
}
</script>
  
<style scoped>
.forn__btn {
    width: 100%;
    margin-top: 15px;
    background: grey !important;
}

.forn__btn.active {
    background: rgb(206, 104, 104) !important;
}

.form__text {
    text-align: center;
    font-weight: 600;
    margin-top: 20px;
    font-size: 20px;

    color: rgb(211, 94, 94);
}

.form__name {
    text-align: center;
    margin-bottom: 10px;
}
</style>