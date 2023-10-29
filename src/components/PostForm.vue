<template>
    <form @submit.prevent>
        <h4>Создание поста</h4>
        <input v-model="post.title" type="text" placeholder="Имя">
        <input v-model="post.body" type="text" placeholder="комментарий">
        <VButton @click="createPost" style="margin-top: 15px;">Создать</VButton>
    </form>
</template>

<script>
export default {
    data() {
        return {
            post: {
                title: '',
                body: ''
            }
        };
    },
    methods: {
        createPost() {
            this.post.id = Date.now();
            this.$emit('create', this.post);
            this.post = {
                title: '',
                body: ''
            };
        }
    },
    components: { VInput }
}
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}
</style>