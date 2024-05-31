<template>
    <div class="container">
        <div class="controls-container-left">
            <div>
                <ColorSwitcher></ColorSwitcher>
            </div>
        </div>
        <div class="shirt-container">
            <TShirtDesigner></TShirtDesigner>
        </div>
        <div class="controls-container-right">
            <MotiveSwitcher></MotiveSwitcher>
        </div>
    </div>
</template>

<script setup>
import TShirtDesigner from '@/src/components/TShirtDesigner.vue'
import ColorSwitcher from '@/src/components/ColorSwitcher.vue'
import MotiveSwitcher from '@/src/components/MotiveSwitcher.vue'
</script>

<style scoped>
.container {
    margin-top: 5rem;
}
.controls-container-left,
.controls-container-right {
    margin-top: 5rem;
    width: 200px; /* Adjust the width of the control containers */
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
    flex-grow: 1; /* Allow the shirt container to grow and take available space */
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
