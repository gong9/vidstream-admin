import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  {
    state: () => {
      return {
        demo: 11,
      }
    },
    actions: {
      setDemo() {
        this.demo = 22
      },
    },
  },
)
