<template>
    <button
        :type="type || 'button'"
        :disabled="disabled || loading"
        v-bind="$attrs"
        :class="[
            'rounded-lg px-4 py-2 transition font-medium',
            variant === 'secondary'
                ? 'bg-gray-200 text-black'
                : 'bg-black text-white',
            (disabled || loading) && 'cursor-not-allowed opacity-50'
        ]"
        @click="emit('click', $event)"
    >
        <slot />

        <span v-if="loading" class="ml-2 inline-block"> ... </span>
    </button>
</template>

<script setup lang="ts">
defineProps<{
    form?: string
    variant?: 'primary' | 'secondary'
    disabled?: boolean
    loading?: boolean
    type?: 'button' | 'submit' | 'reset'
}>()

const emit = defineEmits<{
    click: [event: MouseEvent]
}>()
</script>
