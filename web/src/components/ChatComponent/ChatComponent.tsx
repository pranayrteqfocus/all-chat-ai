import { Avatar, Card, Space } from 'antd'

const ChatComponent = (props) => {
  return (
    <div>
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
            {props.title}
          </Space>
        }
      >
        <Space>{props.response}</Space>
      </Card>
    </div>
  )
}

export default ChatComponent
