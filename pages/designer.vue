<template class="full-width-container">
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
.full-width-container {
    width: 100vw; /* Set the width to 100% of the viewport width */
    height: 100vh;
    overflow-x: hidden;
}

.container {
  position: relative;
  width: 100%; /* Ensure the container takes full width of the parent */
  height: 100%; /* Ensure the container takes full height of the parent */
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0; /* Adjust top and bottom margin as needed */
}
.controls-container-left, .controls-container-right {
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
