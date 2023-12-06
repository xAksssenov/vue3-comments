<template>
  <li class="comment" :style="{ 'margin-left': nestMargin + 'px' }">
    <div class="comment__body" :class="colorReaction">
      <div>
        <p>
          <strong> {{ comment.author }} </strong>
        </p>
        <p>{{ comment.text }}</p>
      </div>
      <div class="comment__section">
        <time>{{ dateNow }}</time>
        <VButton class="comment__btn" @click="showDialog">Ответить</VButton>
        <div class="comment__answer" v-if="childs">
          Ответы: {{ childs.length }}
        </div>
      </div>
    </div>
    <ul v-if="childs">
      <CommentItem
        @showDialog="showChildDialog"
        v-for="child in childs"
        :comment="child"
        :childs="child.childs"
        :nest="child.nest"
        :key="child.id"
      />
    </ul>
  </li>
</template>

<script setup>
import { ref, computed } from "vue";

const emit = defineEmits(["showDialog"]);
const props = defineProps({
  comment: {
    typeof: Object,
    required: true,
  },
  childs: {
    typeof: Array,
  },
  nest: {
    typeof: Number,
    required: true,
  },
});

const reactionSum = ref(0);
const colorReaction = computed(() => {
  if (!props.comment.childs) return;

  reactionSum.value = 0;
  props.comment.childs.forEach((comment) => {
    reactionSum.value += comment.reaction;
  });
  if (reactionSum.value > 0) {
    return "comment__green";
  } else if (reactionSum.value < 0) {
    return "comment__red";
  }
  return;
});

function showDialog() {
  emit("showDialog", props.comment.id);
}

function showChildDialog(id) {
  emit("showDialog", id);
}

const nestMargin = computed(() => {
  return props.comment.nest * 30;
});

function dateTime() {
  const current = new Date();
  const date =
    current.getFullYear() +
    "-" +
    (current.getMonth() + 1) +
    "-" +
    current.getDate();
  const time =
    current.getHours() +
    ":" +
    current.getMinutes() +
    ":" +
    current.getSeconds();
  const dateTime = date + " " + time;
  return dateTime;
}

const dateNow = dateTime();
</script>

<style scoped>
.comment__green {
  background-color: rgba(33, 230, 131, 0.322);
}

.comment__red {
  background-color: rgba(255, 0, 0, 0.2);
}

.comment__body {
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

.comment__answer {
  color: rgb(76, 144, 124);
}

.comment__btn {
  width: 100%;
}

li {
  list-style-type: none;
}

.comment__section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;
}
</style>