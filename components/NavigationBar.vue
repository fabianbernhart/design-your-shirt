<template>
    <nav class="flex justify-between gap-2 items-center h-20 bg-slate-100">
        <div class="p-4">
            <span class="text-green-600 text-4xl">{{ titleItem.title }}</span>
        </div>
        <div class="flex gap-10 m-4 items-center">
            <span class="text-4xl font-bold">
                <ClientOnly>
                    <span v-if="titleItem.showTotal">
                        {{ formattedTotalPrice }}€
                    </span>
                </ClientOnly>
            </span>
            <NuxtLink
                :href="titleItem.to ?? undefined"
                class="p-4 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 cursor-pointer"
            >
                {{ titleItem.action }}
            </NuxtLink>
        </div>
    </nav>
</template>

<script setup lang="ts">
const props = defineProps<{
    titleItem: TitleObjectType
    totalPrice: number
}>()

const formattedTotalPrice = computed(() => {
    return props.totalPrice.toFixed(2)
})
</script>
