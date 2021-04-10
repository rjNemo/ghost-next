import { api } from "./api";

export const getPosts = async () => {
  try {
    return await api.posts.browse({
      limit: "all",
      include: ["tags", "authors"],
    });
  } catch (err) {
    console.error(err);
  }
};

export const getOnePost = async (slug: string) => {
  try {
    return await api.posts.read(
      { slug },
      {
        limit: "all",
        include: ["tags", "authors"],
      }
    );
  } catch (err) {
    console.error(err);
  }
};
