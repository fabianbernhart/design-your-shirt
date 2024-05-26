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
    color: string
    price: number
}

const ENV_BASE_URL: string = 'localhost:3023'

export const useDesignStore = () => {
    const motive = ref<Motive | null>(null)
    const color = ref<Color | null>(null)
    const orderSuccess = ref<boolean>(false)

    const motives = ref<Motive[]>([])
    const colors = ref<Color[]>([])

    const totalPrice = computed<number>((): number => {
        const motivePrice: number = motive.value ? motive.value.price : 0
        const colorPrice: number = color.value ? color.value.price : 0

        const result: number = motivePrice + colorPrice

        return result
    })

    const fetchColors = async () => {
        const response = await axios.get(`/api/colors`)
        colors.value = response.data
    }

    const fetchMotives = async () => {
        const response = await axios.get(`/api/motives`)
        motives.value = response.data
    }

    const designAnotherProduct = () => {
        orderSuccess.value = false
        motive.value = null
        color.value = null
    }

    const init = async () => {
        await fetchColors()
        await fetchMotives()

        console.debug('colors', colors.value)
        console.debug('value', motives.value)
    }

    return {
        motive,
        color,
        orderSuccess,
        motives,
        colors,
        totalPrice,
        fetchMotives,
        fetchColors,
        designAnotherProduct,
        init
    }
}
