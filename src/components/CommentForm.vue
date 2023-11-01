<template>
    <form class="form" method="post" @submit.prevent="createComment">
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

        <label class="form__label">
            <input v-model="comment.reaction" type="radio" name="reaction" value="1" class="form__radio"
                required />
            <svg class="form__img" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M15.9 4.5C15.9 3 14.418 2 13.26 2c-.806 0-.869.612-.993 1.82-.055.53-.121 1.174-.267 1.93-.386 2.002-1.72 4.56-2.996 5.325V17C9 19.25 9.75 20 13 20h3.773c2.176 0 2.703-1.433 2.899-1.964l.013-.036c.114-.306.358-.547.638-.82.31-.306.664-.653.927-1.18.311-.623.27-1.177.233-1.67-.023-.299-.044-.575.017-.83.064-.27.146-.475.225-.671.143-.356.275-.686.275-1.329 0-1.5-.748-2.498-2.315-2.498H15.5S15.9 6 15.9 4.5zM5.5 10A1.5 1.5 0 0 0 4 11.5v7a1.5 1.5 0 0 0 3 0v-7A1.5 1.5 0 0 0 5.5 10z"
                    fill="#000000" />
            </svg>
        </label>

        <label class="form__label">
            <input v-model="comment.reaction" type="radio" name="reaction" value="0" class="form__radio"
                required />
            <svg class="form__img" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M9 11C9.55228 11 10 10.5523 10 10C10 9.44772 9.55228 9 9 9C8.44772 9 8 9.44772 8 10C8 10.5523 8.44772 11 9 11Z"
                    fill="#000000" />
                <path
                    d="M9 15C8.44772 15 8 15.4477 8 16C8 16.5523 8.44772 17 9 17H15C15.5523 17 16 16.5523 16 16C16 15.4477 15.5523 15 15 15H9Z"
                    fill="#000000" />
                <path
                    d="M16 10C16 10.5523 15.5523 11 15 11C14.4477 11 14 10.5523 14 10C14 9.44772 14.4477 9 15 9C15.5523 9 16 9.44772 16 10Z"
                    fill="#000000" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z"
                    fill="#000000" />
            </svg>
        </label>

        <label class="form__label">
            <input v-model="comment.reaction" type="radio" name="reaction" value="-1" class="form__radio"
                required />
            <svg class="form__img" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M8.1 20.5c0 1.5 1.482 2.5 2.64 2.5.806 0 .869-.613.993-1.82.055-.53.121-1.174.267-1.93.386-2.002 1.72-4.56 2.996-5.325V8C15 5.75 14.25 5 11 5H7.227C5.051 5 4.524 6.432 4.328 6.964A15.85 15.85 0 0 1 4.315 7c-.114.306-.358.546-.638.82-.31.306-.664.653-.927 1.18-.311.623-.27 1.177-.233 1.67.023.299.044.575-.017.83-.064.27-.146.475-.225.671-.143.356-.275.686-.275 1.329 0 1.5.748 2.498 2.315 2.498H8.5S8.1 19 8.1 20.5zM18.5 15a1.5 1.5 0 0 0 1.5-1.5v-7a1.5 1.5 0 0 0-3 0v7a1.5 1.5 0 0 0 1.5 1.5z"
                    fill="#000000" />
            </svg>
        </label>

        <span v-if="!authorLength || authorLength > 20 || !textLength">
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
    reaction: 0,
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
        reaction: +comment.value.reaction,
        parentId: props.parentCommentId
    }
    emit('create', comment.value)
    comment.value = {
        author: '',
        text: '',
        reaction: 0,
        parentId: null
    }
}
</script>
  
<style scoped>
.form {
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 20px 30px;
    border-radius: 30px;
}

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

.form__label {
    margin-top: 15px;
}

.form__radio:checked+.form__img {
    border-bottom: 2px solid red;
    opacity: 1;
}

.form__radio {
    visibility: hidden;
}

.form__img {
    width: 50px;
    height: 50px;
    transition: all .3s ease-in-out;
}

.form__img:hover {
    transform: translateY(-5px);
}
</style>