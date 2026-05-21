import React, { createContext, useState, useContext, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Token ${token}`
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [token])

  const fetchUser = async () => {
    try {
      const response = await api.get('/api/users/me/')
      setUser(response.data)
    } catch (error) {
      console.error('Ошибка загрузки пользователя:', error)
      logout()
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    try {
      const response = await api.post('/api/users/register/', userData)
      const { token: newToken, user: newUser } = response.data
      localStorage.setItem('token', newToken)
      setToken(newToken)
      api.defaults.headers.common['Authorization'] = `Token ${newToken}`
      setUser(newUser)
      return { success: true }
    } catch (error) {
      return { success: false, errors: error.response?.data || error.message }
    }
  }

  const login = async (username, password) => {
    try {
      const response = await api.post('/api/users/login/', { username, password })
      const { token: newToken, user: newUser } = response.data
      localStorage.setItem('token', newToken)
      setToken(newToken)
      api.defaults.headers.common['Authorization'] = `Token ${newToken}`
      setUser(newUser)
      return { success: true }
    } catch (error) {
      return { success: false, errors: error.response?.data || error.message }
    }
  }

  const logout = async () => {
    try {
      await api.post('/api/users/logout/')
    } catch (error) {
      console.error('Ошибка при выходе:', error)
    } finally {
      localStorage.removeItem('token')
      setToken(null)
      setUser(null)
      delete api.defaults.headers.common['Authorization']
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}