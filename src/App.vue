<template>
  <main>
    <section class="app">
      <h1 class="text-main">Страница с комментариями</h1>

      <div class="btn-flex">
        <VButton @click="showDialog" class="main-btn">Создать комментарий</VButton>
      </div>

      <VDialog :show="dialogVisible">
        <PostForm @create="createPost" :parentPostId="parentPostId" :visible="dialogVisible" />
      </VDialog>
      <PostList :posts="posts" @reply="showReplyDialog" />
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import PostForm from './components/PostForm.vue'
import PostList from './components/PostList.vue'
const parentPostId = ref(null)
const dialogVisible = ref(false)

const posts = ref([])

function createPost(post) {
  posts.value.push(post)
  dialogVisible.value = false
}

function showDialog() {
  parentPostId.value = null
  dialogVisible.value = true
}

function showReplyDialog(parentId) {
  parentPostId.value = parentId
  dialogVisible.value = true
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

.btn-flex {
  display: flex;
}
</style>  