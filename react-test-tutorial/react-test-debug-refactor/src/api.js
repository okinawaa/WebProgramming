import axios from "axios";

async function getPosts() {
  const url = "https://www.reddit.com/r/reactjs/top.json?t=year&limit=100";
  const response = await axios.get(url);
  return response.data.data.children.map(({ data }) => ({
    id: data.id,
    author: data.author,
    createdAt: data.created_utc * 1000,
    title: data.title,
    score: data.score,
  }));
}

export default {
  getPosts,
};
