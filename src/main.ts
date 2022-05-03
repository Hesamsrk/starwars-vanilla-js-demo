import './styles/index.css'
import {Loader} from "./components/Loader";
import {loadMovies} from "./loaders";

// The root component of our web application.
export const app = document.querySelector<HTMLDivElement>('#app')!

// Set inner HTML for app (Declaring some of the global components)
app.innerHTML = `
        <h id="title"></h>
        <div id="container"></div>
        <div id="credits">Made with 💓 by <a href="https://github.com/Hesamsrk">Hesamsrk</a></div>
    `

// Call the main function when dom is fully loaded:
window.addEventListener("load", () => {
    main().then(() => console.log("Website loaded!"))
})

// The main function of our code which calls all other services.
const main = async () => {

    // Getting the global components so we can pass them as Context to avoid recalling the dom again and again.
    const container = document.getElementById("container")
    const title = document.getElementById("title")

    if (!container || !title) {
        alert("Context not loaded!")
        return
    }

    // Append a loader for global usages. This loader display status is being set in Fetch function.
    app.appendChild(Loader({id: "mainLoader"}))

    // [4, 5, 6, 1, 2, 3] is the right order of movie episodes.
    await loadMovies({container, title}, [4, 5, 6, 1, 2, 3])
}





