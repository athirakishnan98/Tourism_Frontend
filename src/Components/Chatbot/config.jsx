// Config starter code
import { createChatBotMessage } from "react-chatbot-kit";
// import TourPackage from "./TourPackages";

const config = { 
    botName: "TourBot",
    initialMessages: [createChatBotMessage("Hi, I'm here to help. Do you want to know about different packages?")],
    customStyles: {
      botMessageBox: {
        backgroundColor: "#376B7E",
      },
      chatButton: {
        backgroundColor: "#376B7E",
      },
    },
    state:{Packages:["Varkkala","Munnar","Vagamon","Kozhikode"]}
  }

export default config;
