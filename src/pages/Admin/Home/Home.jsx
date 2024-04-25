import React, { useState } from "react";
import { getId } from "../../../utils";
import "./Home.css";
import { useEffect } from "react";
import axios from "../../../utils/axios";
import { useNavigate } from "react-router-dom";
import { Table } from "antd";
import FormItem from "../../../Components/FormItem/FormItem";
import { Flex, Rate, Upload } from "antd";
import "./Home.css";
import { Button, Modal } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const navigate = useNavigate();
  const [rate, setRate] = useState(0);
  const [editId, setEditId] = useState("");
  const [editPackage, setEditPackage] = useState({});
  const [addPackage, setAddPackage] = useState({
    spe_location: "",
    location: "",
    description: "",
    rating: "",
    image: "",
    amount: "",
    no_of_days: "",
  });
  const [packages, setPackages] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onAddPackage = async (e) => {
    if (addPackage) {
      await axios.post("/package/add", packages);
      toast("Added New Package!");
    } else {
      toast("something went wrong!");
    }
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setAddPackage({ ...addPackage, [name]: value });
  };
  const onFileUpload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    const response = await axios.post("/image", formData);
    setAddPackage({ ...addPackage, image: response.data.url });
  };

  const rateChange = async (e) => {
    setRate(e);
    setAddPackage({ ...addPackage, rating: e });
  };
  const showModal = () => {
    setEditId("");
    setAddPackage({});
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (editId) {
      if (addPackage) {
        await axios
          .post(`/package/${editId}`, addPackage)
          .then(() => {
            toast("Updated Successfully!");
          })
          .catch((error) => {
            toast("something went wrong!");
          });
      } else {
        toast("something went wrong!");
      }
    } else {
      if (addPackage) {
        await axios.post("/package/add", addPackage);
        toast("Added New Package!");
      } else {
        toast("something went wrong!");
      }
    }
    setIsModalOpen(false);
    getAllPackages();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getAllPackages = async () => {
    const response = await axios.get(`package/fetch`);
    setPackages(response.data);
  };

  const getAllFeedbacks = async () => {
    const response = await axios.get(`feedback/fetch`);
    setFeedbacks(response.data);
  };

  const onFeedbackDelete = async (id) => {
    const response = await axios.delete(`feedback/${id}`);
    if (response.data.message == "Deleted") getAllFeedbacks();
  };

  const getAllBookings = async () => {
    const response = await axios.get(`booking/fetch`);
    setBookings(response.data);
  };

  const onDelete = async (id) => {
    await axios.delete(`booking/${id}`);
    getAllBookings();
  };

  const onPackageDelete = async (id) => {
    await axios.delete(`package/${id}`);
    getAllPackages();
  };

  const onPackageEdit = async (id) => {
    const res = await axios.get(`/package/${id}`);
    setEditPackage(res.data);
    setEditId(id);
    console.log(editId);
    showModal();
  };

  useEffect(() => {
    getAllPackages();
    getAllFeedbacks();
    getAllBookings();
  }, []);

  const column_feedback = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Package",
      dataIndex: "package",
      key: "package",
    },
    {
      title: "Feedback",
      dataIndex: "feedback",
      key: "feedback",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div size="middle">
          <a
            onClick={() => {
              onFeedbackDelete(record._id);
            }}
          >
            Delete
          </a>
        </div>
      ),
    },
  ];
  const column_package = [
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Specific Location",
      dataIndex: "spe_location",
      key: "spe_location",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Rs.",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "No:of Days",
      dataIndex: "no_of_days",
      key: "no_of_days",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (t) => <img style={{ width: "50px" }} src={`${t}`} />,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div size="middle">
          <div>
            <a
              onClick={() => {
                onPackageDelete(record._id);
              }}
            >
              Delete
            </a>
          </div>
          {/* <div>
            <a
              onClick={() => {
                onPackageEdit(record._id);
              }}
            >
              Edit
            </a>
          </div> */}
        </div>
      ),
    },
  ];
  const columns = [
    {
      title: "User ID",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Package ID",
      dataIndex: "package",
      key: "package",
    },
    {
      title: " User Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Tour Date",
      dataIndex: "date_time",
      key: "date_time",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div size="middle">
          <a
            onClick={() => {
              onDelete(record._id);
            }}
          >
            Delete
          </a>
        </div>
      ),
    },
  ];

  return (
    <div className="admin-dashboard">
      <div className="details">
        <h3>Booking Details</h3>
        <Table dataSource={bookings} columns={columns} />
      </div>
      <div className="details">
        <div className="packageDiv">
          <h3>Package Details</h3>
          <Button type="primary" onClick={showModal}>
            Add New
          </Button>
        </div>
        <Modal
          title="Add Package"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="package-form">
            <FormItem name="location" label="Location" onChange={onChange} />
            <FormItem
              name="spe_location"
              label="Specific Location"
              onChange={onChange}
            />
            <FormItem
              type="file"
              name="image"
              label="Image"
              onChange={onFileUpload}
            />
            <FormItem
              name="description"
              label="Description"
              onChange={onChange}
            />
            <FormItem name="amount" label="Amount" onChange={onChange} />
            <FormItem
              name="no_of_days"
              label="No of Days"
              onChange={onChange}
            />
            <div className="Rating">
              <label htmlFor="">Rating</label>
              <Flex gap="middle" vertical>
                <Rate onChange={rateChange} value={rate} />
              </Flex>
            </div>
          </div>
        </Modal>
        <Table dataSource={packages} columns={column_package} />
        <input type="hidden" name="" id={editId} />
      </div>

      <div className="details">
        <h3>Feedback Details</h3>
        <Table dataSource={feedbacks} columns={column_feedback} />
      </div>
    </div>
  );
}

export default Home;
