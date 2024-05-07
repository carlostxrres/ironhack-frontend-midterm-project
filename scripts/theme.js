const CONSTANTS = {
    CLASSNAME_DARK_MODE: "dark-mode",
    LOCALSTORAGE_KEY: "dark-mode"
}

startUp()
setThemeOnClick()

function setThemeClass(isDarkMode) {
    const classMethod = isDarkMode ? "add" : "remove"
    document.body.classList[classMethod](CONSTANTS.CLASSNAME_DARK_MODE)
}

function startUp() {
    const savedTheme = localStorage.getItem(CONSTANTS.LOCALSTORAGE_KEY)
    const isDarkMode = JSON.parse(savedTheme)
    const wasSaved = typeof isDarkMode === "boolean"

    if (!wasSaved) {
        setThemeBySystem()
    } else {
        setThemeClass(isDarkMode)
    }
}

function setThemeBySystem() {
    if (!window.matchMedia) {
        return
    }

    const themeQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setThemeClass(themeQuery.matches)

    themeQuery.addEventListener("change", (event) => setThemeClass(event.matches))
}

function setThemeOnClick() {
    const logoContainer = document.querySelector(".icon-theme-switch")
    // to do: if logoContainer is not an instance of HTMLElement ...

    logoContainer.addEventListener("click", () => {
        const isDarkModeSet = checkIsDarkModeSet()
        const isNewThemeDark = !isDarkModeSet

        localStorage.setItem(CONSTANTS.LOCALSTORAGE_KEY, isNewThemeDark)
        setThemeClass(isNewThemeDark)
    })
}

function checkIsDarkModeSet() {
    return document.body.classList.contains(CONSTANTS.CLASSNAME_DARK_MODE)
}