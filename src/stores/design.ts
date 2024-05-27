// stores/design.js
import { ref, computed } from 'vue'
import axios from 'axios'

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

const host = "http://localhost:3023"

export const useDesignStore = () => {
    const properties = ['--st0-color', '--st1-color', '--st2-color']

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

    const changeColors = () => {
        if (!color.value) return

        for (const property of properties) {
            document.documentElement.style.setProperty(
                property,
                color.value.color
            )
        }
    }

    const getMotiveImage = (newMotive: Motive) => {
        motive.value = newMotive

        return motive.value.img
    }

    const fetchColors = async () => {
        const response = await axios.get(`${host}/api/colors`)
        colors.value = response.data
    }

    const fetchMotives = async () => {
        const response = await axios.get(`${host}/api/motives`)
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
    }

    return {
        motive,
        color,
        orderSuccess,
        motives,
        colors,
        totalPrice,
        changeColors,
        getMotiveImage,
        fetchMotives,
        fetchColors,
        designAnotherProduct,
        init
    }
}
