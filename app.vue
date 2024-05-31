<template>
    <!-- Navigation -->
    <VaNavbar color="#shadow" class="title">
        <template #left>
            <VaNavbarItem>
                <span color="red">Design your Shirt</span>
            </VaNavbarItem>
        </template>
        <template #right>
            <VaNavbarItem textColor="primary">
                <span>{{}}</span>
                <VaButton>Go to Checkout</VaButton>
            </VaNavbarItem>
        </template>
    </VaNavbar>
    <!-- Container -->
    <div class="full-width-container">
        <NuxtPage />
        <!-- <DesignerPage style="width: 100vw" /> -->
    </div>
</template>

<script lang="ts">
import { useDesignStore } from './src/stores/design'

const designStore = useDesignStore()

const test: ComputedRef<number> = designStore.totalPrice
</script>

<style type="text/css">
body {
    color: black;
}

.full-width-container {
    width: 100vw; /* Set the width to 100% of the viewport width */
    padding: 0; /* Ensure no padding is added */
    margin: 0; /* Ensure no margin is added */
}

#app {
    width: 100%; /* Ensure app container takes full width */
    height: 100%; /* Ensure app container takes full height */
    display: flex;
    flex-direction: column;
}

.nuxt-page {
    width: 100vw; /* Ensure NuxtPage takes full width */
    height: 100%; /* Optionally set the height */
    flex-grow: 1; /* Allow NuxtPage to grow and fill the available space */
}
</style>
