import axios from 'axios'

const API_URL = '/api/sessions/'

const createSession = async (sessionData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, sessionData, config)

    return response.data
}

const getSessions = async () => {
    const response = await axios.get(API_URL)
    return response.data
}

// Delete Session
const deleteSession = async (sessionId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.delete(API_URL + sessionId, config)
  
    return response.data
}

const sessionService = {
    createSession,
    getSessions,
    deleteSession,
}

export default sessionService