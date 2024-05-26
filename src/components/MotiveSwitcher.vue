<template>
    <div class="color-switcher">
        <div class="arrow">
            <slot name="up-arrow">
                <span>&uarr;</span>
            </slot>
        </div>
        <div
            v-for="(motive, index) in motives"
            :key="index"
            class="color-circle"
            :class="{ active: index === 0 }"
        >
            <slot :name="motive" :color="motive"> </slot>
        </div>
        <div class="arrow">
            <slot name="down-arrow">
                <span>&darr;</span>
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
    motives: Array<{ id: number; name: string; price: number }>
}>()
const emits = defineEmits(['update:selectedMotive'])

const selectMotive = (motive: { id: number; name: string; price: number }) => {
    emits('update:selectedMotive', motive)
}
</script>

<style scoped>
/* Add styles for motive switcher here */
</style>
