<template>
  <main>
    <section class="app">
      <h1 class="app__main">Страница с комментариями</h1>
      <div class="app__btn">
        <VButton @click="showDialog" class="app__main__btn">Создать комментарий</VButton>
      </div>


      <VDialog v-model:show="dialogVisible">
        <CommentForm @create="createComment" :parentCommentId="parentCommentId" :visible="dialogVisible" />
      </VDialog>

      <h3 v-if="comments.length > 0" class="app__empty">Список комментариев:</h3>
      <h3>
        Количество комментариев: {{ lenghtComments }}
      </h3>
      <CommentList :comments="comments" @reply="showReplyDialog" />
    </section>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import CommentForm from './components/CommentForm.vue'
import CommentList from './components/CommentList.vue'
const parentCommentId = ref(null)
const dialogVisible = ref(false)

const comments = ref([
  {
    id: 1,
    author: "Иван",
    text: "текст",
    reaction: 0,
    parentId: null
  },
  {
    id: 2,
    author: "sdfsdf",
    text: "текст",
    reaction: 0,
    parentId: null
  },
  {
    id: 3,
    author: "ssdfsdfsdgfghfghf",
    text: "текст",
    reaction: 0,
    parentId: null
  }
])

const lenghtComments = computed(() => comments.value.length)

function showReplyDialog(parentId) {
  parentCommentId.value = parentId
  dialogVisible.value = true
}

function showDialog() {
  parentCommentId.value = null
  dialogVisible.value = true
}

function createComment(comment) {
  comments.value.push(comment)
  dialogVisible.value = false
}

</script>

<style>
* {
  font-family: Verdana, Geneva, Tahoma, sans-serif;

  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  max-width: 800px;
  padding: 20px;
  margin: auto;
}

.app__main {
  text-align: center;
}

.app__main:after {
  content: '';
  width: 100%;
  display: block;
  margin-top: 5px;

  height: 1px;
  background: black;
}

.app__empty {
  font-size: 25px;
  text-align: center;
  color: red;
}

.app__main__btn {
  margin: 15px auto;
  justify-content: space-between;
  width: 30%;
}

.app__btn {
  display: flex;
}
</style>  