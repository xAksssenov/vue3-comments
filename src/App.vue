<template>
  <div class="app">
    <h1 class="text-main">Страница с комментариями</h1>

    <div style="display: flex;">
      <VButton @click="showDialog" class="main-btn">Создать пост</VButton>
    </div>

    <VDialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </VDialog>
    <post-list :posts="posts" @remove="removePost" />
  </div>
</template>

<script>

import PostForm from './components/PostForm.vue'
import PostList from './components/PostList.vue'

export default {
  components: {
    PostForm,
    PostList
  },
  data() {
    return {
      posts: [
        { id: 1, title: 'Иван', body: 'something' },
        { id: 2, title: 'Олег', body: 'something' },
        { id: 3, title: 'Виктор', body: 'something' }
      ],
      dialogVisible: false,
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post)
      this.dialogVisible = false
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true
    }
  }
}
</script>

<style>
* {
  font-family: Verdana, Geneva, Tahoma, sans-serif;

  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: rgb(240, 236, 231);
}

.app {
  max-width: 800px;
  padding: 20px;
  margin: auto;
}

.text-main {
  text-align: center;
}

.text-main:after {
  content: '';
  width: 100%;
  display: block;
  margin-top: 5px;

  height: 1px;
  background: black;
}

.active {
  background-color: aqua;
}

.main-btn {
  margin: 15px auto;
  justify-content: space-between;
  width: 30%;
}
</style>  