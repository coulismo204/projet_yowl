// src/store.js
import axios from 'axios'
import { createStore } from 'vuex'

const store = createStore({
  state: {
    notes: [],
    loading: false,
    error: null
  },
  mutations: {
    setNotes(state, notes) {
      state.notes = notes
    },
    setLoading(state, value) {
      state.loading = value
    },
    setError(state, error) {
      state.error = error
    }
  },
  actions: {
    async fetchNotes({ commit }) {
      commit('setLoading', true)
      commit('setError', null)

      try {
        const response = await axios.get('http://localhost:8080/api/user/')
        if (!response.ok) throw new Error('Failed to fetch')

        const data = await response.json()
        commit('setNotes', data.notes)

      } catch (err) {
        commit('setError', err.message)
      } finally {
        commit('setLoading', false)
      }
    }
  }
})

export default store
