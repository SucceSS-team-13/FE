const ContentInfo = ({
  placeName,
  address,
}: {
  placeName: string;
  address: string;
}) => {
  //KaKao Maps InfoWindow는 외부 css 클래스를 인식 못하기에 인라인으로 스타일 작성
  const styles = {
    container: `
      padding: 8px;
      background-color: white;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      min-width: 150px;
      word-wrap: break-word;
      white-space: normal;
    `,
    title: `
      font-weight: 600;
      margin: 0 0 4px 0;
      word-break: keep-all;
    `,
    address: `
      font-size: 12px;
      color: #666;
      margin: 0;
      line-height: 1.4;
      word-break: keep-all;
    `
  };

  return `
    <div style="${styles.container}">
      <h3 style="${styles.title}">${placeName}</h3>
      <p style="${styles.address}">${address}</p>
    </div>
  `;
}

export default ContentInfo