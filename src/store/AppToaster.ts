import { makeAutoObservable } from 'mobx';

interface IToast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'message';
  visible: boolean;
}

class ToasterStore {
  toasts: IToast[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  addToast = (message: string, type: IToast['type'] = 'info') => {
    const id = Date.now();
    const newToast = {
      id,
      message,
      type,
      visible: true,
    };

    this.toasts.push(newToast);

    setTimeout(() => {
      this.removeToast(id);
    }, 3000);
  };

  private removeToast = (id: number) => {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
  };

  handleToastClose = (id: number) => {
    this.removeToast(id);

    setTimeout(() => {
      this.removeToast(id);
    }, 300);
  };
}

export const appToaster = new ToasterStore();
