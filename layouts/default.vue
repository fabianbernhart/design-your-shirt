<template>
    <div>
        <NavigationBar
            :title-item="title"
            :total-price="totalPrice"
        ></NavigationBar>
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
const designStore = useDesignStore()
const { totalPrice } = storeToRefs(designStore)

const titleStore = useTitleStore()

const title = titleStore.getTitle
</script>
