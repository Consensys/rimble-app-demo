import React from "react";

import WrongNetworkBanner from "./components/WrongNetworkBanner";

class NetworkUtil extends React.Component {
  componentWillReceiveProps() {
    this.setState({
      
    });
  }
  render() {
    return (
      <div>
        { !this.props.network.isCorrectNetwork && this.props.web3
          ?
            <WrongNetworkBanner 
              requiredNetwork={this.props.network.required} 
              currentNetwork={this.props.network.current} />
          :
            null
        }
      </div>
    );
  }
}

export default NetworkUtil;
