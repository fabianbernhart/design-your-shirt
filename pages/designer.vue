<template>
    <div v-if="breakpoint.smDown">
        <div class="flex-item shirt-container--50">
            <TShirtDesigner></TShirtDesigner>
        </div>
        <div class="flex-item switchers">
            <ColorSwitcher row></ColorSwitcher>
        </div>
        <div class="flex-item switchers">
            <MotiveSwitchers row></MotiveSwitchers>
        </div>
    </div>

    <div v-else class="flex-container">
        <div class="flex-item">
            <ColorSwitcher></ColorSwitcher>
        </div>
        <div class="flex-item shirt-container">
            <TShirtDesigner></TShirtDesigner>
        </div>
        <div class="flex-item">
            <MotiveSwitchers></MotiveSwitchers>
        </div>
    </div>
</template>

<script setup lang="ts">
import ColorSwitcher from '@/src/components/switcher/ColorSwitcher.vue'
import TShirtDesigner from '@/src/components/TShirtDesigner.vue'
import MotiveSwitchers from '@/src/components/switcher/MotiveSwitcher.vue'
import { useDesignStore } from '@/src/stores/design'

const designStore = useDesignStore()
const { colors } = storeToRefs(designStore)

if (colors.value.length == 0) {
    designStore.getColors()
    designStore.getMotives()
}

const breakpoint = useBreakpoint()
</script>

<style scoped>
.flex-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: auto;
    width: 100vw;
}

.flex-item {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
}

.color-switcher {
    flex: 1;
    justify-content: flex-start;
}

.shirt-container {
    flex: 1;
    justify-content: center;
    width: 60%;
    height: auto;
}

.shirt-container--50 {
    flex: 1;
    justify-content: center;
    width: 50%;
    height: auto;
}

.motive-switcher {
    flex: 1;
    justify-content: flex-end;

    align-items: end;
}

.switchers {
    align-items: center;
}

@media screen and (max-width: 1030px) {
    .flex-container {
        flex-direction: row;
        align-items: stretch;
        height: auto;
    }

    .flex-item {
        width: auto;
        height: auto;
        flex-direction: row;
    }
}
</style>
