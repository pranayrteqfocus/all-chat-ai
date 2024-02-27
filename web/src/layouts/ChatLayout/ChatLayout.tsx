import { useState } from 'react'

import {
  HistoryOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  WechatOutlined,
} from '@ant-design/icons'
import { Button, ConfigProvider, Image, Layout, Menu } from 'antd'

import { Link, routes } from '@redwoodjs/router'

import theme from 'src/theme/themeConfig'

import companyLogo from '../../../public/7997777.png'

type ChatLayoutProps = {
  children?: React.ReactNode
}

const { Header, Sider, Content } = Layout

const ChatLayout = ({ children }: ChatLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <ConfigProvider theme={theme}>
      <Layout>
        <Sider
          // style={{ overflow: 'auto', position: 'fixed', bottom: 0, top: 0 }}
          trigger={null}
          collapsible
          theme="light"
          collapsed={collapsed}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image src={companyLogo} width={100} height={100} preview={false} />
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <WechatOutlined />,
                label: 'Chat',
              },
              {
                key: '2',
                icon: <HistoryOutlined />,
                label: 'History',
              },
              {
                key: '3',
                icon: <SettingOutlined />,
                label: 'Settings',
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              backgroundColor: '#fff',
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <Link to={routes.login()} style={{ marginLeft: 1200 }}>
              <LogoutOutlined />
            </Link>
          </Header>
          <Content
            style={{
              margin: '2px 1px',
              padding: 15,
              minHeight: '90vh',
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default ChatLayout
