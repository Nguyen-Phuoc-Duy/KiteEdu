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
  DatePicker,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import moment from "moment";
import Highlighter from 'react-highlight-words';
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const { Title } = Typography;
const { Option } = Select;

function Pulpils() {
  const [visible, setVisible] = useState(false);
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
  const [validEmail, setValidEmail] = useState(true);
  const [validEmailP, setValidEmailP] = useState(true);
  const [validEmailA, setValidEmailA] = useState(true);
  const [validEmailPA, setValidEmailPA] = useState(true);
  const [validPhone, setValidPhone] = useState(true);
  const [validPhoneP, setValidPhoneP] = useState(true);
  const [validPhoneA, setValidPhoneA] = useState(true);
  const [validPhonePA, setValidPhonePA] = useState(true);
  const history = useHistory();

  const { accountStore } = useStore();
  const {
    isLoading,
    pupilList,
    getAllPupils,
    updatePupil,
    createPupil,
    errorMessage,
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
  




  const validateEmail = (value) => {
    const regexEmail = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
    return regexEmail.test(value);
  };
  const validatePhone = (value) => {
    const regexPhone = /^[0-9]{10}$/;
    return regexPhone.test(value);
  };
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
    setIsModalVisible(false);
    if (errorMessage) {
      console.log("errorMessageerrorMessage", errorMessage);
      setVisible(true); // Hiển thị modal
      const timer = setTimeout(() => {
        setVisible(false); // Ẩn modal sau 3 giây
      }, 1000);
      return () => clearTimeout(timer); // Xóa timeout khi component unmount hoặc errorMessage thay đổi
    }
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
    setIsModalVisibleAdd(false);
  };

  const handleFilter = (value) => {
    console.log("aaaaaaaaa", value);
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
    setValidEmail(validateEmail(value));
  };
  const handleChangePhone = (value) => {
    setPhone(value);
    setValidPhone(validatePhone(value));
  };
  const handleChangeNameP = (value) => {
    setNameP(value);
  };
  const handleChangeEmailP = (value) => {
    setEmailP(value);
    setValidEmailP(validateEmail(value));
  };
  const handleChangePhoneP = (value) => {
    setPhoneP(value);
    setValidPhoneP(validatePhone(value));
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
    setBirthAdd(moment(value));
  };
  const handleChangeNameAdd = (value) => {
    setName(value);
  };
  const handleChangeEmailAdd = (value) => {
    setEmail(value);
    setValidEmailA(validateEmail(value));
  };
  const handleChangePhoneAdd = (value) => {
    setPhone(value);
    setValidPhoneA(validatePhone(value));
  };
  const handleChangeNamePAdd = (value) => {
    setNameP(value);
  };
  const handleChangeEmailPAdd = (value) => {
    setEmailP(value);
    setValidEmailPA(validateEmail(value));
  };
  const handleChangePhonePAdd = (value) => {
    setPhoneP(value);
    setValidPhonePA(validatePhone(value));
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
      ...getColumnSearchProps('name'),
      sortDirections: ['descend', 'ascend'],
      render: (name) => (
        <>
          <div className="avatar-info">
            <Title level={5}>{name}</Title>
            {/* <p>{name}</p> */}
            {/* <a>{name}</a> */}
          </div>
        </>
      ),
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      width: "12%",
      ...getColumnSearchProps('email'),
      sortDirections: ['descend', 'ascend'],
      render: (email) => <a>{email}</a>,
    },
    {
      title: "PHONE",
      dataIndex: "phone",
      key: "phone",
      ...getColumnSearchProps('phone'),
      sortDirections: ['descend', 'ascend'],
      render: (phone) => <div>{phone}</div>,
    },
    {
      title: "PARENT'S NAME",
      dataIndex: "parent_name",
      key: "parent_name",
      width: "10%",
      ...getColumnSearchProps('parent_name'),
      sortDirections: ['descend', 'ascend'],
      render: (parent_name) => (
        <>
          <div className="avatar-info">
            <div className="semibold">{parent_name}</div>
          </div>
        </>
      ),
    },
    {
      title: "PARENT'S EMAIL",
      dataIndex: "parent_email",
      key: "parent_email",
      width: "12%",
      ...getColumnSearchProps('parent_email'),
      sortDirections: ['descend', 'ascend'],
      render: (parent_email) => <a>{parent_email}</a>,
    },
    {
      title: "PARENT'S PHONE",
      dataIndex: "parent_phone",
      key: "parent_phone",
      ...getColumnSearchProps('parent_phone'),
      sortDirections: ['descend', 'ascend'],
      render: (parent_phone) => <div>{parent_phone}</div>,
    },

    {
      title: "GENDER",
      dataIndex: "gender",
      key: "gender",
      ...getColumnSearchProps('gender'),
      sortDirections: ['descend', 'ascend'],
      render: (gender) => (
        <div>
          {gender == 1 ? "Nam" : "Nữ"}
          {gender}
        </div>
      ),
    },
    {
      title: "BIRTH",
      dataIndex: "birth",
      key: "birth",
      ...getColumnSearchProps('birth'),
      sortDirections: ['descend', 'ascend'],
      render: (birth) => <div>{moment(birth).format("DD-MM-YYYY")}</div>,
    },
    {
      title: "ADDRESS",
      dataIndex: "address",
      key: "address",
      width: "10%",
      ...getColumnSearchProps('address'),
      sortDirections: ['descend', 'ascend'],
      render: (address) => (
        <>
          <div className="semibold">{address}</div>
        </>
      ),
    },
    // {
    //   title: "STATUS",
    //   dataIndex: "status",
    //   key: "status",
    //   width: "6%",
    //   render: (status) => (
    //     <>
    //       {status === "active" ? (
    //         <Tag color="green">{status}</Tag>
    //       ) : (
    //         <Tag color="red">{status}</Tag>
    //       )}
    //     </>
    //   ),
    // },

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
    createPupil();
    updatePupil();
  }, []);
  const dataArray = Array.from(pupilList);

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={true}
              className="criclebox tablespace mb-24"
              title="Pupil list"
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
                    <Button
                      type="primary"
                      className="tag-primary"
                      onClick={(record) => showModalAdd(record)}
                      style={{ align: "right" }}
                    >
                      Add Pupil
                    </Button>
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
                  dataSource={dataArray}
                  pagination={false}
                  rowKey={(record) => record.ID}
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
              </Col>{" "}
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
                  <Title level={5}>Phone</Title>
                  <Input
                    value={phone}
                    onChange={(event) => {
                      handleChangePhone(event.target.value);
                    }}
                  />
                  {!validPhone && (
                    <p style={{ color: "red", marginBottom: 0 }}>
                      Phone is not valid
                    </p>
                  )}
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
                  {!validPhoneP && (
                    <p style={{ color: "red", marginBottom: 0 }}>
                      Phone is not valid
                    </p>
                  )}
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
                  {!validEmail && (
                    <p style={{ color: "red" }}>Email is not valid</p>
                  )}
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
                  {!validEmailP && (
                    <p style={{ color: "red" }}>Parent's Email is not valid</p>
                  )}
                </div>
              </Col>
              <Col span={12}>
                <div className="author-info">
                  <Title level={5}>Gender</Title>
                  <Select
                    style={{ width: "100%" }}
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
              <Col span={24}>
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
              {/* <Col span={12}>
                <div className="author-info">
                  <Title level={5}>Status</Title>
                  <Select
                    style={{ width: '100%' }}
                    onChange={(value) => {
                      handleChange(value);
                    }}
                    value={statusStates}
                  >
                    <Option value="active">active</Option>
                    <Option value="inactive">inactive</Option>
                  </Select>
                </div>
              </Col> */}
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
                <Title level={5}>Phone</Title>
                <Input
                  onChange={(event) => {
                    handleChangePhoneAdd(event.target.value);
                  }}
                />
                {!validPhoneA && (
                  <p style={{ color: "red", marginBottom: 0 }}>
                    Phone is not valid
                  </p>
                )}
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
                {!validPhonePA && (
                  <p style={{ color: "red", marginBottom: 0 }}>
                    Phone is not valid
                  </p>
                )}
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
                {!validEmailA && (
                  <p style={{ color: "red" }}>Email is not valid</p>
                )}
              </div>
            </Col>

            <Col span={12}>
              <div className="author-info">
                <Title level={5}>Parent's Email</Title>
                <Input
                  onChange={(event) => {
                    handleChangeEmailPAdd(event.target.value);
                  }}
                />{" "}
                {!validEmailPA && (
                  <p style={{ color: "red" }}>Parent's Email is not valid</p>
                )}
              </div>
            </Col>

            <Col span={12}>
              <div className="author-info">
                <Title level={5}>Gender</Title>
                <Select
                  style={{ width: "100%" }}
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
            <Col span={24}>
              <div className="author-info">
                <Title level={5}>Address</Title>
                <Input
                  onChange={(event) => {
                    handleChangeAddressAdd(event.target.value);
                  }}
                />
              </div>
            </Col>
            {/* <Col span={12}>
              <div className="author-info">
                <Title level={5}>Status</Title>
                <Select
                  style={{ width: '100%' }}
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
            </Col> */}
          </Row>
        </>
      </Modal>
    </>
  );
}

export default observer(Pulpils);
