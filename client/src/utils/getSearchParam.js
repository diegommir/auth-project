const getSearchParam = (name) => {
    const searchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(searchParams.entries())
    return params[name]
}

export default getSearchParam
