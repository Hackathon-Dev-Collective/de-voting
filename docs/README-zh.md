本项目基于 [Next.js](https://nextjs.org), 包管理器 [pnpm](https://pnpm.io)

## 基本路由介绍

```
/app
  /page.tsx (主页)
  /profile
    /[address]
      /page.tsx (用户资料页面)
  /vote
    /[id]
      /page.tsx (投票结果页面)
/components
    ConnectWallet.tsx
    CreateVoteModal.tsx
    RewardAnimation.tsx
/types
```

## To-Do

- [ ] 集成web3入口(rainbow-kit/thirdweb)
- [ ] 集成全局状态管理(zustand)
- [ ] 集成react-query(缓存请求)