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

const host = 'http://localhost:3000'
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
        if (!document) return

        for (const property of properties) {
            document.documentElement.style.setProperty(
                property,
                color.value.color
            )
        }
    }

    const updateMotive = () => {
        if (!motive.value) return
        if (!document) return

        const imageElements = document.getElementsByClassName('optionalImg')

        for (const imageElement of imageElements) {
            imageElement.setAttribute('href', motive.value.img)
        }
    }

    const getColors = async () => {
        await axios
            .get(`${host}/api/colors`)
            .then((response) => {
                colors.value = response.data
            })
            .catch((e) => {
                console.error(e)
            })

        if (!color.value) {
            color.value = colors.value[0]
            updateColor()
        }
    }

    const getMotives = async () => {
        await axios
            .get(`${host}/api/motives`)
            .then((response) => {
                motives.value = response.data
            })
            .catch((error) => {
                console.error('Order creation failed', error)
            })

        if (!motive.value) {
            motive.value = motives.value[0]
            updateMotive()
        }
    }

    const createOrder = async (data: { name: string; address: string }) => {
        const response = await axios
            .post(`${host}/api/order`, data)
            .then(() => {
                navigateTo('/order-success')
            })
            .catch((e) => {
                console.error(e)
            })

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

        return Number.parseFloat(fixedResult)
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
        changeImg: updateMotive,
        updateMotive,
        getMotives,
        getColors,
        createOrder,
        $reset
    }
}

const designStore = useDesignStore()

export { designStore }
