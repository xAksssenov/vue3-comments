<template>
    <div>
        <h3>Список комментариев</h3>
        <post-item :post="post" v-for="post in posts"/>
    </div>
</template>

<script>
import PostItem from './PostItem.vue';
export default {
    components: {
        PostItem
    },
    props: {
        posts: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>

</style>