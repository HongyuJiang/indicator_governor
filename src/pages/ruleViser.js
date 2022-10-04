import { Layout, Menu } from 'antd';
import React, { useState, useEffect } from 'react';
const { Header, Content, Sider } = Layout;
import HierarchyTree from "../components/hierarchyTree"
import _ from 'lodash'
import { headerItems } from '../global'

import 'antd/dist/antd.css';

const ruleViser = () => {

    return (
        <>
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['Atomic']} items={headerItems} selectedKeys={"Rule"} />
            </Header>
            <Layout  style={{ minHeight: '93vh' }}>
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    <HierarchyTree />
                </Content>
            </Layout>
        </>
    );
};

export default ruleViser;