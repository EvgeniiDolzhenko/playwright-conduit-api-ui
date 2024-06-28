import {test, expect} from '../../common/test'
import {faker} from '@faker-js/faker'
require('dotenv').config()

const email = process.env.EMAIL as string
const userName = process.env.USER as string
const api_server = process.env.API_URL as string

test.describe('Create new article, verify , delete E2E API', async () => {
  const tags = ['fashion', 'art', 'music']
  const title = faker.lorem.words(1) + Math.floor(Math.random() * 100000)
  const description = faker.lorem.sentences(1)
  const articleInfo = faker.lorem.sentences(3)
  test.beforeEach('Create new Article', async ({articlePage}) => {
    const response = await articlePage.createNewArticleApi(title, description, articleInfo, tags)
    const data = await response.json()
    expect(response.status()).toEqual(201)
    expect(data.article.slug).toContain(title + '-5549')
  })

  test('Verify new article status and slug', async ({articlePage}) => {
    const response = await articlePage.getArticleByTitle(title, 'loggedIn')
    const data = await response.json()
    expect(response.status()).toEqual(200)
    expect(data.article.slug).toContain(title + '-5549')
  })
})
