import { useEffect, useRef, useState } from 'react'

import {
  CheckOutlined,
  OpenAIOutlined,
  SendOutlined,
  SlackOutlined,
  UserOutlined,
} from '@ant-design/icons'
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Flex,
  GetProp,
  Input,
  List,
  Modal,
  Space,
  Typography,
} from 'antd'

import { Metadata } from '@redwoodjs/web'

const { Text } = Typography

const HomePage = () => {
  const [modalOpen, setModalOpen] = useState(false)

  const [data, setData] = useState([
    {
      query: 'first chat',
      answer: [
        {
          title: 'AWS',
          response:
            'In Amazon Titan Foundation Models, TopP (Top-P) is a metric used to evaluate the performance of a text model. It is commonly used for evaluating language models on open-domain QA tasks. TopP measures the percentage of correct answers that a model predicts among the top k answers.\n\nFor more information on Amazon Titan and TopP, please see the relevant documentation and FAQs.',
        },
        { title: 'Title 1', response: 'asdasdgfds' },
        { title: 'Title 1', response: 'asdasdgfds' },
        { title: 'Title 1', response: 'asdasdgfds' },
      ],
    },
    {
      query: 'second chat',
      answer: [{ title: 'Title 1', response: 'asdasdgfds' }],
    },
    {
      query: 'third chat',
      answer: [
        { title: 'Title 1', response: 'asdasdgfds' },
        { title: 'Title 1', response: 'asdasdgfds' },
        { title: 'Title 1', response: 'asdasdgfds' },
      ],
    },
  ])

  const [AIselection, setAISelection] = useState([
    {
      title: 'AWS',
      url: 'https://i.pinimg.com/originals/74/f4/f2/74f4f2bfb89ba284ebba6fcbad474a7d.jpg',
      status: true,
    },
    {
      title: 'Azure',
      url: 'https://static-00.iconduck.com/assets.00/microsoft-azure-icon-2048x1258-uc8ywy89.png',
      status: true,
    },
    {
      title: 'Google',
      url: 'https://cdn.iconscout.com/icon/free/png-512/free-google-160-189824.png?f=webp&w=256',
      status: false,
    },
    {
      title: 'Chat Gpt',
      url: 'https://static.vecteezy.com/system/resources/previews/022/227/364/original/openai-chatgpt-logo-icon-free-png.png',
      status: true,
    },
  ])

  const listRef = useRef(null)

  const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (
    checkedValues
  ) => {
    const updatedSelection = AIselection.map((item) => ({
      ...item,
      status: checkedValues.includes(item.title),
    }))
    setAISelection(updatedSelection)
  }
  // Automatically scroll to the bottom of the list when it updates
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [data])

  return (
    <>
      <Metadata title="Home" description="Home page" />

      <Flex vertical gap={20}>
        <div
          id="list-container"
          style={{
            height: 'calc(100vh - 200px)',
            overflowY: 'auto',
            padding: 10,
          }}
          ref={listRef}
        >
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <Flex vertical gap={20}>
                  <Space>
                    <Avatar icon={<UserOutlined />} />
                    <Text>{item.query}</Text>
                  </Space>
                  <List
                    grid={{ gutter: 16, column: 2 }}
                    dataSource={item.answer}
                    renderItem={(innerItem) => (
                      <List.Item>
                        <Card
                          title={
                            <Space>
                              <Avatar icon={<SlackOutlined />} />
                              <Text>{innerItem?.title}</Text>
                            </Space>
                          }
                        >
                          <Space>
                            <Text>{innerItem?.response}</Text>
                          </Space>
                        </Card>
                      </List.Item>
                    )}
                  />
                </Flex>
              </List.Item>
            )}
          />
        </div>
      </Flex>
      <Space.Compact
        block
        style={{
          width: '75%',
          position: 'absolute',
          bottom: 20,
          padding: 10,
        }}
      >

        <Flex
          style={{
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            gap: 0,
          }}
        >
          <Space style={{ gap: 5, marginLeft: 5 }}>
            <List
              grid={{ gutter: 16 }}
              dataSource={AIselection}
              renderItem={(item) => (
                <>
                  {item.status ? (
                    <List.Item>
                      <Avatar src={<img src={item.url} alt="avatar" />} />
                    </List.Item>
                  ) : (
                    <></>
                  )}
                </>
              )}
            />
          </Space>
          <Space.Compact>
            <Flex style={{ display: 'flex', flexGrow: 2 }}>
              <Input.TextArea
                autoSize={{ minRows: 1, maxRows: 4 }}
                size="large"
                placeholder="Type your message here..."
              />
              <Space size={'small'} style={{ marginLeft: 5, alignSelf: 'end' }}>
                <Button
                  size="large"
                  type="primary"
                  icon={<SendOutlined />}
                  shape="circle"
                />
                <Button
                  size="large"
                  onClick={() => setModalOpen(true)}
                  type="primary"
                  icon={<OpenAIOutlined />}
                  shape="circle"
                />
              </Space>
            </Flex>
          </Space.Compact>
        </Flex>
      </Space.Compact>
      <Modal
        title="Pick you AI"
        style={{ left: '25%' }}
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <div style={{ height: '500px' }}>
          <Checkbox.Group
            style={{ width: '100%', height: '100%', overflow: 'auto' }}
            onChange={onChange}
          >
            <List
              grid={{ gutter: 16, column: 1 }}
              dataSource={AIselection}
              renderItem={(item: any) => (
                <List.Item style={{ gap: 100 }}>
                  <Checkbox value={item.title}>
                    <Avatar src={<img src={item.url} alt="avatar" />} />
                    {'  '}
                    <span>{item?.title}</span>
                  </Checkbox>
                </List.Item>
              )}
            />
          </Checkbox.Group>
        </div>
      </Modal>
    </>
  )
}

export default HomePage
