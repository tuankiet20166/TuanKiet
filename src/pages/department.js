import React from 'react'
import Layout from '@/component/layout/Index'
import { Divider, Table } from 'antd'

export default function Department() {
  const dataSource = [
    {
      id:1,
      title: "ANNOUNCEMENT OF COLLECTING STUDENTS OPINION ON SUBJECT 2ND SEMESTER / 2017-2018",
      createDate: "2014-12-24 23:12:00",
      creator: "kiet@gmail.com"

    },
    {
      id:2,
      title: "ANNOUNCEMENT OF COLLECTING STUDENTS OPINION ON SUBJECT 2ND SEMESTER / 2017-2018",
      createDate: "2014-12-24 23:12:00",
      creator: "kiet@gmail.com"

    },
    {
      id:3,
      title: "ANNOUNCEMENT OF COLLECTING STUDENTS OPINION ON SUBJECT 2ND SEMESTER / 2017-2018",
      createDate: "2014-12-24 23:12:00",
      creator: "kiet@gmail.com"

    },
    {
      id:4,
      title: "ANNOUNCEMENT OF COLLECTING STUDENTS OPINION ON SUBJECT 2ND SEMESTER / 2017-2018",
      createDate: "2014-12-24 23:12:00",
      creator: "kiet@gmail.com"

    },
    {
      id:5,
      title: "ANNOUNCEMENT OF COLLECTING STUDENTS OPINION ON SUBJECT 2ND SEMESTER / 2017-2018",
      createDate: "2014-12-24 23:12:00",
      creator: "kiet@gmail.com"

    },
  ]
  const  columns = [
      {
        title: "Title",
        dataIndex: "title",
        width:"50%"
      },
      {
        title: "Create Date",
        dataIndex: "createDate",
        width:"15%"
      },
      {
        title: "Creator",
        dataIndex: "creator",
        width:"15%"
      },
      {
        title: "Action",
        dataIndex: "action",
        width:"20%",
        render: (value, record) =>{
          return <a>
            View Detail {value}
          </a>
        }
      }
    ]
  return (
    <Layout>
      <div style={{maxWidth:1580, margin:"0 auto"}}>
      <h1 style={{textAlign:"center"}}>
        Department Of Humen Resource
      </h1>
      <Divider> <span style={{fontSize: 20}}>Accounments</span> </Divider>

      <Table
          columns={columns}
          expandable={{
            expandedRowRender: (record) => (
              <p
                style={{
                  margin: 0,
                }}
              >
                {record.description}
              </p>
            ),
            rowExpandable: (record) => record.name !== 'Not Expandable',
          }}
          dataSource={dataSource}  pagination ={{pagesize: 3}}
      />
      </div>
    </Layout>
  )
}
