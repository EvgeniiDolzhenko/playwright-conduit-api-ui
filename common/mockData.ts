export function generateFavorites(favoritesCount: number) {
  return {
    articles: [
      {
        slug: 'mock-slug',
        title: 'MOCK ARTICLE',
        description: 'THIS IS TEST',
        body: 'Comprehendo aeneus defetiscor dolorum amet agnosco. Vulgivagus voro acer. Videlicet beatus speculum enim contra.',
        tagList: ['tantillus', 'coepi', 'adhuc'],
        createdAt: '2024-07-12T12:24:06.659Z',
        updatedAt: '2024-07-12T12:24:06.659Z',
        favorited: false,
        favoritesCount: favoritesCount,
        author: {
          username: 'playwright123',
          bio: null,
          image:
            'https://hashnode.com/utility/r?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1670605274484%2F_kNzNQsQO.png%3Fw%3D1200%26h%3D630%26fit%3Dcrop%26crop%3Dentropy%26auto%3Dcompress%2Cformat%26format%3Dwebp%26fm%3Dpng',
          following: false,
        },
      },
    ],
    articlesCount: 60,
  }
}
