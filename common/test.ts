import {test as base, expect} from '@playwright/test'
import {Reg} from '../pages/reg'
import {Login} from '../pages/login'
import {Article} from '../pages/article'
import {Navbar} from '../pages/nav'
import { HelloPage } from '../pages/hello.page'

export type TestOptions = {
  regPage: Reg
  loginPage: Login
  articlePage: Article
  navbar: Navbar
  hello: HelloPage
}

const test = base.extend<TestOptions>({
  regPage: async ({page}, use) => {
    await use(new Reg(page))
  },
  loginPage: async ({page}, use) => {
    await use(new Login(page))
  },
  articlePage: async ({page}, use) => {
    await use(new Article(page))
  },
  navbar: async ({page}, use) => {
    await use(new Navbar(page))
  },
  hello: async ({page}, use) => {
    await use(new HelloPage(page))
  },
})

export {test, expect}
