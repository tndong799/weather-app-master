<template>
    <img :src="imageSrc" :alt="data?.weather[0].main" />
</template>

<script>
import Clear from '../assets/images/Clear.png';
import Cloud from '../assets/images/LightCloud.png';
import HeavyCloud from '../assets/images/HeavyCloud.png';
import HeavyRain from '../assets/images/HeavyRain.png';
import Rain from '../assets/images/LightRain.png';
import Thunderstorm from '../assets/images/Thunderstorm.png';
import Snow from '../assets/images/Snow.png';
export default {
    name: 'VueImage',
    props: {
        data: {
            type: Object,
        },
    },
    computed: {
        imageSrc() {
            const id = this.data?.weather[0].id;
            let image;
            if (id <= 232) {
                image = Thunderstorm;
            } else if (id > 232 && id <= 520) {
                image = Rain;
            } else if (id > 520 && id <= 531) {
                image = HeavyRain;
            } else if (id >= 600 && id <= 622) {
                image = Snow;
            } else if (id >= 701 && id <= 781) {
                image = Cloud;
            } else if (id === 800) {
                image = Clear;
            } else if (id >= 801 && id <= 802) {
                image = Cloud;
            } else image = HeavyCloud;

            return image;
        },
    },
};
</script>

<style></style>
