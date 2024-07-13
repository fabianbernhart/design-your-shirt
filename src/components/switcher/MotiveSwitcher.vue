<template>
    <BaseControl :items="motives">
        <template #items="{ item }">
            <div class="rounded-rectangle" @click="setMotive(item)">
                <img
                    class="rounded-rectangle"
                    :style="getItemClass(item)"
                    :src="item.img"
                    height="20rem"
                    width="50rem"
                />
            </div>
        </template>
    </BaseControl>
</template>

<script setup lang="ts">
import BaseControl from '@/src/components/switcher/BaseSwitcher.vue'
import { useDesignStore } from '~/src/stores/design'
import type { Motive } from '~/src/stores/design'

const designStore = useDesignStore();
const { motives, motive } = storeToRefs(designStore);

const getItemClass = (motive: Motive): { border: string } | {} => {
    if (designStore.motive == motive) {
        return { border: '5px solid #000' }
    }
    return {}
}

const setMotive = (newMotive: Motive) => {
    motive.value = newMotive
    designStore.changeImg()
}
</script>

<style scoped>
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
    border-color: #000; /* Change border color on hover */
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); /* Apply box-shadow on hover */
}

.color-circle.active {
    border: 3px solid var(--secondary-color);
    padding: 5px;
}
</style>
