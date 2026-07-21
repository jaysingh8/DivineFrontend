import React, { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router'
import { useAuth } from '../features/auth/hooks/useAuth.js'
import routes from './app.routes.jsx'
import DivineLoader from '../features/shared/components/DivineLoader'

const App = () => {
  const { handleGetMe } = useAuth()
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const initAuth = async () => {
      try {
        await handleGetMe()
      } catch (error) {
        console.log("User not authenticated")
      } finally {
        setInitialized(true)
      }
    }
    initAuth()
  }, [])

  if (!initialized) {
    return <DivineLoader message="Initializing DivineCapture..." />
  }

  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App
