/** @type {import('tailwindcss').Config} */
/** understand why own gray doesnt connect*/
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{html,js,vue,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                'own-gray': '#EAEAEA',
            },
        },
    },
    plugins: [],
}