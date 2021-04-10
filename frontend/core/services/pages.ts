import { api } from "./api";

export const getPages = async () => {
  try {
    return await api.pages.browse({
      limit: "all",
      include: ["tags", "authors"],
    });
  } catch (err) {
    console.error(err);
  }
};

export const getOnePage = async (slug: string) => {
  try {
    return await api.pages.read(
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
