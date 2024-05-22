<template>
    <VaNavbar color="#shadow" class="title">
        <template #left>
            <VaNavbarItem text-color="primary">
                Design your Shirt
            </VaNavbarItem>
        </template>
        <template #right>
            <VaNavbarItem>
                <v-btn>Go to Checkout</v-btn>
            </VaNavbarItem>
        </template>
    </VaNavbar>
    <div class="">
        <ColorSelector v-model="selectedColor" :colors="colors" />
        <ShirtMotive></ShirtMotive>

    </div>

    
</template>

<script lang="ts">
import ColorSelector from '@/src/components/ColorSelector.vue'
import ShirtMotive from '@/src/components/ShirtMotive.vue'
import {useDesignStore} from "@/src/stores/design"

export default {
    components: {
        ColorSelector,
        ShirtMotive,
    },
    data() {
        return {
            price: 15.3,
            colors: [],
            selectedColor: {} as any,
        }
    },
    mounted() {
        this.fetchColors()
    },

    methods: {
        fetchColors() {
            fetch('/api/colors')
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok')
                    }
                    return response.json()
                })
                .then((data) => {
                    this.colors = data
                    console.debug(data)
                })
                .catch((error) => {
                    console.error(
                        'There was a problem fetching the colors:',
                        error
                    )
                })
        },
        fetchImages() {
            fetch('/api/motives')
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok')
                    }
                    return response.json()
                })
                .then((data) => {
                    this.colors = data
                    console.debug(data)
                })
                .catch((error) => {
                    console.error(
                        'There was a problem fetching the motives:',
                        error
                    )
                })
        }
    }
}
</script>

<style type="text/css">
html,
body,
#__nuxt,
#__layout {
    height: 100% !important;
    width: 100% !important;
    position: relative;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.element {
    position: absolute;
}

.align-right {
    justify-content: left;
    margin-right: auto;
    align-content: center;
}

.st0 {
    fill: #94d600;
}

.st1 {
    fill: #5a8c00;
}

.st2 {
    fill: #82be00;
}

.st3 {
    fill: none;
    stroke: #000000;
    stroke-width: 2;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
}

.st4 {
    fill: none;
    stroke: #000000;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
    stroke-dasharray: 3;
}
</style>
