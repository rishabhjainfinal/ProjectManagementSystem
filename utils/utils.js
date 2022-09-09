// use localstorage and save theme for the user and update the theme

function updateTheme(newTheme) {
    localStorage.setItem('theme', newTheme);
}

function readTheme() {
    return localStorage.getItem('theme')
}


export { updateTheme, readTheme };