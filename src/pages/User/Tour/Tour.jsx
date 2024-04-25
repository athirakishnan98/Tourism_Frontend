import React from "react";
import "./Tour.css";
import { useState, useEffect } from "react";
import axios from "../../../utils/axios";
import { Flex, Rate } from "antd";
import Button from "../../../Components/Button/Button";
import { useNavigate } from "react-router-dom";


function Tour() {
  const navigate = useNavigate();
  const onBook = async (id) => {
    navigate(`/details/${id}`);
  };
  const [packages, setPackages] = useState([]);
  const explorePlaces = async () => {
    const response = await axios.get(`/package/fetch`);
    setPackages(response.data);
  };

  useEffect(() => {
    explorePlaces();
  }, []);
  return (
    <div className="container">
      <div className="desription">
        Kerala has an endless list of tourist destinations that will interest
        any traveller. Renowned for its scenic locations and natural beauty,
        Kerala is sure to enchant any nature lover with its hills, backwaters,
        beaches, waterfalls and wildlife.
      </div>
      <div className="departmentDiv">
        {packages.map((item) => {
          return (
            <>
              <div className="container" key={item._id}>
                <div className="cardPackage">
                  <img src={item.image} alt="" className="imgpduct" />
                  <div className="packageInfo">
                    <div className="location">
                      <b>{item.location}</b>
                    </div>
                    <div className="speLocation">
                      <p>{item.spe_location}</p>
                      <Button
                        onClick={() => {
                          onBook(item._id);
                        }}
                        className="btn-book"
                      >
                        Book
                      </Button>
                    </div>
                    <div className="sub-details">
                      <p className="price">Rs. {item.amount}</p>
                      <div className="rateCate">
                        <Flex gap="middle" vertical>
                          <Rate value={item.rating} disabled />
                        </Flex>
                        <b>{item.no_of_days} Days</b>
                      </div>
                    </div>

                    <p className="description">{item.description}</p>

                    {/* <div className="editDelete">
                      <i
                        className="fa-regular fa-pen-to-square"
                        onClick={() => {editItem(item._id)}}
                        title="Edit"
                      ></i>
                      <i
                        className="fa-solid fa-trash"
                        onClick={()=>{deleteItem(item._id)}}
                        title="Delete"
                      ></i>
                    </div> */}
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Tour;
