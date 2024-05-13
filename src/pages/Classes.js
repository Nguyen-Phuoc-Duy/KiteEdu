import React, { useState, useEffect, useRef } from "react";
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
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from 'react-highlight-words';
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
  const [lecturerId, setLecturerId] = useState(null);
  const [name1, setName1] = useState(null);
  const [statusPupil, setStatusPupil] = useState(null);
  const [classPupils, setClassPupils] = useState([]);
  const [classPupilsUpdate, setClassPupilsUpdate] = useState([]);
  const [idClass, setIdClass] = useState();
  const [idPupil, setIdPupil] = useState();
  const [visible, setVisible] = useState(false);
  const history = useHistory();
  const { accountStore } = useStore();
  const {
    isLoading,
    subjectList,
    getAllSubjects,
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
    removePupilInClass,
    addPupilInClass,
    detailClass,
    errorMessage,
    employeeList,
    getEmployee,
    classList,
  } = accountStore;
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => {
      const handleFilterClose = () => {
        clearFilters && handleReset(clearFilters);
        setSelectedKeys([]);
        confirm(); // Xác nhận việc đóng filter
        setSearchText('');
        setSearchedColumn('');
      };
  
      return (
        <div
          style={{
            padding: 8,
          }}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: 'block',
            }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{
                width: 90,
              }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{
                width: 90,
              }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({
                  closeDropdown: false,
                });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
            <Button
              type="link"
              size="small"
              onClick={handleFilterClose} // Gọi hàm để đóng filter
              // onClick={() => {
              //   close();
              // }}
            >
              Close
            </Button>
          </Space>
        </div>
      );
    },
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });


  const handleChangeSelect = (value) => {
    // const result = value.split(' ').pop();
    setClassPupils(value);
  };
  const handleChangeSelectUpdate = (value) => {
    // const result = value.split(' ').pop();
    setClassPupilsUpdate(value);
    // console.log(`selected ${value}`);
  };

  const showModal = (record) => {
    console.log("record", record);
    setSelectedRecord(record);
    setStatusStates(record.status);
    setName(record.name);
    setSubject(record.subjectName);
    setLecturer(record.userName);
    setIdClass(record.ID);
    // setStatusPupil(newArrayPupil.status);
    getClassByUser({
      ID: currentUserInfo.id,
      role: currentUserInfo.role,
    });

    setIsModalVisible(true);
  };

  const showModal1 = (record) => {
    setIsModalVisible1(true);
  };

  const handleOk = () => {
    const regex = /[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}/i;

    const uuidArrayUpdate = classPupilsUpdate.map((item) => {
      const match = item.match(regex);
      return match ? match[0] : null;
    });
    const transformedArrayUpdate = uuidArrayUpdate.map((id) => ({ id }));
    updateClass({
      ID: selectedRecord.ID,
      status: statusStates,
      name: name,
      listPupil: transformedArrayUpdate,
      userId: currentUserInfo.id,
    });

    // removePupilInClass({
    //   classId: selectedRecord.ID,
    //   pupilId: idPupil,
    // });
    // addPupilInClass({
    //   classId: selectedRecord.ID,
    //   pupilId: idPupil,
    // });
    getPupilByClass({ ID: idClass });
    getClassByUser({
      ID: currentUserInfo.id,
      role: currentUserInfo.role,
    });
    getAllClasses();
    getAllSubjects();
    getAllUsers();
    setIsModalVisible(false);
    if (errorMessage) {
      setVisible(true); // Hiển thị modal
      const timer = setTimeout(() => {
        setVisible(false); // Ẩn modal sau 3 giây
      }, 1000);
      return () => clearTimeout(timer); // Xóa timeout khi component unmount hoặc errorMessage thay đổi
    }
  };

  const handleOk1 = () => {
    const regex = /[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}/i;

    const uuidArray = classPupils.map((item) => {
      const match = item.match(regex);
      return match ? match[0] : null;
    });
    const transformedArrayA = uuidArray.map((id) => ({ id }));

    const filteredObjects = dataEmployee.filter((obj) => obj.ID === lecturerId);
    const subjectId = filteredObjects.map((obj) => obj.subjectId).join(", ");
    createClass({
      name: name1,
      status: "started",
      userId: lecturerId,
      subjectId: subjectId,
      listPupil: transformedArrayA,
    });
    getPupilByClass({ ID: idClass });
    getClassByUser({
      ID: currentUserInfo.id,
      role: currentUserInfo.role,
    });
    getAllClasses();
    getAllSubjects();
    getAllUsers();
    setIsModalVisible1(false);
    setStatusStates(null);
    // console.log("jkjk", currentUserInfo);
    if (errorMessage) {
      setVisible(true); // Hiển thị modal
      const timer = setTimeout(() => {
        setVisible(false); // Ẩn modal sau 3 giây
      }, 1000);
      return () => clearTimeout(timer); // Xóa timeout khi component unmount hoặc errorMessage thay đổi
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalVisible1(false);
  };

  const handleRemovePupil = async (value) => {
    await removePupilInClass({
      classId: selectedRecord.ID,
      pupilId: value,
    });
    await getPupilByClass({ ID: idClass });
    // setIdPupil(value)
  };
  const handleAddPupil = async (value) => {
    await addPupilInClass({
      classId: selectedRecord.ID,
      pupilId: value,
    });
    await getPupilByClass({ ID: idClass });
    // setIdPupil(value)
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

  const handleFilter = (value) => {
    console.log("aaaaaaaaa", value);
  };

  const handleChange1 = (value) => {
    // console.log("vvvvvvvvvvvvvvvvvvvvvvv", value);
    setLecturerId(value);
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
      ...getColumnSearchProps('name'),
      render: (name) => (
        <>
          <div className="avatar-info">
            <Title level={5}>{name}</Title>
          </div>
        </>
      ),
    },

    {
      title: "LECTURER",
      dataIndex: "userName",
      key: "userId",
      ...getColumnSearchProps('userName'),
      render: (userId) => (
        <>
          <div className="avatar-info">
            <a>{userId}</a>
          </div>
        </>
      ),
    },
    {
      title: "SUBJECT",
      dataIndex: "subjectName",
      key: "subjectId",
      ...getColumnSearchProps('subjectName'),
      render: (subjectId) => (
        <>
          <div className="semibold">{subjectId}</div>
        </>
      ),
    },
    // {
    //   title: "SC",
    //   dataIndex: "studentsCount",
    //   key: "studentsCount",
    //   width: "8%",
    //   align: "center",
    //   render: (studentsCount) => (
    //     <>
    //       <div className="avatar-info">
    //         <Title level={5}>{studentsCount}</Title>
    //       </div>
    //     </>
    //   ),
    // },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      ...getColumnSearchProps('status'),
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
            {/* {record.ID} */}
          </Button>{" "}
          <Button
            type="primary"
            className="tag-primary"
            onClick={() =>
              history.push("/lessons", {
                state: record.ID,
                lecturer: record.userId,
                class: record.ID,
                status: record.status,
                nameLecturer: record.userName,
                nameClass: record.name,
              })
            }
          >
            Lessons
          </Button>
        </>
      ),
    },
  ];

  const columnsDetail = [
    {
      title: "NAME PUPIL",
      dataIndex: "pupilName",
      key: "pupilName",
      width: "40%",
      render: (name) => (
        <>
          <div className="avatar-info">
            <Title level={5}>{name}</Title>
          </div>
        </>
      ),
    },

    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      width: "20%",
      align: "center",
      render: (status) => (
        <>
          {status === "present" ? (
            <Tag color="green">{status}</Tag>
          ) : status === "not present" ? (
            <Tag color="red">{status}</Tag>
          ) : status === "attended" ? (
            <Tag color="blue">{status}</Tag>
          ) : (
            <Tag color="orange">{status}</Tag>
          )}
          {/* {statusPupil} */}
        </>
      ),
    },

    {
      title: "ACTION",
      key: "action",
      width: "40%",
      align: "center",
      render: (text, record) => (
        <>
          {
            // currentUserInfo.role === "employee" &&
            statusStates == "started" ? (
              <>
                <Button
                  type="primary"
                  className="tag-primary"
                  onClick={() => handleAddPupil(record.pupilId)}
                >
                  Add
                </Button>{" "}
                <Button
                  type="danger"
                  className="tag-primary"
                  onClick={() => handleRemovePupil(record.pupilId)}
                >
                  Remove
                </Button>
              </>
            ) : (
              <>
                <Button type="primary" className="tag-primary" disabled>
                  Add
                </Button>{" "}
                <Button type="danger" className="tag-primary" disabled>
                  Remove
                </Button>
              </>
            )
          }
        </>
      ),
    },
  ];
  const dataArrayB = Array.from(subjectList);

  const dataArrayC = Array.from(userList);

  const dataArrayD = Array.from(pupilList);
  //  const dataEmployee = JSON.parse(JSON.stringify(employeeList))
  const dataEmployee = Array.from(employeeList);

  let newArray1 = [];
  const dataArray =
    currentUserInfo.role == "employee"
      ? Array.from(ClassByUser)
      : Array.from(classList);

  newArray1 = dataArray.map((item1) => {
    let correspondingItem = dataArrayB.find(
      (item2) => item2.ID === item1.subjectId
    );
    let correspondingItem1 = dataArrayC.find(
      (item2) => item2.ID === item1.userId
    );

    const students = item1.pupils || [];
    const attendedStudents = students.filter(
      (pupil) => pupil.status === "attended"
    );
    const studentsCount = attendedStudents.length;

    return {
      ...item1,
      userName: correspondingItem1 ? correspondingItem1.name : null,
      subjectName: correspondingItem ? correspondingItem.name : null,
      studentsCount: studentsCount,
    };
  });

  const listPupilByClass = Array.from(PupilByClass);

  let newArrayPupil = listPupilByClass.map((item1) => {
    // console.log("oooooooooooooooooo", dataArrayD, listPupilByClass);
    // Tìm phần tử tương ứng trong Array2
    let correspondingItem1 = dataArrayD.find((item2) => {
      return item2.ID === item1.pupilId;
    });
    return {
      ...item1,
      // pupilId: correspondingItem1.pupilId,
      pupilName: correspondingItem1 ? correspondingItem1.name : null,
    };
  });
  let options = [];
  let optionsUpdate = [];
  let optionsUpdateFinal = [];

  const B = dataArrayD.filter((item) => item.status === "active");
  const arrayPupils = B.map((itemB) => ({
    label: itemB.name,
    value: itemB.name + " " + itemB.ID,
  }));

  options = arrayPupils;

  for (const itemA of B) {
    let found = false;
    for (const itemB of listPupilByClass) {
      if (itemA.ID === itemB.pupilId) {
        found = true;
        break;
      }
    }
    if (!found) {
      optionsUpdate.push(itemA);
    }
  }

  const arrayPupilsUpdate = optionsUpdate.map((itemB) => ({
    label: itemB.name,
    value: itemB.name + " " + itemB.ID,
  }));

  optionsUpdateFinal = arrayPupilsUpdate;
  useEffect(() => {
    createClass();
    updateClass();
  }, []);

  useEffect(() => {
    getAllClasses();
    getAllSubjects();
    getAllUsers();
    getAllPupils();
    getEmployee();
    getClassByUser({
      ID: currentUserInfo.id,
      role: currentUserInfo.role,
    });
    getPupilByClass({
      ID: idClass,
    });
  }, [
    isModalVisible1,
    isModalVisible,
    getAllClasses,
    getAllSubjects,
    getAllUsers,
    getAllPupils,
    getClassByUser,
    // currentUserInfo.id,
    // currentUserInfo.role,
    getPupilByClass,
    // idClass,
    // detailClass,
    // createClass,
    // updateClass,
  ]);
  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={true}
              className="criclebox tablespace mb-24"
              title="Class List"
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
                  <Col span={24} md={24} className="header-control">
                  {currentUserInfo.role !== "employee" ? (
                    <Button
                      type="primary"
                      className="tag-primary"
                      onClick={(record) => showModal1(record)}
                      style={{ align: "right" }}
                    >
                      Add Class
                    </Button>
                  ) : (
                    ""
                  )}
                    {/* <Input
                      className="header-search"
                      placeholder="Type here..."
                      prefix={<SearchOutlined />}
                      onChange={(e) => handleFilter(e.target.value)}
                    /> */}
                    
                  </Col>
                  
                </>
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
                  scroll={{ y: 420 }}
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
        // bodyStyle={{ height: 440 }}
        destroyOnClose={true}
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
                    disabled={
                      currentUserInfo.role !== "employee" &&
                      statusStates == "started"
                        ? false
                        : true
                    }
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
                    style={{ width: "100%" }}
                    onChange={(value) => {
                      handleChange(value);
                    }}
                    value={statusStates}
                    disabled={
                      currentUserInfo.role !== "employee" ? false : true
                    }
                  >
                    <Option value="started">started</Option>
                    <Option value="finished">finished</Option>
                    <Option value="canceled">canceled</Option>
                  </Select>
                </div>
              </Col>
              {/* <Scheduler
                  timeZone="Asia/Bangkok"
                  dataSource={dataSource}
                  views={views}
                  defaultCurrentView="day"
                  defaultCurrentDate={currentDate}
                  height={470}
                  startDayHour={0}
                  endDayHour={24}
                  remoteFiltering={false}
                  dateSerializationFormat="yyyy-MM-ddTHH:mm:ssZ"
                  textExpr="Text"
                  startDateExpr="StartDate"
                  endDateExpr="EndDate"
                  allDayExpr="AllDay"
                /> */}
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
                      onChange={handleChangeSelectUpdate}
                      options={optionsUpdateFinal}
                      disabled={
                        currentUserInfo.role !== "employee" &&
                        statusStates == "started"
                          ? false
                          : true
                      }
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
                      dataSource={newArrayPupil}
                      pagination={{ pageSize: 3 }}
                      className="ant-border-space"
                      loading={isLoading}
                      bordered
                      // scroll={{ y: 240 }}
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
            <Col span={8}>
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
            <Col span={8}>
              <div className="author-info">
                <Title level={5}>Status</Title>
                <Select style={{ width: "100%" }} value={"started"} disabled>
                  <Option value="started">started</Option>
                  <Option value="finished">finished</Option>
                  <Option value="canceled">canceled</Option>
                </Select>
              </div>
            </Col>
            <Col span={8}>
              <div className="author-info">
                <Title level={5}>Lecturer</Title>
                <Select
                  style={{ width: "100%" }}
                  onChange={(value) => {
                    handleChange1(value);
                  }}
                >
                  {dataEmployee.map((item) => {
                    if (item.role === "employee") {
                      return (
                        <Option key={item.ID} value={item.ID}>
                          {item.name}
                        </Option>
                      );
                    }
                    return null; // Trả về null nếu item.status không phải 'active'
                  })}
                </Select>
              </div>
            </Col>
            <Col span={24}>
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
          </Row>
        </>
      </Modal>
    </>
  );
}

export default observer(Classes);
