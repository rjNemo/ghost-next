import { PostsOrPages } from "@tryghost/content-api";
import { Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import Link from "next/link";
import { FC } from "react";

type Props = {
  pages: PostsOrPages;
};

const MainLayout: FC<Props> = ({ pages, children }) => (
  <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
        {pages.map((page) => (
          <Menu.Item key={page.id}>
            <Link href={`/${page.slug}`}>
              <a>{page.slug}</a>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </Header>
    <Content style={{ padding: "0 50px" }}>{children}</Content>
    <Footer style={{ textAlign: "center" }}>
      ©2021 – Made by{" "}
      <a
        href="https://github.com/rjNemo"
        target="_blank"
        rel="noopener noreferrer"
      >
        Ruidy
      </a>
    </Footer>
  </Layout>
);

export default MainLayout;
