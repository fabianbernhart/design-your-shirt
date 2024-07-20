<template>
    <div class="container">
        <div class="content">
            <div class="flex-item">
                <TShirtDesigner class="shirt" />
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
                <VaForm ref="formRef">
                    <VaInput
                        class="personal-data-input"
                        v-model="personalData.name"
                        :rules="nameRules"
                        label="Name"
                        :autofocus="true"
                    />
                    <VaInput
                        class="personal-data-input"
                        v-model="personalData.address"
                        :rules="addressRules"
                        label="Address"
                    />
                </VaForm>
            </div>
        </div>

        <VaButton @click="buy()" color="success" :disabled="!isValid">
            Buy ({{ formatPrice(17.1) }} €)</VaButton
        >
    </div>
</template>

<script setup lang="ts">
import TShirtDesigner from '@/src/components/TShirtDesigner.vue'
import { validation } from '@/src/stores/validation'
import { useForm } from 'vuestic-ui'
import { useDesignStore } from '@/src/stores/design'

const designStore = useDesignStore()

const { personalData, createOrder, formatPrice } = designStore

const { motive, color } = storeToRefs(designStore)

if (!color || !motive) {
    navigateTo('/designer')
}

const { maxLengthRules, notIncludes, requiredRules } = validation
const { isValid } = useForm('formRef')

const nameRules = [
    requiredRules('Name'),
    maxLengthRules(14, 'Name'),
    notIncludes('_', 'Name')
]

const addressRules = [requiredRules('Address')]
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
