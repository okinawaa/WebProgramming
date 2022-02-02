export const hover = (e,setHover) => {
    e.stopPropagation()
    setHover(true)
}
export const unhover = (e,setHover) => {
    e.stopPropagation()
    setHover(false)
}