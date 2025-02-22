import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/main/AIMessage.module.less";
import LoadingSpinner from "../LoadingSpinner";

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
  const [map, setMap] = useState<any>(null);
  const [bounds, setBounds] = useState<any>(null);

  useEffect(() => {
    if (!isLoading && location && location.length > 0 && mapRef.current) {
      const geocoder = new window.kakao.maps.services.Geocoder();
      const bounds = new window.kakao.maps.LatLngBounds();
      
      // Initialize map with first location
      geocoder.addressSearch(location[0], (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const firstCoords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          
          const newMap = new window.kakao.maps.Map(mapRef.current, {
            center: firstCoords,
            level: 3
          });
          
          setMap(newMap);
          setBounds(bounds);
          
          // Process all locations
          location.forEach((address) => {
            geocoder.addressSearch(address, (result: any, status: any) => {
              if (status === window.kakao.maps.services.Status.OK) {
                const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                
                // Create marker
                new window.kakao.maps.Marker({
                  position: coords,
                  map: newMap
                });
                
                // Add location to bounds
                bounds.extend(coords);
                
                // After processing the last location, fit map to bounds
                if (address === location[location.length - 1]) {
                  newMap.setBounds(bounds);
                }
              }
            });
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