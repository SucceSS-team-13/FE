import { useEffect } from "react";

//ESLint 규칙 때문에 require() 대신 import() 사용
export const MSWComponent = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') { //브라우저에서만 실행된다는 것을 보장
      if (import.meta.env.VITE_API_MOCKING === "enabled") {
        // 동적으로 import 사용
        import("../mocks/browser").then(() => {
          // mockServiceWorker 로드 완료 후 실행하는 부분 (필요시 처리 추가)
        }).catch((err) => {
          console.error('Error loading mock service worker', err);
        });
      }
    }
  }, []);

  return null;
};