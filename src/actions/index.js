import axios from 'axios';
export const FETCH_POSTS = 'fetch_posts';
export const CREATE_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';


const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=heynowheynow'
export function fetchPosts(){
  //promise based HTTP Get request
  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`)
  return{
    type: FETCH_POSTS,
    payload:request
  }
}

export function createPost(values,callback){
  // Note: cant put in state right away as does not hae an id associated with it
  const request = axios.post(`${ROOT_URL}/posts${API_KEY}`,values)
    .then(callback);
  return{
    type: CREATE_POSTS,
    payload:request
  }
}

export function fetchPost(id){
  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`)

  return{
    type: FETCH_POST,
    payload:request
  }
}