<template class="full-width-container">
    <div class="container">
        <div class="controls-container-left">
            <div class="controls-content">
                <ColorSwitcher :colors="colors"></ColorSwitcher>
            </div>
        </div>
        <div class="shirt-container">
            <TShirtDesigner></TShirtDesigner>
        </div>
        <div class="controls-container-right">
            <div class="controls-content">
                <ColorSwitcher :colors="colors"></ColorSwitcher>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import TShirtDesigner from '@/src/components/TShirtDesigner.vue'
import ColorSwitcher from '@/src/components/ColorSwitcher.vue'
import { useDesignStore } from '../stores/design'

export default {
    components: {
        TShirtDesigner,
        ColorSwitcher
    },
    setup() {
        const designStore = useDesignStore()

        const colors = ref(['#c8f876', '#d12535'])

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
