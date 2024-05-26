<template>
    <div class="color-switcher">
        <div class="arrow" @click="prevColor">
            <slot name="up-arrow">
                <span>&uarr;</span>
            </slot>
        </div>
        <div
            v-for="(color, index) in colors"
            :key="index"
            class="color-circle"
            :style="{ backgroundColor: color.color }"
        >
            <slot>{{ color.name }}</slot>
        </div>
        <div class="arrow" @click="nextColor">
            <slot name="down-arrow">
                <span>&darr;</span>
            </slot>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { useDesignStore } from '../stores/design';

// TODO: Centralize Types
type Color = {
    name: string
    color: string
    price: number
}

const props = withDefaults(defineProps<{
    initialIndex?: number;
}>(), {
    initialIndex: 0
});


// Initialize the design store
const designStore = useDesignStore();
designStore.init();

// Reactive property for colors
const colors = computed(() => designStore.colors.value);

// Current index for selected color
const currentIndex = ref(props.initialIndex!);

// Method to set the color
const setColor = (color: Color) => {
    console.debug("debug", color);
    return color.color;
};

// Method to select previous color
const prevColor = () => {
    currentIndex.value =
        (currentIndex.value - 1 + colors.value.length) % colors.value.length;
};

// Method to select next color
const nextColor = () => {
    currentIndex.value =
        (currentIndex.value + 1) % colors.value.length;
};
</script>

<style scoped>
.color-switcher {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2 solid #000;
}
.arrow {
    cursor: pointer;
    margin: 10px 0;
}
.color-circle {
    margin: 5px 0;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid #000; /* Add this line for visibility */
}
.color-circle.active {
    border: 2px solid #000;
    padding: 5px;
}
.color-display {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
</style>
