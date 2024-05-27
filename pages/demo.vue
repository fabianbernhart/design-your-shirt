<template class="full-width-container"></template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import TShirtDesigner from '@/src/components/TShirtDesigner.vue'
import ColorSwitcher from '@/src/components/ColorSwitcher.vue'
import { useDesignStore } from '@/src/stores/design'

export default {
    components: {
        TShirtDesigner,
        ColorSwitcher
    },
    setup() {
        const designStore = useDesignStore()

        const colors = ref(designStore.colors)

        const handleSubmit = async () => {
            try {
                const response = await axios.post('/orders', {
                    motive: designStore.motive,
                    shirt: designStore.shirt,
                    color: designStore.color
                })
                designStore.orderSuccess = true
            } catch (error) {
                console.error(error)
            }
        }

        return {
            designStore,
            handleSubmit,
            colors
        }
    }
}
</script>

<style scoped>
.container {
    position: relative;
    margin-right: 0;
    left: 0;
    right: 0;
    margin-top: 20px;
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
    position: relative;
}

.shirt-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>
