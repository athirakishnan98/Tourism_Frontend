import React, { useState } from "react";
import "./UserHome.css";
import { useEffect } from "react";
import axios from "../../../utils/axios";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "../../../Components/Chatbot/config";
import ActionProvider from "../../../Components/Chatbot/ActionProvider";
import MessageParser from "../../../Components/Chatbot/MessageParser";
import Button from "../../../Components/Button/Button";

function HomeUser() {
  const [department, setDepartment] = useState([]);
  const [chat, setChat] = useState(false);
  const explorePlaces = async () => {
    const response = await axios.get(`/places/fetch`);
    setDepartment(response.data);
  };
  const chatDisplay = () => {
    setChat(true);
    console.log(chat);
  };
    
  let c = <Button />
  c = (!chat) ? (
    <Button className="open-button" children="Chat" onClick={()=>{chatDisplay()}}/>
  ) : (
    <Chatbot
      className="form-popup"
      config={config}
      messageParser={MessageParser}
      actionProvider={ActionProvider}
    />
  );
  useEffect(() => {
    explorePlaces();
  }, []);

  return (
    <div className="container">
      {c}
      <div className="desription">
        Kerala has an endless list of tourist destinations that will interest
        any traveller. Renowned for its scenic locations and natural beauty,
        Kerala is sure to enchant any nature lover with its hills, backwaters,
        beaches, waterfalls and wildlife. The state also has a rich heritage and
        thriving culture one can explore by visiting the various forts, palaces,
        museums, monuments and pilgrim centers. Both natural and manmade
        brilliance await you at every turn.Kerala has an endless list of tourist
        destinations that will interest any traveller. Renowned for its scenic
        locations and natural beauty, Kerala is sure to enchant any nature lover
        with its hills, backwaters, beaches, waterfalls and wildlife. The state
        also has a rich heritage and thriving culture one can explore by
        visiting the various forts, palaces, museums, monuments and pilgrim
        centers. Both natural and manmade brilliance await you at every turn.
      </div>
      <div className="departmentDiv">
        
        {department.map((item) => {
          console.log(item);
          return (
            <>
              <div className="appDiv">
                <h3>{item.name}</h3>
                <img src={item.image} alt="" />
              </div>
            </>
          );
        })}
      </div>
      <div className="contact" id="contact">
        <div>
          Travel Tribe, Kerala, Park View, Thiruvananthapuram, Kerala, India -
          695 033
        </div>
        <div>
          Phone: +91 471 826363, Fax: +91 471 34334124, E-mail:
          traveltribe@gmail.com
        </div>
        <div>
          All rights reserved © Travel Tribe Kerala 2024. Copyright | Terms of
          Use | Cookie Policy | Contact Us. Developed & Maintained by MyIdeas.
        </div>
      </div>
    </div>
  );
}

export default HomeUser;
