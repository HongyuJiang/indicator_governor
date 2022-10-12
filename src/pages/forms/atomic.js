import { Button, Form, Input, Modal, Select, notification, Row, Col, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { addAtomic, updateAtomic, deleteAtomic } from '../../../data.index'
import { splitFields, joinFields, addFormItem } from '../../util'
import { SmileOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 18,
    },
};

const selector = (name, label) => (
    <Form.Item
        name={name}
        label={label}
        {...layout}
    >
        <Select
            mode="tags"
            style={{
                width: '100%',
            }}
            placeholder="请依次输入并回车"
        >
        </Select>
    </Form.Item>
)

const atomicForm = (props) => {

    const { isFormOpen, handleOK, handleCancel, action, initialValues } = props
    const [form] = Form.useForm();
    const values = splitFields(initialValues, ['常用维度', '适用公共统计规则'])
    const [atomicName, setAtomicName] = useState([]);

    const handleDelete = () => {
        deleteAtomic({'name': atomicName})
        notification.open({
            message: '指标删除成功',
            duration: 4,
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
        handleOK()
    }

    useEffect(() => {
        if(isFormOpen) form.resetFields()
    }, [isFormOpen])

    useEffect(() => {
        const atomicName = initialValues['指标名称']
        atomicName && setAtomicName(atomicName)
    }, [initialValues])

    const onFinish = (values) => {
        const newValues = joinFields(values, ['常用维度', '适用公共统计规则'])
        const reqParams = { 'name': newValues['指标名称'], 'data': newValues }
        action === 'add' ? addAtomic(newValues) : updateAtomic(reqParams)
        notification.open({
            message: action === 'add' ? '指标添加成功' : '指标更新成功',
            duration: 4,
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
        handleOK()
    };

    return <Modal width={800} title="指标信息" open={isFormOpen} footer={null} onCancel={handleCancel}>
        <Form
            form={form}
            name="atomic"
            onFinish={onFinish}
            scrollToFirstError
            initialValues={values}
        >

            <Row gutter={22} style={{paddingLeft: 45, paddingRight: 63}}>
                <Col span={12}>
                {addFormItem('指标名称', '指标名称', true)}
                </Col>
                <Col span={12}>
                {addFormItem('指标使用部门', '关注部门', true)}
                </Col>
            </Row>

            <Row gutter={22} style={{paddingLeft: 45, paddingRight: 63}}>
                <Col span={12}>
                {addFormItem('业务域', '业务域', true)}
                </Col>
                <Col span={12}>
                {addFormItem('一级分类', '主题', true)}
                </Col>
            </Row>

            {addFormItem('业务定义', '业务定义', true, layout, <TextArea rows={2} />)}
            {addFormItem('计算公式', '计算公式', false, layout)}
            {addFormItem('范围及条件', '条件范围', false, layout)}

            {selector('常用维度', '常用维度')}
            {selector('适用公共统计规则', '统计规则')}

            <Row gutter={22} style={{paddingLeft: 55, paddingRight: 63}}>
                <Col span={12}>
                {addFormItem('取值范围', '数值范围', false)}
                </Col>
                <Col span={12}>
                {addFormItem('度量单位', '单位', false)}
                </Col>
            </Row>

            <Form.Item style={{ textAlign: 'center' }}>
                <Space>
                    <Button type="primary" htmlType="submit"> 提交 </Button>
                    { action === 'update' && <Button type="primary" danger onClick={handleDelete}> 删除 </Button>}
                </Space>
            </Form.Item>

        </Form>
    </Modal>
}

export default atomicForm