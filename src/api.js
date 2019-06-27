import axios from 'axios';
import React from 'react';
import {toast} from 'react-toastify';


import ToastError from './components/ToastError'
import {getSessionToken} from './util';


//configure toast
toast.configure({
  autoClose: 5000,
  draggable: false
});

// export let serverUrl = 'https://7d98d40e.ngrok.io';
export let serverUrl = 'https://snackhack-server.herokuapp.com';
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

serverApi.interceptors.response.use(function(response) {
  // Do something with response data
  return response;
}, function(error) {
  let textLines = [error.message || 'Unknown error'];
  if (error.config) {
    if (error.config.method === 'post') {
      textLines.push('Please refresh and try again')
    } else {
      textLines.push('Try refreshing')
    }
  }
  toast.error(<ToastError textLines={textLines} />, {
    position: toast.POSITION.TOP_CENTER
  });
  return Promise.reject(error);
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


export const getUser = async () => {
  const {data} = await serverApi.get('/user');
  return data.user;
}

export const updateNotificationsSettings = async (option, enable) => {
  await serverApi.post('/notify', {option, enable});
}

export const addSnack = async (name, full_name, image) => {
  const { data } = await serverApi.post('/add-snack', {name, full_name, image});
  return data.snack_id;
}

export const deleteSnack = async snack_id => {
  await serverApi.post(`/delete-snack/${snack_id}`);
}