import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./index.css"
import { BrowserRouter } from "react-router-dom";
import { MSWComponent } from './components/MSWComponent.tsx';
import RQProvider from './components/RQProvider.tsx';


createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
  <MSWComponent/>
    <RQProvider>
      <App />
    </RQProvider>
  </BrowserRouter>
);
