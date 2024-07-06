import {test, expect} from '../../common/test'
require('dotenv').config()
const token = process.env.API_TOKEN as string
import {tags, title, description, articleInfo} from '../../common/helper'

test.describe('Create new article, verify aritcle , delete article UI', async () => {
  let articleName: string
  let newArticle: any
  let createdArticle: any
  test.beforeAll('create article', async ({page, articlePage}) => {
    newArticle = await articlePage.createNewArticleApi(title, description, articleInfo, tags)
    const data = await newArticle.json()
    articleName = await data.article.slug
    expect(newArticle.status()).toEqual(201)
  })

  test.beforeEach('go to the page, put token', async ({page}) => {
    await page.goto('/')
    await page.evaluate(token => {
      localStorage.setItem('jwtToken', token)
    }, token)
    await page.reload()
  })

  test('Create new article, verify aritcle , delete article', async ({page}) => {
    createdArticle = page.locator(`a[href="/article/${articleName}"]`)
    await expect(createdArticle).toBeVisible()
    await page.locator(`a[href="/article/${articleName}"]`).click()
    await page.waitForResponse('**/articles?**')
    expect(page.url()).toContain(articleName)
    await expect(page.locator('h1')).toContainText(articleName.split('-')[0])
  })

  test('delete created article UI', async ({page, articlePage}) => {
    createdArticle = page.locator(`a[href="/article/${articleName}"]`)
    await expect(createdArticle).toBeVisible()
    await page.locator(`a[href="/article/${articleName}"]`).click()
    await expect(articlePage.deleteArticleButton).toBeVisible()
    await articlePage.deleteArticleButton.click()
    const response = await page.waitForResponse('**/articles/**')
    expect(response.status()).toEqual(204)
  })
})
