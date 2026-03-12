declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    HIDE_LOGS: boolean;
    store: any;
  }

  const APP__BRANCH: string;
  const APP__BUILD_DATE: string;
  const APP__GITHASH: string;
  const APP__VERSION: string;
}

export {};
