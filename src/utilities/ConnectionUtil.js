import React from "react";

import ConnectionModal from "./components/ConnectionModal";
import ConnectionPendingModal from "./components/ConnectionPendingModal";
import UserRejectedValidationModal from "./components/UserRejectedValidationModal";

class ConnectionUtil extends React.Component {
  state = {
    
  }

  componentWillReceiveProps() {
    console.log("this.props.modals", this.props.modals)
    this.setState({
      closeConnectionModal: this.props.modals.methods.closeConnectionModal,
      closeConnectionPendingModal: this.props.modals.methods.closeConnectionPendingModal,
    });
  }
  render() {
    return (
      <div>
        <ConnectionModal 
          closeConnectionModal={this.state.closeConnectionModal} 
          validateAccount={this.props.validateAccount} 
          isOpen={this.props.modals.data.connectionModalIsOpen && !this.props.accountValidated} 
          currentNetwork={this.props.currentNetwork}
        />
        <ConnectionPendingModal 
          closeConnectionPendingModal={this.state.closeConnectionPendingModal} 
          isOpen={ this.props.accountValidationPending } 
          currentNetwork={this.props.currentNetwork} 
        />
        <UserRejectedValidationModal></UserRejectedValidationModal>
      </div>
    );
  }
}

export default ConnectionUtil;
