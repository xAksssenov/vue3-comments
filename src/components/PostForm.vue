<template>
    <form @submit.prevent>
        <h4>Создание поста</h4>

        <VInput v-model="post.title" type="text" placeholder="Имя" />
        <VTextarea v-model="post.body" type="text" placeholder="Комментарий" />

        <VButton class="btn-create" @click="createPost">Создать</VButton>
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
        }
    },
    methods: {
        createPost() {
            this.post.id = Date.now();
            this.$emit('create', this.post)
            this.post = {
                title: '',
                body: ''
            }
        }
    },
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