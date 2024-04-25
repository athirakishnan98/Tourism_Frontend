class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    console.log(message);
    const lowercase = message.toLowerCase();
    console.log(this.state);
    if(lowercase.includes('yes')){
        this.actionProvider.tourHandler();
    }else if(lowercase.includes('varkala')){
        this.actionProvider.tvmHandler();
    }else if(lowercase.includes('munnar')){
        this.actionProvider.munnarHandler();
    }else if(lowercase.includes('kozhikode')){
        this.actionProvider.kozhikodeHandler();
    }else if(lowercase.includes('vagamon')){
        this.actionProvider.vagamonHandler();
    }
  }
}

export default MessageParser;
