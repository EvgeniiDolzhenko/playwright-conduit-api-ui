import {Locator, Page, request} from '@playwright/test'
import {expect} from '../common/test'
export class Reg {
  readonly page: Page
  readonly locator: Location
  readonly userNameInput: Locator
  readonly userEmail: Locator
  readonly userPassword: Locator
  readonly signUp: Locator
  readonly regErrorMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.userNameInput = this.page.locator('input[placeholder="Username"]')
    this.userEmail = this.page.locator('input[placeholder="Email"]')
    this.userPassword = this.page.locator('input[placeholder="Password"]')
    this.signUp = this.page.locator('button[type="submit"]')
    this.regErrorMessage = this.page.locator('[class="error-messages"]')
  }

  async openRegPage() {
    await this.page.goto('/')
    const response = await this.page.waitForResponse('**/api/articles*')
    expect(response.status()).toEqual(200)
    await this.page.locator('[href="/register"]').click()
    await expect(this.page.locator('h1[class="text-xs-center"]')).toHaveText('Sign up')
    expect(this.page.url()).toContain('/register')
  }

  async regNeqClientApi(url: string, data: object) {
    const apiContext = await request.newContext()
    const response = await apiContext.post(`${url}/users`, {
      data: {
        user: data,
      },
      failOnStatusCode: false,
    })
    return response
  }
}
