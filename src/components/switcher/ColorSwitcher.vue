<template style="border: 1px red solid">
    <BaseControl :items="colors">
        <template #items="{ item }">
            <div
                class="color-circle"
                :style="[getBorderStyle(item), { backgroundColor: item.color }]"
                @click="setColor(item)"
            ></div>
        </template>
    </BaseControl>
</template>

<script setup lang="ts">
import BaseControl from '@/src/components/switcher/BaseSwitcher.vue'
import { useDesignStore } from '@/src/stores/design'
import type { Color } from '@/src/stores/design'

const designStore = useDesignStore()
const { colors, color } = storeToRefs(designStore)

const getBorderStyle = (color: Color): { border: string } | {} => {
    if (designStore.color == color) {
        return { border: '5px solid #000' }
    }
    return {}
}

const setColor = (newColor: Color | null) => {
    color.value = newColor
    designStore.updateColor()
}
</script>

<style scoped>
.color-circle {
    margin: 5px 0;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px solid var(--va--secondary-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
    transition:
        transform 0.3s,
        box-shadow 0.3s;
}

.color-circle:hover {
    border-color: #000; /* Change border color on hover */
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); /* Apply box-shadow on hover */
}

.color-circle.active {
    border: 3px solid var(--secondary-color);
    padding: 5px;
}
</style>
