import React from 'react';
import { Layout, Menu } from 'antd';
import logo from '../favicon.png';
import { headerItems } from '../global'

const { Header } = Layout;

const navHeader = (props) => {

    const { selectedKeys } = props

    return <Header className="header">
        <img src={logo} alt="fireSpot" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['Atomic']} items={headerItems} selectedKeys={selectedKeys} />
    </Header>
};

export default navHeader;