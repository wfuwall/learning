import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

export function getTreeList () {
  return axios.get('/getTreeList')
}
