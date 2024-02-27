import React, { useState, useEffect, useRef } from 'react'

import { OpenAIOutlined, SendOutlined, UserOutlined } from '@ant-design/icons'
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
import axios from 'axios'

import { Metadata } from '@redwoodjs/web'

const { Text } = Typography

interface chatData {
  query: string
  answer: [
    {
      title: string
      response: string
    }
  ]
}

const HomePage = () => {
  const [modalOpen, setModalOpen] = useState(false)

  const [chatText, setChatText] = useState('')
  const [data, setData] = useState<chatData[]>()
  const [answers, setAnswers] = useState([])

  const [AIselection, setAISelection] = useState([
    {
      title: 'AWS',
      url: 'https://i.pinimg.com/originals/74/f4/f2/74f4f2bfb89ba284ebba6fcbad474a7d.jpg',
      status: true,
    },
    {
      title: 'Azure',
      url: 'https://static-00.iconduck.com/assets.00/microsoft-azure-icon-2048x1258-uc8ywy89.png',
      status: false,
    },
    {
      title: 'Google',
      url: 'https://cdn.iconscout.com/icon/free/png-512/free-google-160-189824.png?f=webp&w=256',
      status: false,
    },
    {
      title: 'Chat Gpt',
      url: 'https://static.vecteezy.com/system/resources/previews/022/227/364/original/openai-chatgpt-logo-icon-free-png.png',
      status: false,
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

  const responseHandler = async () => {
    try {
      const response = await axios.post(
        'https://b6u2607yj4.execute-api.us-east-1.amazonaws.com/dev/multi',
        {
          prompt: chatText,
          model: 'titan_text',
        },
        {
          headers: {
            'Content-Type': 'application/json', // Example header
          },
        }
      )
      setData((prevData) => [
        ...prevData,
        {
          query: chatText,
          answer: [{ title: 'Amazon Titan', response: response.data.body }],
        },
      ])
      setChatText('')
    } catch (error) {
      console.error('Error:', error)
    }
  }

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
                              <Avatar
                                src={
                                  <img
                                    src={
                                      'https://i.pinimg.com/originals/74/f4/f2/74f4f2bfb89ba284ebba6fcbad474a7d.jpg'
                                    }
                                    alt="avatar"
                                  />
                                }
                              />
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
        <Flex style={{ flexDirection: 'column', width: '100%', gap: 0 }}>
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
            <Input
              size="large"
              value={chatText}
              onChange={(event) => setChatText(event.target.value)}
              placeholder="Type your message here..."
            />
            <Button
              size="large"
              type="primary"
              icon={<SendOutlined />}
              shape="circle"
              onClick={() => {
                responseHandler()
              }}
            />
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
      <Button
        size="large"
        onClick={() => setModalOpen(true)}
        type="primary"
        style={{ marginLeft: '90%', marginTop: 40 }}
        icon={<OpenAIOutlined />}
        shape="circle"
      />
    </>
  )
}

export default HomePage
