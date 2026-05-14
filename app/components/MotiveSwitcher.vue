<template>
    <BaseSwitcher @select="setMotive" :row="props.row" :items="motives">
        <template #items="{ item }">
            <img
                class="p-1"
                :style="getItemClass(item)"
                :src="item.img"
                :alt="item.name"
            />
        </template>
    </BaseSwitcher>
</template>

<script setup lang="ts">
const model = defineModel<undefined | Motive>({ required: true })
const props = withDefaults(
    defineProps<{
        motives: Motive[]
        row?: boolean
    }>(),
    {
        row: false
    }
)
const getItemClass = (motive: Motive): { border: string } | {} => {
    if (model.value == motive) {
        return { border: '5px solid #000' }
    }
    return {}
}

const setMotive = (newMotive: Motive) => {
    model.value = newMotive
}
</script>
