<template>
    <div class="image-color-gallery">
        <VaButtonGroup
            class="colors"
            v-for="(color, index) in colors"
            :key="index"
        >
            <div class="colors">
                <VaButton
                    size="large"
                    :color="color.color"
                    round
                    class="mt-16"
                ></VaButton>
            </div>
        </VaButtonGroup>
    </div>
</template>

<script>
export default {
    name: 'ColorScroller',
    props: {
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
    align-items: right;
    max-height: 400px;
    overflow-y: auto;
}

.colors {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>
