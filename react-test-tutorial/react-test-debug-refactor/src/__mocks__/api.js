import mockPosts from './mockPosts.json';

export default {
  getPosts: () => Promise.resolve(mockPosts),
};
