import uuid from 'node-uuid'

export default function(path, array) {
  const delay = resolve => setTimeout(resolve, 150)

  return {
    getAll() {
      if (process.env.API_URL) {
        return Vue.$http.get(`${process.env.API_URL}/${path}`)
      } else {
        return new Promise(delay).then(() => array)
      }
    },
    getOne(id) {
      if (process.env.API_URL) {
        return Vue.$http.get(`${process.env.API_URL}/${path}/${id}`)
      } else {
        return new Promise(delay).then(() => {
          const items = array.filter(item => item.id == id)
          return items.length === 0 ? null : items[0]
        })
      }
    },
    post(data) {
      if (process.env.API_URL) {
        return Vue.$http.post(`${process.env.API_URL}/${path}`, data)
      } else {
        if (!data.id) data.id = uuid.v4()
        return new Promise(delay).then(() => array.push(data))
      }
    },
    put(data) {
      if (process.env.API_URL) {
        return Vue.$http.put(`${process.env.API_URL}/${path}`, data)
      } else {
        return new Promise(delay).then(() => {
          const index = array.findIndex(item => item.id === data.id)
          array.splice(index, 1)
          array.push(data)
        })
      }
    },
    delete(id) {
      if (process.env.API_URL) {
        return Vue.$http.delete(`${process.env.API_URL}/${path}/${id}`)
      } else {
        return new Promise(delay).then(() => {
          const index = array.findIndex(item => item.id === id)
          array.splice(index, 1)
        })
      }
    }
  }
}
