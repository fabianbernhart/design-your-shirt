<template>
    <Navigation></Navigation>
    <div class="full-width-container">
        <NuxtPage />
    </div>
</template>

<script setup lang="ts">
import { designStore } from './src/stores/design'
import { useTitleStore } from '~/src/stores/title'
import Navigation from '@/src/components/Navigation.vue'

const titleStore = useTitleStore()

const navigateToNewPage = () => {
    navigateTo(title.value.to)
}

const title = computed(() => titleStore.titleObject.value)
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
