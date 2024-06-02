import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StoreProvider from './provider/store.provider'
import { ProtectedProvider } from './provider/protected.provider'
import { Role } from './enum/roles.enum'
import { QueryClient, QueryClientProvider } from 'react-query'

import InitLayout from './layouts/InitLayout'
import SolveProblemPage from './pages/SolveProblemPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import LearnPage from './pages/LearnPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import Error404Page from './pages/Error404Page'

export default function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <Routes>
          <Route path='*' element={<Error404Page />} />
          <Route element={<StoreProvider />}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route element={<ProtectedProvider allowedRoles={[Role.User, Role.SuperAdmin]} />}>
              <Route path="/solve/:problemId" element={<SolveProblemPage />} />
              <Route element={<InitLayout />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/learn" element={<LearnPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </QueryClientProvider>
    </BrowserRouter >
  );
}