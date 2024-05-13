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
import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Button,
  Typography,
  Card,
  Form,
  Input,
  Checkbox,
  Row,
  Col,
  Select,
  DatePicker,
  Modal,
} from "antd";
import Title from "antd/lib/skeleton/Title";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
const { Option } = Select;

const { RangePicker } = DatePicker;
const CreateAccount = () => {
  const history = useHistory();
  const [visible1, setVisible1] = useState(false);
  const [errorMessage1, seterrorMessage1] = useState("");
  const [visible, setVisible] = useState(false);
  const { accountStore } = useStore();
  const {
    createUser,
    subjectList,
    getAllSubjects,
    currentUserInfo,
    errorMessage,
    isLoading,
  } = accountStore;
  const [form] = Form.useForm();
  useEffect(() => {
    // Kiểm tra errorMessage chỉ khi dữ liệu đã tải lần đầu tiên và không đang trong quá trình tải
    if (errorMessage && isLoading && currentUserInfo) {
      setVisible(true);
      const timer = setTimeout(() => {
        form.resetFields();
        setVisible(false);

      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);
  const onFinish = (values) => {
    console.log("finishResults", values.password);
    if (values.password === values.confirmPassword) {
      createUser(values);
      
    } else {
      seterrorMessage1("❌ password does not match!");
      setVisible1(true);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo, dataArray);
  };

  useEffect(() => {
    getAllSubjects();
  }, []);

  const dataA = Array.from(subjectList);
  const dataArray = dataA.map((user) => {
    const order = ["ID", "name", "status", "createdAt", "updatedAt"];

    const sortedUser = {};
    order.forEach((key) => {
      if (user.hasOwnProperty(key)) {
        sortedUser[key] = user[key];
      }
    });

    return sortedUser;
  });
  return (
    <>
      <div className="layout-default  layout-sign-up">
        <Card
          className="header-solid h-full ant-card pt-0"
          title={
            <h6>
              <b>INFORMATION</b>
            </h6>
          }
          bordered={false}
          extra={
            <>
              {errorMessage && (
                <Modal
                  title="Notification"
                  visible={visible}
                  footer={null}
                  onCancel={() => setVisible(false)}
                >
                  <p>
                    <b>{errorMessage}</b>
                  </p>
                </Modal>
              )}
              {errorMessage1 && (
                <Modal
                  title="Notification"
                  visible={visible1}
                  footer={null}
                  onCancel={() => setVisible1(false)}
                >
                  <p>
                    <b>{errorMessage1}</b>
                  </p>
                </Modal>
              )}
            </>
          }
        >
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
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
                  <Input
                    placeholder="Name"
                    disabled={currentUserInfo.role == "employee" ? true : false}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[
                    {
                      required: true,
                      message: "Please input username!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Username"
                    disabled={currentUserInfo.role == "employee" ? true : false}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                      message: "The input is not a valid email!",
                    },
                    {
                      required: true,
                      message: "Please input email!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Email"
                    disabled={currentUserInfo.role == "employee" ? true : false}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[
                    {
                      pattern: /^[0-9]{10}$/,
                      message: "The input is not a valid phone number!",
                    },
                    {
                      required: true,
                      message: "Please input phone number!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Phone Number"
                    disabled={currentUserInfo.role == "employee" ? true : false}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="address"
                  label="Address"
                  rules={[{ required: true, message: "Please input address!" }]}
                >
                  <Input
                    placeholder="Address"
                    disabled={currentUserInfo.role == "employee" ? true : false}
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  name="gender"
                  label="Gender"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Gender"
                    // onChange={onGenderChange}
                    allowClear
                    disabled={currentUserInfo.role == "employee" ? true : false}
                  >
                    <Option value="1">Nam</Option>
                    <Option value="0">Nữ</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="Birth"
                  name="birth"
                  rules={[{ required: true, message: "Please input!" }]}
                >
                  <DatePicker
                    disabled={currentUserInfo.role == "employee" ? true : false}
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  name="subjectId"
                  label="Subject"
                  // rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Subject"
                    // onChange={onGenderChange}
                    disabled={currentUserInfo.role == "employee" ? true : false}
                    allowClear
                    defaultValue={""}
                  >
                    {dataArray.map((item) => {
                      if (item.status === "active") {
                        return (
                          <Option key={item.ID} value={item.ID}>
                            {item.name}
                          </Option>
                        );
                      }
                      return null; // Trả về null nếu item.status không phải 'active'
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: "Please input password!" },
                  ]}
                >
                  <Input.Password
                    placeholder="Password"
                    disabled={currentUserInfo.role == "employee" ? true : false}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="confirmPassword"
                  label="Confirm Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input confirm password!",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Confirm Password"
                    disabled={currentUserInfo.role == "employee" ? true : false}
                  />
                </Form.Item>
              </Col>
              <Col span={8}></Col>
              {/* {currentUserInfo.role == "employee" ? (
                <>
                  <Col span={4}>
                    <Form.Item>
                      <Button
                        htmlType="reset"
                        style={{ width: "100%" }}
                        disabled
                      >
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
                        disabled
                      >
                        Create
                      </Button>
                    </Form.Item>
                  </Col>
                </>
              ) : (
                <>
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
                </>
              )} */}
              <Col span={4}>
                <Form.Item>
                  <Button
                    htmlType="reset"
                    style={{ width: "100%" }}
                    disabled={currentUserInfo.role == "employee" ? true : false}
                  >
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
                    disabled={currentUserInfo.role == "employee" ? true : false}
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

export default observer(CreateAccount);
