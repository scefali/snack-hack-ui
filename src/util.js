

export const getSessionToken = () => sessionStorage.getItem('session_token');

export const logout = () => {
    sessionStorage.removeItem('session_token')
}

export const relativeRedirect = url => {
    if (!url.startsWith('/')) {
        url = '/' + url;
    }
    window.location = (`${window.location.origin}${url}`)
}