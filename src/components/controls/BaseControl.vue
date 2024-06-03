<template>
    <div class="color-switcher">
        <div class="arrow" v-if="canScrollPrev" @click="prevItem">
            <slot name="up-arrow">
                <span>&uarr;</span>
            </slot>
        </div>
        <div class="colors-container" @wheel="handleScroll">
            <slot
                name="items"
                v-for="(item, index) in visibleColors"
                :index="index"
                :key="index"
            >
                <slot name="item" @click="handleItemSelect(item)"></slot>
            </slot>
        </div>
        <div class="arrow" v-if="canScrollNext" @click="nextItem">
            <slot name="down-arrow">
                <span>&darr;</span>
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { designStore } from '@/src/stores/design'

type Color = {
    name: string
    color: string
    price: number
}

const props = withDefaults(
    defineProps<{
        initialIndex?: number
        visibleCount?: number
        items: unknown[],
        "v-model": unknown
    }>(),
    {
        initialIndex: 0,
        visibleCount: 5,
    }
)

const prevItem = () => {
    startIndex.value = Math.max(startIndex.value - visibleCount.value, 0)
}
const nextItem = () => {
    startIndex.value = Math.min(
        startIndex.value + visibleCount.value,
        items.value.length - visibleCount.value
    )
}
const handleScroll = (event: WheelEvent) => {
    if (event.deltaY > 0) {
        nextItem()
    } else {
        prevItem()
    }
}

const items = computed<unknown[]>(() => props.items)


const emit = defineEmits(['select', 'load'])

const handleItemSelect = (item: unknown) => {
    emit('select', item);
}

const visibleCount = ref(props.visibleCount)
const startIndex = ref(0)


const visibleColors = computed(() =>
items.value.slice(startIndex.value, startIndex.value + visibleCount.value)
)
const canScrollPrev = computed(() => startIndex.value > 0)
const canScrollNext = computed(
    () => startIndex.value + visibleCount.value < items.value.length
)

const setItem = (item: unknown) => {
}



const getItemClass = (color: Color): { border: string } | {} => {
    if (designStore.color.value == color) {
        return { border: '4px solid #000' }
    }
    return {}
}


onMounted(() => {
    designStore.fetchColors()
    emit('load');
}),
</script>

<style scoped>
.color-switcher {
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
    color: var(--secondary-color);
    font-size: 24px;
    transition: color 0.3s;
}

.arrow:hover {
    color: darken(var(-secondary-color), 10%);
}

.colors-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
}

.color-circle {
    margin: 5px 0;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px solid var(--secondary-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-color);
    font-size: 14px;
    font-weight: bold;
    transition:
        transform 0.3s,
        box-shadow 0.3s;
}

.color-circle:hover {
    border-color: var(--primary-color); /* Change border color on hover */
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); /* Apply box-shadow on hover */
}

.color-circle.active {
    border: 3px solid var(--secondary-color);
    padding: 5px;
}
</style>
