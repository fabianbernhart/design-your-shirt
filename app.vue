<template>
    <Navigation></Navigation>
    <div class="full-width-container">
        <NuxtPage />
    </div>
</template>

<script setup lang="ts">
import Navigation from '@/src/components/Navigation.vue'
</script>

<style type="text/css">
body {
    color: black;
}

.full-width-container {
    width: 100vw;
    padding: 0;
    margin: 0;
}

#app {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.nuxt-page {
    width: 100vw;
    height: 100%;
    flex-grow: 1;
}
</style>
