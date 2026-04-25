<template>
    <nav class="flex justify-between gap-2 items-center h-20 bg-slate-100">
        <div class="p-4">
            <span class="text-green-600 text-4xl">{{ title.title }}</span>
        </div>
        <div class="flex gap-10 m-4 items-center">
            <span class="text-4xl font-bold">
                <ClientOnly v-if="title.showTotal">
                    <span> {{ totalPrice.toFixed(2) }}€ </span>
                </ClientOnly>
            </span>
            <a
                :href="title.to ?? undefined"
                class="p-4 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 cursor-pointer"
            >
                {{ title.action }}
            </a>
        </div>
    </nav>
</template>

<script setup lang="ts">
const designStore = useDesignStore()
const { totalPrice } = storeToRefs(designStore)

const titleStore = useTitleStore()

const title = computed(() => {
    return titleStore.getTitle.value
})
</script>
