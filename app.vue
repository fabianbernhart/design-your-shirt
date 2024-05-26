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
                <VaButton>Go to Checkout</VaButton>
            </VaNavbarItem>
        </template>
    </VaNavbar>
    <!-- Container -->
    <div class="full-width-container">
        <DesignerPage style="width: 100vw" />
    </div>
</template>

<script lang="ts">
import DesignerPage from './src/pages/DesignerPage.vue'
import { useDesignStore } from './src/stores/design'

export default {
    components: {
        DesignerPage
    }
}
</script>

<style type="text/css">
body {
    color: black;
}

.full-width-container {
    width: 100vw; /* Set the width to 100% of the viewport width */
}
</style>
