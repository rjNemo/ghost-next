import { PostsOrPages } from "@tryghost/content-api";
import { Avatar, Breadcrumb, List, Typography } from "antd";
import { GetStaticProps } from "next";
import Link from "next/link";
import { FC } from "react";
import MainLayout from "../components/layout";
import { getPages } from "../core/services/pages";
import { getPosts } from "../core/services/posts";

type Props = {
  posts: PostsOrPages;
  pages: PostsOrPages;
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts();
  const pages = await getPages();

  return posts ? { props: { posts, pages } } : { notFound: true };
};

const IndexPage: FC<Props> = ({ posts, pages }) => (
  <MainLayout pages={pages}>
    <Breadcrumb style={{ margin: "16px 0" }}>
      <Breadcrumb.Item>
        <Link href={"/"}>
          <a>Home</a>
        </Link>
      </Breadcrumb.Item>
    </Breadcrumb>
    <div className="site-layout-content">
      <Typography.Title>Welcome to our site</Typography.Title>
      <Typography.Title level={2}>Articles</Typography.Title>
      <List
        itemLayout="horizontal"
        dataSource={posts}
        renderItem={(post) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={post.feature_image} />}
              title={
                <Link href={`/posts/${post.slug}`}>
                  <a>{post.title}</a>
                </Link>
              }
              description={post.excerpt}
            />
          </List.Item>
        )}
      />
    </div>
  </MainLayout>
);

export default IndexPage;
