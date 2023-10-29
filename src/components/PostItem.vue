<template>
    <div class="post">
        <div>
            <div><Strong> {{ post.title }} </Strong></div>
            <div> {{ post.body }} </div>
        </div>
        <div>
            <VButton @click="showDialog">Ответить</VButton>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
const props = defineProps({
    post: {
        type: Object,
        required: true
    }
})
const emit = defineEmits(['showDialog'])
const date = ref(props.post.createdAt)
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
    emit('showDialog', props.post.id)
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