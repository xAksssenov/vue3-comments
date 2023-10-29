<template>
    <div class="dialog" v-if="show" @click.stop="hideDialog">
        <div @click.stop class="dialog-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'VDialog',
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        hideDialog() {
            this.$emit('update:show', false)
        }
    }
}
</script>

<style scored>
.dialog {
    position: fixed;
    display: flex;

    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    background: rgba(0, 0, 0, 0.6);
}

.dialog-content {
    margin: auto;
    padding: 20px;
    border-radius: 20px;

    min-height: 50px;
    width: 450px;
}
</style>