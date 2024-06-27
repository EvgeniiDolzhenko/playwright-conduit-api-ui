import {test, expect} from '../../common/test'

require('dotenv').config()
import {faker} from '@faker-js/faker'

const email = process.env.EMAIL as string
const userName = process.env.USER as string
const api_server = process.env.API_URL as string

test.describe('Register new client negative', async () => {
  const username = faker.person.fullName()

  test('Register new client without email', async ({regPage}) => {
    const data = {
      password: '123',
      username: username,
    }
    const response = await regPage.regNeqClientApi(api_server, data)
    expect(response.status()).toEqual(422)
    const responseBody = await response.json()
    expect(responseBody.errors.email).toEqual(["can't be blank"])
  })

  test('Register new client without username', async ({regPage}) => {
    const data = {
      email: email,
      password: '123',
    }
    const response = await regPage.regNeqClientApi(api_server, data)
    expect(response.status()).toEqual(422)
    const responseBody = await response.json()
    expect(responseBody.errors.username).toEqual(["can't be blank"])
  })
})
