import { LikeOutlined,MessageOutlined,StarOutlined } from '@ant-design/icons';
import { Avatar,List,Space, Tooltip } from 'antd';
import React from 'react';
import {HiPencilAlt} from "react-icons/hi"
import {CgDetailsMore} from "react-icons/cg"
import {BsInfoCircleFill} from "react-icons/bs"
import {FcIdea} from "react-icons/fc"
import {GrView} from "react-icons/gr"
import {AiFillLike} from "react-icons/ai"
import {AiFillDislike} from "react-icons/ai"
import {FaRegCommentDots} from "react-icons/fa"

const data = Array.from({
  length: 20,
}).map((_, i) => ({
  href: 'https://ant.design',
  title: `Department ${i}`,
  avatar: 'https://joesch.moe/api/v1/random',
  description:
    'Idea for event arrangement in 2024. Deadline: 20/12/2023',
}));
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export default function TopicList() {
  return (
    <div> 
      <List
        itemLayout="vertical"
        size="large"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <IconText icon={FcIdea} text="20 idea available" key="list-vertical-star-o" />,
              <IconText icon={GrView} text="100 total view" key="2" />,
              <IconText icon={AiFillLike} text="100 total like" key="3" />,
              <IconText icon={AiFillDislike} text="30 total dislike" key="4" />,
              <IconText icon={FaRegCommentDots} text="200 total comment" key="5" />,
            ]}
            extra={
              <div style={{ width:30, display: 'flex', flexDirection:"column", gap:5, justifyContent: 'flex-end'}}>
                <Tooltip placement="leftTop" title="Submit idea to topic" style={{cursor:"pointer"}}>
                <HiPencilAlt size={32}/>
                </Tooltip>
                <Tooltip placement="leftTop" title="Submit idea to topic" style={{cursor:"pointer"}}>
                <CgDetailsMore size={32}/>
                </Tooltip>
                <Tooltip placement="leftTop" title="Submit idea to topic" style={{cursor:"pointer"}}>
                <BsInfoCircleFill size={32}/>
                </Tooltip>


              </div>
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<>
                {item.title}
                <span style={{fontWeight:400, marginLeft:20, fontSize: 14, color:"#5b6678"}}>a few second ago</span>
              </>}
              description={item.description}
            />
          </List.Item>
        )}
    />
  </div>
  )
}
