import { observer } from 'mobx-react-lite';

import { toasterStore } from '../../../store/ToasterStore.ts';

import styles from './AppToaster.module.css';

const AppToaster = observer(() => {
  const { toasts } = toasterStore;

  return (
    toasts &&
    toasts.length > 0 && (
      <div className={`${styles.toaster__container}`}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`${styles.toast} ${styles[`toast__${toast.type}`]} ${toast.visible ? styles.toast__visible : styles.toast__hidden}`}
          >
            <span>{toast.message}</span>
            <button
              className={styles.toast__close}
              onClick={() => toasterStore.handleToastClose(toast.id)}
            >
              <span style={{ marginBottom: '2px' }}>×</span>
            </button>
          </div>
        ))}
      </div>
    )
  );
});

export default AppToaster;
