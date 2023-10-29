<template>
    <div class="post">
        <div>
            <div><Strong>Имя:</Strong> {{ post.title }}</div>
            <div><Strong>Текст:</Strong> {{ post.body }}</div>
        </div>
        <div>
            <VButton @click="showDialog">Ответить</VButton>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
    post: {
        type: Object,
        required: true
    }
})

const convertDate = computed(() => {
    return new Intl.DateTimeFormat('ru', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    }).format(Date.parse(date.value))
})

function showDialog() {
    emit('showDialog', props.comment.id)
}
</script>

<style scoped>
.post {
    padding: 40px 20px;
    margin-top: 15px;

    border: 2px solid teal;
    border-radius: 50px;

    display: flex;
    align-items: center;
    justify-content: space-between;
}
.time {
  margin-left: auto;
  line-height: 1;
}
</style>