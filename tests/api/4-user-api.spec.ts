import {test, expect} from '../../common/test'
import {faker} from '@faker-js/faker'
require('dotenv').config()

const email = process.env.EMAIL as string
const userName = process.env.USER as string
const api_server = process.env.API_URL as string

test.describe('Create a new post ->Verify the post appears in the feed -> Verify the post is not visible to a logged-out user.', async () => {
  const tags = ['fashion', 'art', 'music']
  const title = faker.lorem.words(1) + Math.floor(Math.random() * 100000)
  const description = faker.lorem.sentences(1)
  const articleInfo = faker.lorem.sentences(3)
  let newArticle: string
  test.beforeEach('Create new Article', async ({articlePage}) => {
    const response = await articlePage.createNewArticleApi(title, description, articleInfo, tags)
    expect(response.status()).toEqual(201)
    const body = await response.json()
    newArticle = await body.article.slug
    const getAllArticles = await articlePage.getAllArticles(api_server, 'loggedIn')
    const bodyAllarticles = await getAllArticles.json()
    const allArticles = await bodyAllarticles.articles
    const slugs = allArticles.map(article => article.slug)
    expect(slugs).toContain(newArticle)
  })

  test('Verify the post does not exist for a logged-out user.', async ({articlePage}) => {
    const getAllArticles = await articlePage.getAllArticles(api_server, 'loggedOut')
    const bodyAllarticles = await getAllArticles.json()
    const allArticles = await bodyAllarticles.articles
    const slugs = allArticles.map(article => article.slug)
    expect(slugs).not.toContain(newArticle)
    const deleteArticle = await articlePage.deleteArticle(title)
    expect(deleteArticle.status()).toEqual(204)
  })

  test('Verify that the post is visible when retrieving the article by title for a logged-out user.', async ({
    articlePage,
  }) => {
    const getArticleByTitle = await articlePage.getArticleByTitle(title, 'loggedOut')
    const bodyArticle = await getArticleByTitle.json()
    const article = await bodyArticle.article.slug
    expect(article).toEqual(newArticle)
    const deleteArticle = await articlePage.deleteArticle(title)
    expect(deleteArticle.status()).toEqual(204)
  })
})
