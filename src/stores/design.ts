// stores/design.js
import { ref, computed } from 'vue'
import axios from 'axios'
import { da } from '@faker-js/faker'
import { createPinia, setActivePinia } from 'pinia'
import type { RefSymbol } from '@vue/reactivity'

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

    const motivePrice = ref<number>(0)
    const colorPrice = ref<number>(0)

    const personalData = ref({
        name: '',
        address: ''
    })

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

    const createOrder = async (data: { name: string; address: string }) => {
        const response = await axios.post(`${host}/api/order`, data)

        console.debug(response)
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

    const totalPrice = computed((): number => {
        const result = motivePrice.value + colorPrice.value

        const fixedResult = result.toFixed(2)

        return parseFloat(fixedResult)
    })

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
        updateColor,
        changeImg,
        fetchMotives: getMotives,
        fetchColors: getColors,
        createOrder,
        $reset
    }
}

const designStore = useDesignStore()

export { designStore }
