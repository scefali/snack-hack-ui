import axios from 'axios';
import {getSessionToken} from './util';

export let serverUrl = 'https://7d98d40e.ngrok.io';
// export let serverUrl = 'https://snackhack-server.herokuapp.com';
export const redirect_uri = `${window.location.origin}/oauth`;

const serverUrlOvr = localStorage.getItem('serverUrl');
if (serverUrlOvr) {
  serverUrl = serverUrlOvr;
}

const sessionToken = getSessionToken();
const headers = {"Content-Type": "application/json"};
if (sessionToken) {
  headers.session_token = sessionToken;
}
const serverApi = axios.create({
  baseURL: serverUrl,
  headers
});


export const finishOauth = async code => {
  const {data} = await serverApi.post('/code', {code, redirect_uri});
  return data;
}

export const getSnacks = async (state) => {
  const {data} = await serverApi.get('/snacks', {params: {state}});
  return data.snacks;
}

export const likeSnack = async (snack_id) => {
  await serverApi.post('/like', {snack_id});
}

export const unlikeSnack = async (snack_id) => {
  await serverApi.post('/unlike', {snack_id});
}

export const getSnackInfo = async snackId => {
  const {data} = await serverApi.get(`/snacks/${snackId}`);
  return data.snack;
}

export const requestSnack = async (snack_id) => {
  await serverApi.post('/request', {snack_id});
}

export const orderSnacks = async (snack_ids) => {
  await serverApi.post('/order', {snack_ids});
}

export const deliverSnacks = async (snack_ids) => {
  await serverApi.post('/deliver', {snack_ids});
}