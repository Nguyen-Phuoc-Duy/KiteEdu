// import React, { useState, useEffect } from "react";
// import {
//   Row,
//   Col,
//   Card,
//   Table,
//   Button,
//   Typography,
//   Modal,
//   Select,
//   Tag,
//   Input,
//   message,
//   notification,
// } from "antd";
// import { useStore } from "../stores/store";
// import { observer } from "mobx-react-lite";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import CreateSubject from "./CreateSubject";
// const { Title } = Typography;
// const { Option } = Select;

// function Subjects() {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isModalVisibleAdd, setIsModalVisibleAdd] = useState(false);
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const [statusStates, setStatusStates] = useState(null);
//   const [statusStatesAdd, setStatusStatesAdd] = useState(null);
//   const [name, setName] = useState(null);
//   const [nameAdd, setNameAdd] = useState(null);
//   const history = useHistory();
//   const [
//     messageApi,
//     // contextHolder
//   ] = message.useMessage();
//   const [api
//     , contextHolder
//   ] = notification.useNotification();

//   const { accountStore } = useStore();
//   const {
//     isLoading,
//     subjectList,
//     getAllSubjects,
//     updateSubject,
//     createSubject,
//     currentUserInfo,
//     testMsg,
//   } = accountStore;

//   const openNotificationWithIcon = (type, placement) => {
//     api[type]({
//       message: "Notification Title",
//       placement,
//       description:
//         "ThNH CONGY",
//     });
//   };

//   let code = testMsg.errCode;
//   let msg = testMsg.errMsg;
//   console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ", code, msg);
//   // Hiển thị thông báo
//   const handleNotification = (code, msg) => {
//     if (code === 200) {
//       messageApi.open({
//         type: "success",
//         content: msg,
//       });
//     } else {
//       messageApi.open({
//         type: "error",
//         content: msg,
//       });
//     }
//   };
//   // Hiển thị modal chỉnh sửa thông tin môn học
//   const showModal = (record) => {
//     setSelectedRecord(record);
//     setStatusStates(record.status);
//     setName(record.name);
//     setIsModalVisible(true);
//   };

//   // Hiển thị modal thêm môn học
//   const showModalAdd = (record) => {
//     setIsModalVisibleAdd(true);
//   };

//   // Xử lý khi nhấn nút OK trên modal chỉnh sửa
//   const handleOk = () => {
//     updateSubject({
//       ID: selectedRecord.ID,
//       status: statusStates,
//       name: name,
//     });
//     setIsModalVisible(false);
//     // handleNotification(code, msg);
//   };

//   // Xử lý khi nhấn nút OK trên modal thêm
//   const handleOkAdd = () => {
//     createSubject({
//       status: statusStatesAdd,
//       name: nameAdd,
//     });
//     setIsModalVisibleAdd(false);
//     setNameAdd(null);
//     setStatusStatesAdd(null);
//     getAllSubjects();
//   };

//   // Xử lý khi nhấn nút Cancel
//   const handleCancel = () => {
//     setIsModalVisible(false);
//     setIsModalVisibleAdd(false);
//   };

//   // Xử lý thay đổi trạng thái môn học
//   const handleChange = (value) => {
//     setStatusStates(value);
//   };

//   // Xử lý thay đổi tên môn học
//   const handleChangeName = (value) => {
//     setName(value);
//   };

//   // Xử lý thay đổi trạng thái khi thêm môn học
//   const handleChangeAdd = (value) => {
//     setStatusStatesAdd(value);
//   };

//   // Xử lý thay đổi tên môn học khi thêm môn học
//   const handleChangeNameAdd = (value) => {
//     setNameAdd(value);
//   };

//   // Lấy danh sách môn học khi component được render hoặc khi modal hiển thị/ẩn
//   useEffect(() => {
//     getAllSubjects();
//     // updateSubject();
//   }, [
//     createSubject,
//     getAllSubjects,
//     isModalVisible,
//     isModalVisibleAdd,
//     updateSubject,
//   ]);

//   // Cấu hình cột cho Table
//   const columns = [
//     {
//       title: "NAME",
//       dataIndex: "name",
//       key: "name",
//       render: (name) => (
//         <>
//           <div className="avatar-info">
//             <Title level={5}>{name}</Title>
//             <p>{name}</p>
//           </div>
//         </>
//       ),
//     },
//     {
//       title: "STATUS",
//       dataIndex: "status",
//       key: "status",
//       render: (status) => (
//         <>
//           {status === "active" ? (
//             <Tag color="green">{status}</Tag>
//           ) : (
//             <Tag color="red">{status}</Tag>
//           )}
//         </>
//       ),
//     },

//     {
//       title: "ACTION",
//       key: "action",
//       render: (text, record) => (
//         <>
//           <Button
//             type="primary"
//             className="tag-primary"
//             onClick={() => showModal(record)}
//           >
//             Edit
//           </Button>
//         </>
//       ),
//     },
//   ];

//   // Cấu hình cột cho Table khi người dùng là nhân viên
//   const columnsEmployee = [
//     {
//       title: "NAME",
//       dataIndex: "name",
//       key: "name",
//       render: (name) => (
//         <>
//           <div className="avatar-info">
//             <Title level={5}>{name}</Title>
//             <p>{name}</p>
//           </div>
//         </>
//       ),
//     },
//     {
//       title: "STATUS",
//       dataIndex: "status",
//       key: "status",
//       render: (status) => (
//         <>
//           {status === "active" ? (
//             <Tag color="green">{status}</Tag>
//           ) : (
//             <Tag color="red">{status}</Tag>
//           )}
//         </>
//       ),
//     },

//     {
//       title: "ACTION",
//       key: "action",
//       render: (text, record) => (
//         <>
//           <Button type="primary" className="tag-primary" disabled>
//             Edit
//           </Button>
//         </>
//       ),
//     },
//   ];

//   // Chuyển đổi dữ liệu thành mảng và sắp xếp lại theo thứ tự
//   const dataA = Array.from(subjectList);
//   const dataArray = dataA.map((user) => {
//     const order = ["ID", "name", "status", "createdAt", "updatedAt"];

//     const sortedUser = {};
//     order.forEach((key) => {
//       if (user.hasOwnProperty(key)) {
//         sortedUser[key] = user[key];
//       }
//     });

//     return sortedUser;
//   });

//   return (
//     <>
//       {contextHolder}
//       <div className="tabled">
//         <Row gutter={[24, 0]}>
//           <Col xs="24" xl={24}>
//             <Card
//               bordered={true}
//               className="criclebox tablespace mb-24"
//               title="INFORMATION SUBJECTS"
//               extra={
//                 <>
//                   <Button
//                     type="primary"
//                     className="tag-primary"
//                     onClick={(record) => showModalAdd(record)}
//                     style={{ align: "right" }}
//                   >
//                     Add Subject
//                   </Button>
//                   <Button
//                     onClick={() => {
//                       openNotificationWithIcon("success", "bottomRight");
//                     }}
//                   >
//                     Success
//                   </Button>
//                   <Button
//                     onClick={() => {
//                       openNotificationWithIcon("info", "bottomRight");
//                     }}
//                   >
//                     Info
//                   </Button>
//                   <Button
//                     onClick={() => {
//                       openNotificationWithIcon("warning", "bottomRight");
//                     }}
//                   >
//                     Warning
//                   </Button>
//                   <Button
//                     onClick={() => {
//                       openNotificationWithIcon("error", "bottomRight");
//                     }}
//                   >
//                     Error
//                   </Button>
//                 </>
//               }
//             >
//               <div className="table-responsive">
//                 <Table
//                   columns={
//                     currentUserInfo.role === "employee"
//                       ? columnsEmployee
//                       : columns
//                   }
//                   dataSource={dataArray}
//                   pagination={false}
//                   className="ant-border-space"
//                   loading={isLoading}
//                   bordered
//                   scroll={{ y: 420 }}
//                 />
//               </div>
//             </Card>
//           </Col>
//         </Row>
//       </div>

//       {/* Modal chỉnh sửa */}
//       <Modal
//         title="EDIT"
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//       >
//         {selectedRecord && (
//           <>
//             <Row gutter={[16, 16]}>
//               <Col span={12}>
//                 <div className="author-info">
//                   <Title level={5}>Subject</Title>
//                   <Input
//                     value={name}
//                     onChange={(event) => {
//                       handleChangeName(event.target.value);
//                     }}
//                   />
//                 </div>
//               </Col>
//               <Col span={12}>
//                 <div className="author-info">
//                   <Title level={5}>Status</Title>
//                   <Select
//                     style={{ width: '100%' }}
//                     onChange={(value) => {
//                       handleChange(value);
//                     }}
//                     value={statusStates}
//                   >
//                     <Option value="active">active</Option>
//                     <Option value="inactive">inactive</Option>
//                   </Select>
//                 </div>
//               </Col>
//             </Row>
//           </>
//         )}
//       </Modal>

//       <Modal
//         title="ADD"
//         visible={isModalVisibleAdd}
//         onOk={handleOkAdd}
//         onCancel={handleCancel}
//         destroyOnClose={true}
//       >
//         <>
//           <Row gutter={[16, 16]}>
//             <Col span={12}>
//               <div className="author-info">
//                 <Title level={5}>Subject</Title>
//                 <Input
//                   rules={[
//                     {
//                       required: true,
//                       message: "Please input name!",
//                     },
//                   ]}
//                   onChange={(event) => {
//                     handleChangeNameAdd(event.target.value);
//                   }}
//                 />
//               </div>
//             </Col>
//             <Col span={12}>
//               <div className="author-info">
//                 <Title level={5}>Status</Title>
//                 <Select
//                   style={{ width: '100%' }}
//                   onChange={(value) => {
//                     handleChangeAdd(value);
//                   }}
//                   rules={[{ required: true, message: "Please input status!" }]}
//                   value={statusStatesAdd || "active"}
//                   disabled
//                 >
//                   <Option value="active">active</Option>
//                   <Option value="inactive">inactive</Option>
//                 </Select>
//               </div>
//             </Col>
//           </Row>
//         </>
//       </Modal>
//     </>
//   );
// }

// export default observer(Subjects);

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
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CreateSubject from "./CreateSubject";
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
  const [initialRender, setInitialRender] = useState(true); // Biến state để theo dõi render lần đầu
  const history = useHistory();
  const [messageApi, contextHolder] = message.useMessage();
  const [
    api,
    // , contextHolder
  ] = notification.useNotification();

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

  // Hiển thị modal chỉnh sửa thông tin môn học
  const showModal = (record) => {
    setSelectedRecord(record);
    setStatusStates(record.status);
    setName(record.name);
    setIsModalVisible(true);
  };

  // Hiển thị modal thêm môn học
  const showModalAdd = (record) => {
    setIsModalVisibleAdd(true);
  };

  // Xử lý khi nhấn nút OK trên modal chỉnh sửa
  // const handleOk = () => {
  //   updateSubject({
  //     ID: selectedRecord.ID,
  //     status: statusStates,
  //     name: name,
  //   });
  //   setIsModalVisible(false);

  //   let code = testMsg.errCode;
  //   let msg = testMsg.errMsg;
  //   console.log(
  //     "QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ",
  //     code,
  //     msg
  //   );

  //   // Hiển thị thông báo
  //   const handleNotification = (code, msg) => {
  //     if (code === 200) {
  //       messageApi.open({
  //         type: "success",
  //         content: msg,
  //       });
  //     } else {
  //       messageApi.open({
  //         type: "error",
  //         content: msg,
  //       });
  //     }
  //   };
  //   handleNotification(code, msg);
  // };
  // Xử lý khi nhấn nút OK trên modal chỉnh sửa
  // const handleOk = async () => {
  //   try {
  //     await updateSubject({
  //       ID: selectedRecord.ID,
  //       status: statusStates,
  //       name: name,
  //     });
  //     setIsModalVisible(false);

  //     // Lấy thông báo từ testMsg
  //     const { errCode, errMsg } = testMsg;
  //     console.log(
  //       "QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ",
  //       errCode,
  //       errMsg
  //     );

  //     // Hiển thị thông báo
  //     const handleNotification = (code, msg) => {
  //       if (code === 200) {
  //         messageApi.success({
  //           content: msg,
  //         });
  //       } else {
  //         messageApi.error({
  //           content: msg,
  //         });
  //       }
  //     };
  //     handleNotification(errCode, errMsg);
  //   } catch (error) {
  //     console.error('Error updating subject:', error);
  //     // Xử lý lỗi khi cập nhật môn học
  //     messageApi.error({
  //       content: 'An error occurred while updating the subject.',
  //     });
  //   }
  // };
  // Xử lý khi nhấn nút OK trên modal chỉnh sửa
  const handleOk = async () => {
    try {
      await updateSubject({
        ID: selectedRecord.ID,
        status: statusStates,
        name: name,
      });
      setIsModalVisible(false);

      // Lấy thông báo từ testMsg
      let errCode = testMsg.errCode;
      let errMsg = testMsg.errMsg;
      console.log(
        "QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ",
        errCode,
        errMsg,
        testMsg
      );

      // Hiển thị thông báo
      const handleNotification = (code, msg) => {
        if (code === 200) {
          messageApi.success(msg); // Thay đổi ở đây
        } else {
          messageApi.error(msg); // Thay đổi ở đây
        }
      };
      handleNotification(errCode, errMsg);
    } catch (error) {
      console.error("Error updating subject:", error);
      // Xử lý lỗi khi cập nhật môn học
      messageApi.error({
        content: "An error occurred while updating the subject.",
      });
    }
  };

  // Xử lý khi nhấn nút OK trên modal thêm
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

  // Xử lý khi nhấn nút Cancel
  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalVisibleAdd(false);
  };

  // Xử lý thay đổi trạng thái môn học
  const handleChange = (value) => {
    setStatusStates(value);
  };

  // Xử lý thay đổi tên môn học
  const handleChangeName = (value) => {
    setName(value);
  };

  // Xử lý thay đổi trạng thái khi thêm môn học
  const handleChangeAdd = (value) => {
    setStatusStatesAdd(value);
  };

  // Xử lý thay đổi tên môn học khi thêm môn học
  const handleChangeNameAdd = (value) => {
    setNameAdd(value);
  };

  // Lấy danh sách môn học khi component được render hoặc khi modal hiển thị/ẩn hoặc khi có sự thay đổi từ tạo hoặc cập nhật môn học
  useEffect(() => {
    // Chỉ gọi hàm getAllSubjects khi render lần đầu hoặc có sự thay đổi từ tạo hoặc cập nhật môn học
    if (initialRender) {
      getAllSubjects();
      setInitialRender(false); // Đánh dấu đã render lần đầu
    }
  }, [createSubject, getAllSubjects, initialRender, updateSubject]);

  // Cấu hình cột cho Table
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

  // Cấu hình cột cho Table khi người dùng là nhân viên
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
          <Button type="primary" className="tag-primary" disabled>
            Edit
          </Button>
        </>
      ),
    },
  ];

  // Chuyển đổi dữ liệu thành mảng và sắp xếp lại theo thứ tự
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
      {contextHolder}
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={true}
              className="criclebox tablespace mb-24"
              title="INFORMATION SUBJECTS"
              extra={
                <>
                  <Button
                    type="primary"
                    className="tag-primary"
                    onClick={(record) => showModalAdd(record)}
                    style={{ align: "right" }}
                  >
                    Add Subject
                  </Button>
                  <Button
                    onClick={() => {
                      openNotificationWithIcon("success", "bottomRight");
                    }}
                  >
                    Success
                  </Button>
                  <Button
                    onClick={() => {
                      openNotificationWithIcon("info", "bottomRight");
                    }}
                  >
                    Info
                  </Button>
                  <Button
                    onClick={() => {
                      openNotificationWithIcon("warning", "bottomRight");
                    }}
                  >
                    Warning
                  </Button>
                  <Button
                    onClick={() => {
                      openNotificationWithIcon("error", "bottomRight");
                    }}
                  >
                    Error
                  </Button>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={
                    currentUserInfo.role === "employee"
                      ? columnsEmployee
                      : columns
                  }
                  dataSource={dataArray}
                  pagination={false}
                  className="ant-border-space"
                  loading={isLoading}
                  bordered
                  scroll={{ y: 420 }}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Modal chỉnh sửa */}
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
                    style={{ width: "100%" }}
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
                <Title level={5}>Subject</Title>
                <Input
                  rules={[
                    {
                      required: true,
                      message: "Please input name!",
                    },
                  ]}
                  onChange={(event) => {
                    handleChangeNameAdd(event.target.value);
                  }}
                />
              </div>
            </Col>
            <Col span={12}>
              <div className="author-info">
                <Title level={5}>Status</Title>
                <Select
                  style={{ width: "100%" }}
                  onChange={(value) => {
                    handleChangeAdd(value);
                  }}
                  rules={[{ required: true, message: "Please input status!" }]}
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

export default observer(Subjects);
