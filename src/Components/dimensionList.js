import { Avatar, List } from 'antd';
import React from 'react';

const DimensionList = (props) => {

    const { data } = props
    return (
        <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
                <List.Item>
                    <List.Item.Meta
                        title={<a href="https://ant.design">{item['维度']}</a>}
                        description={item['定义']}
                    />
                </List.Item>
            )}
        />
    )
};

export default DimensionList;