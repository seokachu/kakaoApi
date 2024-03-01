import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import GlobalStyle from './styles/GlobalStyle.jsx';
import GlobalFontStyle from './components/assets/fonts/GlobalFontStyle.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <>
    <App />
    <GlobalStyle />
    <GlobalFontStyle />
    <ToastContainer />
  </>
  // </React.StrictMode>
);
