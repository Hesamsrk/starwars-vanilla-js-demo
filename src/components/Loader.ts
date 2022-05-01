interface PropTypes {
    id?: string
    zIndex?: number
}

export const Loader = ({id, zIndex}: PropTypes) => {
    const container = document.createElement('div')
    container.style.display = "none"
    container.style.zIndex = String(zIndex || 10)
    container.classList.add("loader")
    const element = document.createElement('div')
    element.classList.add("inner")
    if (id) container.id = id
    container.appendChild(element)
    return container
}