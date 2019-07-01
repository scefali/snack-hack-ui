

export const getSessionToken = () => {
  return localStorage.getItem('session_token');

}

export const isAdmin = () => {
  return localStorage.getItem('is_admin') === '1';
}


export const logout = () => {
  localStorage.removeItem('session_token')
}

export const relativeRedirect = url => {
  if (!url.startsWith('/')) {
    url = '/' + url;
  }
  window.location = (`${window.location.origin}${url}`)
}
