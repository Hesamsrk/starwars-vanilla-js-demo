import './styles/index.css'
import {Loader} from "./components/Loader";
import {getMovieByID} from "./services/swapi";
import {Movie} from "./components/Movie";

interface Ctx {
    App: HTMLElement,
    Container: HTMLElement,
    Title: HTMLElement
}


const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h id="title"></h>
  <div id="container"/>
`

window.addEventListener("load", () => {
    const App = document.getElementById("app")
    const Container = document.getElementById("container")
    const Title = document.getElementById("title")

    if (!Container || !App || !Title) {
        alert("Context not loaded!")
        return
    }
    App.appendChild(Loader({id: "mainLoader"}))
    main({App, Container, Title}).then(() => console.log("Website loaded!"))
})

const main = async (ctx: Ctx) => {
    await loadMovies(ctx)
}

const loadMovies = async (ctx: Ctx) => {
    let container = document.getElementById("movie-page")
    if (container) container.remove()
    container = document.createElement("div")
    container.id = "movie-page"
    ctx.Title.innerText = "Movies:"
    const defaultOrder = [4, 5, 6, 1, 2, 3]
    for (let id of defaultOrder) {
        const data = await getMovieByID(id)
        container.appendChild(Movie(data))
    }
    ctx.Container.appendChild(container)
}