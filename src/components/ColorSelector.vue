<template>
    <div class="color-selector">
        <div class="color-palette">
            <div class="color-option"
                v-for="colorItem in colors"
                :key="colorItem"
                :style="{
                    ...colorOptionStyle,
                    ...getBackgroundColor(colorItem.color)
                }"
                @click="setColor(colorItem)"
            ></div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        colors: {
            type: Array as any,
            required: true
        },
        buttonSize: {
            type: Number,
            default: 30
        }
    },
    data() {
        return {
            showPalette: false,
            color: this.colors[0] || '#000000' // Default color
        }
    },
    methods: {
        selectColor() {
            this.showPalette = !this.showPalette
        },
        setColor(color: any) {
            this.color = color
            this.showPalette = false
        },
        getBackgroundColor(color: string): { backgroundColor: string } {
            return { backgroundColor: color }
        }
    },
    computed: {
        colorOptionStyle(): { height: string; width: string } {
            const btnSizePx: string = `${this.buttonSize}px`
            return {
                height: btnSizePx,
                width: btnSizePx
            }
        }
    }
}
</script>

<style scoped>
.color-selector {
    position: relative;
}

.color-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #ccc;
    cursor: pointer;
}

.color-palette {
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
}

.color-option {
    margin: 2px;
    cursor: pointer;
}
</style>
