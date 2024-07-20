<template>
    <div :class="`base-switcher--${directionClass}`">
        <div class="arrow" v-if="canScrollPrev" @click="prevItems">
            <slot name="up-arrow">
                <span v-if="props.row">&larr;</span>
                <span v-else>&uarr;</span>
            </slot>
        </div>
        <div
            :class="`items-container--${directionClass}`"
            @wheel="handleScroll"
        >
            <slot
                name="items"
                v-for="(item, index) in visibleItems"
                :item="item"
                :index="index"
                :key="index"
            ></slot>
        </div>
        <div class="arrow" v-if="canScrollNext" @click="nextItems">
            <slot name="next-arrow">
                <span v-if="props.row">&rarr;</span>
                <span v-else>&darr;</span>
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts" generic="T">
import { ref, computed } from 'vue'

const props = withDefaults(
    defineProps<{
        initialIndex?: number
        visibleCount?: number
        row?: boolean
        items: T[]
    }>(),
    {
        row: false,
        initialIndex: 0,
        visibleCount: 5
    }
)

const visibleCount = ref(props.visibleCount)
const startIndex = ref(props.initialIndex)

const visibleItems = computed(() =>
    props.items.slice(startIndex.value, startIndex.value + visibleCount.value)
)

const canScrollPrev = computed(() => startIndex.value > 0)
const canScrollNext = computed(
    () => startIndex.value + visibleCount.value < props.items.length
)

const prevItems = () => {
    startIndex.value = Math.max(startIndex.value - visibleCount.value, 0)
}

const nextItems = () => {
    startIndex.value = Math.min(
        startIndex.value + visibleCount.value,
        props.items.length - visibleCount.value
    )
}

const handleScroll = (event: WheelEvent) => {
    if (event.deltaY > 0) {
        nextItems()
    } else {
        prevItems()
    }
}

const directionClass = computed(() => {
    if (props.row) return 'row'
    return 'column'
})
</script>

<style scoped>
.base-switcher--row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border-radius: 10px;
    width: 100%;
}

.base-switcher--column {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    max-width: 200px;
}

.arrow {
    cursor: pointer;
    margin: 10px 0;
    color: #000;
    font-size: 24px;
    transition: color 0.3s;
}

.arrow:hover {
    color: darken(var(--secondary-color), 10%);
}

.items-container--column {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
}

.items-container--row {
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: hidden;
    overflow-x: scroll;
}
</style>
