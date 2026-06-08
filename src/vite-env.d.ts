/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly BURGER_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
