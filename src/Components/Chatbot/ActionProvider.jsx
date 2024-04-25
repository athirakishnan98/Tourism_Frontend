// ActionProvider starter code
class ActionProvider {
  constructor(
    createChatBotMessage,
    setStateFunc,
    createClientMessage,
    stateRef,
    createCustomMessage,
    ...rest
  ) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.stateRef = stateRef;
    this.createCustomMessage = createCustomMessage;
  }
  tourHandler = () => {
    const message = this.createChatBotMessage(
      "These are the best packages : Kozhikode, Munnar, Varkala, Vagamon"
    );
    this.setChatbotMessage(message);
  };
  tvmHandler = () => {
    const message = this.createChatBotMessage(
      "We are offering 3 days for exploring tvm at Rs.3500"
    );
    this.setChatbotMessage(message);
  };
  munnarHandler = () => {
    const message = this.createChatBotMessage(
      "Best chance to explore idukki for 3 days with cheapest rate 3000"
    );
    this.setChatbotMessage(message);
  };
  kozhikodeHandler = () => {
    const message = this.createChatBotMessage(
      "We are excited to offer 3 days to explore Kozhikode at Rs.3500"
    );
    this.setChatbotMessage(message);
  };
  vagamonHandler = () => {
    const message = this.createChatBotMessage(
      "You can enjoy the nature beauty of Vagamon at Rs.3000"
    );
    this.setChatbotMessage(message);
  };
  setChatbotMessage = (message) => {
    this.setState((state) => ({
      ...state,
      messages: [...state.messages, message],
    }));
  };
}

export default ActionProvider;
