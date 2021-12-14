import { create } from 'apisauce'

// define the api
const api = create({
  baseURL: 'https://sugoku.herokuapp.com/',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
})

export default api;