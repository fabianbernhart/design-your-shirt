// components/DesignYourShirt.vue
<template></template>

<script>
import { ref, computed } from 'vue'
import { useDesignStore } from '../stores/design'

export default {
    setup() {
        const designStore = useDesignStore()

        const handleSubmit = async () => {
            try {
                const response = await axios.post('/orders', {
                    motiv: designStore.motiv,
                    shirt: designStore.shirt,
                    color: designStore.color
                })
                designStore.orderSuccess = true
            } catch (error) {
                console.error(error)
            }
        }

        return {
            designStore,
            handleSubmit
        }
    }
}
</script>
