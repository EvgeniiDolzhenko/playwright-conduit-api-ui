import {Locator, Page, request} from '@playwright/test'
export class Navbar {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async openBasePage(token: string) {
    await this.page.goto('/')
    await this.page.evaluate(token => {
      localStorage.setItem('jwtToken', token)
    }, token)
    await this.page.reload()
  }
}
