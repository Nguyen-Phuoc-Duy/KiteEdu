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

function Subjects() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [statusStates, setStatusStates] = useState(null);
  const [name, setName] = useState(null);
  const history = useHistory();
  const showModal = (record) => {
    setSelectedRecord(record);
    setStatusStates(record.status);
    setName(record.name);
    console.log("fff", record.name);
    setIsModalVisible(true);
  };

  const { accountStore } = useStore();
  const { isLoading, subjectList, getAllSubjects, updateSubject } =
    accountStore;

  const handleOk = () => {
    updateSubject({
      ID: selectedRecord.ID,
      status: statusStates,
      name: name,
    });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (value) => {
    console.log("vvvvvvvvvvvvvvvvvvvvvvv", value);
    setStatusStates(value);
  };

  const handleChangeName = (value) => {
    console.log("aaaaaaaaa", value);
    setName(value);
    console.log("name", name);
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
      title: "Status",
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

  useEffect(() => {
    getAllSubjects();
  }, []
  // [subjectList]
  );

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
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={true}
              className="criclebox tablespace mb-24"
              title="INFORMATION SUBJECTS"
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={dataArray}
                  pagination={false}
                  className="ant-border-space"
                  loading={isLoading}
                  bordered
                  title={() => (
                    <Button
                      type="primary"
                      className="tag-primary"
                      onClick={() => history.push("/create-subject")}
                      style={{align: "right"}}
                    >
                      Add Subject
                    </Button>
                  )}
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
                  <Title level={5}>Subject</Title>
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
                    <Option value="active">active</Option>
                    <Option value="inactive">inactive</Option>
                  </Select>
                </div>
              </Col>
            </Row>
          </>
        )}
      </Modal>
    </>
  );
}

export default observer(Subjects);
