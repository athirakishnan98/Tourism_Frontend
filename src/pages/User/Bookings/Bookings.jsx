import React from "react";
import "./Booking.css";
import { useState, useEffect } from "react";
import axios from "../../../utils/axios";
import { useParams } from "react-router-dom";
import html2pdf from "html2pdf.js";

function Bookings() {
  const { id } = useParams();
  const [bookings, setBooking] = useState([]);
  const pdfDownload = async (id) => {
    var opt = {
      margin: 1,
      filename: "bookingreport.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    const response = await axios.get(`/booking/pdf/${id}`);
    html2pdf().from(response.data).set(opt).save();
  };
  const bookDetails = async () => {
    const response = await axios.get(`/booking/fetch/${id}`);
    setBooking(response.data);
  };
  useEffect(() => {
    bookDetails();
  }, []);
  return (
    <div className="book-container">
      {bookings.map((b) => {
        return (
          <div className="card-book">
            <b>{b.package.location}</b>
            <p>{b.package.spe_location}</p>
            <p>Booked Date: {b.package.createdAt}</p>
            <b
              style={{ cursor: "pointer" }}
              onClick={() => {
                pdfDownload(b._id);
              }}
            >
              <u>PDF Download</u>
            </b>
          </div>
        );
      })}
    </div>
  );
}

export default Bookings;
