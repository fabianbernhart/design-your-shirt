<template>
    <VaNavbar color="#shadow" class="title">
        <template #left>
            <VaNavbarItem>
                <span class="title">{{ title.title }}</span>
            </VaNavbarItem>
        </template>
        <template #right>
            <VaNavbarItem textColor="primary">
                <ClientOnly>
                    <span v-if="title.showTotal" class="price"
                        >{{ totalPrice }} €</span
                    >
                </ClientOnly>

                <VaButton @click="navigateToNewPage()">
                    {{ title.action }}
                </VaButton>
            </VaNavbarItem>
        </template>
    </VaNavbar>

    <slot></slot>
</template>

<script setup lang="ts">
import { useDesignStore } from '@/src/stores/design'
import { useTitleStore } from '~/src/composable/title'

const designStore = useDesignStore()
const { totalPrice } = storeToRefs(designStore)

const titleStore = useTitleStore()

const title = titleStore.getTitle

const navigateToNewPage = () => {
    navigateTo(title.value.to)
}
</script>

<style scoped>
.title {
    font-size: 3.25rem;
    color: rgb(104, 129, 66);
}

.price {
    margin-right: 2rem;
    color: #000;
}
@media (max-width: 550px) {
    .price {
        font-size: large;
        margin-right: 0.2rem;
        color: #000;
    }
    .title {
        font-size: larger;
        font-size: 1.3em;
    }
}
</style>
