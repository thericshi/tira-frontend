/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OUT_DIR?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
