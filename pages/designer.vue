<template>
    <div class="container">
        <div class="controls-container-left flex-item">
            <div>
                <ColorSwitcher></ColorSwitcher>
            </div>
        </div>
        <div class="shirt-container">
            <TShirtDesigner></TShirtDesigner>
        </div>
        <div class="controls-container-right flex-item">
            <MotiveSwitchers></MotiveSwitchers>
        </div>
    </div>
</template>

<script setup lang="ts">
import ColorSwitcher from '@/src/components/switcher/ColorSwitcher.vue';
import TShirtDesigner from '@/src/components/TShirtDesigner.vue';

import MotiveSwitchers from '@/src/components/switcher/MotiveSwitcher.vue';
</script>

<style scoped>
.container {
    margin-top: 5rem;
}
.controls-container-left,
.controls-container-right {
    margin-top: 5rem;
    width: 200px;
}

.controls-container-right {
    position: absolute;
    top: 0;
    right: 0;
}

.controls-container-left {
    position: absolute;
    top: 0;
    left: 0;
}

.shirt-container {
    width: 100vw;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

@media (max-width: 799px) {
    .shirt-container {
            height: 50vh;
            flex-grow: 1;
            display: flex;
            justify-content: center;
            align-items: center;
    }


    .flex-item {
        display: flex;
        width: 100%;
    }
    .controls-container-right {
        top: 70%;
        transform: rotate(90deg);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100px;
    }

    .controls-container-left {
        top: 80%;
        transform: rotate(90deg);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100px;
    }
}

@media (max-width: 450px) {
    .controls-container-right,
    .controls-container-left {
        scale: 0.6
    }


}


</style>
