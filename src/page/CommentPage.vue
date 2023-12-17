<template>
  <main>
    <section class="app">
      <h1 class="app__main">Страница с комментариями</h1>
      <div class="app__block">
        <h3>Новые комментарии в реальном времени</h3>
        <VSwitch
          class="comments__input"
          v-model="switchChecked"
        />
      </div>
      <div class="app__btn">
        <VButton @click="showDialog" class="app__main__btn">
          Создать комментарий
        </VButton>
      </div>
      <VDialog v-model:show="dialogVisible">
        <CommentForm
          @create="postComments"
          :parentCommentId="parentCommentId"
          :visible="dialogVisible"
          :sending="isAppSending"
        />
      </VDialog>
      <h3 v-if="comments.length > 0" class="app__empty">
        Список комментариев:
      </h3>
      <h3>Количество комментариев: {{ lenghtComments }}</h3>
      <CommentList :comments="comments" @reply="showReplyDialog" />
    </section>
    <Test v-model:show="testVisible" :content="testContent" />
  </main>
</template>
  
<script setup>
import CommentList from "@/components/CommentList.vue";
import CommentForm from "@/components/CommentForm.vue";
import Test from "@/components/Test.vue";
import axios from "axios";
import { computed, ref, watch, onMounted } from "vue";
const parentCommentId = ref(null);
const comments = ref([]);
const testContent = ref({ status: "", message: "" });
const testVisible = ref(false);
const dialogVisible = ref(false);
const evtSource = ref(null);
const switchChecked = ref(true);
const isAppSending = ref(false);

const lenghtComments = computed(() => comments.value.length);

function addComment(comment) {
  comments.value.push(JSON.parse(comment.data));
}

function showReplyDialog(parentId) {
  parentCommentId.value = parentId;
  dialogVisible.value = true;
}

function showDialog() {
  dialogVisible.value = true;
}

async function fetchComments() {
  try {
    const response = await axios.get("http://194.67.93.117:80/comments");
    comments.value.length = 0;
    comments.value.push(...response.data.reverse());
  } catch (error) {
    console.log("Error fetching comments:", error);
  }
}

async function postComments(comment) {
  try {
    isAppSending.value = true;
    let url = "http://194.67.93.117:80/comments";
    let commentbody = {
      author: comment.author,
      text: comment.text,
      reaction: comment.reaction,
      parentId: comment.parentId,
    };

    const headers = {
      "Content-Type": "application/json",
      Username: "xAksssenov",
    };

    const response = await axios.post(url, commentbody, { headers });

    console.log(response.data);
    testContent.value = response.data;
    testVisible.value = true;
    dialogVisible.value = false;
    parentCommentId.value = null;
  } catch (error) {
    console.log(error.message);
    testContent.value = { status: "Error", message: error.message };
    testVisible.value = true;
  }
  isAppSending.value = false;
}

function openConnection() {
  evtSource.value = new EventSource("http://194.67.93.117:80/comments/stream");
  evtSource.value.onmessage = addComment;
}

function closeConnection() {
  if (evtSource.value) {
    evtSource.value.close();
    evtSource.value = null;
  }
}

function serverSentEvent() {
  if (!switchChecked.value) {
    closeConnection();
  } else {
    openConnection();
  }
}

function parrentIdcheck() {
  if (dialogVisible.value === false) {
    parentCommentId.value = null;
  }
}

watch(dialogVisible, parrentIdcheck);
watch(switchChecked, serverSentEvent);
fetchComments();
onMounted(() => openConnection());
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

@media (max-width: 500px) {
  .app {
    font-size: 14px;
  }
}

.app__main {
  text-align: center;
}

.app__main:after {
  content: "";
  width: 100%;
  display: block;
  margin-top: 5px;

  height: 1px;
  background: black;
}

.app__block {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.app__empty {
  font-size: 25px;
  text-align: center;
  color: red;
}

.app__main__btn {
  margin: 15px auto;
}

.app__btn {
  display: flex;
}

h3 {
  margin-bottom: 15px;
}
</style>  