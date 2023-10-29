<template>
    <ul v-if="posts.length > 0">
        <h3 class="empti">Список комментариев:</h3>

        <TransitionGroup name="post-list">
            <PostItem @showDialog="parentPostId" v-for="post in childReaction" :post="post" :key="post.id"
                @reply="parentPostId(post.id)" />
        </TransitionGroup>
    </ul>
    <h2 v-else class="empti popular">Список комментариев пуст</h2>
</template>

<script setup>
import PostItem from './PostItem.vue';
import { computed } from 'vue';
const emit = defineEmits(['reply'])
const props = defineProps({
    posts: {
        type: Array,
        required: true
    }
})

const sortPost = computed(() => {
    let array = []
    props.posts.forEach((post) => {
        if (post.parentId === null || !post.parentId) {
            let postNew = { ...post }
            postNew.nest = 0
            postNew.reactionSum = 0
            postNew.childs = 0

            array.push(postNew)
            haveChild(post, 1, props.posts, array)
        }
    })
    return array
})

const childReaction = computed(() => {
    let array = sortPost.value
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            const parrent = array[i]
            const child = array[j]

            if (parrent.id === child.parentId) {
                parrent.childs++
                parrent.reactionSum += child.reaction
            }
        }
    }
    return array
})

function haveChild(parent, nest, array1, array2) {
    if (array1.length === array2.length)
        return array1.forEach((El) => {
            let element = { ...El }
            if (parent.id === element.parentId) {
                element.nest = nest
                element.reactionSum = 0
                element.childs = 0

                array2.push(element)
                haveChild(element, nest + 1, array1, array2)
            }
        })
}

function parentPostId(parentPostId) {
    emit('reply', parentPostId)
}

</script>

<style scoped>
.empti.popular {
    color: red;
    text-align: center;
}

.empti {
    font-size: 25px;
    text-align: center;
}

.post-list-item {
    display: inline-block;
    margin-right: 10px;
}

.post-list-enter-active,
.post-list-leave-active {
    transition: all 0.4s ease;
}

.post-list-enter-from,
.post-list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>