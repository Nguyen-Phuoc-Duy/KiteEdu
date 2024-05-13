import { useState, useEffect } from "react";
import { Card, Col, Row, Typography, Select, Table, Tag } from "antd";
import ReactApexChart from "react-apexcharts";
import Echart from "../components/chart/EChart";
import LineChart from "../components/chart/LineChart";
import { Link, useHistory } from "react-router-dom";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
function Home() {
  const { Title, Paragraph } = Typography;
  const history = useHistory();
  const { Option } = Select;
  const { accountStore } = useStore();
  const [classTK, setClassTK] = useState(null);
  const {
    AllPupilByClass,
    getAllPupilByClass,
    currentUserInfo,
    isLoading,
    getClassByUser,
    ClassByUser,
  } = accountStore;
  const dataArray = Array.from(AllPupilByClass);
  const newArray = dataArray.filter(
    (item) => item.status === "absent" || item.status === "excused"
  );
  // var firstItem = dataArray[0]
  const dataArray1 = Array.from(ClassByUser);
  let countClassByUser = dataArray1.length;
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo || userInfo.trim() === "") {
      history.push("/sign-in");
    }

    // setClassTK(firstItem)
    getAllPupilByClass({ ID: classTK });
    getClassByUser({
      ID: currentUserInfo.id,
      role: currentUserInfo.role,
    });
  }, [history, getAllPupilByClass, getClassByUser]);
  console.log("AllPupilByClass", AllPupilByClass, dataArray1);
  useEffect(() => {
    if (classTK !== null) {
      console.log("ID: classTK", classTK);
      getAllPupilByClass({ ID: classTK });
    }
  }, [classTK, getAllPupilByClass]);
  const handleChange1 = (value) => {
    setClassTK(value);
  };
  const columns = [
    {
      title: "NAME",
      dataIndex: "pupilName",
      key: "name",
      width: "30%",
      render: (name) => (
        <>
          <div className="avatar-info">
            <Title level={5}>{name}</Title>
          </div>
        </>
      ),
    },
    {
      title: "CLASS",
      dataIndex: "className",
      key: "classId",
      width: "20%",
      render: (classId) => (
        <>
          <div className="avatar-info">
            <a>{classId}</a>
          </div>
        </>
      ),
    },
    {
      title: "LESSON",
      dataIndex: "lessonName",
      key: "lessonName",
      width: "20%",
      render: (lessonName) => (
        <>
          <div className="avatar-info">
            <p>{lessonName}</p>
          </div>
        </>
      ),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      width: "15%",
      render: (status) => (
        <>
          {status === "present" ? (
            <Tag color="green">{status}</Tag>
          ) : status === "absent" ? (
            <Tag color="red">{status}</Tag>
          ) : status === "excused" ? (
            <Tag color="blue">{status}</Tag>
          ) : status === "tardy" ? (
            <Tag color="orange">{status}</Tag>
          ) : (
            ""
          )}
        </>
      ),
    },
  ];

  let countFinished = 0;
  let countCanceled = 0;
  let countStarted = 0;

  dataArray1.forEach((item) => {
    if (item.status === "finished") {
      countFinished++;
    } else if (item.status === "canceled") {
      countCanceled++;
    } else if (item.status === "started") {
      countStarted++;
    }
  });
  let valueSeries = [countStarted, countFinished, countCanceled];
  var options = {
    series: valueSeries,
    chart: {
      width: 380,
      type: "pie",
    },
    labels: ["started", "finished", "canceled"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const dollor = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z"
        fill="#fff"
      ></path>
      <path
        d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z"
        fill="#fff"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  const profile = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z"
        fill="#fff"
      ></path>
      <path
        d="M17 6C17 7.65685 15.6569 9 14 9C12.3431 9 11 7.65685 11 6C11 4.34315 12.3431 3 14 3C15.6569 3 17 4.34315 17 6Z"
        fill="#fff"
      ></path>
      <path
        d="M12.9291 17C12.9758 16.6734 13 16.3395 13 16C13 14.3648 12.4393 12.8606 11.4998 11.6691C12.2352 11.2435 13.0892 11 14 11C16.7614 11 19 13.2386 19 16V17H12.9291Z"
        fill="#fff"
      ></path>
      <path
        d="M6 11C8.76142 11 11 13.2386 11 16V17H1V16C1 13.2386 3.23858 11 6 11Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  const heart = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  const cart = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  const count = [
    {
      today: "Today’s Sales",
      title: "$53,000",
      persent: "+30%",
      icon: dollor,
      bnb: "bnb2",
    },
    {
      today: "Today’s Users",
      title: "3,200",
      persent: "+20%",
      icon: profile,
      bnb: "bnb2",
    },
    {
      today: "New Clients",
      title: "+1,200",
      persent: "-20%",
      icon: heart,
      bnb: "redtext",
    },
    {
      today: "New Orders",
      title: "$13,200",
      persent: "10%",
      icon: cart,
      bnb: "bnb2",
    },
  ];

  const items = [
    {
      Title: countClassByUser,
      user: "Your Classes",
    },
    {
      Title: "2m",
      user: "Your Lesson",
    },
    {
      Title: "$772",
      user: "Your Pupils",
    },

    // {
    //   Title: "82",
    //   user: "Items",
    // },
  ];

  return (
    <>
      <div className="layout-content">
        {/* <Row className="rowgap-vbox" gutter={[24, 0]}>
          {count.map((c, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
              className="mb-24"
            >
              <Card bordered={false} className="criclebox ">
                <div className="number">
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={18}>
                      <span>{c.today}</span>
                      <Title level={3}>
                        {c.title} <small className={c.bnb}>{c.persent}</small>
                      </Title>
                    </Col>
                    <Col xs={6}>
                      <div className="icon-box">{c.icon}</div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row> */}
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={9} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              {/* <Echart/> */}
              <div>
                <div id="chart">
                  <Title level={4}>
                    <span className="bnb2">{currentUserInfo?.username}'s</span>{" "}
                    chart class list
                  </Title>
                  <ReactApexChart
                    options={options}
                    series={options.series}
                    type="pie"
                    width={380}
                  />
                </div>
                <div id="html-dist"></div>
              </div>
              <div className="chart-vistior">
                <Title level={5}>Percentage breakdown of class statuses</Title>
                <Paragraph className="lastweek">
                  The count of currently active classes:{" "}
                  <span className="bnb2">+{countStarted}</span>
                </Paragraph>
                <Paragraph className="lastweek">
                  {/* A well-crafted diagram can communicate ideas more effectively
                  than pages of text, providing instant clarity and
                  understanding. */}
                  Besides the percentage chart, I have extracted a list of
                  absentee students for each class session, it will be displayed
                  more clearly on the right side of the chart.
                </Paragraph>
                {/* <Row gutter>
                  {items.map((v, index) => (
                    <Col xs={8} xl={8} sm={8} md={8} key={index}>
                      <div className="chart-visitor-count">
                        <Title level={4}>{v.Title}</Title>
                        <span>{v.user}</span>
                      </div>
                    </Col>
                  ))}
                </Row> */}
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={15} className="mb-24">
            <Card
              bordered={true}
              className="criclebox h-full tablespace mb-24"
              title="Absentee student list"
              extra={
                <>
                  <div className="author-info">
                    <span style={{ fontSize: "1.5em" }}>Class: </span>
                    {/* <h5>Class: </h5> */}
                    <Select
                      // style={{ width: "100%" }}
                      onChange={(value) => {
                        handleChange1(value);
                      }}
                      value={classTK}
                      placeholder={"Choose class"}
                    >
                      {dataArray1.map((item) => (
                        <Option key={item.ID} value={item.ID}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={
                    // location.state == null ? newArrayLessonAll : newArrayLesson
                    newArray
                  }
                  pagination={{ pageSize: 4, position: ["bottomCenter"] }}
                  className="ant-border-space"
                  loading={isLoading}
                  bordered
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default observer(Home);
