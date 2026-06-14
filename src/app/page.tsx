'use client'

import { useEffect } from 'react'
import { useAuthStore, ViewType } from '@/lib/store'
import { Landing } from '@/components/landing'
import { Login } from '@/components/login'
import { CentralDashboard } from '@/components/central-dashboard'
import { TenantDashboard } from '@/components/tenant-dashboard'

export default function Home() {
  const { currentView, checkAuth, isAuthenticated } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const handleNavigate = (view: 'login') => {
    useAuthStore.getState().setCurrentView(view)
  }

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <Landing onNavigate={handleNavigate} />
      case 'login':
        return <Login />
      case 'central-dashboard':
        return isAuthenticated ? <CentralDashboard /> : <Landing onNavigate={handleNavigate} />
      case 'tenant-dashboard':
        return isAuthenticated ? <TenantDashboard /> : <Landing onNavigate={handleNavigate} />
      default:
        return <Landing onNavigate={handleNavigate} />
    }
  }

  return renderView()
}
