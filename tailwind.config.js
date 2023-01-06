/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        fontFamily: {
            sans: ['"Inter var"'],
            serif: ['"Inter var"'],
        },
        extend: {
            colors: {
                "loading-text": "#828282",
                "loading-bg-light": "#EBEBEB",
                "text-inactive": "#978D8D",
                "text-active": "#111010",
                "light-bg": "#F3F3F3",
                "catalog-bg": "#e8e8e8",
                "gold-star": "#FFD700",
                "light-gold": "#FFED8A",
                "pairs-bg": "#E5E5E5",
            },
            backgroundImage: {
                "home-bg": "url('./img/background.png')",
            },
            transitionProperty: {
                width: "width",
            },
            maxHeight: {
                "screen-70": "70vh",
                "screen-75": "75vh",
                "screen-80": "80vh",
                "screen-85": "85vh",
                "screen-90": "90vh",
                "screen-95": "95vh",
                "screen-110": "110vh",
                "screen-115": "115vh",
            },
        },
    },
    plugins: [],
};
