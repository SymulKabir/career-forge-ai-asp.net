#### Install Tailwind

```bash
npm init -y
npm install -D tailwindcss@3.4.17
```

#### Configure config files

Create `tailwind.config.js` file in root directory and Past 

```text
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./Views/**/*.cshtml",
        "./wwwroot/js/**/*.js",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },

            animation: {
                float: "float 6s ease-in-out infinite",
                "float-slow": "float 8s ease-in-out infinite",
                "pulse-slow": "pulse 4s ease-in-out infinite",
                marquee: "marquee 25s linear infinite",
            },

            keyframes: {
                float: {
                    "0%, 100%": {
                        transform: "translateY(0px)",
                    },
                    "50%": {
                        transform: "translateY(-15px)",
                    },
                },

                marquee: {
                    "0%": {
                        transform: "translateX(0)",
                    },
                    "100%": {
                        transform: "translateX(-50%)",
                    },
                },
            },
        },
    },

    plugins: [],
};
```

Goto `wwwroot/css/input.css` and Past

```text
@tailwind base;
@tailwind components;
@tailwind utilities;
```


#### Generate local Tailwind
```bash
npx tailwindcss \
  -i ./wwwroot/css/input.css \
  -o ./wwwroot/css/tailwind.css \
  --watch
```
