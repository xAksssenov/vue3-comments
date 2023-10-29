<template>
    <div class="post">
        <div>
            <div><Strong>Имя:</Strong> {{ post.title }}</div>
            <div><Strong>Текст:</Strong> {{ post.body }}</div>
        </div>
        <div>
            <VButton @click="$emit('remove', post)">Удалить</VButton>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        post: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
.post {
    padding: 30px;
    margin-top: 15px;

    border: 2px solid teal;
    border-radius: 50px;
    
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>