import { observer } from 'mobx-react-lite';

import { appToaster } from '../../../store/AppToaster.ts';

import styles from './AppToaster.module.css';

const AppToasterComponent = observer(() => {
  const { toasts } = appToaster;

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
              onClick={() => appToaster.handleToastClose(toast.id)}
            >
              <span style={{ marginBottom: '2px' }}>×</span>
            </button>
          </div>
        ))}
      </div>
    )
  );
});

export default AppToasterComponent;
