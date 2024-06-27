import {Locator, Page, request} from '@playwright/test'
import {expect} from '../common/test'

export class Login {
  readonly page: Page
  readonly locator: Location

  constructor(page: Page) {
    this.page = page
  }
}
