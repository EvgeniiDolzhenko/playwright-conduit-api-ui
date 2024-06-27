import {test, expect} from '../../common/test'

require('dotenv').config()


const email = process.env.EMAIL as string
const userName = process.env.USER as string
const api_server = process.env.API_URL as string

test.describe('Positive scenario',async()=>{
    test('login succses status code, token',async()=>{
    
    })
})