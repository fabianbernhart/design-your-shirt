import { defineStore } from 'pinia'

// Define the type for the title
type TitleState = {
    title: string | null
}

// Define and export the store
export const useTitleStore = defineStore({
    id: 'title',
    state: (): TitleState => ({
        title: null
    }),
    actions: {
        setTitle(newTitle: string) {
            this.title = newTitle
        }
    },
    getters: {
        getTitle: (state) => state.title
    }
})
