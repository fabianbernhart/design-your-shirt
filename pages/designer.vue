<template>
    <div v-if="breakpoint.smDown">
        <div class="flex-item shirt-container">
            <TShirtDesigner></TShirtDesigner>
        </div>
        <div class="flex-item switchers">
            <ColorSwitcher></ColorSwitcher>
            <MotiveSwitchers></MotiveSwitchers>
        </div>
    </div>

    <div v-else class="flex-container">
        <div class="flex-item color-switcher">
            <ColorSwitcher></ColorSwitcher>
        </div>
        <div class="flex-item shirt-container">
            <TShirtDesigner></TShirtDesigner>
        </div>
        <div class="flex-item motive-switcher">
            <MotiveSwitchers></MotiveSwitchers>
        </div>
    </div>
</template>

<script setup lang="ts">
import ColorSwitcher from '@/src/components/switcher/ColorSwitcher.vue'
import TShirtDesigner from '@/src/components/TShirtDesigner.vue'
import MotiveSwitchers from '@/src/components/switcher/MotiveSwitcher.vue'
import { useDesignStore } from '@/src/stores/design'

const designStore = useDesignStore();
const { colors, color } = storeToRefs(designStore);

if (colors.value.length == 0) {
    designStore.getColors();
    designStore.getMotives();
}

designStore.updateColor();
designStore.updateMotive();


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
    width: 60%; /* Adjust the width as needed */
    height: auto;
}

.motive-switcher {
    flex: 1;
    justify-content: flex-end;

    align-items: end;
}

.switchers {
    align-items: center;
    rotate: 90deg;
    scale: 0.9;
}

@media screen and (max-width: 1016px) {
    .flex-container {
        flex-direction: column;
        align-items: stretch;
        height: auto;
    }

    .flex-item {
        width: auto;
        height: auto;
    }
}

@media (max-width: 400px) {
    .switchers {
        scale: 0.7;
    }
}
</style>
