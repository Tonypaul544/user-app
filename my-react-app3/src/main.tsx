
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Form from './form'
import UsersPage from './UsersPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UsersPage />
    {/* <Form /> */}
  </StrictMode>
)
