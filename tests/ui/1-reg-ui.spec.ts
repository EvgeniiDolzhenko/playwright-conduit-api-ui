import {test, expect} from '../../common/test'
require('dotenv').config()
import {randomId} from '../../common/helper'
const email = process.env.EMAIL as string
const userName = process.env.USER as string
const pass = process.env.PASS as string

test.describe('Verify inputs, link, buttons on reg page', () => {
  test.beforeEach('Go to re page', async ({regPage}) => {
    await regPage.openRegPage()
  })

  test('Verify reg page empty inputs', async ({regPage}) => {
    await expect(regPage.userNameInput).toBeVisible()
    await expect(regPage.userEmail).toBeVisible()
    await expect(regPage.userPassword).toBeVisible()
    await expect(regPage.signUp).toHaveCSS('background-color', 'rgb(92, 184, 92)')
    await expect(regPage.signUp).toHaveAttribute('disabled')
  })

  test('Verify reg page filled inputs', async ({regPage}) => {
    await regPage.userNameInput.fill('user')
    await regPage.userEmail.fill('test@test.com')
    await regPage.userPassword.fill('pass')
    await expect(regPage.signUp).not.toHaveAttribute('disabled')
  })
})

test.describe('Negative scenarios', async () => {
  test.beforeEach('Go to re page', async ({regPage}) => {
    await regPage.openRegPage()
  })

  test('Create user with existing email', async ({regPage, page}) => {
    await Promise.all([
      expect(regPage.userNameInput).toBeVisible(),
      expect(regPage.userEmail).toBeVisible()
  ]);
    await regPage.userNameInput.fill('use1r'+randomId)
    await regPage.userEmail.fill(email)
    await regPage.userPassword.fill('pass')
    await regPage.signUp.click()
    const response = await page.waitForResponse('**/users')
    expect(response.status()).toEqual(422)
    await expect(regPage.regErrorMessage).toBeVisible()
    await expect(regPage.regErrorMessage).toHaveText('email has already been taken')
    await expect(regPage.regErrorMessage).toHaveScreenshot({maxDiffPixels: 100})
  })

  test('Create user with existing username', async ({regPage, page}) => {
    await regPage.userNameInput.fill(userName)
    await regPage.userEmail.fill(`testing${randomId}@.gmail.com`)
    await regPage.userPassword.fill('pass')
    await regPage.signUp.click()
    const response = await page.waitForResponse('**/users')
    expect(response.status()).toEqual(422)
    await expect(regPage.regErrorMessage).toBeVisible()
    await expect(regPage.regErrorMessage).toHaveText('username has already been taken')
    await expect(regPage.regErrorMessage).toHaveScreenshot({maxDiffPixels: 100})
  })

  test('Create user with existing username and email', async ({regPage, page}) => {
    await regPage.userNameInput.fill(userName)
    await regPage.userEmail.fill(email)
    await regPage.userPassword.fill('pass')
    await regPage.signUp.click()
    const response = await page.waitForResponse('**/users')
    expect(response.status()).toEqual(422)
    await expect(regPage.regErrorMessage).toBeVisible()
    await expect(page.getByText('username has already been taken')).toBeVisible()
    await expect(page.getByText('email has already been taken')).toBeVisible()
    await expect(regPage.regErrorMessage).toHaveScreenshot({maxDiffPixels: 100})
  })
})
