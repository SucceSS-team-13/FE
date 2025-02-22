import styles from "../../styles/main/AIMessage.module.less";
import LoadingSpinner from "../LoadingSpinner";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const AIMessage = ({ 
  message, 
  isLoading,
  location, 
}: { 
  message: string;
  isLoading: boolean;
  location?: string[];
}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading && location && mapRef.current) {
      const geocoder = new window.kakao.maps.services.Geocoder();
      
      geocoder.addressSearch(location, (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          
          const map = new window.kakao.maps.Map(mapRef.current, {
            center: coords,
            level: 3
          });
          
          new window.kakao.maps.Marker({
            position: coords,
            map: map
          });
        }
      });
    }
  }, [location, isLoading]);

  return (
    <div className={styles.container}>
      <div className={styles.lumiLogo}>
        <img src="/image/logo.png" alt="logo" />
      </div>
      <div className={styles.messageContent}>
        <p className={styles.lumiMessage}>
          {isLoading ? <LoadingSpinner size={"xs"}/> : message}
        </p>
        {location && !isLoading && (
          <div 
            ref={mapRef} 
            className={styles.mapContainer}
          />
        )}
      </div>
    </div>
  );
};

export default AIMessage;