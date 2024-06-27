import { request } from '@playwright/test';

const email = process.env.EMAIL as string
const pass = process.env.PASS as string
const url = process.env.API_URL as string

async function globalSetup() {
  const context = await request.newContext();
  const response = await context.post( `${url}/users/login`, {
    data: {
        user: {
          email: email,
          password: pass,
        },
      },
  });

  if (response.ok()) {
    const responseBody = await response.json();
    const token = responseBody.user.token
    process.env.API_TOKEN = token;
  } else {
    console.error('Failed to login', await response.text());
    process.exit(1);
  }
  await context.dispose();
}

export default globalSetup;