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
    AddressShorten.tsx
    Vote.tsx
    VoteHistory.tsx
    RewardAnimation.tsx
    RewardHIstory.tsx
    ConnectWallet.tsx
    CreateVoteModal.tsx
    RewardAnimation.tsx
/types
/hooks
    account.ts
contracts.ts
```