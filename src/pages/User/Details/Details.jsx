import React from "react";
import "./Details.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../../utils/axios";
import { Flex, Rate, Upload } from "antd";

import Button from "../../../Components/Button/Button";
import FormItem from "../../../Components/FormItem/FormItem";
import { DatePicker, Space } from "antd";
import { getId } from "../../../utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ReqiredError from "../../../Components/Error/ReqiredError";

function Details() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(true);
  const [feedbackstatus, setFeedbackStatus] = useState(true);
  const { id } = useParams();
  const [rate, setRate] = useState(0);
  const [place, setPlace] = useState([]);
  const [feedback, setFeedback] = useState({
    package: id,
    user: getId(),
    rating: "",
    feedback: "",
  });
  const [fb, setfb] = useState([]);
  const [booking, setBooking] = useState({
    date_time: "",
    name: "",
    email: "",
    phone: "",
    user: getId(),
    package: id,
    booked: true,
  });

  //get rate change value
  const rateChange = async (e) => {
    console.log(e);
    setRate(e);
    setFeedback({ ...feedback, rating: e });
  };
  const feedbackChange = (e) => {
    setFeedbackStatus(true);
    console.log(e.target.value);
    setFeedback({ ...feedback, feedback: e.target.value });
  };

  const onChange = (e) => {
    setStatus(true);
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
    console.log(booking);
  };

  const ondateChange = (date, dateString) => {
    console.log(date, dateString);
    setBooking({ ...booking, date_time: dateString });
    console.log(booking);
  };
  const onFeedBack = async () => {
    console.log(feedback);
    if (feedback.rating && feedback.feedback) {
      await axios
        .post("/feedback/add", feedback)
        .then((response) => {
          setFeedbackStatus(true);
          toast("Feedback submitted!");
          feedbackFetch();
          setFeedback({
            package: id,
            user: getId(),
            rating: "",
            feedback: "",
          });
        })
        .catch((error) => {
          setFeedbackStatus(false);
        });
    } else {
      setFeedbackStatus(false);
    }
  };
  const goDetails = () => {
    navigate(`/bookings/${getId()}`);
  };
  const onBook = async () => {
    if (booking.name && booking.email && booking.phone && booking.date_time) {
      await axios
        .post("/booking/add", booking)
        .then((response) => {
          setStatus(true);
          toast("Booked!");
        })
        .catch((error) => {
          setStatus(false);
        });
    } else {
      setStatus(false);
    }
    setBooking({});
  };
  const placeDetails = async () => {
    const response = await axios.get(`/package/${id}`);
    setPlace(response.data);
  };
  const feedbackFetch = async () => {
    const response = await axios.get(`/feedback/${id}`);
    setfb(response.data);
  };
  useEffect(() => {
    placeDetails();
    feedbackFetch();
  }, []);
  return (
    <div>
      <ToastContainer />

      <div className="containerDetails">
        <div className="left">
          <img src={place.image} alt="" className="image" />
          <div className="sub-details">
            <p className="price">Rs. {place.amount}</p>
            <div className="rateCate">
              <Flex gap="middle" vertical>
                <Rate value={place.rating} disabled />
              </Flex>
              <div>{place.no_of_days} Days</div>
            </div>
          </div>
          <p>{place.description}</p>
          <div className="feedbacksection">
            <FormItem
              onChange={(e) => {
                feedbackChange(e);
              }}
              label="Feedback"
              element="textarea"
            />
            <div className="">
              <Flex gap="middle" vertical>
                <Rate onChange={rateChange} value={rate} />
              </Flex>
            </div>
            {!feedbackstatus ? <ReqiredError /> : ""}

            <Button
              onClick={() => {
                onFeedBack();
              }}
              className="btn-feedback"
            >
              Submit
            </Button>
          </div>

          <div className="review">
            {fb.map((item) => {
              return (
                <div className="section">
                  <h4>{item.user.name}</h4>
                  <div className="">
                    <Flex gap="middle" vertical>
                      <Rate value={item.rating} disabled />
                    </Flex>
                  </div>
                  <p>{item.feedback}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="right">
          <div className="formData">
            <h3>Book Now</h3>
            <FormItem name="name" label="Name" onChange={onChange} />
            <FormItem name="email" label="Email" onChange={onChange} />
            <FormItem name="phone" label="Phone" onChange={onChange} />
            <div className="datePicker">
              <label htmlFor="">Start Date</label>
              <DatePicker
                name="date"
                label="Start Date"
                onChange={ondateChange}
              />
            </div>
            {!status ? <ReqiredError /> : ""}
            <div className="book-btn">
              <Button
                onClick={() => {
                  onBook();
                }}
                className="btn-book"
              >
                Book
              </Button>
              <b
                className="booklink"
                onClick={() => {
                  goDetails();
                }}
              >
                <u>Bookings</u>
              </b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
