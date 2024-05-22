// stores/design.js
import { ref, computed } from 'vue'
import axios from 'axios'

type Motive = {
    name: string
    price: number
    description: string
}

type Color = {
    name: string
    code: string
    price: number
}
export const useDesignStore = () => {
    const motive = ref<Motive | null>(null)
    const color = ref<Color | null>(null)
    const orderSuccess = ref(false)

    const motives = ref([])
    const shirts = ref([])
    const colors = ref([])

    const totalPrice = computed<number>((): number => {
        if (!motive.value || !color.value) return 0

        const motivePrice: number = motive.value.price
        const colorPrice: number = color.value.price

        const result: number = motivePrice + colorPrice

        return result
    })

    const fetchMotives = async () => {
        const response = await axios.get('/motives')
        motives.value = response.data
    }

    const fetchColors = async () => {
        const response = await axios.get('/colors')
        colors.value = response.data
    }

    const designAnotherProduct = () => {
        orderSuccess.value = false
        motive.value = null
        color.value = null
    }

    return {
        motive,
        color,
        orderSuccess,
        motives,
        shirts,
        colors,
        totalPrice,
        fetchMotives,
        fetchColors,
        designAnotherProduct
    }
}
