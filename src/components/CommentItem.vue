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
        <time>{{ convertDate }}</time>
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

const date = ref(props.comment.createdAt)
const reactionSum = ref(0)
const colorReaction = computed(() => {
  if (!props.comment.childs) return

  reactionSum.value = 0
  props.comment.childs.forEach((comment) => {
    reactionSum.value += comment.reaction
  })
  if (reactionSum.value > 0) {
    return "comment__green"
  } else if (reactionSum.value < 0) {
    return "comment__red"
  }
  return
})

function showDialog() {
  emit("showDialog", props.comment.id)
}

function showChildDialog(id) {
  emit("showDialog", id)
}

const nestMargin = computed(() => {
  return props.comment.nest * 10
})

const convertDate = computed(() => {
  return new Intl.DateTimeFormat('ru', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(Date.parse(date.value))
})
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

@media(max-width: 800px) {
  .comment__btn {
    width: 80%;
  }

  .comment__body {
    font-size: 14px;
    padding: 20px 20px;
  }
}

@media(max-width: 500px) {
  .comment__btn {
    width: 90px;
  }

  time {
    font-size: 12px;
  }
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