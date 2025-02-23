import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { Search } from "lucide-react";
import styles from "../../styles/BasicInfo/AddressSelection.module.less";
import useThemeStore from "../../store/themeStore";
declare global {
  interface Window {
    kakao: any;
  }
}

type Props = {
  onNext: () => void;
  selectedAddress: string;
  setSelectedAddress: (address: string) => void;
};

const AddressSelection = ({
  onNext,
  selectedAddress,
  setSelectedAddress,
}: Props) => {
  const [searchText, setSearchText] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSDKLoaded, setIsSDKLoaded] = useState<boolean>(false);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  const dummyAddresses = [
    "서울특별시 강남구 테헤란로 123",
    "서울특별시 강남구 테헤란로 456 멋진빌딩",
    "서울특별시 강남구 테헤란로 789 아름다운타워",
    "서울특별시 서초구 서초대로 111",
    "서울특별시 서초구 서초대로 222 행복빌딩",
  ];

  useEffect(() => {
    const loadKakaoSDK = () => {
      const kakaoApiKey = import.meta.env.VITE_KAKAO_API_KEY;
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&libraries=services&autoload=false`;
      script.async = true;

      script.onload = () => {
        window.kakao.maps.load(() => {
          setIsSDKLoaded(true);
        });
      };

      document.head.appendChild(script);
      return () => {
        document.head.removeChild(script);
      };
    };

    loadKakaoSDK();
  }, []);

  const searchAddress = async (keyword: string) => {
    if (!isSDKLoaded) {
      console.error("Kakao Maps SDK not loaded");
      return [];
    }

    return new Promise<string[]>((resolve) => {
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(keyword, (result: any[], status: string) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const addresses = result.map((item) => {
            if (item.road_address) {
              return item.road_address.address_name;
            }
            return item.address.address_name;
          });
          resolve(addresses);
        } else {
          resolve([]);
        }
      });
    });
  };

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchText) {
      setIsLoading(true);
      setShowResults(true);
      try {
        const results = await searchAddress(searchText);
        setSearchResults(results);
      } catch (error) {
        console.error("주소 검색 중 오류가 발생했습니다:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleAddressSelect = (address: string) => {
    setSelectedAddress(address);
    setSearchText(address);
    setShowResults(false);
  };

  const handleFinalSubmit = () => {
    if (selectedAddress && onNext) {
      onNext();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2
          className={`${styles.title} ${
            isDarkMode ? styles.darkTitle : styles.lightTitle
          }`}
        >
          당신의 일상 가까이에서 찾는 위로
        </h2>
        <p className={styles.subtitle}>
          거주하시는 지역을 알려주시면 가까운 곳의 도움이 되는 장소들을
          추천해드려요
        </p>
      </div>

      <form onSubmit={handleSearch} className={styles.form}>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            value={searchText}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchText(e.target.value)
            }
            placeholder="주소 검색 (예: 도로명, 건물명)"
            className={styles.input}
          />
          <button
            type="submit"
            className={styles.searchButton}
            aria-label="주소 검색"
          >
            <Search size={20} />
          </button>
        </div>

        {showResults && (
          <div className={styles.resultsContainer}>
            <p className={styles.resultsTitle}>검색 결과:</p>
            {isLoading ? (
              <p className={styles.loadingText}>검색 중...</p>
            ) : (
              <div className={styles.resultsList}>
                {searchResults.length > 0 ? (
                  searchResults.map((result, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleAddressSelect(result)}
                      className={`${styles.addressButton}`}
                    >
                      {result}
                    </button>
                  ))
                ) : (
                  <p className={styles.noResults}>검색 결과가 없습니다.</p>
                )}
              </div>
            )}
          </div>
        )}

        {selectedAddress && (
          <div className={styles.submitContainer}>
            <button
              type="button"
              onClick={handleFinalSubmit}
              className={styles.submitButton}
            >
              다음
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddressSelection;
