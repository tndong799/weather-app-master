<template>
    <transition name="search">
        <div
            class="absolute w-full h-full top-0 left-0 bg-[#1E213A] z-30 px-11 pt-20"
            v-if="show"
        >
            <button
                class="absolute top-5 right-11 text-[#E7E7EB]"
                @click="$emit('close')"
            >
                <x-icon size="18" />
            </button>
            <div class="flex gap-x-3 h-12">
                <div
                    class="flex items-center flex-1 h-full border border-[#E7E7EB]"
                >
                    <search-icon class="m-4 text-[#616475]" />
                    <input
                        class="bg-transparent text-[#E7E7EB] placeholder:text-[#616475] outline-none"
                        type="text"
                        v-model="search"
                        placeholder="search location"
                    />
                </div>
                <button
                    class="h-full text-center font-semibold text-base text-[#E7E7EB] bg-[#3C47E9] px-3"
                    @click="searchLocation"
                >
                    Search
                </button>
            </div>
            <div class="mt-14 flex flex-col gap-y-3">
                <button
                    class="group flex justify-between px-3 py-[22px] text-[#E7E7EB] text-base font-medium border border-transparent hover:border-[#616475]"
                    v-for="(location, index) in listLocation"
                    :key="index"
                    @click="$emit('setLocation', location)"
                >
                    {{ location.name }}, {{ location.state }}
                    <chevron-right-icon class="hidden group-hover:block" />
                </button>
            </div>
        </div>
    </transition>
</template>

<script>
import { SearchIcon, ChevronRightIcon, XIcon } from '@vue-hero-icons/solid';
export default {
    name: 'VueSearch',
    props: {
        show: {
            type: Boolean,
        },
    },
    components: {
        SearchIcon,
        ChevronRightIcon,
        XIcon,
    },
    data() {
        return {
            search: '',
            listLocation: null,
        };
    },
    methods: {
        async searchLocation() {
            const res = await fetch(
                `http://api.openweathermap.org/geo/1.0/direct?q=${
                    this.search
                }&limit=${5}&appid=${process.env.VUE_APP_API_KEY}`
            );
            this.listLocation = await res.json();
        },
    },
};
</script>

<style>
.search-enter-active,
.search-leave-active {
    transition: all 0.5s ease;
}
.search-enter,
.search-leave-to {
    transform: translateX(-100%);
}
</style>
