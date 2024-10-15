import { Page } from '@playwright/test'
export class HelloPage {
    readonly page: Page
  
    constructor(page: Page) {
      this.page = page
    }

    async helloWord(str: string){
     return str + " , this is function from Hello Page."
    }
  
  }