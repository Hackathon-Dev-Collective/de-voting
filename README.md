This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). package manager [pnpm](https://pnpm.io)

Chinese Version: [简体中文](./docs/README-zh.md)

## Routers

```
/app
  /page.tsx (Homepage)
  /profile
    /[address]
      /page.tsx (User Info)
  /vote
    /[id]
      /page.tsx (Voting Results)
/components
    ConnectWallet.tsx
    CreateVoteModal.tsx
    RewardAnimation.tsx
/types
```