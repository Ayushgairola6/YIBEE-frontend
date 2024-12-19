import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '/src/index.css'
import App from './App.jsx';
import Test from './components/text.jsx';
import { Appstore } from './store/store.js'
import { Provider } from 'react-redux'



createRoot(document.getElementById('root')).render(
  <Provider store={Appstore}>
    <StrictMode>
      <App />
      {/* <Test></Test> */}
    </StrictMode>
  </Provider>
)
