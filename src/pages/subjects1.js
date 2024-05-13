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
  message,
  notification,
} from "antd";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

const { Title } = Typography;
const { Option } = Select;

function Subjects() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleAdd, setIsModalVisibleAdd] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [statusStates, setStatusStates] = useState(null);
  const [statusStatesAdd, setStatusStatesAdd] = useState(null);
  const [name, setName] = useState(null);
  const [nameAdd, setNameAdd] = useState(null);
  const [initialRender, setInitialRender] = useState(true);
  // const history = useHistory();
  const [messageApi, contextHolder] = message.useMessage();
  const [api] = notification.useNotification();

  const { accountStore } = useStore();
  const {
    isLoading,
    subjectList,
    getAllSubjects,
    updateSubject,
    createSubject,
    currentUserInfo,
    testMsg,
  } = accountStore;

  const openNotificationWithIcon = (type, placement) => {
    api[type]({
      message: "Notification Title",
      placement,
      description: "ThNH CONGY",
    });
  };

  const showModal = (record) => {
    setSelectedRecord(record);
    setStatusStates(record.status);
    setName(record.name);
    setIsModalVisible(true);
  };

  const showModalAdd = (record) => {
    setIsModalVisibleAdd(true);
  };

  const handleOk = async () => {
    try {
      await updateSubject({
        ID: selectedRecord.ID,
        status: statusStates,
        name: name,
      });
      setIsModalVisible(false);

      let { errCode, errMsg } = testMsg;

      const handleNotification = (code, msg) => {
        if (code === 200) {
          messageApi.success(msg);
        } else {
          messageApi.error(msg);
        }
      };
      handleNotification(errCode, errMsg);
    } catch (error) {
      console.error("Error updating subject:", error);
      messageApi.error({
        content: "An error occurred while updating the subject.",
      });
    }
  };

  const handleOkAdd = () => {
    createSubject({
      status: statusStatesAdd,
      name: nameAdd,
    });
    setIsModalVisibleAdd(false);
    setNameAdd(null);
    setStatusStatesAdd(null);
    getAllSubjects();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalVisibleAdd(false);
  };

  const handleChange = (value) => {
    setStatusStates(value);
  };

  const handleChangeName = (value) => {
    setName(value);
  };

  const handleChangeAdd = (value) => {
    setStatusStatesAdd(value);
  };

  const handleChangeNameAdd = (value) => {
    setNameAdd(value);
  };

  useEffect(() => {
    if (initialRender) {
      getAllSubjects();
      setInitialRender(false);
    }
  }, [createSubject, getAllSubjects, initialRender, updateSubject]);

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
          {status === "active" ? (
            <Tag color="green">{status}</Tag>
          ) : (
            <Tag color="red">{status}</Tag>
          )}
        </>
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
          </Button>
        </>
      ),
    },
  ];

  const columnsEmployee = [
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
          {status === "active" ? (
            <Tag color="green">{status}</Tag>
          ) : (
            <Tag color="red">{status}</Tag>
          )}
        </>
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
          </Button>
          <Button
            type="primary"
            className="tag-primary"
            onClick={() => showModalAdd(record)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <Row>
        <Col span={24}>
          <Card title="List Subject">
            <Button type="primary" onClick={showModalAdd}>
              Add New
            </Button>
            <Table
              columns={columns}
              dataSource={subjectList}
              loading={isLoading}
              rowKey={(record) => record.ID}
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </Col>
      </Row>
      <Modal
        title="Edit Subject"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <label>Status</label>
        <Select
          defaultValue={selectedRecord ? selectedRecord.status : null}
          style={{ width: "100%" }}
          onChange={handleChange}
        >
          <Option value="active">Active</Option>
          <Option value="inactive">Inactive</Option>
        </Select>
        <label>Name</label>
        <Input
          defaultValue={selectedRecord ? selectedRecord.name : null}
          onChange={(e) => handleChangeName(e.target.value)}
          placeholder="Enter name"
        />
      </Modal>
      <Modal
        title="Add New Subject"
        visible={isModalVisibleAdd}
        onOk={handleOkAdd}
        onCancel={handleCancel}
      >
        <label>Status</label>
        <Select style={{ width: "100%" }} onChange={handleChangeAdd}>
          <Option value="active">Active</Option>
          <Option value="inactive">Inactive</Option>
        </Select>
        <label>Name</label>
        <Input
          onChange={(e) => handleChangeNameAdd(e.target.value)}
          placeholder="Enter name"
        />
      </Modal>
    </>
  );
}

export default observer(Subjects);
