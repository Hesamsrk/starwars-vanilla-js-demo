import {getMovieByID, StarshipOT} from "../services/swapi";

// The Starship component which we listed them in Starships page:
export const Starship = ({films, ...data}: StarshipOT) => {
    const container = document.createElement("li")
    container.onclick = () => {
        const detailContainer = document.querySelector(".starship-details")
        if (!detailContainer) return

        // Emptying the container:
        detailContainer.innerHTML = ``


        // append all data other than list of movies:
        Object.entries(data).map(([key, value]) => {
            const item = document.createElement('div')
            item.classList.add("item")
            item.innerHTML = `
            <span class="key">${key.replace(/_/g, " ")}:</span>
            <span class="value">${value}</span>
            `
            detailContainer.appendChild(item)
        })

        // append list of movies:
        const item = document.createElement('div')
        item.classList.add("item")
        item.innerHTML = `
            <span class="key">Films:</span>
            <ul class="value"></ul>
            `
        const list = item.querySelector(".value")
        if (list) {
            films.forEach((item) => {
                getMovieByID(item)
                    .then((data) => {
                        const li = document.createElement("li")
                        li.innerText = data.title
                        list.appendChild(li)
                    })
            })
        }
        detailContainer.appendChild(item)


        Array.prototype.slice.call(container.parentElement?.children || []).forEach((item: HTMLElement) => item.classList.remove("active"))
        container.classList.add("active")
    }
    container.classList.add("starship-item")
    container.innerText = data.name
    return container
}