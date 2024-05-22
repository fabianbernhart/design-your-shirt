<template>
    <img src="@/public/shirt.svg" alt="Shirt SVG ">
</template>

<script lang="ts">

export default {
    props: {
        color: {
            type: String,
            default: "#82be00",
            required: true,
        },
    }
}



</script>