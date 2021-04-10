import { ClockCircleTwoTone } from "@ant-design/icons";
import { PostOrPage, PostsOrPages } from "@tryghost/content-api";
import { Breadcrumb, Typography } from "antd";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import { FC } from "react";
import MainLayout from "../../components/layout";
import { getPages } from "../../core/services/pages";
import { getOnePost, getPosts } from "../../core/services/posts";

type Props = {
  post: PostOrPage;
  pages: PostsOrPages;
};

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts();
  const paths = posts!.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const post = await getOnePost(context.params!.slug);
  const pages = await getPages();
  return post && pages ? { props: { post, pages } } : { notFound: true };
};

const PostPage: FC<Props> = ({ post, pages }) => (
  <MainLayout pages={pages}>
    <Breadcrumb style={{ margin: "16px 0" }}>
      <Breadcrumb.Item>
        <Link href={"/"}>
          <a>Home</a>
        </Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>{post.slug}</Breadcrumb.Item>
    </Breadcrumb>
    <Typography.Title>{post.title}</Typography.Title>
    <Typography.Text>
      {post.authors?.map((author) => author.name)} <ClockCircleTwoTone />{" "}
      {post.reading_time} min read
    </Typography.Text>
    <article dangerouslySetInnerHTML={{ __html: post.html! }} />
  </MainLayout>
);

export default PostPage;
