import {test as base,expect} from '@playwright/test'
import { Reg } from '../pages/reg'

export type TestOptions = {
    regPage : Reg
}

const test = base.extend<TestOptions>({
    regPage: async({page},use)=>{
        await use(new Reg(page))
    },

})

export{test,expect}