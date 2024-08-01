import {test, expect} from '../../common/test'
import {generateFavorites} from '../../common/mockData'
require('dotenv').config()
const token = process.env.API_TOKEN as string
const api_server = process.env.API_URL as string
import {tags, title, description, articleInfo, tag} from '../../common/helper'

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
  const testValues = [9999, 10000, 10001, 999, 1000, 1001]
  testValues.forEach(value => {
    test(`Verify UI with favoritesCount = ${value}`, async ({navbar, page, articlePage}) => {
      const articles = generateFavorites(value)
      await page.route(`${api_server}/articles?limit=10&offset=0`, async route => {
        await route.fulfill({
          body: JSON.stringify(articles),
        })
      })
      await navbar.openBasePage(token)
      await expect(articlePage.articleLink).toHaveCount(1)
      await expect(articlePage.articleLink.locator('h1')).toHaveText('MOCK ARTICLE')
      await expect(articlePage.likeButton).toHaveText(` ${value} `)
      await expect(articlePage.likeButton).toHaveScreenshot({
        maxDiffPixels: 100,
      })
    })
  })
})

test.describe('Verify new article with tag / Search by tag', () => {
  let articleName: string
  let newArticle: any
  let createdArticle: any

  test.beforeEach('Create new article', async ({page, articlePage, navbar}) => {
    newArticle = await articlePage.createNewArticleApi(title, description, articleInfo, tag)
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

  test('Verify article with tags, get article by tag and delete article', async ({
    navbar,
    page,
    articlePage,
  }) => {
    await navbar.openBasePage(token)
    await createdArticle.click()
    await expect(articlePage.tagInsideArticle).toBeVisible()
    await expect(articlePage.tagInsideArticle).toHaveText(tag)
    const slug = articleName.split('-')[0]
    const response = await articlePage.deleteArticle(slug)
    expect(response.status()).toEqual(204)
    await navbar.navbarHome.click()
    await expect(createdArticle).not.toBeVisible()
    const tagList = await page.locator('.sidebar', {hasText: 'Popular Tags'}).locator('a').count()
    const randomTag = Math.floor(Math.random() * tagList)
    const searchTag = page
      .locator('.sidebar', {hasText: 'Popular Tags'})
      .locator('a')
      .nth(randomTag)
    const input: any = await searchTag.textContent()
    await searchTag.click()
    await expect(articlePage.globalFeedButton).toHaveText(input)
  })
})

test.describe('Create new article UI / negative', async()=>{

  test.beforeEach('Open article editor',async({navbar, page})=>{
    await navbar.openBasePage(token)
    await navbar.openArticleEditor()
  })

  test('New Article error : body can not be blank', async ({page, articlePage}) => {
    await page.getByPlaceholder('Article Title').fill(title)
    await page.locator('input[formcontrolname="description"]').fill(description)
    await page.locator('button',{hasText:' Publish Article '}).click()
    await expect(articlePage.articleErrorMessage).toBeVisible()
    await expect(articlePage.articleErrorMessage).toHaveText("body can't be blank")
  })

  test('New Article error : title can not be blank', async ({page, articlePage}) => {
    await page.locator('button',{hasText:' Publish Article '}).click()
    await expect(articlePage.articleErrorMessage).toBeVisible()
    await expect(articlePage.articleErrorMessage).toHaveText("title can't be blank")
  })

  test('New Article error : description  can not be blank', async ({page, articlePage}) => {
    await page.getByPlaceholder('Article Title').fill(title)
    await page.locator('[placeholder="Write your article (in markdown)"]').fill(articleInfo)
    await page.locator('button',{hasText:' Publish Article '}).click()
    await expect(articlePage.articleErrorMessage).toBeVisible()
    await expect(articlePage.articleErrorMessage).toHaveText("description can't be blank")
  })

})
