import { useGetIdeasQuery } from '@/redux/slices/Idea';
import { Dropdown, Space, Table } from 'antd';
import React from 'react'

export default function IdeaByTopic({ topic }) {

    const { data: ideas, isLoading } = useGetIdeasQuery(undefined, {
        selectFromResult: ({ data, isLoading }) => {
            return {
                data: data?.filter(idea => idea?.Topic.id === topic.id),
                isLoading
            }
        }
    })
    const columns = [
        {
            title: 'Content',
            dataIndex: 'content',
            key: '1',
        },
        {
            title: 'Category',
            dataIndex: 'Category',
            key: '2',
            render: (val, rec) => {
                return val?.name
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: '2',
            render: (val, rec) => {
                return val
            }
        },
        {
            title: 'User',
            dataIndex: 'User',
            key: '2',
            render: (val, rec) => {
                return rec.isAnomyous ? "ANOMYOUS" : val.email
            }
        },

    ];
    const data = [];
    return <Table columns={columns} dataSource={ideas} pagination={false} loading={isLoading} />;
};