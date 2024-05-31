<template>
    <div class="color-switcher">
        <div class="arrow" v-if="canScrollPrev" @click="prevColors">
            <slot name="up-arrow">
                <span>&uarr;</span>
            </slot>
        </div>
        <div class="colors-container" @wheel="handleScroll">
            <slot
                name="items"
                v-for="(color, index) in visibleColors"
                :color="color"
                :index="index"
                :key="index"
            >
                <div
                    class="color-circle"
                    :style="[getItemClass(color), { backgroundColor: color.color,}]"
                    @click="setColor(color)"
                ></div>
            </slot>
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
import { useDesignStore } from '@/src/stores/design'

type Color = {
    name: string
    color: string
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

const emit = defineEmits(['color-change'])

const designStore = useDesignStore()
designStore.fetchColors()

const visibleCount = ref(props.visibleCount)
const startIndex = ref(0)

const colors = computed<Color[]>(() => designStore.colors.value)
const visibleColors = computed(() =>
    colors.value.slice(startIndex.value, startIndex.value + visibleCount.value)
)
const canScrollPrev = computed(() => startIndex.value > 0)
const canScrollNext = computed(
    () => startIndex.value + visibleCount.value < colors.value.length
)

const setColor = (color: Color) => {
    designStore.color.value = color
    designStore.changeColors()
}

const prevColors = () => {
    startIndex.value = Math.max(startIndex.value - visibleCount.value, 0)
}
const nextColors = () => {
    startIndex.value = Math.min(
        startIndex.value + visibleCount.value,
        colors.value.length - visibleCount.value
    )
}
const handleScroll = (event: WheelEvent) => {
    if (event.deltaY > 0) {
        nextColors()
    } else {
        prevColors()
    }
}

const getItemClass = ((color: Color): {border: string} | {} => {


    if (designStore.color.value == color ) {
        return { border: "4px solid #000"}
    }
    return {}
})

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
