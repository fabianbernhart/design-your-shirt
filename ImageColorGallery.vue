<template>
    <div class="image-color-gallery">
        <div class="colors">
            <div
                v-for="(color, index) in colors"
                :key="index"
                :style="{ backgroundColor: color.color }"
                class="color-box rounded"
            >
            
        
        
        
        </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ImageColorGallery',
    props: {
        images: {
            type: Array,
            default: () => []
        },
        colors: {
            type: Array,
            default: () => []
        }
    }
}
</script>

<style scoped>
.image-color-gallery {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: 400px; /* Define the maximum height here */
    overflow-y: auto; /* Add scrollbar when content exceeds max height */
}

.colors {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

</style>
