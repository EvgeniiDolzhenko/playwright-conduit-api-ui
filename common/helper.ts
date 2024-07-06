import {faker} from '@faker-js/faker'

const tags = [faker.lorem.words(1), faker.lorem.words(1), faker.lorem.words(1)]
const tag = [faker.lorem.words(1)]
const randomEmail = faker.internet.email()
const randomUsername = faker.person.fullName()
const description = faker.lorem.sentences(1)
const articleInfo = faker.lorem.sentences(3)
const title = faker.lorem.words(1) + Math.floor(Math.random() * 100000)

export {tags, tag, randomEmail, randomUsername, description, articleInfo, title}
