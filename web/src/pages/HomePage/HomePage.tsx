import {
  OpenAIOutlined,
  SendOutlined,
  SlackOutlined,
  UserOutlined,
} from '@ant-design/icons'
import {
  Avatar,
  Button,
  Card,
  Col,
  Flex,
  Input,
  Row,
  Space,
  Typography,
} from 'antd'

import { Metadata } from '@redwoodjs/web'

const { Text } = Typography
const HomePage = () => {
  return (
    <>
      <Metadata title="Home" description="Home page" />
      <Flex vertical gap={20}>
        <Space>
          <Avatar icon={<UserOutlined />} />
          <Text>What are the major things I can find in this file?</Text>
        </Space>
        <Row gutter={10}>
          <Col span={12}>
            <Card>
              <Space>
                <Avatar icon={<OpenAIOutlined />} />
                <Text>asdasdwqe</Text>
              </Space>
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Space>
                <Avatar icon={<SlackOutlined />} />
                <Text>asdasdwqe</Text>
              </Space>
            </Card>
          </Col>
        </Row>
      </Flex>
      <Space.Compact
        block
        style={{
          width: '80%',
          position: 'absolute',
          bottom: 0,
          padding: 10,
        }}
      >
        <Input placeholder="Type your message here..." />
        <Button type="primary" icon={<SendOutlined />} shape="circle"></Button>
      </Space.Compact>
    </>
  )
}

export default HomePage
