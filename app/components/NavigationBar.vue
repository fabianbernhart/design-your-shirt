<template>
    <nav class="flex h-20 items-center justify-between gap-2 bg-slate-100">
        <div class="p-4">
            <span class="text-4xl text-green-600">{{ titleItem.title }}</span>
        </div>
        <div class="m-4 flex items-center justify-center gap-10">
            <span class="text-4xl font-bold">
                <ClientOnly>
                    <span v-if="titleItem.showTotal">
                        {{ formattedTotalPrice }}€
                    </span>
                </ClientOnly>
            </span>
            <NuxtLink :href="titleItem.to ?? undefined">
                <BaseButton>
                    {{ titleItem.action }}
                </BaseButton>
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
