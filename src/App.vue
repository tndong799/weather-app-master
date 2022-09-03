<template>
    <div class="flex min-h-screen mb:flex-col">
        <vue-sidebar
            :todayData="todayData"
            :city="city"
            :typeTemp="typeTemp"
            @getUserWeather="getUserWeather"
            :setLocation="setLocation"
        />
        <vue-main
            :location="location"
            :typeTemp="typeTemp"
            :todayData="todayData"
            @handleTypeTemp="handleTypeTemp"
        />
    </div>
</template>

<script>
import VueSidebar from './components/vue-sidebar.vue';
import VueMain from './components/vue-main.vue';
export default {
    name: 'App',
    components: {
        VueSidebar,
        VueMain,
    },
    data() {
        return {
            todayData: null,
            city: '',
            typeTemp: 'C',
            location: {
                lat: 0,
                lon: 0,
            },
        };
    },
    watch: {
        location: {
            handler() {
                this.getWeather(this.location);
            },
            deep: true,
        },
    },
    methods: {
        getUserWeather() {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const lat = position.coords.latitude.toFixed(2);
                const lon = position.coords.longitude.toFixed(2);
                this.setLocation({ lat, lon });
                await this.getWeather({ lat, lon });
            });
        },
        handleTypeTemp(type) {
            this.typeTemp = type;
        },
        setLocation(location) {
            this.location.lat = location.lat;
            this.location.lon = location.lon;
        },
        async getWeather({ lat, lon }) {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.VUE_APP_API_KEY}`
            );
            const data = await res.json();
            this.todayData = data;
            this.city = data.name;
        },
    },
    created() {
        this.getUserWeather();
    },
};
</script>

<style></style>
