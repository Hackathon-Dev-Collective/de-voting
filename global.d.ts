// global.d.ts
interface Window {
    ethereum: any; // 或者更具体的类型，比如 `import { providers } from 'ethers';` 并使用 `providers.ExternalProvider`
}
  