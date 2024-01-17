import { Layout, Menu, MenuProps } from 'antd';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { createElement } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { adminPaths, adminSidebarItems } from '../../routes/admin.routes';
import { sidebarItemsGenerator } from '../../utils/sidebarItemsGenerator';
import Sidebar from './Sidebar';
const { Header, Content, Footer, Sider } = Layout;

const MainLayout = () => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Sidebar />
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
