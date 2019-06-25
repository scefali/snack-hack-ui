import axios from 'axios';
import { getSessionToken } from './util';

// export let serverUrl = 'https://7201b966.ngrok.io';
export let serverUrl = 'https://snackhack-server.herokuapp.com';
export const redirect_uri = `${window.location.origin}/oauth`;

const serverUrlOvr = localStorage.getItem('serverUrl');
if (serverUrlOvr) {
    serverUrl = serverUrlOvr;
}

const sessionToken = getSessionToken();
const headers ={"Content-Type": "application/json"};
if (sessionToken) {
    headers.session_token = sessionToken;
} 
const serverApi = axios.create({
    baseURL: serverUrl,
    headers
});


export const finishOauth = async code => {
    const { data } = await serverApi.post('/code', {code, redirect_uri});
    return data;
}

export const getSnacks = async () => {
    const { data } = await serverApi.get('/snacks');
    return data.snacks;
}

export const likeSnack = async (snack_id) => {
    await serverApi.post('/like', {snack_id});
}

export const unlikeSnack = async (snack_id) => {
    await serverApi.post('/unlike', {snack_id});
}

export const getSnackInfo = async snackId => {
  const { data } = await serverApi.get(`/snacks/${snackId}`);
  return data.snack;
}
