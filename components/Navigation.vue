<template>
    <VaNavbar>
        <template #left>
            <VaNavbarItem>
                <span class="title">{{ title.title }}</span>
            </VaNavbarItem>
        </template>
        <template #right>
            <VaNavbarItem>
                <ClientOnly>
                    <span v-if="title.showTotal" class="price"
                        >{{ totalPrice.toFixed(2) }} €</span
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
const designStore = useDesignStore()
const { totalPrice } = storeToRefs(designStore)

const titleStore = useTitleStore()

const title = titleStore.getTitle

const navigateToNewPage = () => {
    navigateTo(title.value.to)
}
</script>

<style scoped>
.text {
    font-size: 3.25rem;
}

.title {
    @apply text;
    color: rgb(129, 180, 51);
}

.price {
    @apply text;
    margin-right: 2rem;
    color: #000;
}
@media (max-width: 550px) {
    .text {
        font-size: 3.25rem;
    }

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
