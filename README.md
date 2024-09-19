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

## To-Do

- [ ] integrate with Rainbow-kit/thirdweb as web3 entry
- [ ] integrate with State Manager (such as Zustand)
- [ ] integrate with React-Query (for caching query)