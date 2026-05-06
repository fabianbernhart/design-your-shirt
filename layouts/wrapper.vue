<template>
    <div class="flex h-full flex-col lg:flex-row">
        <div
            class="order-2 flex flex-1 flex-row items-center justify-center lg:order-1 lg:flex-[1] lg:flex-col"
        >
            <slot name="left"></slot>
        </div>

        <div
            class="order-1 flex flex-[5] items-center justify-center lg:order-2 lg:flex-[5]"
        >
            <slot name="center"></slot>
        </div>

        <div
            class="order-3 flex flex-[1] items-center justify-center lg:flex-[1]"
        >
            <slot name="right"></slot>
        </div>
    </div>
</template>
