<template>
    <VaNavbar color="#shadow" class="title">
        <template #left>
            <VaNavbarItem>
                <span class="title">{{
                    title.title
                }}</span>
            </VaNavbarItem>
        </template>
        <template #right>
            <VaNavbarItem textColor="primary">
                <span
                    v-if="title.showTotal" class="price"
                    >{{ designStore.totalPrice }} €</span
                >
                <span> </span>
                <VaButton @click="navigateToNewPage()">
                    {{ title.action }}
                </VaButton>
            </VaNavbarItem>
        </template>
    </VaNavbar>

    <slot></slot>
</template>

<script setup lang="ts">
import { designStore } from '@/src/stores/design'
import { useTitleStore } from '@/src/stores/title'

const titleStore = useTitleStore()

const navigateToNewPage = () => {
    navigateTo(title.value.to)
}

const title = computed(() => titleStore.titleObject.value)
</script>

<style scoped>

.title {
    font-size: 2rem;
    color: greenyellow;
}

.price {
    margin-right: 2rem;
    color: #000;
}

</style>
