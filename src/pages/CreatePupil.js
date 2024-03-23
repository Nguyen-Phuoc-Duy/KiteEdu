/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React from "react";
import { Button, Card, Form, Input, Row, Col, Select, DatePicker } from "antd";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const { Option } = Select;
const CreatePupil = () => {
  const { accountStore } = useStore();
  const { createUser, createSubject, createRoom, createPupil } = accountStore;
  const [form] = Form.useForm();
  const history = useHistory();
  const onFinish = (values) => {
    console.log(values, "ffffffffffffffffffffffff");
    createPupil(values);
    form.resetFields();
    history.push("/pupils");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div
        className="
      layout-default 
      
      layout-sign-up
      "
      >
        <Card
          className="
          header-solid 
          h-full 
          ant-card 
          pt-0
          "
          title={<h1>PUPIL INFOMATION</h1>}
          bordered={false}
        >
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
          >
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[
                    {
                      required: true,
                      message: "Please input name!",
                    },
                  ]}
                >
                  <Input placeholder="Name" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      required: true,
                      message: "Please input email!",
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: "Please input phone number!",
                    },
                  ]}
                >
                  <Input placeholder="Phone Number" />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  name="parent_name"
                  label="Parent's Name"
                  rules={[
                    {
                      required: true,
                      message: "Please input parent's name!",
                    },
                  ]}
                >
                  <Input placeholder="Parent's Name" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="parent_email"
                  label="Parent's E-mail"
                  rules={[
                    {
                      required: true,
                      message: "Please input parent's email!",
                    },
                  ]}
                >
                  <Input placeholder="Parent's Email" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="parent_phone"
                  label="Parent's Phone Number"
                  rules={[
                    {
                      required: true,
                      message: "Please input parent's phone number!",
                    },
                  ]}
                >
                  <Input placeholder="Parent's Phone Number" />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  name="gender"
                  label="Gender"
                  rules={[{ required: true }]}
                >
                  <Select placeholder="Gender" allowClear>
                    <Option value="1">Nam</Option>
                    <Option value="0">Nữ</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Birth"
                  name="birth"
                  rules={[{ required: true, message: "Please input!" }]}
                >
                  <DatePicker />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="address"
                  label="Address"
                  rules={[{ required: true, message: "Please input address!" }]}
                >
                  <Input placeholder="Address" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="status"
                  label="Status"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Status"
                    // onChange={onGenderChange}
                    allowClear
                  >
                    <Option value="active">active</Option>
                    <Option value="inactive">inactive</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={16}></Col>
              <Col span={8}></Col>
              <Col span={4}>
                <Form.Item>
                  <Button htmlType="reset" style={{ width: "100%" }}>
                    Cancel
                  </Button>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    Create
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default observer(CreatePupil);
