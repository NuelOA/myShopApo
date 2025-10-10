import React from 'react'
import Home from '../views/home'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ROUTES } from './routes'
import Settings from '../views/settings'
import SuccessScreen from '../views/successful'
import Receipt from '../views/receipt'

export default function Router() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path={ROUTES.home} element={<Home />} />
    <Route path={ROUTES.settings} element={<Settings />} />
    <Route path={ROUTES.success} element={<SuccessScreen />} />
    <Route path={ROUTES.receipt} element={<Receipt />} />
  </Routes>
  </BrowserRouter>
  )
}
