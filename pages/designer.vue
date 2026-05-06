<template>
    <NuxtLayout class="max-w-full" name="wrapper">
        <template #left>
            <ColorSwitcher
                v-model="color"
                :colors="colors"
                :row="breakpoint.smDown"
            ></ColorSwitcher>
        </template>

        <template #center>
            <TShirtDesigner v-bind="shirtBinding"></TShirtDesigner>
        </template>

        <template #right>
            <MotiveSwitcher
                v-model="motive"
                :motives="motives"
                :row="breakpoint.smDown"
            ></MotiveSwitcher>
        </template>
    </NuxtLayout>
</template>

<script setup lang="ts">
const designStore = useDesignStore()
const { colors, color, motive, motives } = storeToRefs(designStore)

const onUpdateMotive = (newMotive: Motive) => {
    motive.value = newMotive
}

const onUpdateColor = (newColor: Color) => {
    color.value = newColor
}

const shirtBinding = computed(() => {
    return {
        color: color.value,
        motive: motive.value
    }
})

// TODO: fix do not refetch colors and motives on new product
if (colors.value.length == 0) {
    designStore.getColors()
    designStore.getMotives()
}

const breakpoint = useBreakpoint()
</script>
