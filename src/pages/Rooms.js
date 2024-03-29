import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Typography,
  Modal,
  Select,
  Tag,
  Input,
} from "antd";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const { Title } = Typography;
const { Option } = Select;

function Rooms() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [statusStates, setStatusStates] = useState(null);
  const [name, setName] = useState(null);
  const [statusStates1, setStatusStates1] = useState(null);
  const [name1, setName1] = useState(null);
  const history = useHistory();

  const showModal = (record) => {
    setSelectedRecord(record);
    setStatusStates(record.status);
    setName(record.name);
    setIsModalVisible(true);
  };
  const showModal1 = (record) => {
    setIsModalVisible1(true);
  };
  const { accountStore } = useStore();
  const {
    isLoading,
    subjectList,
    getAllSubjects,
    updateSubject,
    updateRoom,
    roomList,
    getAllRooms,
    createRoom,
  } = accountStore;

  const handleOk = () => {
    updateRoom({
      ID: selectedRecord.ID,
      status: statusStates,
      name: name,
    });
    setIsModalVisible(false);
  };
  const handleOk1 = () => {
    createRoom({
      status: statusStates1,
      name: name1,
    });
    setIsModalVisible1(false);
    setName1(null);
    setStatusStates1(null);
    getAllRooms();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalVisible1(false);
  };

  const handleChange = (value) => {
    setStatusStates(value);
  };

  const handleChangeName = (value) => {
    setName(value);
  };

  const handleChange1 = (value) => {
    setStatusStates1(value);
  };

  const handleChangeName1 = (value) => {
    setName1(value);
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
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <>
          {status === "empty" ? (
            <Tag color="green">{status}</Tag>
          ) : status === "fix" ? (
            <Tag color="red">{status}</Tag>
          ) : status === "full" ? (
            <Tag color="blue">{status}</Tag>
          ) : (
            <Tag color="orange">{status}</Tag>
          )}
        </>
      ),
    },

    {
      title: "ACTION",
      key: "action",
      // align: 'center',
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
        </>
      ),
    },
  ];

  useEffect(
    () => {
      getAllRooms();
    },
    [isModalVisible1, isModalVisible]
    // [subjectList]
  );

  const dataA = Array.from(roomList);
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
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={true}
              className="criclebox tablespace mb-24"
              title="INFORMATION ROOMS"
              extra={
                <Button
                  type="primary"
                  className="tag-primary"
                  // onClick={() => history.push("/create-room")}
                  onClick={(record) => showModal1(record)}
                  style={{ align: "right" }}
                >
                  Add Room
                </Button>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={dataArray}
                  pagination={false}
                  className="ant-border-space"
                  loading={isLoading}
                  bordered
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
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div className="author-info">
                  <Title level={5}>Room</Title>
                  <Input
                    value={name}
                    onChange={(event) => {
                      handleChangeName(event.target.value);
                    }}
                  />
                </div>
              </Col>
              <Col span={12}>
                <div className="author-info">
                  <Title level={5}>Status</Title>
                  <Select
                    style={{ width: 120 }}
                    onChange={(value) => {
                      handleChange(value);
                    }}
                    value={statusStates}
                  >
                    <Option value="empty">empty</Option>
                    <Option value="fix">fix</Option>
                    <Option value="full">full</Option>
                  </Select>
                </div>
              </Col>
            </Row>
          </>
        )}
      </Modal>
      <Modal
        title="ADD"
        visible={isModalVisible1}
        onOk={handleOk1}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <div className="author-info">
                <Title level={5}>Room</Title>
                <Input
                  // value={name1}
                  rules={[
                    {
                      required: true,
                      message: "Please input name!",
                    },
                  ]}
                  onChange={(event) => {
                    handleChangeName1(event.target.value);
                  }}
                />
              </div>
            </Col>
            <Col span={12}>
              <div className="author-info">
                <Title level={5}>Status</Title>
                <Select
                  style={{ width: 120 }}
                  onChange={(value) => {
                    handleChange1(value);
                  }}
                  rules={[{ required: true, message: "Please input status!" }]}
                  value={statusStates1  || 'empty'}
                  disabled
                >
                  <Option value="empty">empty</Option>
                  <Option value="fix">fix</Option>
                  <Option value="full">full</Option>
                </Select>
              </div>
            </Col>
          </Row>
        </>
      </Modal>
    </>
  );
}

export default observer(Rooms);
