import {defineConfig} from "vite";


export default defineConfig(({command}) => {
    if (command === "build") {
        return {
            base: '/starwars-vanilla-js-demo/'
        }
    } else {
        return {}
    }
})