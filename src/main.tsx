import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./index.css"
import { BrowserRouter } from "react-router-dom";
import { MSWComponent } from './components/MSWComponent.tsx';
import RQProvider from './components/RQProvider.tsx';

const loadKakaoMaps = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_API_KEY}&libraries=services&autoload=false`;
    
    script.onload = () => {
      // SDK가 로드된 후 maps를 초기화
      window.kakao.maps.load(() => {
        resolve(null);
      });
    };
    
    script.onerror = (error) => {
      console.error("카카오 지도 로딩 중 오류 발생생:", error); // 디버깅용
      reject(error);
    };

    document.head.appendChild(script);
  });
};

const renderApp = () => {
  createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <MSWComponent/>
      <RQProvider>
        <App />
      </RQProvider>
    </BrowserRouter>
  );
};

// 카카오맵 로드 후 앱 실행
loadKakaoMaps()
  .then(() => {
    renderApp();
  })
  .catch((error) => {
    console.error("Failed to load Kakao Maps:", error);
  });