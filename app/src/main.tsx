import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import './style.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <App />
    <Toaster
      toastOptions={{
        className:
          'bg-jumbo-50 dark:bg-jumbo-800 text-jumbo-800 dark:text-white',
      }}
    />
  </BrowserRouter>
)
