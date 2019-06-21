import axios from 'axios';


const serverUrl = '';
export const redirect_uri = 'https://scefali.ngrok.io/oauth'

const serverApi = axios.create({
    baseURL: serverUrl
});


export const finishOauth = async code => {
    const { data } = await serverApi.post('/', {code, redirect_uri});
    console.log('auth data', data)
}