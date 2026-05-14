<template>
    <div class="input-wrapper">
        <label v-if="label">{{ label }}</label>

        <input
            v-bind="$attrs"
            :value="modelValue"
            @input="onInput"
            :class="[
                'border rounded px-3 py-2 w-full',
                error && 'border-red-500'
            ]"
        />

        <p v-if="errorMessages?.length" class="text-red-500 text-sm">
            {{ errorMessages[0] }}
        </p>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    modelValue: string
    label?: string
    error?: boolean
    errorMessages?: string[]
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

function onInput(e: Event) {
    emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>
