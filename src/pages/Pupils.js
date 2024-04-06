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
  Switch,
  DatePicker,
} from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const { Title } = Typography;
const { Option } = Select;

function Pulpils() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleAdd, setIsModalVisibleAdd] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [statusStates, setStatusStates] = useState(null);
  const [statusStatesAdd, setStatusStatesAdd] = useState(null);
  const [genderStates, setGenderStates] = useState(null);
  const [birth, setBirth] = useState(null);
  const [genderStatesAdd, setGenderStatesAdd] = useState(null);
  const [birthAdd, setBirthAdd] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [nameP, setNameP] = useState(null);
  const [emailP, setEmailP] = useState(null);
  const [phoneP, setPhoneP] = useState(null);
  const [address, setAddress] = useState(null);
  const history = useHistory();
  const showModal = (record) => {
    setSelectedRecord(record);
    setStatusStates(record.status);
    setGenderStates(record.gender);
    setBirth(dayjs(record.birth, "YYYY-MM-DD"));
    setName(record.name);
    setEmail(record.email);
    setPhone(record.phone);
    setNameP(record.parent_name);
    setEmailP(record.parent_email);
    setPhoneP(record.parent_phone);
    setAddress(record.address);
    setIsModalVisible(true);
  };

  const showModalAdd = (record) => {
    setIsModalVisibleAdd(true);
  };

  const { accountStore } = useStore();
  const { isLoading, pupilList, getAllPupils, updatePupil, createPupil } =
    accountStore;

  const handleOk = async () => {
    await updatePupil({
      ID: selectedRecord.ID,
      status: statusStates,
      name: name,
      email: email,
      phone: phone,
      parent_email: emailP,
      parent_name: nameP,
      parent_phone: phoneP,
      gender: genderStates,
      birth: birth,
      address: address,
    });

    // Cách 1: Gọi lại API để tải lại danh sách học viên
    getAllPupils();

    // Cách 2: Cập nhật trực tiếp danh sách học viên
    // const updatedPupilIndex = pupilList.findIndex(pupil => pupil.ID === selectedRecord.ID);
    // if (updatedPupilIndex !== -1) {
    //   const updatedPupil = {
    //     ...selectedRecord,
    //     status: statusStates,
    //     name: name,
    //     email: email,
    //     phone: phone,
    //     parent_email: emailP,
    //     parent_name: nameP,
    //     parent_phone: phoneP,
    //     gender: genderStates,
    //     birth: birth,
    //     address: address,
    //   };
    //   const updatedPupilList = [...pupilList];
    //   updatedPupilList[updatedPupilIndex] = updatedPupil;
    //   // Cập nhật lại danh sách học viên
    //   setPupilList(updatedPupilList);
    // }

    setIsModalVisible(false);
  };

  const handleOkAdd = async () => {
    await createPupil({
      status: statusStatesAdd,
      name: name,
      email: email,
      phone: phone,
      parent_email: emailP,
      parent_name: nameP,
      parent_phone: phoneP,
      gender: genderStatesAdd,
      birth: birthAdd,
      address: address,
    });
    setIsModalVisibleAdd(false);
    setBirthAdd(null);
    setStatusStatesAdd(null);
    setName(null);
    setEmail(null);
    setPhone(null);
    setNameP(null);
    setEmailP(null);
    setPhoneP(null);
    setGenderStatesAdd(null);
    setAddress(null);
    getAllPupils();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalVisibleAdd(false);
  };

  const handleChange = (value) => {
    setStatusStates(value);
  };
  const handleChangeGender = (value) => {
    console.log("gender", value);

    setGenderStates(value);
  };
  const handleChangeBirth = (value) => {
    console.log("llllllllllllllll", dayjs(value, "YYYY-MM-DD"));
    setBirth(dayjs(value, "YYYY-MM-DD"));
  };
  const handleChangeName = (value) => {
    setName(value);
  };
  const handleChangeEmail = (value) => {
    setEmail(value);
  };
  const handleChangePhone = (value) => {
    setPhone(value);
  };
  const handleChangeNameP = (value) => {
    setNameP(value);
  };
  const handleChangeEmailP = (value) => {
    setEmailP(value);
  };
  const handleChangePhoneP = (value) => {
    setPhoneP(value);
  };
  const handleChangeAddress = (value) => {
    setAddress(value);
  };
  /////////////////////////////////////////////////////////////////////
  const handleChangeAdd = (value) => {
    setStatusStatesAdd(value);
  };
  const handleChangeGenderAdd = (value) => {
    console.log("gender", value);

    setGenderStatesAdd(value);
  };
  const handleChangeBirthAdd = (value) => {
    console.log(
      "llllllllllllllll",
      value,
      moment(value).format("DD-MM-YYYY"),
      dayjs(value, "YYYY-MM-DD")
    );
    setBirthAdd(moment(value).format("DD-MM-YYYY"));
  };
  const handleChangeNameAdd = (value) => {
    setName(value);
  };
  const handleChangeEmailAdd = (value) => {
    setEmail(value);
  };
  const handleChangePhoneAdd = (value) => {
    setPhone(value);
  };
  const handleChangeNamePAdd = (value) => {
    setNameP(value);
  };
  const handleChangeEmailPAdd = (value) => {
    setEmailP(value);
  };
  const handleChangePhonePAdd = (value) => {
    setPhoneP(value);
  };
  const handleChangeAddressAdd = (value) => {
    setAddress(value);
  };

  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: "10%",
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
      width: "15%",
      render: (email) => <Title level={5}>{email}</Title>,
    },
    {
      title: "PHONE",
      dataIndex: "phone",
      key: "phone",
      render: (phone) => <div className="semibold">{phone}</div>,
    },
    {
      title: "PARENT'S NAME",
      dataIndex: "parent_name",
      key: "parent_name",
      width: "10%",
      render: (parent_name) => (
        <>
          <div className="avatar-info">
            <Title level={5}>{parent_name}</Title>
            <p>{parent_name}</p>
          </div>
        </>
      ),
    },
    {
      title: "PARENT'S EMAIL",
      dataIndex: "parent_email",
      key: "parent_email",
      width: "15%",
      render: (parent_email) => <Title level={5}>{parent_email}</Title>,
    },
    {
      title: "PARENT'S PHONE",
      dataIndex: "parent_phone",
      key: "parent_phone",
      render: (parent_phone) => <div className="semibold">{parent_phone}</div>,
    },

    {
      title: "GENDER",
      dataIndex: "gender",
      key: "gender",
      render: (gender) => (
        <div className="semibold">
          {gender == 1 ? "Nam" : "Nữ"}
          {gender}
        </div>
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
      title: "ADDRESS",
      dataIndex: "address",
      key: "address",
      width: "10%",
      render: (address) => (
        <>
          <div className="semibold">{address}</div>
        </>
      ),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      width: "6%",
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
      fixed: "right",
      width: "6%",
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
  useEffect(() => {
    getAllPupils();
  }, [isModalVisible, isModalVisibleAdd]);
  const dataArray = Array.from(pupilList);

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={true}
              className="criclebox tablespace mb-24"
              title="INFORMATION PUPILS"
              extra={
                <Button
                  type="primary"
                  className="tag-primary"
                  onClick={(record) => showModalAdd(record)}
                  style={{ align: "right" }}
                >
                  Add Pupil
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
                  scroll={{ x: 1600, y: 415 }}
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
                  <Title level={5}>Name</Title>
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
                  <Title level={5}>Email</Title>
                  <Input
                    value={email}
                    onChange={(event) => {
                      handleChangeEmail(event.target.value);
                    }}
                  />
                </div>
              </Col>
              <Col span={12}>
                <div className="author-info">
                  <Title level={5}>Phone</Title>
                  <Input
                    value={phone}
                    onChange={(event) => {
                      handleChangePhone(event.target.value);
                    }}
                  />
                </div>
              </Col>
              <Col span={12}>
                <div className="author-info">
                  <Title level={5}>Parent's Name</Title>
                  <Input
                    value={nameP}
                    onChange={(event) => {
                      handleChangeNameP(event.target.value);
                    }}
                  />
                </div>
              </Col>
              <Col span={12}>
                <div className="author-info">
                  <Title level={5}>Parent's Email</Title>
                  <Input
                    value={emailP}
                    onChange={(event) => {
                      handleChangeEmailP(event.target.value);
                    }}
                  />
                </div>
              </Col>
              <Col span={12}>
                <div className="author-info">
                  <Title level={5}>Parent's Phone</Title>
                  <Input
                    value={phoneP}
                    onChange={(event) => {
                      handleChangePhoneP(event.target.value);
                    }}
                  />
                </div>
              </Col>
              <Col span={12}>
                <div className="author-info">
                  <Title level={5}>Gender</Title>
                  <Select
                    style={{ width: 120 }}
                    onChange={(value) => {
                      handleChangeGender(value);
                    }}
                    value={genderStates == 1 ? "Nam" : "Nữ"}
                  >
                    <Option value="1">Nam</Option>
                    <Option value="0">Nữ</Option>
                  </Select>
                </div>
              </Col>
              <Col span={12}>
                <div className="author-info">
                  <Title level={5}>Birth</Title>
                  <DatePicker
                    value={birth}
                    onChange={(value) => {
                      handleChangeBirth(value);
                    }}
                  />
                </div>
              </Col>
              <Col span={12}>
                <div className="author-info">
                  <Title level={5}>Address</Title>
                  <Input
                    value={address}
                    onChange={(event) => {
                      handleChangeAddress(event.target.value);
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

      <Modal
        title="ADD"
        visible={isModalVisibleAdd}
        onOk={handleOkAdd}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <div className="author-info">
                <Title level={5}>Name</Title>
                <Input
                  onChange={(event) => {
                    handleChangeNameAdd(event.target.value);
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input name!",
                    },
                  ]}
                />
              </div>
            </Col>
            <Col span={12}>
              <div className="author-info">
                <Title level={5}>Email</Title>
                <Input
                  onChange={(event) => {
                    handleChangeEmailAdd(event.target.value);
                  }}
                />
              </div>
            </Col>
            <Col span={12}>
              <div className="author-info">
                <Title level={5}>Phone</Title>
                <Input
                  onChange={(event) => {
                    handleChangePhoneAdd(event.target.value);
                  }}
                />
              </div>
            </Col>
            <Col span={12}>
              <div className="author-info">
                <Title level={5}>Parent's Name</Title>
                <Input
                  onChange={(event) => {
                    handleChangeNamePAdd(event.target.value);
                  }}
                />
              </div>
            </Col>
            <Col span={12}>
              <div className="author-info">
                <Title level={5}>Parent's Email</Title>
                <Input
                  onChange={(event) => {
                    handleChangeEmailPAdd(event.target.value);
                  }}
                />
              </div>
            </Col>
            <Col span={12}>
              <div className="author-info">
                <Title level={5}>Parent's Phone</Title>
                <Input
                  onChange={(event) => {
                    handleChangePhonePAdd(event.target.value);
                  }}
                />
              </div>
            </Col>
            <Col span={12}>
              <div className="author-info">
                <Title level={5}>Gender</Title>
                <Select
                  style={{ width: 120 }}
                  onChange={(value) => {
                    handleChangeGenderAdd(value);
                  }}
                  // value={genderStatesAdd == 1 ? "Nam" : "Nữ"}
                >
                  <Option value="1">Nam</Option>
                  <Option value="0">Nữ</Option>
                </Select>
              </div>
            </Col>
            <Col span={12}>
              <div className="author-info">
                <Title level={5}>Birth</Title>
                <DatePicker
                  onChange={(value) => {
                    handleChangeBirthAdd(value);
                  }}
                />
              </div>
            </Col>
            <Col span={12}>
              <div className="author-info">
                <Title level={5}>Address</Title>
                <Input
                  onChange={(event) => {
                    handleChangeAddressAdd(event.target.value);
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
                    handleChangeAdd(value);
                  }}
                  value={statusStatesAdd || "active"}
                  disabled
                >
                  <Option value="active">active</Option>
                  <Option value="inactive">inactive</Option>
                </Select>
              </div>
            </Col>
          </Row>
        </>
      </Modal>
    </>
  );
}

export default observer(Pulpils);
