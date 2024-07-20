<template>
    <BaseControl :row="props.row" :items="colors">
        <template #items="{ item }">
            <div @click="setColor(item)">
                <TShirtDesigner
                    size="100px"
                    :colorItem="toRef(item)"
                    class="rounded-rectangle"
                    :style="[getBorderStyle(item)]"
                ></TShirtDesigner>
            </div>
        </template>
    </BaseControl>
</template>

<script setup lang="ts">
import TShirtDesigner from '../TShirtDesigner.vue'
import BaseControl from '@/src/components/switcher/BaseSwitcher.vue'
import { useDesignStore } from '@/src/stores/design'
import type { Color } from '@/src/stores/design'

const designStore = useDesignStore()
const { colors, color } = storeToRefs(designStore)

const props = withDefaults(
    defineProps<{
        row?: boolean
    }>(),
    {
        row: false
    }
)

const getBorderStyle = (color: Color): { border: string } | {} => {
    if (designStore.color == color) {
        return { border: '5px solid #000' }
    }
    return {}
}

const setColor = (newColor: Color | null) => {
    color.value = newColor
}
</script>

<style scoped>
.rounded-rectangle {
    width: 100%;
    height: 100%;
    margin: 3px 0;
    border-radius: 10px;
    border: 5px solid none;
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
    border-color: #000;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}
</style>
