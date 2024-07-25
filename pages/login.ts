import {Locator, Page, request} from '@playwright/test'

export class Login {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async login(url: string, email: string, pass: string) {
    const context = await request.newContext()
    const response = await context.post(`${url}/users/login`, {
      data: {
        user: {
          email: email,
          password: pass,
        },
      },
    })
    return response
  }
}
