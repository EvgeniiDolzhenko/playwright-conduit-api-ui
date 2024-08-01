import {Locator, Page, request} from '@playwright/test'
export class Navbar {
  readonly page: Page
  readonly navbarHome: Locator

  constructor(page: Page) {
    this.page = page
    this.navbarHome = page.locator('.navbar-brand')
  }

  async openBasePage(token: string) {
    await this.page.goto('/')
    await this.page.evaluate(token => {
      localStorage.setItem('jwtToken', token)
    }, token)
    await this.page.waitForResponse('**/tags')
  }

  async openArticleEditor() {
    await this.page.reload()
    await this.page.locator('[href="/editor"]').click()
    await this.page.waitForURL('**/editor')
  }
}
