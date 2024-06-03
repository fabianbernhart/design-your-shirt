<template>
    <div class="switcher">
        <div class="arrow" v-if="canScrollPrev" @click="prevColors">
            <slot name="up-arrow">
                <span>&uarr;</span>
            </slot>
        </div>
        <div class="items-container" @wheel="handleScroll">
            <div
                name="items"
                @click="setMotive(color)"
                v-for="(color, index) in visibleColors"
                :index="index"
                :key="index"
            >
                <img
                    class="rounded-rectangle"
                    :style="getItemClass(color)"
                    :src="color.img"
                    height="20rem"
                    width="50rem"
                />
            </div>
        </div>
        <div class="arrow" v-if="canScrollNext" @click="nextColors">
            <slot name="down-arrow">
                <span>&darr;</span>
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { designStore } from '@/src/stores/design'

type Motive = {
    name: string
    img: string
    price: number
}

const props = withDefaults(
    defineProps<{
        initialIndex?: number
        visibleCount?: number
    }>(),
    {
        initialIndex: 0,
        visibleCount: 5
    }
)

const getItemClass = (motive: Motive): { border: string } | string => {
    if (designStore.motive.value == motive) {
        return { border: '5px solid #000' }
    }
    return ''
}

designStore.fetchMotives()

const visibleCount = ref(props.visibleCount)
const startIndex = ref(0)

const motives = computed(() => designStore.motives.value)
const visibleColors = computed(() =>
    motives.value.slice(startIndex.value, startIndex.value + visibleCount.value)
)
const canScrollPrev = computed(() => startIndex.value > 0)
const canScrollNext = computed(
    () => startIndex.value + visibleCount.value < motives.value.length
)

const setMotive = (motive: Motive) => {
    designStore.motive.value = motive
    designStore.changeImg()
}
const prevColors = () => {
    startIndex.value = Math.max(startIndex.value - visibleCount.value, 0)
}
const nextColors = () => {
    startIndex.value = Math.min(
        startIndex.value + visibleCount.value,
        motives.value.length - visibleCount.value
    )
}
const handleScroll = (event: WheelEvent) => {
    if (event.deltaY > 0) {
        nextColors()
    } else {
        prevColors()
    }
}
</script>
<style scoped>
:root {
    --hover-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.switcher {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: var(--primary-color);
    border-radius: 10px;
    box-shadow: var(--hover-shadow);
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
    color: darken(var(--secondary-color), 10%);
}

.items-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
}

.rounded-rectangle {
    width: 100px;
    height: 100px;
    margin: 5px 0;
    border-radius: 10px; /* Adjust border-radius to control the roundness */
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
        border-color 0.3s,
        box-shadow 0.3s;
}

.rounded-rectangle:hover {
    border-color: var(--primary-color); /* Change border color on hover */
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); /* Apply box-shadow on hover */
}

.color-circle.active {
    border: 3px solid var(--secondary-color);
    padding: 5px;
}
</style>
