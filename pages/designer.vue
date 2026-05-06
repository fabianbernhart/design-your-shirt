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

<style scoped>
.flex-container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: auto;
    width: 100vw;
}

.flex-item {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
}

.color-switcher {
    flex: 1;
    justify-content: flex-start;
}

.shirt-container {
    flex: 1;
    justify-content: center;
    width: 60%;
    height: auto;
}

.shirt-container--50 {
    flex: 1;
    justify-content: center;
    width: 50%;
    height: auto;
}

.motive-switcher {
    flex: 1;
    justify-content: flex-end;

    align-items: end;
}

.switchers {
    align-items: center;
}

@media screen and (max-width: 1030px) {
    .flex-container {
        flex-direction: row;
        align-items: stretch;
        height: auto;
    }

    .flex-item {
        width: auto;
        height: auto;
        flex-direction: row;
    }
}
</style>
