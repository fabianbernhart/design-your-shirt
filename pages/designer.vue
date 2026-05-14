<template>
    <NuxtLayout class="max-w-full" name="wrapper">
        <template #left>
            <ColorSwitcher
                v-model="color"
                :colors="colors"
                :row="smDown"
            ></ColorSwitcher>
        </template>

        <template #center>
            <TShirtDesigner v-bind="shirtBinding"></TShirtDesigner>
        </template>

        <template #right>
            <MotiveSwitcher
                v-model="motive"
                :motives="motives"
                :row="smDown"
            ></MotiveSwitcher>
        </template>
    </NuxtLayout>
</template>

<script setup lang="ts">
const designStore = useDesignStore()
const { colors, color, motive, motives } = storeToRefs(designStore)

const shirtBinding = computed(() => {
    return {
        color: color.value,
        motive: motive.value
    }
})

if (colors.value.length == 0) {
    designStore.getColors()
    designStore.getMotives()
}

const smDown = useMediaQuery('(max-width: 640px)')
</script>
