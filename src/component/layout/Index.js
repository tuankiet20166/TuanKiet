import React, { useEffect, useState } from 'react'
import { Avatar, Button, Divider, Drawer, Form, Input, Menu, Space } from "antd"
// import { MailOutlined, SettingOutlined, AppstoreOutlined } from '@ant-design/icons';
import { BiHomeAlt } from "react-icons/bi"
import { FcIdea } from "react-icons/fc"
import { GrGroup } from "react-icons/gr"
import { GoLaw } from "react-icons/go"
import Link from 'next/link'
import { useGetDepartmentsQuery } from '@/redux/slices/Department'
import { useSession, signOut } from "next-auth/react"
import { useRouter } from 'next/router'


const sampleActivities = [
    "You liked the comment lorem is pul.",
    "You disliked the comment lorem is pul.",
    "You commented the comment lorem is pul.",
    "You liked the comment lorem is pul.",
    "You disliked the comment lorem is pul.",
    "You commented the comment lorem is pul.", "You liked the comment lorem is pul.",
    "You disliked the comment lorem is pul.",
    "You commented the comment lorem is pul.",

]


export default function Layout({ children }) {
    const { data: departments } = useGetDepartmentsQuery()
    const { data: session, status } = useSession()
    const [avatar, setAvatar] = useState(null)
    const items = [
        {
            key: 1,
            label: <Link href="/">Home</Link>,
            icon: <BiHomeAlt />
        },
        {
            key: 2,
            label: <>Idea</>,
            icon: <FcIdea />,
            children: [
                {
                    key: 2.1,
                    label: <Link href="/idea">Submit your idea</Link>,
                    icon: <></>
                },
                {
                    key: 2.2,
                    label: <Link href="/idea">Your past idea</Link>,
                    icon: <></>
                },
            ]
        },
        {
            key: 3,
            label: <>Department</>,
            icon: <GrGroup />,
            children: departments?.map(item => {
                return {
                    key: item.id,
                    label: <Link href="/department">{item.name}</Link>
                }
            })
        },
        {
            key: 4,
            label: <Link href="/privilege">Privilege</Link>,
            icon: <GoLaw />,
            children: [
                {
                    key: 3.1,
                    label: <Link href="/admin">Admin</Link>,
                },
                {
                    key: 3.2,
                    label: <Link href="/department">Head/Manager</Link>,
                },
                {
                    key: 3.3,
                    label: <Link href="/department">Coordinator</Link>,
                },
            ]
        },
    ]

    const [open, setOpen] = useState(false);

    const onClose = () => {
        setOpen(false);
    };

    const openDrawer = () => {
        setOpen(true);

    }


    const [form] = Form.useForm()
    const router = useRouter()

    useEffect(() => {
        console.log(status)
        if (session) {
            console.log(session)
            form.setFieldsValue({
                "name": session.user.name,
                "email": session.user.email
            })
            setAvatar(session.user.image)
        }
        if (status === "unauthenticated") {
            router.push("/login")
        }

    }, [session, status])

    return (
        <div>
            <header style={{ maxWidth: 1580, margin: "0 auto", display: "flex", justifyContent: "space-between" }}>
                <section style={{ display: "flex" }}>
                    <img src='https://www.gre.ac.uk/__data/assets/image/0035/265688/logo_final_on_white.png' style={{ height: 50 }} />

                    <Menu
                        style={{ width: "100%" }}
                        mode="horizontal"
                        items={items}
                    />
                </section>
                {/* Menu */}
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" style={{ cursor: "pointer" }} onClick={openDrawer} />

                <Drawer placement="right"
                    onClose={onClose}
                    open={open}
                    extra={
                        <Space>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button onClick={() => {
                                signOut();
                                setOpen(false);

                            }} danger>
                                Logout
                            </Button>
                            <Button onClick={onClose} type="primary">
                                Changes
                            </Button>
                        </Space>
                    }
                >
                    <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} form={form}>
                        <Form.Item label="Email" colon={false} name="email">
                            <Input disabled />
                        </Form.Item>
                        {/* <Form.Item label="Department" colon={false}>
                            <Input disabled />
                        </Form.Item> */}
                        <Form.Item label="Username" colon={false} name="name">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Avatar" colon={false}>
                            {/* <Input type='file' /> */}
                            <img src={avatar} style={{ width: 50, height: 50, borderRadius: "100%", objectFit: "cover" }} alt="avatar" />
                        </Form.Item>

                    </Form>
                    <Divider><span style={{ fontSize: 20 }}>Activites</span></Divider>
                    {
                        sampleActivities.map(i => {
                            return <div key={i}>
                                <a>{i}</a>
                                <Divider />
                            </div>
                        })
                    }
                </Drawer>

            </header>




            {children}
        </div>
    )
}