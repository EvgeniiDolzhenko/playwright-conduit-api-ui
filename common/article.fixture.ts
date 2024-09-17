import { test as base } from '@playwright/test';
import { Article } from '../pages/article';
import {expect} from '@playwright/test';
import {tags, title, description, articleInfo} from '../common/helper'
type ArticleFixture = {
    articlePage : Article
    articleFixture : any
}

export const test = base.extend<ArticleFixture>({
     articleFixture :  async ({articlePage}, use)=>{
        const response =   await articlePage.createNewArticleApi(title, description, articleInfo, tags)
        const data = await response.json()
        expect(response.status()).toEqual(201)
        await use(articlePage)
        return data
     }

     
})
export {ArticleFixture, expect}