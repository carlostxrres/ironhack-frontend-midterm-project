const CONSTANTS = {
    CLASSNAME_DARK_MODE: "dark-mode"
}

startUp()
setThemeOnClick()

// To do: add a switch to toggle dark mode on and off

function setThemeClass(isDarkMode) {
    const classMethod = isDarkMode ? "add" : "remove"
    document.body.classList[classMethod](CONSTANTS.CLASSNAME_DARK_MODE)
}

function startUp() {
    if (!window.matchMedia) {
        return
    }
    
    const themeQuery = window.matchMedia("(prefers-color-scheme: dark)")    
    setThemeClass(themeQuery.matches)
    
    themeQuery.addEventListener("change", (event) => setThemeClass(event.matches))
}

function setThemeOnClick() {
    const logoContainer = document.querySelector(".icon-theme-switch")
    logoContainer.addEventListener("click", () => {
        console.log("click")
        const isDarkModeSet = checkIsDarkModeSet()
        setThemeClass(!isDarkModeSet)
    })
}

function checkIsDarkModeSet() {
    return document.body.classList.contains(CONSTANTS.CLASSNAME_DARK_MODE)
}