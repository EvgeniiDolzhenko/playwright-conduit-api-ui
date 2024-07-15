export function generateFavorites(favoritesCount: number) {
  return {
    articles: [
      {
        slug: 'mock-slug',
        title: 'MOCK ARTICLE',
        description: 'THIS IS TEST',
        body: 'MOCK BODY',
        tagList: ['mock', 'playwright', 'testing'],
        createdAt: '1900-07-12T12:24:06.659Z',
        updatedAt: '1900-07-12T12:24:06.659Z',
        favorited: false,
        favoritesCount: favoritesCount,
        author: {
          username: 'playwright123',
          bio: null,
          image:
            'https://media.licdn.com/dms/image/D4D12AQG1wFvB9mCAyg/article-cover_image-shrink_720_1280/0/1680249229006?e=2147483647&v=beta&t=fiuqYJc18jABWjwdDwWWThoyxAl7vwv5XWOgJ5Bs4hk',
          following: false,
        },
      },
    ],
    articlesCount: 60,
  }
}
