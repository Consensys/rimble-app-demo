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
        { this.props.network.isCorrectNetwork === false && this.props.web3
          ?
            <WrongNetworkBanner 
              network={this.props.network}
            />
          :
            null
        }
      </div>
    );
  }
}

export default NetworkUtil;
