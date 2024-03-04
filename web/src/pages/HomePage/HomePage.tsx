import React, { useState, useEffect, useRef } from 'react'

import {
  AimOutlined,
  OpenAIOutlined,
  SendOutlined,
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
  Skeleton,
  Space,
  Typography,
} from 'antd'
import axios from 'axios'

import { Metadata } from '@redwoodjs/web'

const { Text } = Typography

interface chatData {
  query: string
  time: string
  answer: [
    {
      title: string
      response: string
      time: string
    }
  ]
}

const HomePage = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [chatText, setChatText] = useState('')
  const [chatTextTime, setChatTextTime] = useState('')
  const [data, setData] = useState<chatData[]>()

  const apiUrlAmazon =
    'https://b6u2607yj4.execute-api.us-east-1.amazonaws.com/dev/multi'

  const apiUrlMistral = 'https://35.184.51.178:5002/generate'
  const azureUrl = ' '

  const [AIselection, setAISelection] = useState([
    {
      title: 'AWS TITAN',
      url: 'https://i.pinimg.com/originals/74/f4/f2/74f4f2bfb89ba284ebba6fcbad474a7d.jpg',
      apiUrl: apiUrlAmazon,
      model: 'titan_text',
      status: true,
    },
    {
      title: 'AI21',
      url: 'https://cdn.techinasia.com/data/images/l43waqLKAQsO0juMCPAESLtS28z1ADfXATcbNhoN.jpeg',
      apiUrl: apiUrlAmazon,
      model: 'ai21_model',
      status: true,
    },
    {
      title: 'Cohere',
      url: 'https://avatars.githubusercontent.com/u/54850923?s=280&v=4',
      apiUrl: apiUrlAmazon,
      model: 'cohere_model',
      status: true,
    },
    {
      title: 'Meta llama',
      url: 'https://res.cloudinary.com/apideck/image/upload/w_196,f_auto/v1677940393/marketplaces/ckhg56iu1mkpc0b66vj7fsj3o/listings/meta_nnmll6.webp',
      apiUrl: apiUrlAmazon,
      model: 'meta_llama2_chat',
      status: true,
    },
    {
      title: 'Stability AI',
      url: 'https://i.pinimg.com/originals/74/f4/f2/74f4f2bfb89ba284ebba6fcbad474a7d.jpg',
      apiUrl: 'amazonimage',
      model: 'meta_llama2_chat',
      status: true,
    },
    {
      title: 'Code LIama',
      url: 'https://www.svgrepo.com/show/331302/azure-v2.svg',
      apiUrl: azureUrl,
      model: 'codeLIama_chat',
      status: true,
    },
    {
      title: 'DeciLM-7B',
      url: 'https://www.svgrepo.com/show/331302/azure-v2.svg',
      apiUrl: azureUrl,
      model: 'codeLIama_chat',
      status: true,
    },
    {
      title: 'GPT-4 Turbo',
      url: 'https://www.svgrepo.com/show/331302/azure-v2.svg',
      apiUrl: azureUrl,
      model: 'codeLIama_chat',
      status: true,
    },
    {
      title: 'GPT-3.5 Turbo',
      url: 'https://www.svgrepo.com/show/331302/azure-v2.svg',
      apiUrl: azureUrl,
      model: 'codeLIama_chat',
      status: true,
    },
    {
      title: 'Mistral',
      url: 'https://avatars.githubusercontent.com/u/132372032?s=280&v=4',
      apiUrl: apiUrlMistral,
      model: 'meta_llama2_chat',
      status: true,
    },
  ])

  const listRef = useRef(null)

  const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (
    checkedValues
  ) => {
    const updatedSelection = AIselection.map((item) => ({
      ...item,
      status: checkedValues.includes(item?.title),
    }))
    setAISelection(updatedSelection)
  }

  const responseHandler = async () => {
    const date = new Date()
    setChatTextTime(date.toString())
    setIsLoading(true)
    try {
      const responses = await Promise.all([
        AIselection[0].status == true ? (
          axios.post(
            apiUrlAmazon,
            {
              prompt: chatText,
              model: AIselection[0].model,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
        ) : (
          <></>
        ),
        AIselection[1].status == true ? (
          axios.post(
            apiUrlAmazon,
            {
              prompt: chatText,
              model: AIselection[1].model,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
        ) : (
          <></>
        ),
        AIselection[2].status == true ? (
          axios.post(
            apiUrlAmazon,
            {
              prompt: chatText,
              model: AIselection[2].model,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
        ) : (
          <></>
        ),
        AIselection[3].status == true ? (
          axios.post(
            apiUrlAmazon,
            {
              prompt: chatText,
              model: AIselection[3].model,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
        ) : (
          <></>
        ),
        // AIselection[4].status == true ? (
        //   axios.post(
        //     apiUrlMistral,
        //     {
        //       prompt: chatText,
        //     },
        //     {
        //       headers: {
        //         'Content-Type': 'application/json',
        //       },
        //     }
        //   )
        // ) : (
        //   <></>
        // ),
      ])

      // responses is an array containing the responses from all the requests
      const [response1, response2, response3, response4, response5] = responses

      setData((prevData: any) => {
        const newData = [
          ...(prevData || []), // Provide a default value of an empty array if prevData is undefined
          {
            query: chatText,
            answer: [
              AIselection[0].status ? (
                {
                  title: 'AWS TITAN',
                  response: response1?.data.body,
                }
              ) : (
                <></>
              ),
              AIselection[1].status ? (
                {
                  title: 'AI21',
                  response: response2?.data.body,
                }
              ) : (
                <></>
              ),
              AIselection[2].status ? (
                {
                  title: 'Cohere',
                  response: response3?.data.body.generations[0].text,
                }
              ) : (
                <></>
              ),
              AIselection[3].status ? (
                {
                  title: 'Meta llama',
                  response: response4?.data.body,
                }
              ) : (
                <></>
              ),
              AIselection[4].status ? (
                {
                  title: 'Mistral',
                  response: response5?.data.body,
                }
              ) : (
                <></>
              ),
            ],
          },
        ]
        return newData
      })
      setChatText('')
      setIsLoading(false)
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
            footer={isLoading ? <Skeleton active /> : <></>}
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <Flex vertical gap={20}>
                  <Space>
                    <Avatar icon={<UserOutlined />} />
                    <Text>{item.query}</Text>
                    <Text>{chatTextTime}</Text>
                  </Space>
                  <List
                    grid={{ gutter: 16, column: 1 }}
                    dataSource={item.answer}
                    renderItem={(innerItem) => (
                      <List.Item>
                        {innerItem.response ? (
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
                        ) : (
                          ''
                        )}
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
            height: '100%',
            width: '100%',
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
              size="large"
              value={chatText}
              onChange={(event) => setChatText(event.target.value)}
              placeholder="Type your message here..."
            />
            <Button
              size="large"
              onClick={() => setModalOpen(true)}
              type="primary"
              icon={<OpenAIOutlined />}
              shape="circle"
            />
            <Button
              size="large"
              type="primary"
              icon={<SendOutlined />}
              shape="circle"
              onClick={() => {
                chatText != '' ? responseHandler() : <></>
              }}
            />
            </Flex>
          </Space.Compact>
        </Flex>
      </Space.Compact>
      <Modal
        title="Select you AI"
        style={{
          left: '25%',
        }}
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <Checkbox.Group
          style={{ width: '100%', height: '500px' }}
          onChange={onChange}
        >
          <List
            grid={{ gutter: 16, column: 2 }}
            dataSource={[
              {
                title: 'AWS Text',
                url: apiUrlAmazon,
                imgurl:
                  'https://i.pinimg.com/originals/74/f4/f2/74f4f2bfb89ba284ebba6fcbad474a7d.jpg',
              },
              {
                title: 'AWS Image',
                url: 'amazonimage',
                imgurl:
                  'https://i.pinimg.com/originals/74/f4/f2/74f4f2bfb89ba284ebba6fcbad474a7d.jpg',
              },
              {
                title: 'Azure Text',
                url: azureUrl,
                imgurl: 'https://www.svgrepo.com/show/331302/azure-v2.svg',
              },
              {
                title: 'Azure Image',
                url: 'Azure',
                imgurl: 'https://www.svgrepo.com/show/331302/azure-v2.svg',
              },
              {
                title: 'GCP',
                url: apiUrlMistral,
                imgurl: 'https://cdn-teams-slug.flaticon.com/google.jpg',
              },
              {
                title: 'Others',
                url: 'others',
                imgurl:
                  'https://static.vecteezy.com/system/resources/previews/022/227/362/original/openai-chatgpt-logo-icon-free-png.png',
              },
            ]}
            renderItem={(item: any) => (
              <List
                header={
                  <>
                    {item.imgurl ? (
                      <>
                        <Avatar src={<img src={item.imgurl} alt="avatar" />} />{' '}
                      </>
                    ) : (
                      <> </>
                    )}
                    {item.title}
                  </>
                }
                grid={{ gutter: 16, column: 1 }}
                dataSource={AIselection}
                renderItem={(AiItem: any) =>
                  AiItem.apiUrl == item.url ? (
                    <List.Item style={{ gap: 50 }}>
                      <Checkbox value={AiItem.title} checked={true}>
                        <span>{AiItem?.title}</span>
                      </Checkbox>
                    </List.Item>
                  ) : (
                    ''
                  )
                }
              />
            )}
          />
        </Checkbox.Group>
      </Modal>
    </>
  )
}

export default HomePage
