import GhostContentAPI from "@tryghost/content-api";

const url = process.env.CMS_URL!;
const key = process.env.CMS_KEY!;


export const api = new GhostContentAPI({
  url,
  key,
  version: "v3",
});
