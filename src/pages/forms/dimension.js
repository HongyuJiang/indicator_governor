import { Button, Form, Input, Modal, Select, notification, Row, Col } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import { addDimension } from '../../../data.index'
import { addFormItem } from '../../util'

const { TextArea } = Input;

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 18,
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        offset: 21,
    },
};

const selector = (
    <Form.Item
        name={'属性'}
        label={'属性'}
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

const dimensionForm = (props) => {

    const { isFormOpen, handleOK, handleCancel } = props
    const [form] = Form.useForm();

    const onFinish = (values) => {
        if(values['属性']) {
            values['属性'] = values['属性'].map((d) => {
                return { name:d }
            })
        }
        addDimension(values)
        notification.open({
            message: '维度添加成功',
            duration: 2,
          });
        handleOK()
    };

    return <Modal width={800} title="维度信息" open={isFormOpen} footer={null} onCancel={handleCancel}>
        <Form
            form={form}
            name="dimension"
            onFinish={onFinish}
            scrollToFirstError
        >

            <Row gutter={22} style={{paddingLeft: 55, paddingRight: 63}}>
                <Col span={12}>
                {addFormItem('领域', '业务域', true)}
                </Col>
                <Col span={12}>
                {addFormItem('维度', '维度名称', true)}
                </Col>
            </Row>
            {addFormItem('定义', '维度定义', true, layout, <TextArea rows={2} />)}
            {selector}
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </Form.Item>

        </Form>
    </Modal>
}

export default dimensionForm