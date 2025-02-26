import { useEffect, useRef, useState } from "react";
import styles from "../../styles/main/AIMessage.module.less";
import LoadingSpinner from "../LoadingSpinner";
import ContentInfo from "./ContentInfo";
import useThemeStore from "../../store/ThemeStore";

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
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const boundsInstance = useRef<any>(null);
  const [infowindow, setInfowindow] = useState<any>(null);

  useEffect(() => {
    if (!isLoading && location && location.length > 0 && mapRef.current) {
      const geocoder = new window.kakao.maps.services.Geocoder();
      const newBounds = new window.kakao.maps.LatLngBounds();

      const newInfowindow = new window.kakao.maps.InfoWindow({
        removable: false,
        zIndex: 1,
      });
      setInfowindow(newInfowindow);

      // 첫 번째 위치로 지도 초기화
      geocoder.addressSearch(location[0], (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const firstCoords = new window.kakao.maps.LatLng(
            result[0].y,
            result[0].x
          );

          const newMap = new window.kakao.maps.Map(mapRef.current, {
            center: firstCoords,
            level: 3,
          });

          // ref로 인스턴스 참조를 저장
          mapInstance.current = newMap;
          boundsInstance.current = newBounds;

          // 모든 위치 처리
          location.forEach((address) => {
            geocoder.addressSearch(address, (result: any, status: any) => {
              if (status === window.kakao.maps.services.Status.OK) {
                const coords = new window.kakao.maps.LatLng(
                  result[0].y,
                  result[0].x
                );

                // 마커 생성
                const marker = new window.kakao.maps.Marker({
                  position: coords,
                  map: newMap,
                });

                // 결과에서 장소 이름 가져오기
                const placeName = result[0].road_address
                  ? result[0].road_address.building_name ||
                    result[0].address_name
                  : result[0].address_name;

                const content = ContentInfo({
                  placeName: placeName,
                  address: result[0].address_name,
                });

                // 마커 마우스오버 이벤트 처리
                window.kakao.maps.event.addListener(marker, "mouseover", () => {
                  newInfowindow.setContent(content);
                  newInfowindow.open(newMap, marker);
                });

                window.kakao.maps.event.addListener(marker, "mouseout", () => {
                  newInfowindow.close();
                });

                // 카카오맵으로 이동하는 클릭 이벤트 추가
                window.kakao.maps.event.addListener(marker, "click", () => {
                  const kakaoMapUrl = `https://map.kakao.com/?q=${encodeURIComponent(
                    result[0].address_name
                  )}`;
                  window.open(kakaoMapUrl, "_blank");
                });

                // 위치를 경계에 추가
                newBounds.extend(coords);

                // 마지막 위치 처리 후 지도 경계 설정
                if (address === location[location.length - 1]) {
                  newMap.setBounds(newBounds);
                }
              }
            });
          });
        }
      });

      // 정리 함수
      return () => {
        if (infowindow) {
          infowindow.close();
        }
      };
    }
  }, [location, isLoading]); 

  return (
    <div className={styles.container}>
      <div className={styles.lumiLogo}>
        <img src="/image/transparentLogo.png" alt="logo" />
      </div>
      <div className={styles.messageContent}>
        <p
          className={`${styles.lumiMessage} ${
            isDarkMode ? styles.darkLumiMessage : styles.lightLumiMessage
          }`}
        >
          {isLoading ? <LoadingSpinner size={"xs"} /> : message}
        </p>
        {location && !isLoading && (
          <div
            ref={mapRef}
            className={`${styles.mapContainer} ${
              isDarkMode ? styles.darkMapContainer : styles.lightMapContainer
            }`}
          />
        )}
      </div>
    </div>
  );
};

export default AIMessage;