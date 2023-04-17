import Layout from '@/component/layout/Index'
import Department from '../component/Department';
import { Tabs } from 'antd'
import React from 'react'
import {Categories} from '@/component/category';
import TermCondition from '../component/TermCondition';
import TopicIdea from '@/component/TopicIdea'

export default function Admin() {
  const items = [
    {
      key: '1',
      label: `STAFF`,
      children: `Content of Tab Pane 1`,
    },
    {
      key: '2',
      label: `FACULTIES & DEPARTMENT`,
      children: <Department/>,
    },
    {
      key: '3',
      label: `TOPICS & IDEAS`,
      children: <TopicIdea/>,
  },
  {
      key: '7',
      label: `CATEGORRIES`,
      children: <Categories />,
  },
  {
      key: '5',
      label: `TERMS & CONDITIONS`,
      children: <TermCondition />,
  },
  {
      key: '6',
      label: `STATISTICS`,
      children: `Content of Tab Pane 3`,
  },

  ];
  return (
    <Layout>
        <div style={{maxWidth:1580, margin:"0 auto"}}>
            <h1 style={{textAlign:"center", fontsize: 34, margin: 20}}>Admin Panel</h1>
            <Tabs items={items}/>
        </div>

    </Layout>
  )
}
