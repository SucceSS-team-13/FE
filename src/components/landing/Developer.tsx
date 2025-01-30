import styles from "../../styles/landing/Developer.module.less";

const Developer = ({ developers }: { developers: Developer[] }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Developer</h2>
      </div>
      <div className={styles.title}>
        <p>당신의 마음을 이해하려는 사람들</p>
      </div>
      <div className={styles.developersContainer}>
        <ul>
          {developers.map((dev) => (
            <li
              key={dev.name}
              onClick={() =>
                dev.portfolio && window.open(dev.portfolio, "_blank")
              }
            >
              <div className={styles.text}>
                <h3>{dev.name}</h3>
                <p>
                  <span>{dev.university}</span>
                  {dev.role} <br />
                  {dev.position}
                  <br />
                </p>
              </div>
              <div className={styles.image}>
                <img src={dev.image} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Developer;
