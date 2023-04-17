import { useGetDepartmentsQuery, useAddDepartmentMutation, useDeleteDepartmentByIdMutation, useUpdateDepartmentByIdMutation } from '@/redux/slices/Department'
import { validateMessages } from '@/ultils/requireMessage'
import { Button, Divider, Form, Input, Modal, Select, Spin, Table, Tag, message } from 'antd'
import React, { useEffect, useState } from 'react'
import moment from 'moment'

export default function Index() {
  const { data, isLoading } = useGetDepartmentsQuery()
  const [addDepartment, { isLoading: isLoadingAdd }] = useAddDepartmentMutation()
  const [deleteDepartmentById, { isLoading: isLoadingDelete }] = useDeleteDepartmentByIdMutation()


  const [form] = Form.useForm()
  const [isOpenForm, setIsOpenForm] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [dataEdit, setDataEdit] = useState(null)

  const columns = [
      {
          title: "Name",
          dataIndex: "name",
          width: "30%"
      },
      {
          title: "Create Date",
          dataIndex: "created_at",
          width: "15%",
          render: (value) => {
              return moment(value).format("DD/MM/YYYY HH:MM:SS")
          }
      },
      {
          title: "Update Date",
          dataIndex: "updated_at",
          width: "15%",
          render: (value) => {
              return moment(value).format("DD/MM/YYYY HH:MM:SS")
          }
      },
      {
          title: "Status",
          dataIndex: "status",
          width: "15%",
          render: (value) => {
              console.log(value)
              return <>
                  {value ? <Tag color="blue">ENABLED</Tag> : <Tag color="red">DISABLED</Tag>}
              </>
          }
      },
      {
          title: "Action",
          dataIndex: "action",
          width: "20%",
          render: (value, record) => {
              return <>
                  <Tag color="cyan" className='cursor-pointer' onClick={() => {
                      setDataEdit(record)
                      setIsOpenEdit(true)
                  }}>EDIT</Tag>
                  <Tag color="red" className='cursor-pointer' onClick={() => handleDelete(record.id)}>DELETE</Tag>
              </>
          }
      }
  ]

  const handleDelete = (id) => {
      console.log(id)
      deleteDepartmentById(id).unwrap().then(res => {
          message.success("Department Deleted")
      }).catch(err => {
          console.log(err)
          message.error("Failed to delete department")
      })
  }

  const handleFinish = (values) => {
      addDepartment(values).unwrap().then(res => {
          //sau thi them thanh cong
          message.success("Add new department successfully")
          form.resetFields()
          setIsOpenForm(false)
      }).catch(err => {
          console.log(err)
          message.error("Failed to add department")
      })
  }
  return (
      <div>
          <div style={{ textAlign: "right", marginBottom: 20 }}>
              <Button type='primary' onClick={() => setIsOpenForm(true)}>ADD NEW</Button>
          </div>
          <Divider><span style={{ fontSize: 28 }}>TABLE OF FACULTIES AND DEPARTMENTS</span></Divider>
          <Spin spinning={isLoadingDelete}>
              <Table dataSource={data} columns={columns} pagination={{ pageSize: 10 }} isLoading={isLoading} />
          </Spin>
          <Modal title="ADD DEPARTMENT / FACULTY"
              closable={false}
              width={600}
              open={isOpenForm}
              footer={[
                  <Button key="close" onClick={() => setIsOpenForm(false)}>Close</Button>,
                  <Button key="add" type='primary' onClick={() => form.submit()} loading={isLoadingAdd}>Add new</Button>,
              ]}
          >
              <Form validateMessages={validateMessages} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}
                  form={form}
                  onFinish={handleFinish}
              >
                  <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                      <Input />
                  </Form.Item>
                  <Form.Item label="Status" name="status" rules={[{ required: true }]}>
                      <Select
                          options={[
                              {
                                  value: true,
                                  label: "ENABLED"
                              },
                              {
                                  value: false,
                                  label: "DISABLED"
                              }
                          ]}
                      />
                  </Form.Item>
              </Form>
          </Modal>
          <EditModal isOpenEdit={isOpenEdit} setIsOpenEdit={setIsOpenEdit} dataEdit={dataEdit} setDataEdit={setDataEdit} />

      </div>
  )
}

const EditModal = ({ isOpenEdit, setIsOpenEdit, dataEdit, setDataEdit }) => {
  const [updateDepartmentById, { isLoading }] = useUpdateDepartmentByIdMutation()
  const [form] = Form.useForm()

  const handleFinish = (values) => {
      updateDepartmentById({
          ...values,
          id: dataEdit.id
      }).unwrap().then(res => {
          message.success("Department updated")
          form.resetFields()
          setDataEdit(null)
          setIsOpenEdit(false)
      }).catch(err => {
          console.log(err)
          message.error("failed to update department")
      })
  }
  useEffect(() => {
      form.setFieldsValue(dataEdit)
  }, [dataEdit?.id])
  return <Modal title="Edit DEPARTMENT / FACULTY"
      closable={false}
      width={600}
      open={isOpenEdit}
      footer={[
          <Button key="close" onClick={() => {
              form.resetFields()
              setDataEdit(null)
              setIsOpenEdit(false)
          }}>Close</Button>,
          <Button key="add" type='primary' onClick={() => form.submit()} loading={isLoading}>Save Changes</Button>,
      ]}
  >
      <Form validateMessages={validateMessages} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}
          form={form}
          onFinish={handleFinish}
      >
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input />
          </Form.Item>
          <Form.Item label="Status" name="status" rules={[{ required: true }]}>
              <Select
                  options={[
                      {
                          value: true,
                          label: "ENABLED"
                      },
                      {
                          value: false,
                          label: "DISABLED"
                      }
                  ]}
              />
          </Form.Item>
      </Form>

  </Modal>
}