import {test, expect} from '../../common/test'
import {randomEmail, randomUsername} from '../../common/helper'
require('dotenv').config()
import {faker} from '@faker-js/faker'

const email = process.env.EMAIL as string
const userName = process.env.USER as string
const api_server = process.env.API_URL as string
const password = process.env.PASS as string

test.describe('Register new client negative', async () => {
  test('Register new client without email', async ({regPage}) => {
    const data = {
      password: '123',
      username: randomUsername,
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

  test('Register new client without username and email', async ({regPage}) => {
    const data = {
      password: '123',
    }
    const response = await regPage.regNeqClientApi(api_server, data)
    expect(response.status()).toEqual(422)
    const responseBody = await response.json()
    expect(responseBody.errors.email).toEqual(["can't be blank"])
  })

  test('Register client with existiing email', async ({regPage}) => {
    const data = {
      email: email,
      password: '123',
      username: randomUsername,
    }
    const response = await regPage.regNeqClientApi(api_server, data)
    expect(response.status()).toEqual(422)
    const responseBody = await response.json()
    expect(responseBody.errors.email).toEqual(['has already been taken'])
  })

  test('Register client with existiing username', async ({loginPage, regPage}) => {
    const response = await loginPage.login(api_server,email,password)
    expect (response.status()).toEqual(200)
    const responseBody = await response.json()
    const username = await responseBody.user.username
        const data = {
      email: randomEmail,
      password: '123',
      username: username,
    }
    const regNewClient = await regPage.regNeqClientApi(api_server,data)
    expect(regNewClient.status()).toEqual(422)
    const regNewClientBody = await regNewClient.json()
    expect(regNewClientBody.errors.username).toEqual(['has already been taken'])
  })
})
