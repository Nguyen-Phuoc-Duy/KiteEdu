import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Typography,
  Switch,
  Modal,
  Select,
  Tag,
} from "antd";
import moment from "moment";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

const { Title } = Typography;
const { Option } = Select;

function Accounts() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const showModal = (record) => {
    setSelectedRecord(record);
    console.log("abc", selectedRecord);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (value) => {
    console.log("vvvvvvvvvvvvvvvvvvvvvvv", value);
  };

  const handleSwitchChange = (value) => {
    console.log("dfffffffffff", value);
  };

  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      render: (name) => (
        <>
          <div className="avatar-info">
            <Title level={5}>{name}</Title>
            <p>{name}</p>
          </div>
        </>
      ),
    },

    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      render: (email) => <Title level={5}>{email}</Title>,
    },
    {
      title: "PHONE",
      dataIndex: "phone",
      key: "phone",
      render: (phone) => <div className="semibold">{phone}</div>,
    },
    {
      title: "ADDRESS",
      dataIndex: "address",
      key: "address",
      render: (address) => (
        <>
          <div className="semibold">{address}</div>
        </>
      ),
    },
    {
      title: "GENDER",
      dataIndex: "gender",
      key: "gender",
      render: (gender) => (
        <div className="semibold">{gender === 1 ? "Nam" : "Nữ"}</div>
      ),
    },
    {
      title: "BIRTH",
      dataIndex: "birth",
      key: "birth",
      render: (birth) => (
        <div className="semibold">{moment(birth).format("DD-MM-YYYY")}</div>
      ),
    },
    {
      title: "ROLE",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <>
          {role === "employee" ? (
            <Tag color="green">{role}</Tag>
          ) : (
            <Tag color="red">{role}</Tag>
          )}
        </>
      ),
    },
    {
      title: "STATUS",
      dataIndex: "locked",
      key: "locked",
      render: (locked) => (
        <div className="semibold">
          <Switch
            defaultChecked={locked === 0}
            onChange={(value) => handleSwitchChange(value, locked)}
            disabled
          />
        </div>
      ),
    },
    {
      title: "ACTION",
      key: "action",
      render: (text, record) => (
        <>
          <Button
            type="primary"
            className="tag-primary"
            onClick={() => showModal(record)}
          >
            Edit
            {/* {record.username} */}
          </Button>
          <Button
            type="danger"
            className="tag-primary"
            onClick={() => showModal(record)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const { accountStore } = useStore();
  const { getAllUsers, userList } = accountStore;

  useEffect(() => {
    getAllUsers();
  }, []);

  const dataA = Array.from(userList);
  const dataArray = dataA.map((user) => {
    const order = [
      "ID",
      "name",
      "username",
      "birth",
      "gender",
      "email",
      "phone",
      "address",
      "role",
      "status",
      "locked",
      "createdAt",
      "updatedAt",
    ];

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
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="INFORMATION ACCOUNTS"
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={dataArray}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <Modal
        title="EDIT"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {selectedRecord && (
          <>
            <div className="author-info">
              <Title level={5}>UserName</Title>
              <p>{selectedRecord.username}</p>
            </div>
            <Row>
              <Col span={12}>
                <div className="author-info">
                  <Title level={5}>Role</Title>
                  <Select
                    // defaultValue={selectedRecord.role}
                    style={{ width: 120 }}
                    onChange={handleChange}
                    value={selectedRecord.role}
                  >
                    <Option value="manager">manager</Option>
                    <Option value="employee">employee</Option>
                  </Select>
                </div>
              </Col>
              <Col span={12}>
                <div className="author-info">
                  <Title level={5}>Status</Title>
                  {/* {selectedRecord.locked == 1 ? (
                    <Switch
                      // defaultChecked={selectedRecord.locked === 0}
                      onChange={(value) =>
                        handleSwitchChange(value, selectedRecord.locked)
                      }
                      checked={false}
                    />
                  ) : (
                    <Switch
                      checked={true}
                      onChange={(value) =>
                        handleSwitchChange(value, selectedRecord.locked)
                      }
                    />
                  )} */}
                  <Switch
                    checked={!selectedRecord.locked}
                    // valuePropName={!selectedRecord.locked}
                    onChange={(value) =>
                      handleSwitchChange(value, selectedRecord.locked)
                    }
                  />
                </div>
              </Col>
            </Row>
          </>
        )}
      </Modal>
    </>
  );
}

export default observer(Accounts);
