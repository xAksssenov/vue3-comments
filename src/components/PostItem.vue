<template>
    <li class="post" :style="{ 'margin-left': nestMargin + 'px' }">
        <div>
            <p><Strong> {{ post.title }} </Strong></p>
            <p> {{ post.body }} </p>
        </div>
        <div class="select">
            <time>{{ dateNow }}</time>

            <VButton class="item-btn" @click="showDialog">Ответить</VButton>

            <div class="answer" v-if="post.childs">
                Ответы: {{ post.childs }}
            </div>
        </div>
    </li>
</template>

<script setup>
import { computed } from 'vue';
const emit = defineEmits(['showDialog'])
const props = defineProps({
    post: {
        typeof: Object,
        required: true
    },
    childs: {
        typeof: Array,
        required: true
    },
    nest: {
        typeof: Number,
        required: true,
    }
})

const nestMargin = computed(() => {
    return Math.min(60 * props.post.nest, 20 * 5)
})

function dateTime() {
    const current = new Date()
    const date = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
    const time = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
}

const dateNow = dateTime()

function showDialog() {
    emit('showDialog', props.post.id)
}
</script>

<style scoped>
.post {
    font-size: 20px;
    padding: 40px 20px;
    margin-top: 15px;

    border: 2px solid rgb(209, 59, 25);
    border-radius: 50px;

    display: flex;
    align-items: center;
    justify-content: space-between;
}

time {
    color: grey;
}

.answer {
    color: rgb(38, 78, 66);
}

.item-btn {
    width: 100%;
}

.select {
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: center;
}
</style>