import React from "react";

import ConnectionModal from "./components/ConnectionModal";
import ConnectionPendingModal from "./components/ConnectionPendingModal";
import UserRejectedValidationModal from "./components/UserRejectedValidationModal";

class ConnectionUtil extends React.Component {
  state = {
    connectionModalIsOpen: false,
    accountValidationPending: this.props.accountValidationPending,
    userRejectedValidation: this.props.userRejectedValidation,
  }
  
  closeConnectionModal = (e) => {
    e.preventDefault()
    this.setState((state, props) => ({
      connectionModalIsOpen: false
    }))
  }

  openConnectionModal = (e) => {
    e.preventDefault()
    this.setState((state, props) => ({
      connectionModalIsOpen: true
    }))
  }

  closeConnectionPendingModal = (e) => {
    e.preventDefault()
    this.setState((state, props) => ({
      accountValidationPending: false
    }))
  }

  openConnectionPendingModal = (e) => {
    e.preventDefault()
    this.setState((state, props) => ({
      accountValidationPending: true
    }))
  }


  render() {
    return (
      <div>
        <ConnectionModal closeConnectionModal={this.closeConnectionModal} validateAccount={this.props.validateAccount} isOpen={this.state.connectionModalIsOpen && !this.props.accountValidated} currentNetwork={this.props.currentNetwork} />
        <ConnectionPendingModal closeConnectionPendingModal={this.closeConnectionPendingModal} isOpen={ this.state.accountValidationPending } currentNetwork={this.props.currentNetwork} />
        <UserRejectedValidationModal></UserRejectedValidationModal>
      </div>
    );
  }
}

export default ConnectionUtil;
