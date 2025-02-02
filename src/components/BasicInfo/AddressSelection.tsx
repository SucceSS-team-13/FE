import { useState, FormEvent, ChangeEvent } from "react";
import styles from "../../styles/BasicInfo/AddressSelection.module.less";

type Props = {
  onNext: () => void;
}

const AddressSelection = ({ onNext }: Props) => {
  const [searchText, setSearchText] = useState<string>('');
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);

  const dummyAddresses = [
    "서울특별시 강남구 테헤란로 123",
    "서울특별시 강남구 테헤란로 456 멋진빌딩",
    "서울특별시 강남구 테헤란로 789 아름다운타워",
    "서울특별시 서초구 서초대로 111",
    "서울특별시 서초구 서초대로 222 행복빌딩"
  ];

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchText) {
      setShowResults(true);
    }
  };

  const handleAddressSelect = (address: string) => {
    setSelectedAddress(address);
    setSearchText(address);
  };

  const handleFinalSubmit = () => {
    if (selectedAddress && onNext) {
      onNext();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          주소를 입력해주세요
        </h2>
        <p className={styles.subtitle}>
          맞춤형 서비스 제공을 위해 주소를 입력해주세요
        </p>
      </div>

      <form onSubmit={handleSearch} className={styles.form}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            value={searchText}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
            placeholder="주소 검색 (예: 도로명, 건물명)"
            className={styles.input}
          />
        </div>

        <button
          type="submit"
          className={styles.searchButton}
        >
          주소 검색
        </button>
        
        {showResults && (
          <div className={styles.resultsContainer}>
            <p className={styles.resultsTitle}>검색 결과:</p>
            <div className={styles.resultsList}>
              {dummyAddresses.map((address, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleAddressSelect(address)}
                  className={`${styles.addressButton} ${
                    selectedAddress === address ? styles.selectedAddress : ''
                  }`}
                >
                  {address}
                </button>
              ))}
            </div>
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