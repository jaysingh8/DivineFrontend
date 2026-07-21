import React from 'react'
import Nav from '../features/shared/components/Nav'
import { Outlet } from 'react-router'

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-cream bg-gradient-to-b from-beige to-cream">
        <Nav/>
        <main className="pt-16">
            <Outlet/>
        </main>
    </div>
  )
}

export default AppLayout