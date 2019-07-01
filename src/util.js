

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


export const setPostSignInUrl = url => {
  localStorage.setItem('post_sign_in_url', url)
}

export const getPostSignInUrl = () => {
  return localStorage.getItem('post_sign_in_url');
}