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
        if (mainLoader.style.display !== "flex")
            mainLoader.style.display = "flex"
    } else {
        if (mainLoader.style.display !== "none")
            mainLoader.style.display = "none"
    }
}

export const reshape = <T extends any>(arr: T[], col: number) => {
    const newArr = [];
    while (arr.length) newArr.push(arr.splice(0, col));
    return newArr;
};
