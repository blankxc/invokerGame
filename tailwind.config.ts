import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            keyframes: {
                firstCircle: {
                    '0%': {backgroundColor: '#a26ac5'},
                    '50%': {transform: 'translateX(100%)', backgroundColor: '#7d6bebff'},
                    '75%': {backgroundColor: '##cd9cecff'},
                    '100%': {backgroundColor: '#a26ac5'}
                },
                secondCircle: {
                    '50%': {transform: 'translateX(-100%)'}
                },
                trueSphere: {
                    '0%': {backgroundColor: '#a26ac5'},
                    '50%': {width: '80%'},
                    '100%': {width: '100%'},
                }
            },
            animation: {
                firstCircle: 'firstCircle 1.5s linear infinite',
                secondCircle: 'firstCircle 1.5s linear infinite',
                trueSphere: 'trueSphere 0.2s ease-out both',
            },
            fontFamily: {
                'montserrat': ['Montserrat']
            },
            borderColor: {
                second: "#15141b",
                third: "#4db997",
                fourth: "#110f18",
                fifth: "#36896f",
                sixth: '#a26ac5',
                'lighten-second': '#2b2938',
            },
            border: {
                "1": "1px",
            },
            borderRadius: {
                '1/2': '50%'
            },
            textColor: {
                third: "#4db997",
                fifth: "#36896f",
                sixth: '#a26ac5',
                'lighten-second': '#2b2938',
            },
            text: {
                "main-900": "#211d26",
                third: "#4db997",
                fourth: "#110f18",
                'fifth': "#36896f",
                "main-800": "#27192a",
                "main-700": "#2c152e",
                "main-600": "#311132",
                sixth: '#a26ac5',
                'lighten-second': '#2b2938',
            },
            backgroundColor: {
                second: "#15141b",
                third: "#4db997",
                fourth: "#110f18",
                fifth: "#36896f",
                sixth: '#a26ac5',
                seventh: '#7f46a3',
                eighth: '#623380',
                "main-900": "#211d26",
                "main-800": "#27192a",
                "main-700": "#2c152e",
                "main-600": "#311132",
                'lighten-second': '#2b2938',
                'popup': 'hsla(0,0%,0%,0.808)'
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            height: {
                'main': '850px'
            }
        },
    },
    plugins: [
        function ({ addUtilities}: PluginAPI) {
            const newUtilities = {
                ".time-bar": {
                    width: "200px",
                    height: "20px",
                    "margin-top": "5px",
                    "margin-bottom": "5px",
                    border: "1px solid white",
                    position: "relative",
                    overflow: "hidden",
                },
                ".time-bar-0": {
                    "z-index": "-1",
                    "&::after": {
                        content: '""',
                        position: "absolute",
                        "background-color": "#6f46a347",
                        width: "100%",
                        height: "100%",
                        top: "0",
                        left: "0",
                        transform: "translateX(-100%)",
                    },
                },
                ".time-bar-100": {
                    "z-index": "-1",
                    "&::after": {
                        content: '""',
                        position: "absolute",
                        "background-color": "#6f46a347",
                        width: "100%",
                        height: "100%",
                        top: "0",
                        left: "0",
                        transition: "30s all linear",
                        opacity: "0.5",
                        transform: "translateX(0)",
                    },
                },
            };
            addUtilities(newUtilities, {
                respectPrefix: true, 
                respectImportant: true,
              });
              
        },
    ],
} satisfies Config;
