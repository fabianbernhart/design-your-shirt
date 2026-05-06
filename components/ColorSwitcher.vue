<template>
    <BaseSwitcher @select="setColor" :row="props.row" :items="colors">
        <template #items="{ item }">
            <TShirtDesigner
                size="100px"
                :color="item"
                :style="[getBorderStyle(item)]"
            ></TShirtDesigner>
        </template>
    </BaseSwitcher>
</template>

<script setup lang="ts">
const model = defineModel<undefined | Color>({ required: true })
const props = withDefaults(
    defineProps<{
        row?: boolean
        colors: Color[]
    }>(),
    {
        row: false
    }
)

const emit = defineEmits<{
    (e: 'change', motive: Color): void
}>()

const getBorderStyle = (color: Color): { border: string } | {} => {
    if (model.value == color) {
        return { border: '5px solid #000' }
    }
    return {}
}

const setColor = (newColor: Color) => {
    model.value = newColor
}
</script>
