import styles from '../styles/LoadingSpinner.module.less'

type Props = {
  size: 'xs' | 'sm' | 'md' | 'lg';
}

export default function LoadingSpinner({size}: Props) {
  return (
    <div className={styles.container}>
      <div className={`${styles.spinner} ${styles[size]}`} />
    </div>
  );
}