<template>
    <div class="container">
        <div class="content">
            <div class="flex-item">
                <TShirtDesigner :color="color" :motive="motive" class="shirt" />
                <div class="description">
                    <p>
                        Motive:
                        {{ motive ? motive.name : 'Not Selected' }}
                    </p>
                    <p>
                        Shirt:
                        {{ color ? color.name : 'Not selected' }}
                    </p>
                </div>
            </div>
            <div class="flex-item card">
                <h2>Order Data</h2>
                <div class="order-data">
                    <p>
                        Motive:
                        <span
                            >{{
                                formatPrice(designStore.motive?.price)
                            }}
                            €</span
                        >
                    </p>
                    <p>
                        Shirt:
                        <span
                            >{{ formatPrice(designStore.color?.price) }} €</span
                        >
                    </p>
                </div>
                <hr />
                <p>Total: {{ formatPrice(designStore.totalPrice) }} €</p>
            </div>
            <div class="flex-item card">
                <h2>Personal Data</h2>
                <VaForm>
                    <VaInput
                        class="personal-data-input"
                        v-model="personalData.name"
                        :error="(errors.name ?? []).length > 0"
                        :error-messages="errors.name"
                        label="Name"
                        :autofocus="true"
                    />
                    <VaInput
                        immediate-validation
                        class="personal-data-input"
                        :error="(errors.address ?? []).length > 0"
                        v-model="personalData.address"
                        :error-messages="errors.address"
                        label="Address"
                    />
                </VaForm>
            </div>
        </div>
        <VaButton @click="buy()" color="success">
            Buy ({{ formatPrice(designStore.totalPrice) }} €)</VaButton
        >
    </div>
</template>

<script setup lang="ts">
import type { ValidationError } from '~/shared/types'

const designStore = useDesignStore()

const { personalData, formatPrice } = designStore

const { motive, color } = storeToRefs(designStore)

if (!color || !motive) {
    navigateTo('/designer')
}

const errors = ref<ValidationError['errors']>({
    name: [],
    address: []
})

type Order = { name: string; address: string }

const createOrder = async (order: Order) => {
    try {
        const resp: { success: boolean } = await $fetch('/api/order', {
            method: 'POST',
            body: order
        })

        if (resp.success) {
            errors.value = { name: [], address: [] }
            navigateTo('/order-success')
        }
    } catch (err: any) {
        const error = err?.data as ValidationError | undefined

        if (error?.errors) {
            errors.value = error.errors
        }
    }
}

const buy = () => {
    createOrder(designStore.personalData)
}
</script>

<style scoped>
.shirt {
    width: 100%;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f8f9fa;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
}

.content {
    display: flex;
    gap: 20px;
    width: 100%;
    justify-content: space-between;
}

.flex-item {
    flex: 1;
    max-width: 30%;
}

.flex-item p {
    font-size: x-large;
}

.flex-item h2 {
    font-size: xx-large;
}

.card {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
}

.description {
    text-align: center;
    margin-top: 10px;
}

.order-data p,
.order-data span {
    display: flex;
    justify-content: space-between;
}

@media (max-width: 900px) {
    .content {
        display: contents;
        flex-direction: row;
        width: 100vw;
        align-items: center;
    }

    .description {
        font-size: small;
    }

    .flex-item {
        display: block;
        min-width: 100%;
    }
    .personal-data-input {
        width: 100%;
    }
}
</style>
