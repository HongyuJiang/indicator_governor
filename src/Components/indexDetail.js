import { Button, Descriptions, PageHeader, Statistic, Tabs, Tag } from 'antd';
import React from 'react';
const { TabPane } = Tabs;

const renderContent = (props) => {
    const { className, defination, equation, dimension, stat_rules, unit, range, condition } = props;
    return (
        <Descriptions size="default" column={1}>
            <Descriptions.Item label="二级分类">  <a>{className}</a> </Descriptions.Item>
            <Descriptions.Item label="业务定义"> {defination} </Descriptions.Item>
            <Descriptions.Item label="范围与条件"> {condition} </Descriptions.Item>
            <Descriptions.Item label="计算公式"> {equation} </Descriptions.Item>
            <Descriptions.Item label="常用维度"> {dimension} </Descriptions.Item>
            <Descriptions.Item label="统计规则"> {stat_rules} </Descriptions.Item>
            <Descriptions.Item label="数值范围"> {range} </Descriptions.Item>
            <Descriptions.Item label="单位"> {unit} </Descriptions.Item>
        </Descriptions>
    )
};

const Content = ({ children, extra }) => (
    <div className="content">
        <div className="main">{children}</div>
        <div className="extra">{extra}</div>
    </div>
);

const IndexDetail = (props) => (
    <PageHeader
        tags={<Tag color="blue">{props.target}</Tag>}
        className="site-page-header-responsive"
        title={props.name}
        subtTitle={props.alias}
        extra={[
            <Button key="1" type="primary"> 编辑 </Button>,
        ]}
        // footer={
        //     <Tabs defaultActiveKey="1">
        //         <TabPane tab="Details" key="1" />
        //         <TabPane tab="Rule" key="2" />
        //     </Tabs>
        // }
    >
        <Content>{renderContent(props)}</Content>
    </PageHeader>
);

export default IndexDetail;