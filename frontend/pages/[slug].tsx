import { PostOrPage, PostsOrPages } from "@tryghost/content-api";
import { Breadcrumb, Typography } from "antd";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import { FC } from "react";
import MainLayout from "../components/layout";
import { getOnePage, getPages } from "../core/services/pages";

type Props = {
  page: PostOrPage;
  pages: PostsOrPages;
};

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getPages();
  const paths = pages!.map((page) => ({ params: { slug: page.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const page = await getOnePage(context.params!.slug);
  const pages = await getPages();

  return page && pages ? { props: { page, pages } } : { notFound: true };
};

const SitePage: FC<Props> = ({ page, pages }) => (
  <MainLayout pages={pages}>
    <Breadcrumb style={{ margin: "16px 0" }}>
      <Breadcrumb.Item>
        <Link href={"/"}>
          <a>Home</a>
        </Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>{page.title}</Breadcrumb.Item>
    </Breadcrumb>
    <Typography.Title level={2}>{page.title}</Typography.Title>
    <article dangerouslySetInnerHTML={{ __html: page.html! }} />
  </MainLayout>
);

export default SitePage;
