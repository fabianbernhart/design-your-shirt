<template>
    <div class="order-success-page">
        <div class="content">
            <h1>Thank you {{ personalData.name }} for your order!</h1>
            <VaButton @click="navigateToDesignPage">
                Design Another Product</VaButton
            >
        </div>
    </div>
</template>

<script setup>
import { useDesignStore } from '@/src/stores/design'

const designStore = useDesignStore()

const { personalData } = designStore

// Function to navigate to the design page
const navigateToDesignPage = () => {
    designStore.$reset()
    navigateTo('/designer')
}
</script>

<style scoped>
h1 {
    font-size: xx-large;
}

.order-success-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin-top: 10rem;
}

.content {
    text-align: center;
}
</style>
