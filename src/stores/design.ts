// stores/design.js
import { ref, computed } from 'vue'

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
                    updateColor()
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
                    updateMotive()
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
                address: order.address,
            }
        })
        .then(({ data, error }) => {
            if (error.value) {                
                console.error("Error creating order:", error.value);
                return;
            }
    
            if (!data.value) {
                console.error("No data returned from order creation");
                return;
            }

            navigateTo("order-success")


        })
        .catch((err) => {
            console.error("An unexpected error occurred:", err);
        });
    };

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
