<template>
    <div class="flex-1 bg-[#100E1D] px-28 py-5 flex flex-col mb:px-2">
        <div class="flex justify-end gap-x-3">
            <button
                class="w-10 h-10 rounded-full text-[#E7E7EB] font-bold text-lg bg-[#585676] flex items-center justify-center"
                :class="{ 'active-btn': isTempC }"
                @click="$emit('handleTypeTemp', 'C')"
            >
                ℃
            </button>
            <button
                class="w-10 h-10 rounded-full text-[#E7E7EB] font-bold text-lg bg-[#585676] flex items-center justify-center"
                :class="{ 'active-btn': !isTempC }"
                @click="$emit('handleTypeTemp', 'F')"
            >
                ℉
            </button>
        </div>
        <div class="flex gap-x-7 mt-12 mb:flex-wrap mb:gap-4">
            <weather-item
                v-for="item in Object.keys(
                    groupByDate !== undefined && groupByDate
                )"
                :key="item"
                :date="item"
                :data="groupByDate[item]"
                :typeTemp="typeTemp"
            />
        </div>
        <div class="flex flex-col gap-y-4 mt-12">
            <h2 class="text-2xl font-bold text-[#E7E7EB]">
                Today’s Hightlights
            </h2>
            <div class="flex flex-wrap gap-12 mb:flex-col">
                <div
                    class="w-[calc((100%-48px)/2)] flex flex-col bg-[#1E213A] py-5 mb:w-full"
                >
                    <p class="font-medium text-base text-[#E7E7EB] text-center">
                        Wind status
                    </p>
                    <div class="font-bold text-6xl text-[#E7E7EB] text-center">
                        {{ todayData?.wind.speed.toFixed(0)
                        }}<span class="font-medium text-xl">mph</span>
                    </div>
                    <div
                        class="mt-2 flex justify-center gap-x-1 text-[#E7E7EB] items-center"
                    >
                        <div
                            class="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[rgba(255,255,255,0.3)]"
                        >
                            <paper-airplane-icon
                                class="w-3 h-3"
                                :style="{
                                    transform: `rotate(${
                                        this.todayData?.wind.deg - 45
                                    }deg)`,
                                }"
                            />
                        </div>
                        <span class="leading-4">wsw</span>
                    </div>
                </div>
                <div
                    class="w-[calc((100%-48px)/2)] flex flex-col items-center bg-[#1E213A] py-5 mb:w-full"
                >
                    <p class="font-medium text-base text-[#E7E7EB] text-center">
                        Humidity
                    </p>
                    <div class="font-bold text-6xl text-[#E7E7EB] text-center">
                        {{ todayData?.main.humidity
                        }}<span class="font-medium text-xl">%</span>
                    </div>
                    <div
                        class="mt-2 w-[70%] flex flex-col justify-center gap-x-1 items-center"
                    >
                        <div
                            class="w-full flex justify-between font-bold text-[#A09FB1] text-xs"
                        >
                            <span>0</span><span>50</span><span>100</span>
                        </div>
                        <div
                            class="w-full relative h-2 rounded-[80px] bg-[#E7E7EB] z-10"
                        >
                            <div
                                class="absolute left-0 h-full bg-[#FFEC65] z-20 rounded-[80px]"
                                :style="{
                                    width: `${todayData.main.humidity}%`,
                                }"
                            ></div>
                        </div>
                    </div>
                </div>
                <div
                    class="w-[calc((100%-48px)/2)] flex flex-col bg-[#1E213A] py-5 mb:w-full"
                >
                    <p class="font-medium text-base text-[#E7E7EB] text-center">
                        Visibility
                    </p>
                    <div class="font-bold text-6xl text-[#E7E7EB] text-center">
                        {{ (todayData?.visibility * 0.000621371192).toFixed(1)
                        }}<span class="font-medium text-xl">miles</span>
                    </div>
                </div>
                <div
                    class="w-[calc((100%-48px)/2)] flex flex-col bg-[#1E213A] py-5 mb:w-full"
                >
                    <p class="font-medium text-base text-[#E7E7EB] text-center">
                        Air Pressure
                    </p>
                    <div class="font-bold text-6xl text-[#E7E7EB] text-center">
                        {{ todayData?.main.pressure
                        }}<span class="font-medium text-xl">mb</span>
                    </div>
                </div>
            </div>
        </div>
        <p class="font-medium text-sm text-[#A09FB1] text-center mt-auto">
            created by <span class="font-bold">dongtn99</span> -
            devChallenges.io
        </p>
    </div>
</template>

<script>
import WeatherItem from './weather-item.vue';
import { PaperAirplaneIcon } from '@vue-hero-icons/outline';
export default {
    name: 'VueMain',
    components: {
        WeatherItem,
        PaperAirplaneIcon,
    },
    props: {
        typeTemp: {
            type: String,
        },
        location: {
            type: Object,
        },
        todayData: {
            type: Object,
        },
    },
    data() {
        return {
            data: null,
        };
    },
    computed: {
        isTempC() {
            return this.typeTemp === 'C' ? true : false;
        },
        forecast5DayData() {
            const today = new Date().toISOString().slice(0, 10);
            return this.data?.list
                .map((item) => {
                    return { ...item, dt_txt: item.dt_txt.slice(0, 10) };
                })
                .filter((item) => item.dt_txt !== today);
        },
        groupByDate() {
            return this.forecast5DayData?.reduce((prev, current) => {
                const { dt_txt } = current;
                prev[dt_txt] = prev[dt_txt] || [];
                prev[dt_txt].push(current);
                return prev;
            }, {});
        },
    },
    watch: {
        location: {
            handler() {
                this.getForecast5Day(this.location);
            },
            deep: true,
        },
    },
    methods: {
        async getForecast5Day(location) {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${process.env.VUE_APP_API_KEY}`
            );
            this.data = await res.json();
        },
    },
    created() {},
};
</script>

<style></style>
