import {test, expect} from '../../common/test'
require('dotenv').config()
import {tags, title, description, articleInfo} from '../../common/helper'
const email = process.env.EMAIL as string
const userName = process.env.USER as string
const api_server = process.env.API_URL as string

test.describe('Create new article, verify , delete E2E API', async () => {
  test.beforeEach('Create new Article', async ({articlePage}) => {
    const response = await articlePage.createNewArticleApi(title, description, articleInfo, tags)
    const data = await response.json()
    expect(response.status()).toEqual(201)
    expect(data.article.slug).toContain(title + '-5549')
  })

  test('Verify new article status and slug', async ({articlePage}) => {
    await test.step('Get Article by Title and Verify slug', async()=>{
      const response = await articlePage.getArticleByTitle(title, 'loggedIn')
      const data = await response.json()
      expect(response.status()).toEqual(200)
      expect(data.article.slug).toContain(title + '-5549')
    })
    await test.step('DeLete Article and Verify article is deleted', async()=>{
      const deleteArticle = await articlePage.deleteArticle(title)
      expect(deleteArticle.status()).toEqual(204)
      const getArticleByTitle = await articlePage.getArticleByTitle(title, 'loggedIn')
      const bodyGetArticle = await getArticleByTitle.json()
      expect(bodyGetArticle.errors.article).toEqual(['not found'])
    })
  })
})

