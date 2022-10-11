import { Button, Form, Input, Modal, Space, Select } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 20,
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        offset: 21,
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

const requireMsg = (d) => {
    return [
        {
            required: true,
            message: `${d}对于指标是必要的哦`,
        },
    ]
}

const addFormItem = (name, label, required, layout={}) => {
    return <Form.Item
            name={name}
            label={label}
            rules={required ? requireMsg(label) : []}
            {...layout}
            >
            <Input />
          </Form.Item>
}

const atomicForm = (props) => {

    const { isFormOpen, handleOK, handleCancel } = props
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log(values)
        handleOK()
    };

    return <Modal title="指标信息" open={isFormOpen} footer={null} onCancel={handleCancel}>
        <Form
            form={form}
            name="atomic"
            onFinish={onFinish}
            scrollToFirstError
        >

            <Space align="baseline">
                <Form.Item noStyle>
                {addFormItem('name','指标名称', true)}
                </Form.Item>
                {addFormItem('follower', '关注部门', true)}
            </Space>

            <Space align="baseline">
                <Form.Item noStyle>
                {addFormItem('domain', '业务域', true)} 
                </Form.Item>
                {addFormItem('theme','主题', true)}
            </Space>

            {addFormItem('defination','业务定义', true, layout)}
            {addFormItem('equation','计算公式', false, layout)}
            {addFormItem('condition','条件范围', false, layout)}

            {selector('dimensions', '常用维度')}
            {selector('rules', '统计规则')}

            <Space align="baseline">
                <Form.Item noStyle>
                {addFormItem('range', '数值范围', false)} 
                </Form.Item>
                {addFormItem('unit','单位', false)}
            </Space>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </Form.Item>

        </Form>
    </Modal>
}

export default atomicForm