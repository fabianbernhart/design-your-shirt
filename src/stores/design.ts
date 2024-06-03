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

const host = 'http://localhost:3023'
const properties = ['--st0-color', '--st1-color', '--st2-color']

export const useDesignStore = () => {
    const color = ref<Color | null>(null)
    const motive = ref<Motive | null>(null)
    const motives = ref<Motive[]>([])
    const colors = ref<Color[]>([])
    const orderSuccess = ref<boolean>(false) // not used

    const motivePrice = ref<number>(0)
    const colorPrice = ref<number>(0)

    const updateColor = () => {
        if (!color.value) return

        for (const property of properties) {
            document.documentElement.style.setProperty(
                property,
                color.value.color
            )
        }
    }

    const changeImg = () => {
        if (!motive.value) return
        const imageElements = document.getElementsByClassName('optionalImg')

        for (const imageElement of imageElements) {
            imageElement.setAttribute('href', motive.value.img)
        }
    }

    const getColors = async () => {
        const response = await axios.get(`${host}/api/colors`)
        colors.value = response.data

        if (!color.value) {
            color.value = colors.value[0]
            updateColor()
        }
    }

    const getMotives = async () => {
        const response = await axios.get(`${host}/api/motives`)
        motives.value = response.data
    }

    const createOrder = async (data: unknown[]) => {
        const response = await axios.get(`${host}/api/order`)
        motives.value = response.data
    }

    watch(
        () => color.value?.price,
        (newColorPrice) => {
            if (!newColorPrice) return
            colorPrice.value = newColorPrice
        },
        { immediate: true }
    )

    watch(
        () => motive.value?.price,
        (newMotivePrice) => {
            if (!newMotivePrice) return
            motivePrice.value = newMotivePrice
        },
        { immediate: true }
    )

    const totalPrice = computed((): string => {
        const result = motivePrice.value + colorPrice.value

        return result.toFixed(2)
    })

    return {
        motivePrice,
        colorPrice,
        motive,
        color,
        orderSuccess,
        motives,
        colors,
        totalPrice,
        updateColor,
        changeImg,
        fetchMotives: getMotives,
        fetchColors: getColors
    }
}

const designStore = useDesignStore()

export { designStore }
