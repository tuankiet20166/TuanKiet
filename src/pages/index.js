import TopicList from "@/component/Home/TopicList"
import Layout from "@/component/layout/Index"
import React from "@/component/layout/Index"
import { Input, Select } from "antd"
import Search from "antd/es/transfer/search"

export default function Home() {
  return (
    <>
      <Layout>
        <div style={{ maxWidth:860,
        margin:"0 auto"
        }}>
        
          <div style={{textAlign: "center", paddingTop: 20 }}>
            <Input.Search
            style={{
              width:500
            }}
              placeholder="Search for topic"
              allowClear
              enterButton="Search"
              size="large"
            />
            </div>
            <TopicList
            />
        </div>
      </Layout>
    </>
  )
}
