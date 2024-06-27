import {Locator, Page, request} from '@playwright/test'
require('dotenv').config()
import {expect} from '../common/test'
const url = process.env.API_URL as string

export class Article {
  readonly page: Page
  readonly locator: Location

  constructor(page: Page) {
    this.page = page
  }

  async createNewArticleApi(title: string, description: string, articleInfo: string, tags: any) {
    const apiContext = await request.newContext()
    const response = await apiContext.post(`${url}/articles`, {
      data: {
        article: {
          title: title,
          description: description,
          body: articleInfo,
          tagList: tags,
        },
      },
      failOnStatusCode: false,
      headers: {
        Authorization: 'Token ' + process.env.API_TOKEN,
      },
    })
    return response
  }

  async getArticleByTitle(title: string, permission: string) {
    const apiContext = await request.newContext()
    if (permission === 'loggedIn') {
      const response = await apiContext.get(`${url}/articles/${title}-5549`, {
        failOnStatusCode: false,
        headers: {
          Authorization: 'Token ' + process.env.API_TOKEN,
        },
      })
      return response
    } else {
      const response = await apiContext.get(`${url}/articles/${title}-5549`, {
        failOnStatusCode: false,
      })
      return response
    }
  }
}
