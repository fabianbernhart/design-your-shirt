<template style="border: 1px red solid">
    <BaseSwitcher :row="props.row" :items="motives">
        <template #items="{ item }">
            <div @click="setMotive(item)">
                <img
                    class="rounded-rectangle"
                    :style="getItemClass(item)"
                    :src="item.img"
                    :alt="item.name"
                />
            </div>
        </template>
    </BaseSwitcher>
</template>

<script setup lang="ts">
const designStore = useDesignStore()
const { motives } = storeToRefs(designStore)

const props = withDefaults(
    defineProps<{
        motives: Motive[]
        row?: boolean
    }>(),
    {
        row: false
    }
)

const emit = defineEmits<{
    (e: 'change', motive: Motive): void
}>()

const getItemClass = (motive: Motive): { border: string } | {} => {
    if (designStore.motive == motive) {
        return { border: '5px solid #000' }
    }
    return {}
}

const setMotive = (newMotive: Motive) => {
    emit('change', newMotive)
}
</script>

<style scoped>
.rounded-rectangle {
    width: 100%;
    height: 100%;
    margin: 5px 0;
    border-radius: 10px;
    border: 2px solid none;
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
