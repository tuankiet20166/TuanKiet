import { useGetDepartmentsQuery } from '@/redux/slices/Department'
import { useAddTopicMutation, useDeleteTopicByIdMutation, useGetTopicsQuery, useUpdateTopicByIdMutation } from '@/redux/slices/Topic'
import { validateMessages } from '@/ultils/requireMessage'
import { Button, DatePicker, Divider, Form, Input, message, Modal, Select, Spin, Table, Tag } from 'antd'
import moment from 'moment'
import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import IdeaByTopic from './IdeaByTopic'

export default function Index() {
    const { data, isLoading } = useGetTopicsQuery()
    const { data: departments } = useGetDepartmentsQuery()
    const [addTopic, { isLoading: isLoadingAdd }] = useAddTopicMutation()
    const [deleteTopicById, { isLoading: isLoadingDelete }] = useDeleteTopicByIdMutation()


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
            title: "Department",
            dataIndex: "Department",
            width: "20%",
            render: (value) => {
                return value?.name
            }
        },
        {
            title: "Open Date",
            dataIndex: "openDate",
            width: "10%",
            render: (value) => {
                return moment(value).format("DD/MM/YYYY HH:MM:SS")
            }
        },
        {
            title: "Closure Date Idea",
            dataIndex: "closureDateIdea",
            width: "10%",
            render: (value) => {
                return moment(value).format("DD/MM/YYYY")
            }
        },
        {
            title: "Closure Date Topic",
            dataIndex: "closureDateTopic",
            width: "10%",
            render: (value) => {
                return moment(value).format("DD/MM/YYYY")
            }
        },
        {
            title: "Action",
            dataIndex: "action",
            width: "15%",
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
        deleteTopicById(id).unwrap().then(res => {
            message.success("Topic Deleted")
        }).catch(err => {
            console.log(err)
            message.error("Failed to delete topic")
        })
    }

    const handleFinish = (values) => {
        addTopic({
            ...values,
            openDate: values.dateIdea[0].$d,
            closureDateIdea: values.dateIdea[1].$d,
            closureDateTopic: values.closureDateTopic.$d
        }).unwrap().then(res => {
            //sau thi them thanh cong
            message.success("Add new Topic successfully")
            form.resetFields()
            setIsOpenForm(false)
        }).catch(err => {
            console.log(err)
            message.error("Failed to add topic")
        })
    }
    return (
        <div>
            <div style={{ textAlign: "right", marginBottom: 20 }}>
                <Button type='primary' onClick={() => setIsOpenForm(true)}>ADD NEW</Button>
            </div>
            <Divider><span style={{ fontSize: 28 }}>TABLE OF TOPICS & IDEAS</span></Divider>
            <Spin spinning={isLoadingDelete}>
                <Table
                    rowKey={(record) => record.id}
                    expandable={{
                        expandedRowRender: record => <IdeaByTopic topic={record} />,
                        defaultExpandedRowKeys: ['0'],
                    }}
                    dataSource={data} columns={columns} pagination={{ pageSize: 10 }} isLoading={isLoading} />
            </Spin>
            <Modal title="ADD TOPIC"
                closable={false}
                width={600}
                open={isOpenForm}
                footer={[
                    <Button key="close" onClick={() => setIsOpenForm(false)}>Close</Button>,
                    <Button key="add" type='primary' onClick={() => form.submit()} loading={isLoadingAdd}>Add new</Button>,
                ]}
            >
                <Form validateMessages={validateMessages} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}
                    form={form}
                    onFinish={handleFinish}
                >
                    <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Department" name="department" rules={[{ required: true }]}>
                        <Select
                            options={departments?.map(({ id, name }) => {
                                return {
                                    value: id,
                                    label: name
                                }
                            })}
                        />
                    </Form.Item>
                    <Form.Item label="Close Topic Date" name="closureDateTopic" rules={[{ required: true }]}>
                        <DatePicker format={'DD/MM/YYYY'} />
                    </Form.Item>
                    <Form.Item label="Date Idea Range" name="dateIdea" rules={[{ required: true }]}>
                        <DatePicker.RangePicker format={'DD-MM-YYYY'} />
                    </Form.Item>
                </Form>
            </Modal>
            <EditModal isOpenEdit={isOpenEdit} setIsOpenEdit={setIsOpenEdit} dataEdit={dataEdit} setDataEdit={setDataEdit} />

        </div>
    )
}

const EditModal = ({ isOpenEdit, setIsOpenEdit, dataEdit, setDataEdit }) => {
    const { data: departments } = useGetDepartmentsQuery()
    const [updateTopicById, { isLoading }] = useUpdateTopicByIdMutation()
    const [form] = Form.useForm()

    const handleFinish = (values) => {
        updateTopicById({
            ...values,
            id: dataEdit.id,
            openDate: values.dateIdea[0].$d,
            closureDateIdea: values.dateIdea[1].$d,
            closureDateTopic: values.closureDateTopic.$d
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
        form.setFieldsValue({
            ...dataEdit,
            department: dataEdit?.Department.id,
            closureDateTopic: dayjs(dataEdit?.closureDateTopic, 'YYYY-MM-DD'), 
            dateIdea: [dayjs(dataEdit?.openDate, 'YYYY-MM-DD'), dayjs(dataEdit?.closureDateIdea, 'YYYY-MM-DD')],
        })
    }, [dataEdit?.id])
    return <Modal title="Edit Topic"
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
        <Form validateMessages={validateMessages} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}
            form={form}
            onFinish={handleFinish}
        >
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Department" name="department" rules={[{ required: true }]}>
                <Select disabled
                    options={departments?.map(({ id, name }) => {
                        return {
                            value: id,
                            label: name
                        }
                    })}
                />
            </Form.Item>
            <Form.Item label="Close Topic Date" name="closureDateTopic" rules={[{ required: true }]}>
                <DatePicker format={'DD-MM-YYYY'} />
            </Form.Item>
            <Form.Item label="Date Idea Range" name="dateIdea" rules={[{ required: true }]}>
                <DatePicker.RangePicker format={'DD-MM-YYYY'} />
            </Form.Item>
        </Form>

    </Modal>
}