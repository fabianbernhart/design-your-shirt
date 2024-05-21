<template>
    <VaNavbar color="#shadow" class="mb-3">
        <template #left>
            <VaNavbarItem class="font-bold"> Design your Shirt </VaNavbarItem>
        </template>
        <template #right>
            <VaNavbarItem>
                <VaButton>Go to Checkout</VaButton>
            </VaNavbarItem>
        </template>
    </VaNavbar>

    <div class="container">
        <div class="left">
            <image-color-gallery :colors="colors" />
        </div>
        <div class="center">
            <svg></svg>
        </div>
        <div class="right">
            <image-color-gallery :colors="colors" />
        </div>
    </div>
</template>

<script lang="ts">
import ImageColorGallery from './ImageColorGallery.vue'

export default {
    components: {
        ImageColorGallery
    },
    data() {
        return {
            price: 15.3,
            colors: []
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
.container {
    display: grid;
    grid-template-columns: 10vw 80vw 10vw;
    grid-template-rows: 1fr; /* Adjust height as needed */
    gap: 0; /* No gap between grid items */
}

.left,
.center,
.right {
    height: 100%;
}

.left {
    background-color: #ccc; /* Background color for left */
}

.center {
    background-color: #f0f0f0; /* Background color for center */
}

.right {
    background-color: #ccc; /* Background color for right */
}

.title {
    font-size: 24px;
    color: #7abb03;
    font-weight: bolder;
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
