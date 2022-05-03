import {MovieOT} from "../services/swapi";

// The Movie box component which we listed them in Movies page:
export const Movie = ({starships, ...data}: MovieOT, onClick: () => Promise<void>) => {
    const container = document.createElement("div")
    container.classList.add("movie")

    const Item = (key: string, value: string) => {
        const Item = document.createElement("div")
        Item.classList.add("item")
        const Key = document.createElement("span")
        Key.classList.add("key")
        Key.innerText = `${key}:`
        Item.appendChild(Key)

        const Value = document.createElement("span")
        Value.classList.add("value")
        Value.innerText = String(value)
        Item.appendChild(Value)
        return Item
    }
    container.appendChild(Item("Title", data.title))
    container.appendChild(Item("Episode", String(data.episode_id)))
    container.appendChild(Item("Release date", data.release_date))

    const button = document.createElement("button")
    button.innerText = "Show starships"
    button.classList.add("default-button")
    button.onclick = onClick
    container.appendChild(button)
    return container
}
