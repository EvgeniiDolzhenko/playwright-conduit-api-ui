import {test as base, expect} from '@playwright/test'
import {Reg} from '../pages/reg'
import { Login } from '../pages/login'
import { Article } from '../pages/article'

export type TestOptions = {
  regPage: Reg
  loginPage : Login
  articlePage : Article
}

const test = base.extend<TestOptions>({
  regPage: async ({page}, use) => {
    await use(new Reg(page))
  },
  loginPage: async({page},use) =>{
    await use(new Login(page))
  },
  articlePage: async({page},use) =>{
    await use(new Article(page))
  },
})

export {test, expect}
