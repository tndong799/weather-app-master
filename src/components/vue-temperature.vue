<template>
    <div v-if="type === 'C'">
        {{ celsius }}<span :class="spanClass">&deg;C</span>
    </div>
    <div v-else>{{ fahrenheit }}<span :class="spanClass">&deg;F</span></div>
</template>

<script>
export default {
    name: 'VueTemperature',
    props: {
        temp: {
            type: Number,
        },
        type: {
            type: String,
        },
        spanClass: {
            type: String,
        },
    },
    computed: {
        celsius() {
            return this.temp.toFixed(0);
        },
        fahrenheit() {
            return (this.temp * 1.8 + 32).toFixed(0);
        },
    },
};
</script>

<style></style>
