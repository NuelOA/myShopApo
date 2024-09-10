import React from 'react'
import Home from '../views/home'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ROUTES } from './routes'
import Settings from '../views/settings'

export default function Router() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path={ROUTES.home} element={<Home />} />
    <Route path={ROUTES.settings} element={<Settings />} />
  </Routes>
  </BrowserRouter>
  )
}
