<template>
    <div class="post">
        <div>
            <div><Strong>Имя:</Strong> {{ post.title }}</div>
            <div><Strong>Текст:</Strong> {{ post.body }}</div>
        </div>
        <div class="post--btns">
            <VButton>Удалить</VButton>
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
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>