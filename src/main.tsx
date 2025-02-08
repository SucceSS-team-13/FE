import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./index.css"
import { BrowserRouter } from "react-router-dom";
import { MSWComponent } from './components/MSWComponent.tsx';


createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
  <MSWComponent/>
    <App />
  </BrowserRouter>
);
