import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            borderColor: {
                second: "#15141b",
                third: "#4db997",
                fourth: "#110f18",
                fifth: "#36896f",
            },
            border: {
                "1": "1px",
            },
            textColor: {
                third: "#4db997",
                fifth: "#36896f",
            },
            text: {
                "main-900": "#211d26",
                third: "#4db997",
                fourth: "#110f18",
                'fifth': "#36896f",
                "main-800": "#27192a",
                "main-700": "#2c152e",
                "main-600": "#311132",
            },
            backgroundColor: {
                second: "#15141b",
                third: "#4db997",
                fourth: "#110f18",
                fifth: "#36896f",
                "main-900": "#211d26",
                "main-800": "#27192a",
                "main-700": "#2c152e",
                "main-600": "#311132",
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
        },
    },
    plugins: [
        function ({ addUtilities }) {
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
            addUtilities(newUtilities, ["responsive", "hover"]);
        },
    ],
} satisfies Config;
