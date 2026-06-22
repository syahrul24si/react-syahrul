import axios from 'axios'

const API_URL = "https://aiphtlwilmmposlmopnb.supabase.co/rest/v1/note"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpcGh0bHdpbG1tcG9zbG1vcG5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4OTY5NDksImV4cCI6MjA5NjQ3Mjk0OX0.GxDslQ09PxTVS2b6XXkR2aA1E-UFwVlQ-_tfnEqRRcw"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
}

export const notesAPI = {
    async fetchNotes() {
        const response = await axios.get(API_URL, { headers })
        return response.data
    },

    async createNote(data) {
        const response = await axios.post(API_URL, data, { headers })
        return response.data
    },

    async deleteNote(id) {
        await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
    }

}