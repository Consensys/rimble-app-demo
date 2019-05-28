import React, { Component } from 'react';
import { Box, Card, Text, Button } from 'rimble-ui';

import AccountOverview from "../utilities/components/AccountOverview";


class WalletBlock extends Component {

  handleConnectAccount = () => {
    this.props.connectAndValidateAccount(result => {
      if (result === "success") {
        // success
        console.log("Callback SUCCESS");
      } else if (result === "error") {
        // error
        console.log("Callback ERROR");
      }
    })
  }

  renderContent = () => {
    if (this.props.account && this.props.accountValidated) {
      return (
        <AccountOverview
          account={this.props.account}
          accountBalanceLow={this.props.accountBalanceLow}
          accountBalance={this.props.accountBalance}
        />
      )
    } else {
      return (
        <Box>
          <Text mb={3}>
            You are not connected…
          </Text>
          <Button onClick={this.handleConnectAccount} width={1}>
            Connect your wallet
          </Button>
        </Box>
      )
    }
  }

  render() {
    return (
      <Card maxWidth={'640px'} mx={'auto'}>
        {this.renderContent()}
      </Card>
    );
  }

}

export default WalletBlock;
