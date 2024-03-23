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
  Space,
} from "antd";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const { Title } = Typography;
const { Option } = Select;

function Classes() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [statusStates, setStatusStates] = useState(null);
  const [name, setName] = useState(null);
  const [lecturer, setLecturer] = useState(null);
  const [subject, setSubject] = useState(null);
  const [statusStates1, setStatusStates1] = useState(null);
  const [name1, setName1] = useState(null);
  const [classPupils, setClassPupils] = useState([]);
  const [idClass, setIdClass] = useState();
  const history = useHistory();

  const handleChangeSelect = (value) => {
    // const result = value.split(' ').pop();
    setClassPupils(value);
    // console.log(`selected ${value}`);
  };
  const showModal = (record) => {
    setSelectedRecord(record);
    setStatusStates(record.status);
    setName(record.name);
    setSubject(record.subjectId);
    setLecturer(record.userId);
    setIdClass(record.ID)
    // console.log("fff", record.name);
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
    classList,
    getAllClasses,
    createClass,
    userList,
    getAllUsers,
    updateClass,
    currentUserInfo,
    pupilList,
    getAllPupils,
    ClassByUser,
    getClassByUser,
    PupilByClass,
    getPupilByClass,
  } = accountStore;

  const handleOk = () => {
    updateClass({
      ID: selectedRecord.ID,
      status: statusStates,
      name: name,
    });
    getPupilByClass({
      ID: idClass
      // role: currentUserInfo.role,
    });
    console.log('PupilByClass', PupilByClass, selectedRecord)
    setIsModalVisible(false);
  };

  const handleOk1 = () => {
    const regex = /[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}/i;

    const uuidArray = classPupils.map((item) => {
      const match = item.match(regex);
      return match ? match[0] : null;
    });
    const transformedArrayA = uuidArray.map((id) => ({ id }));
    // console.log("réult", uuidArray, transformedArrayA);
    createClass({
      name: name1,
      status: statusStates1,
      userId: currentUserInfo.id,
      subjectId: currentUserInfo.subjectId,
      listPupil: transformedArrayA,
    });
    getClassByUser({
      ID: currentUserInfo.id,
      role: currentUserInfo.role,
    });
    getAllClasses();
    getAllSubjects();
    getAllUsers();
    setIsModalVisible1(false);
    // console.log("jkjk", currentUserInfo);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalVisible1(false);
    // console.log("jkjkxxxxxxx", currentUserInfo.subjectId, currentUserInfo);
    // console.log(`bbbbbbbbbbbbbbbbbbbbb`, classPupils);
  };

  const handleChange = (value) => {
    // console.log("vvvvvvvvvvvvvvvvvvvvvvv", value);
    setStatusStates(value);
  };

  const handleChangeName = (value) => {
    // console.log("aaaaaaaaa", value);
    setName(value);
    // console.log("name", name);
  };

  const handleChange1 = (value) => {
    // console.log("vvvvvvvvvvvvvvvvvvvvvvv", value);
    setStatusStates1(value);
  };

  const handleChangeName1 = (value) => {
    // console.log("aaaaaaaaa", value);
    setName1(value);
    // console.log("name", name);
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
      title: "LECTURER",
      dataIndex: "userId",
      key: "userId",
      render: (userId) => (
        <>
          <div className="avatar-info">
            <Title level={5}>{userId}</Title>
            <p>{userId}</p>
          </div>
        </>
      ),
    },
    {
      title: "SUBJECT",
      dataIndex: "subjectId",
      key: "subjectId",
      render: (subjectId) => (
        <>
          <div className="avatar-info">
            <Title level={5}>{subjectId}</Title>
            <p>{subjectId}</p>
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
          {status === "finished" ? (
            <Tag color="green">{status}</Tag>
          ) : status === "canceled" ? (
            <Tag color="red">{status}</Tag>
          ) : status === "started" ? (
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
            {record.ID}
          </Button>
        </>
      ),
    },
  ];

  const columnsDetail = [
    {
      title: "NAME PUPIL",
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
          {status === "finished" ? (
            <Tag color="green">{status}</Tag>
          ) : status === "canceled" ? (
            <Tag color="red">{status}</Tag>
          ) : status === "started" ? (
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
            onClick={() => showModal1(record)}
          >
            Edit
            {/* {record.username} */}
          </Button>
        </>
      ),
    },
  ];

  const listPupilByClass= Array.from(PupilByClass);

  const dataArray = Array.from(ClassByUser);

  const dataArrayB = Array.from(subjectList);

  const dataArrayC = Array.from(userList);

  let newArray1 = dataArray.map((item1) => {
    // Tìm phần tử tương ứng trong Array2
    let correspondingItem = dataArrayB.find(
      (item2) => item2.ID === item1.subjectId
    );

    let correspondingItem1 = dataArrayC.find((item2) => {
      return item2.ID === item1.userId;
    });
    return {
      ...item1,
      userId: correspondingItem1 ? correspondingItem1.name : null,
      subjectId: correspondingItem ? correspondingItem.name : null,
    };
  });
  const dataArrayD = Array.from(pupilList);

  let options = [];

  // for (let i = 10; i < 36; i++) {
  //   options.push({
  //     label: i.toString(36) + i,
  //     value: i.toString(36) + i,
  //   });
  // }

  const arrayPupils = dataArrayD.map((itemB) => ({
    label: itemB.name,
    value: itemB.name + " " + itemB.ID,
  }));

  options = arrayPupils;

  useEffect(() => {
    // getAllRooms();
    getAllClasses();
    getAllSubjects();
    getAllUsers();
    getAllPupils();
    getClassByUser({
      ID: currentUserInfo.id,
      role: currentUserInfo.role,
    });
    getPupilByClass({
      ID: idClass
    });
    // console.log('hohohoho', dataArrayD, options);
  }, [isModalVisible1, isModalVisible]);
  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={true}
              className="criclebox tablespace mb-24"
              title="INFORMATION CLASSES"
              extra={
                <Button
                  type="primary"
                  className="tag-primary"
                  onClick={(record) => showModal1(record)}
                  style={{ align: "right" }}
                >
                  Add Class
                </Button>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={newArray1}
                  pagination={false}
                  className="ant-border-space"
                  loading={isLoading}
                  bordered
                  // title={() => (
                  //   <Button
                  //     type="primary"
                  //     className="tag-primary"
                  //     onClick={(record) => showModal1(record)}
                  //     style={{ align: "right" }}
                  //   >
                  //     Add Class
                  //   </Button>
                  // )}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <Modal
        title="DETAIL"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        {selectedRecord && (
          <>
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <div className="author-info">
                  <Title level={5}>Name</Title>
                  <Input
                    value={name}
                    onChange={(event) => {
                      handleChangeName(event.target.value);
                    }}
                  />
                </div>
              </Col>
              <Col span={6}>
                <div className="author-info">
                  <Title level={5}>Lecturer</Title>
                  <Input value={lecturer} disabled={true} />
                </div>
              </Col>
              <Col span={6}>
                <div className="author-info">
                  <Title level={5}>Subject</Title>
                  <Input value={subject} disabled={true} />
                </div>
              </Col>
              <Col span={6}>
                <div className="author-info">
                  <Title level={5}>Status</Title>
                  <Select
                    style={{ width: 120 }}
                    onChange={(value) => {
                      handleChange(value);
                    }}
                    value={statusStates}
                  >
                    <Option value="started">started</Option>
                    <Option value="finished">finished</Option>
                    <Option value="canceled">canceled</Option>
                  </Select>
                </div>
              </Col>
              <Col span={12}>
                <div className="author-info">
                  <Title level={5}>Pupils</Title>
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Please select"
                      // defaultValue={["a10", "c12"]}
                      onChange={handleChangeSelect}
                      options={options}
                    />
                  </Space>
                </div>
              </Col>
              <Col span={12}>
                <div className="author-info">
                  <Title level={5}>List Pupil</Title>
                  <div className="table-responsive">
                    <Table
                      columns={columnsDetail}
                      dataSource={listPupilByClass}
                      pagination={false}
                      className="ant-border-space"
                      loading={isLoading}
                      bordered
                      scroll={{ y: 240 }}
                    />
                  </div>
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
        width={1000}
      >
        <>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <div className="author-info">
                <Title level={5}>Class</Title>
                <Input
                  // value={name}
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
                  // value={statusStates}
                >
                  <Option value="started">started</Option>
                  <Option value="finished">finished</Option>
                  <Option value="canceled">canceled</Option>
                </Select>
              </div>
            </Col>
            <Col span={24}>
              <Space style={{ width: "100%" }} direction="vertical">
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Please select"
                  // defaultValue={["a10", "c12"]}
                  onChange={handleChangeSelect}
                  options={options}
                />
              </Space>
            </Col>
          </Row>
        </>
      </Modal>
    </>
  );
}

export default observer(Classes);
