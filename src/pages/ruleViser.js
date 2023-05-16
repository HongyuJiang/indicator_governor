import { Layout } from 'antd';
import React from 'react';
import NavHeader from '../components/navHeader';
import HierarchyTree from "../components/hierarchyTree"
import _ from 'lodash'
import { headerItems } from '../global'

import 'antd/dist/antd.css';

const { Content } = Layout;

const RuleViser = () => {

    return (
        <>
            <NavHeader selectedKeys={"Rule"}/>
            <Layout  style={{ minHeight: '93vh' }}>
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    <HierarchyTree />
                </Content>
            </Layout>
        </>
    );
};

export default RuleViser;