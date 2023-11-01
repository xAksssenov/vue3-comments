<template>
    <li class="comment" :style="{ 'margin-left': nestMargin + 'px' }">

        <div class="comment__body" :class="colorReaction">
            <div>
                <p><Strong> {{ comment.author }} </Strong></p>
                <p> {{ comment.text }} </p>
            </div>

            <div class="comment__section">
                <time>{{ dateNow }}</time>
                <VButton class="comment__btn" @click="showDialog">Ответить</VButton>

                <div class="comment__answer" v-if="comment.childs">
                    Ответы: {{ comment.childs.length }}
                </div>
            </div>
        </div>

        <VDialog v-model:show="dialogVisible">
            <CommentForm :visible="dialogVisible" :parentCommentId="comment.id" :nest="comment.nest + 1"
                @create="createChildComment" />
        </VDialog>

        <ul v-if="comment.childs">
            <CommentItem v-for="child in comment.childs" :comment="child" @showDialog="showReplyFormForChild"
                :nest="child.nest" :key="child.id" />
        </ul>
    </li>
</template>

<script setup>
import { ref, computed } from 'vue';
import CommentForm from './CommentForm.vue';
const dialogVisible = ref(false)

const emit = defineEmits(['showDialog'])
const props = defineProps({
    comment: {
        typeof: Object,
        required: true
    }, childs: {
        typeof: Array,
    },
    nest: {
        typeof: Number,
        required: true,
    }
})

const reactionSum = ref(0)
const colorReaction = computed(() => {
    if (!props.comment.childs) return

    reactionSum.value = 0
    props.comment.childs.forEach((comment) => {
        reactionSum.value += comment.reaction
    })
    if (reactionSum.value > 0) {
        return 'comment__green'
    } else if (reactionSum.value < 0) {
        return 'comment__red'
    }
    return
})

function showDialog() {
    dialogVisible.value = true
}

function showReplyFormForChild(childCommentId) {
    dialogVisible.value = true
    emit('showDialog', childCommentId);
}

const nestMargin = computed(() => {
    return props.comment.nest * 50
})

function createChildComment(newComment) {
    if (!props.comment.childs) {
        props.comment.childs = []
    }
    newComment.id = Date.now()
    newComment.nest = props.comment.nest + 1

    props.comment.childs.push(newComment)
    dialogVisible.value = false
}

function dateTime() {
    const current = new Date()
    const date = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
    const time = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
}

const dateNow = dateTime()
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