<template>
    <div class="order-success-page">
        <div class="content">
            <h1>Thank you {{ personalData.name }} for your order!</h1>

            <NuxtLink href="/designer">
                <BaseButton @click="reset()">
                    {{ 'Design Another Product' }}
                </BaseButton>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
const designStore = useDesignStore()

const { personalData, color, colors, motive, motives } =
    storeToRefs(designStore)

const reset = () => {
    color.value = colors.value[0] ?? null
    motive.value = motives.value[0] ?? null
}
</script>

<style scoped>
h1 {
    font-size: xx-large;
}

.order-success-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin-top: 10rem;
}

.content {
    text-align: center;
}
</style>
