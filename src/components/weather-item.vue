<template>
    <div
        class="w-[calc((100%-24px*4)/5)] bg-[#1E213A] px-5 py-4 flex flex-col justify-between mb:w-[calc((100%-16px)/2)]"
    >
        <p class="text-[#E7E7EB] text-center">{{ formatDate }}</p>
        <vue-image
            class="mt-2"
            :data="data[3] ? data[3] : data[data.length - 1]"
        />
        <div
            class="mt-4 font-medium text-base flex justify-between text-[#E7E7EB]"
        >
            <vue-temperature :type="typeTemp" :temp="tempMax" />
            <vue-temperature
                class="text-[#A09FB1]"
                :type="typeTemp"
                :temp="tempMin"
            />
        </div>
    </div>
</template>

<script>
import VueImage from './vue-image.vue';
import VueTemperature from './vue-temperature.vue';
export default {
    components: { VueImage, VueTemperature },
    name: 'WeatherItem',
    props: {
        date: {
            type: String,
        },
        data: {
            type: Array,
        },
        typeTemp: {
            type: String,
        },
    },
    computed: {
        formatDate() {
            const options = {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
            };
            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return this.date === tomorrow.toISOString().slice(0, 10)
                ? 'Tomorrow'
                : new Date(this.date).toLocaleDateString('en-US', options);
        },
        tempMin() {
            return Math.min(...this.data.map((item) => item?.main.temp_min));
        },
        tempMax() {
            return Math.max(...this.data.map((item) => item?.main.temp_max));
        },
    },
};
</script>

<style></style>
