<template>
    <BaseControl :items="colors">
        <template #items="{ item }">
            <div
                class="color-circle"
                :style="[
                        getItemClass(item),
                        { backgroundColor: item.color }
                    ]"
                @click="setColor(item)"
            ></div>
        </template>
    </BaseControl>
</template>

<script setup lang="ts">
import BaseControl from '@/src/components/switcher/BaseSwitcher.vue'
import { designStore } from '~/src/stores/design';
import type { Color } from '~/src/stores/design';


designStore.getColors()

const colors = computed<Color[]>(() => designStore.colors.value)


const setColor = (color: Color) => {
    designStore.color.value = color
    designStore.updateColor()
}

const getItemClass = (color: Color): { border: string } | {} => {
    if (designStore.color.value == color) {
        return { border: '4px solid #000' }
    }
    return {}
}
</script>

<style scoped>
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