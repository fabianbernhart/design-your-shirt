// stores/design.js
import { ref, computed } from 'vue'
import { getActivePinia } from 'pinia'

export type Motive = {
    name: string
    price: number
    img: string
}

export type Color = {
    name: string
    color: string
    price: number
}

export const useDesignStore = defineStore('designStore', () => {
    const color = ref<Color | null>(null)
    const motive = ref<Motive | null>(null)
    const motives = ref<Motive[]>([])
    const colors = ref<Color[]>([])

    const motivePrice = ref<number>(0)
    const colorPrice = ref<number>(0)

    const personalData = ref({
        name: '',
        address: ''
    })

    const getColors = (): void => {
        useFetch<Color[]>('/api/colors')
            .then(({ data, error }) => {
                if (error.value) {
                    console.error("Error loading '/api/colors':", error.value)
                    return
                }

                if (!data.value) {
                    console.error("No data returned from '/api/colors'")
                    return
                }

                colors.value = data.value

                if (!color.value) {
                    color.value = colors.value[0] || null
                }
            })
            .catch((err) => {
                console.error('An unexpected error occurred:', err)
            })
    }

    const getMotives = (): void => {
        useFetch<Motive[]>('/api/motives')
            .then(({ data, error }) => {
                if (error.value) {
                    console.error("Error loading '/api/motives':", error.value)
                    return
                }

                if (!data.value) {
                    console.error("No data returned from '/api/motives'")
                    return
                }

                motives.value = data.value

                if (!motive.value) {
                    motive.value = motives.value[0] || null
                }
            })
            .catch((err) => {
                console.error('An unexpected error occurred:', err)
            })
    }

    const createOrder = async (order: { name: string; address: string }) => {
        useFetch('/api/order', {
            method: 'post',
            body: {
                name: order.name,
                address: order.address
            }
        })
            .then(({ data, error }) => {
                if (error.value) {
                    console.error('Error creating order:', error.value)
                    return
                }

                if (!data.value) {
                    console.error('No data returned from order creation')
                    return
                }

                navigateTo('order-success')
            })
            .catch((err) => {
                console.error('An unexpected error occurred:', err)
            })
    }

    const totalPrice = computed((): number => {
        if (!motive.value || !color.value) {
            return 0
        }

        const result = motive.value.price + color.value.price

        const fixedResult = result.toFixed(2)

        return Number.parseFloat(fixedResult)
    })

    const formatPrice = (number: number = 0): string => {
        const convertedNumber: string = number.toString()
        const parts = convertedNumber.split('.')

        if (parts.length === 2) {
            if (parts[1].length == 2) {
                return `${parts[0]},${parts[1]}`
            }

            return `${parts[0]},${parts[1]}0`
        }
        return convertedNumber
    }

    const $reset = () => {
        color.value = null
        motive.value = null
        motives.value = []
        colors.value = []

        motivePrice.value = 0
        colorPrice.value = 0

        personalData.value = {
            name: '',
            address: ''
        }
    }

    return {
        motivePrice,
        colorPrice,
        motive,
        color,
        personalData,
        motives,
        colors,
        totalPrice,
        $reset,
        getMotives,
        getColors,
        createOrder,
        formatPrice
    }
})
