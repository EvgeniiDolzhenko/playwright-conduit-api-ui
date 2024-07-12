import {test, expect} from '../../common/test'
import {generateFavorites} from '../../common/mockData'
require('dotenv').config()
const token = process.env.API_TOKEN as string
const api_server = process.env.API_URL as string
import {tags, title, description, articleInfo} from '../../common/helper'

test.describe('Create new article, verify aritcle , delete article UI', async () => {
  let articleName: string
  let newArticle: any
  let createdArticle: any

  test.beforeEach('Create new article', async ({page, articlePage, navbar}) => {
    newArticle = await articlePage.createNewArticleApi(title, description, articleInfo, tags)
    const data = await newArticle.json()
    articleName = await data.article.slug
    expect(newArticle.status()).toEqual(201)
    await navbar.openBasePage(token)
    createdArticle = page.locator(`a[href="/article/${articleName}"]`)
    await expect(createdArticle).toBeVisible()
    await page.locator(`a[href="/article/${articleName}"]`).click()
    await page.waitForResponse('**/articles?**')
    expect(page.url()).toContain(articleName)
    await expect(page.locator('h1')).toContainText(articleName.split('-')[0])
  })

  test('Verify article, delete created article UI', async ({page, articlePage, navbar}) => {
    await navbar.openBasePage(token)
    createdArticle = page.locator(`a[href="/article/${articleName}"]`)
    await expect(createdArticle).toBeVisible()
    await page.locator(`a[href="/article/${articleName}"]`).click()
    await expect(articlePage.deleteArticleButton).toBeVisible()
    await articlePage.deleteArticleButton.click()
    const response = await page.waitForResponse('**/articles/**')
    expect(response.status()).toEqual(204)
    await expect(createdArticle).not.toBeVisible()
  })
})

test.describe('Mocking article and verify UI for different favoritesCount values', () => {
  const testValues = [9999, 10000, 0, 1]
  testValues.forEach(value => {
    test(`Verify UI with favoritesCount = ${value}`, async ({navbar, page}) => {
      const articles = generateFavorites(value)
      await page.route(`${api_server}/articles?limit=10&offset=0`, async route => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(articles),
        })
      })
      await navbar.openBasePage(token)
      await expect(page.locator('.preview-link')).toHaveCount(1)
      await expect(page.locator('.preview-link h1')).toHaveText('MOCK ARTICLE')
      await expect(page.locator('[class="btn btn-sm btn-outline-primary"]')).toHaveText(
        ` ${value} `
      )
      await expect(page.locator('[class="btn btn-sm btn-outline-primary"]')).toHaveScreenshot({
        maxDiffPixels: 100,
      })
    })
  })
})
