
// The Fetch function which we use as our API caller..
// This function is actually a wrapper for the built-in-js fetch function.
export const Fetch: <OT extends object>(input: RequestInfo, init?: RequestInit) => Promise<OT> = async (input, init) => {
    // Set loader display status to true before starting the fetch process
    setLoader(true)
    const data = await fetch(input, init).then(data => data.json())
    // Set loader display status to false after finishing the fetch process
    setLoader(false)
    return data
}

// This function sets the  status of main loader placed inside the root component (app).
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
// Reshapes the 1D functions to 2D function. Used in pagination to break a list of items into many smaller slices.
export const reshape = <T extends any>(arr: T[], col: number) => {
    const newArr = [];
    while (arr.length) newArr.push(arr.splice(0, col));
    return newArr;
};
