import { Button, Descriptions, PageHeader, Empty, Tabs, Tag } from 'antd';
import React from 'react';

const renderContent = (props) => {

    const keys = ["二级分类", "业务定义", "范围及条件", "计算公式", "常用维度", "适用公共统计规则", "取值范围", "度量单位"]
    return (
        <Descriptions size="default" column={1}>
            {keys.map((key) => { 
                return <Descriptions.Item key={key} label={key}> {props[key]} </Descriptions.Item> 
            })}
        </Descriptions>
    )
};

const Content = ({ children, extra }) => (
    <div className="content">
        <div className="main">{children}</div>
        <div className="extra">{extra}</div>
    </div>
);

const IndexDetail = (props) => {

    const { onEditBtnClick } = props
    const tags = props['指标使用部门'] ? props['指标使用部门'].split(',').map((d,i) => <Tag key={i} color="blue">{d}</Tag>) : null

    return props['指标名称'] ? <PageHeader
        tags={tags}
        className="site-page-header-responsive"
        title={props['指标名称']}
        subtTitle={props['指标别名']}
        extra={ [
            <Button key="1" type="primary" onClick={onEditBtnClick}> 编辑 </Button>,
        ]}
    >
        {<Content>{renderContent(props)}</Content>}
    </PageHeader> : <Empty style={{ padding: 100}} />
};

export default IndexDetail;