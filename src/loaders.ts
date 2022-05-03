import {getMovieByID, getStarshipByID} from "./services/swapi";
import {reshape} from "./utils";
import {Movie} from "./components/Movie";
import {Starship} from "./components/Starship";

// Global items are being based to functions as  Global Context to avoid recalling the dom again and again.
export interface Ctx {
    readonly container: HTMLElement,
    readonly title: HTMLElement
}

// removes the current page and replaces it with an empty container and returns the container. Can be used to simulate the routing functionality:
export const loadPage = (title: string, containerID: string, ctx: Ctx) => {
    document.querySelectorAll(".Page___class").forEach(item => item.remove())
    const container = document.createElement("div")
    container.id = containerID
    container.classList.add("Page___class")
    ctx.title.innerText = `${title}:`
    return container
}
// loads or reloads the movies page when called.
export const loadMovies = async (ctx: Ctx, movies: number[]) => {
    const container = loadPage("Movies", "movie-container", ctx)
    for (let id of movies) {
        const data = await getMovieByID(id)

        // breaks the starship list to many lists which then can be used for pagination
        const pages = reshape(data.starships, 4)
        container.appendChild(Movie(data, async () => {
            await loadStarships(ctx, pages, 0)
        }))
    }
    ctx.container.appendChild(container)
}

// loads or reloads the starships page when called.
export const loadStarships = async (ctx: Ctx, pages: number[][], page: number) => {
    const container = loadPage("Starships", "starship-container", ctx)
    if (!pages[page]) return
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


    loadNavigation(container, ctx, pages, page)

    ctx.container.appendChild(container)
}

// loads or reloads the starship page's navigation bar, which is used for pagination and going back to the movies page.
export const loadNavigation = (parent: HTMLElement, ctx: Ctx, pages: number[][], page: number) => {
    document.querySelectorAll(".starship-navbar").forEach(item => item.remove())

    const navbar = document.createElement("div")
    navbar.classList.add("starship-navbar")


    const previousList = pages[page - 1]
    const previousButton = document.createElement("button")
    previousButton.classList.add("default-button")
    previousButton.disabled = !Boolean(previousList && previousList.length > 0)
    previousButton.innerText = !previousButton.disabled ? `Previous page (${page - 1})` : "Previous page"
    previousButton.onclick = async () => {

        // reloads the starships and passes the last page index (pagination)
        await loadStarships(ctx, pages, page - 1)
    }
    navbar.appendChild(previousButton)

    const goBackButton = document.createElement("button")
    goBackButton.classList.add("default-button")
    goBackButton.innerText = "Back to Movies"
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
        // reloads the starships and passes the next page index (pagination)
        await loadStarships(ctx, pages, page + 1)
    }
    navbar.appendChild(nextButton)

    parent.appendChild(navbar)
}