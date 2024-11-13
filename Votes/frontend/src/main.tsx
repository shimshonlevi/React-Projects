import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.tsx'
import { store } from './store/store.ts'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
 <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
   </Provider>

)