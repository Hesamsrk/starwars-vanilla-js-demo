export const Fetch: <OT extends object>(input: RequestInfo, init?: RequestInit) => Promise<OT> = async (input, init) => {
    setLoader(true)
    const data = await fetch(input, init).then(data => data.json())
    setLoader(false)
    return data
}


export const setLoader = (status: boolean) => {
    const mainLoader = document.getElementById("mainLoader")
    if (!mainLoader) {
        console.error("Main loader not found!")
        return
    }
    if (status) {
        mainLoader.style.display = "flex"
    } else {
        setTimeout(() => (mainLoader.style.display = "none"), 1000)
    }

}