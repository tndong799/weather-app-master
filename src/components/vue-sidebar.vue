<template>
    <div
        class="relative w-[32%] bg-[#1E213A] flex flex-col py-11 justify-between mb:w-full"
    >
        <vue-search
            :show="isShow"
            @close="isShow = false"
            @setLocation="setLocation"
        />

        <div class="flex justify-between px-10">
            <button
                class="w-[160px] h-10 text-center bg-[#6E707A] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] text-[#E7E7EB]"
                @click="isShow = true"
            >
                Search for places
            </button>
            <button
                class="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.2)] text-[#E7E7EB] flex items-center justify-center"
                @click="$emit('getUserWeather')"
            >
                <support-icon size="22" />
            </button>
        </div>
        <div class="relative flex justify-center items-center">
            <div class="absolute z-10 opacity-10">
                <img src="../assets/images/Cloud-background.png" alt="" />
            </div>
            <vue-image class="z-20 relative" :data="todayData" />
        </div>
        <vue-temperature
            class="font-medium text-[96px] text-[#E7E7EB] text-center"
            spanClass="text-4xl text-[#A09FB1] font-thin"
            :temp="temp"
            :type="typeTemp"
        />
        <p class="text-4xl font-semibold text-center text-[#A09FB1]">
            {{ weather }}
        </p>
        <p class="font-medium text-lg text-[#88869D] text-center">
            Today &bull; {{ today }}
        </p>
        <div
            class="text-[#88869D] text-lg font-semibold flex items-center justify-center gap-x-2"
        >
            <location-marker-icon size="14" />
            {{ city }}
        </div>
    </div>
</template>

<script>
import { SupportIcon } from '@vue-hero-icons/outline';
import { LocationMarkerIcon } from '@vue-hero-icons/solid';
import VueSearch from './vue-search';
import VueImage from './vue-image.vue';
import VueTemperature from './vue-temperature.vue';
export default {
    name: 'VueSidebar',
    components: {
        SupportIcon,
        LocationMarkerIcon,
        VueSearch,
        VueImage,
        VueTemperature,
    },
    props: {
        todayData: {
            type: Object,
        },
        city: {
            type: String,
        },
        typeTemp: {
            type: String,
        },
        setLocation: {
            type: Function,
        },
    },
    data() {
        return {
            isShow: false,
        };
    },
    computed: {
        temp() {
            return Math.round(this.todayData?.main.temp);
        },
        weather() {
            return this.todayData?.weather[0].main;
        },
        today() {
            const options = {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
            };
            return new Date().toLocaleDateString('en-US', options);
        },
    },
};
</script>

<style></style>
