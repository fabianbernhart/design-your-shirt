import { designStore } from '@/src/stores/design'

export type TitleObjectType = {
    title: null | string
    action: null | string
    to: null | string
}

export const useTitleStore = () => {
    const route = useRoute()

    const titleObject = ref<TitleObjectType>({
        title: 'null',
        action: 'null',
        to: 'null'
    })

    const getTitle = computed<TitleObjectType>(() => titleObject.value)

    const setTitle = (newTitleObject: TitleObjectType) => {
        titleObject.value = newTitleObject
    }

    watch(
        () => route.path,
        (newPath) => {
            if (newPath === '/designer') {
                setTitle({
                    title: 'Design your shirt',
                    action: 'Go to Checkout',
                    to: '/checkout'
                })
            } else if (newPath === '/checkout') {
                setTitle({
                    title: 'Checkout',
                    action: 'Back',
                    to: '/designer'
                })
            }
            designStore.changeImg()
        },
        { immediate: true }
    )

    return {
        titleObject,
        getTitle,
        setTitle
    }
}
