import axios from 'axios'

if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://staff.bma.edu.ph/api/'
} else {
  axios.defaults.baseURL = 'http://127.0.0.1:7000/api/'
  /* axios.defaults.baseURL = 'http://20.0.0.120:70/api/' */
  /* axios.defaults.baseURL = 'http://192.168.100.59:7000/api/' */
}
