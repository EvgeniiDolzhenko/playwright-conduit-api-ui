import {test, expect} from '../../common/test'
require('dotenv').config()
const token = process.env.API_TOKEN as string

import {faker} from '@faker-js/faker'

test('Create new article, verify aritcle , delete article', async ({page, articlePage}) => {
  const tags = ['fashion', 'art', 'music']
  const title = faker.lorem.words(1) + Math.floor(Math.random() * 100000)
  const description = faker.lorem.sentences(1)
  const articleInfo = faker.lorem.sentences(3)
  const newArticle = await articlePage.createNewArticleApi(title, description, articleInfo, tags)
  const data = await newArticle.json()
  const articleName = await data.article.slug
  expect(newArticle.status()).toEqual(201)
  await page.goto('/')
  await page.evaluate(token => {
    localStorage.setItem('jwtToken', token)
  }, token)
  await page.reload()
  const createdArticle = await page.locator(`a[href="/article/${articleName}"]`)
  await expect(createdArticle).toBeVisible()
  await page.locator(`a[href="/article/${articleName}"]`).click()
  await page.waitForResponse('**/articles?**')
  expect(page.url()).toContain(articleName)
  await expect(page.locator('h1')).toContainText(articleName.split('-')[0])
})
