/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,vue}'],
    theme: {
        extend: {
            backgroundImage: {
                'cloud-bg': "url('./src/assets/images/Cloud-background.png')",
            },
            screens: {
                mb: { max: '426px' },
            },
        },
    },
    plugins: [],
};
