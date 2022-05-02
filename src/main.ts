import './styles/index.css'
import {Loader} from "./components/Loader";
import {getMovieByID, getStarshipByID} from "./services/swapi";
import {Movie} from "./components/Movie";
import {Starship} from "./components/Starship";
import {reshape} from "./utils";

interface Ctx {
    readonly container: HTMLElement,
    readonly title: HTMLElement
}


export const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
        <h id="title"></h>
        <div id="container"></div>
        <div id="credits">Made with 💓 by <a href="https://github.com/Hesamsrk">Hesamsrk</a></div>
    `


window.addEventListener("load", () => {
    main().then(() => console.log("Website loaded!"))
})

const main = async () => {

    const container = document.getElementById("container")
    const title = document.getElementById("title")

    if (!container || !title) {
        alert("Context not loaded!")
        return
    }
    app.appendChild(Loader({id: "mainLoader"}))
    await loadMovies({container, title}, [4, 5, 6, 1, 2, 3])
}


const loadPage = (title: string, containerID: string, ctx: Ctx) => {
    document.querySelectorAll(".Page___class").forEach(item => item.remove())
    const container = document.createElement("div")
    container.id = containerID
    container.classList.add("Page___class")
    ctx.title.innerText = `${title}:`
    return container
}

const loadMovies = async (ctx: Ctx, movies: number[]) => {
    const container = loadPage("Movies", "movie-container", ctx)
    for (let id of movies) {
        const data = await getMovieByID(id)
        const pages = reshape(data.starships, 4)
        container.appendChild(Movie(data, async () => {
            await loadStarships(ctx, pages, 0)
        }))
    }
    ctx.container.appendChild(container)
}


export const loadStarships = async (ctx: Ctx, pages: number[][], page: number) => {
    const container = loadPage("Starships", "starship-container", ctx)
    console.log({pages, page})
    if (!pages[page]) {
        alert("TER")
        return
    }

    const list = document.createElement("ul")
    list.classList.add("starship-list")
    for (let id of pages[page]) {
        const data = await getStarshipByID(id)
        list.appendChild(Starship(data))
    }
    container.appendChild(list)


    const starshipDetails = document.createElement("div")
    starshipDetails.classList.add("starship-details")
    container.appendChild(starshipDetails)


    renderNav(container, ctx, pages, page)

    ctx.container.appendChild(container)
}

export const renderNav = (parent: HTMLElement, ctx: Ctx, pages: number[][], page: number) => {
    document.querySelectorAll(".starship-navbar").forEach(item => item.remove())

    const navbar = document.createElement("div")
    navbar.classList.add("starship-navbar")


    const previousList = pages[page - 1]
    const previousButton = document.createElement("button")
    previousButton.classList.add("default-button")
    previousButton.disabled = !Boolean(previousList && previousList.length > 0)
    previousButton.innerText = !previousButton.disabled ? `Previous page (${page - 1})` : "Previous page"
    previousButton.onclick = async () => {
        await loadStarships(ctx, pages, page - 1)
    }
    navbar.appendChild(previousButton)

    const goBackButton = document.createElement("button")
    goBackButton.classList.add("default-button")
    goBackButton.innerText = "Movie list"
    goBackButton.onclick = async () => {
        await loadMovies(ctx, [4, 5, 6, 1, 2, 3])
    }
    navbar.appendChild(goBackButton)

    const nextList = pages[page + 1]
    const nextButton = document.createElement("button")
    nextButton.classList.add("default-button")
    nextButton.disabled = !Boolean(nextList && nextList.length > 0)
    nextButton.innerText = !nextButton.disabled ? `Next page (${page + 1})` : "Next page"
    nextButton.onclick = async () => {
        console.log(`Loading: ${{pages, page: page + 1}}`)
        await loadStarships(ctx, pages, page + 1)
    }
    navbar.appendChild(nextButton)

    parent.appendChild(navbar)
}


