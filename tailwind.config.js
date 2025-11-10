// tailwind.config.js
module.exports = {
    theme: {
        extend: {
            keyframes: {
                slideInRight: {
                    "0%": { transform: "translateX(100%)", opacity: "0" },
                    "100%": { transform: "translateX(0)", opacity: "1" },
                },
            },
            animation: {
                slideInRight: "slideInRight 0.8s ease-out",
            },
        },
    },
};
