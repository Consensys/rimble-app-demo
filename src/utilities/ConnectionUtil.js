import React from "react";

import ConnectionModal from "./components/ConnectionModal";
import ConnectionPendingModal from "./components/ConnectionPendingModal";
import UserRejectedConnectionModal from "./components/UserRejectedConnectionModal";

import ValidationPendingModal from "./components/ValidationPendingModal";
import UserRejectedValidationModal from "./components/UserRejectedValidationModal";

class ConnectionUtil extends React.Component {
  state = {
    
  }

  componentWillReceiveProps() {
    this.setState({

    });
  }
  render() {
    return (
      <div>
        <ConnectionModal 
          closeConnectionModal={this.props.modals.methods.closeConnectionModal} 
          validateAccount={this.props.validateAccount} 
          isOpen={this.props.modals.data.connectionModalIsOpen && !this.props.accountValidated} 
          currentNetwork={this.props.network.current}
        />
        <ConnectionPendingModal 
          closeConnectionPendingModal={this.props.modals.methods.closeConnectionPendingModal} 
          isOpen={ this.props.modals.data.accountConnectionPending } 
          currentNetwork={this.props.network.current} 
        />
        <UserRejectedConnectionModal 
          closeUserRejectedConnectionModal={this.props.modals.methods.closeUserRejectedConnectionModal} 
          isOpen={this.props.modals.data.userRejectedConnect} 
          connectAccount={this.props.initAccount} 
          openConnectionPendingModal={this.props.modals.methods.openConnectionPendingModal} 
        />
        
        <ValidationPendingModal 
          closeValidationPendingModal={this.props.modals.methods.closeValidationPendingModal} 
          isOpen={this.props.modals.data.accountValidationPending} 
          currentNetwork={this.props.network.current} 
        />
        <UserRejectedValidationModal 
          closeUserRejectedValidationModal={this.props.modals.methods.closeUserRejectedValidationModal} 
          isOpen={ this.props.modals.data.userRejectedValidation } 
          validateAccount={this.props.validateAccount} 
        />
      </div>
    );
  }
}

export default ConnectionUtil;
