<template>
    <ul v-if="comments.length > 0">

        <TransitionGroup name="comment__list">
            <CommentItem @showDialog="showReplyForm" v-for="comment in nestedComments" :comment="comment" :key="comment.id"
                :nest="comment.nest" />
        </TransitionGroup>
    </ul>
    <h2 v-else class="comment__empti">Список комментариев пуст</h2>
</template>

<script setup>
import { ref, computed } from "vue";
import CommentItem from './CommentItem.vue';
const emit = defineEmits(['reply'])
const props = defineProps({
    comments: {
        type: Array,
        required: true
    }
})

function showReplyForm(parentCommentId) {
    emit('reply', parentCommentId);
}

const comments = ref(props.comments)
const nestedComments = computed(() => {
    let nestedComments = []
    comments.value.forEach((comment) => {
        if (comment.parentId === null || !comment.parentId) {
            let commentChanged = { ...comment }
            commentChanged.nest = 0
            commentChanged.childs = findChilds(commentChanged, comments.value, 1)
            nestedComments.push(commentChanged)
        }
    })
    return nestedComments
})

function findChilds(parent, arr, nest) {
    let childs = arr.filter((comment) => comment.parentId === parent.id)
    if (childs.length === 0) return null
    childs.forEach((childComment) => {
        childComment.childs = findChilds(childComment, arr, nest + 1)
        childComment.nest = nest
    })
    return childs
}
</script>

<style>
.comment__empti {
    font-size: 25px;
    text-align: center;
    color: red;
}

.comment__list-item {
    display: inline-block;
    margin-right: 10px;
}

.comment__list-enter-active,
.comment__list-leave-active {
    transition: all 0.4s ease;
}

.comment__list-enter-from,
.comment__list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>
  