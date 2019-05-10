import React from "react";
import { Box, Flex, Button, Heading } from "rimble-ui";
import NetworkIndicator from "@rimble/network-indicator";
import AccountOverview from "../utilities/components/AccountOverview";

class Header extends React.Component {
  render() {
    return (
      <Box>
        <Flex alignItems={"center"} justifyContent="flex-end" bg={"white"}>
          <Box mr={4}>
            <NetworkIndicator
              currentNetwork={this.props.network.current.id}
              requiredNetwork={this.props.network.required.id}
            />
          </Box>

          {this.props.account && this.props.accountValidated ? (
            <AccountOverview
              account={this.props.account}
              accountBalanceLow={this.props.accountBalanceLow}
              accountBalance={this.props.accountBalance}
            />
          ) : (
            <Button
              m={3}
              onClick={() =>
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
              size="small"
            >
              Connect
            </Button>
          )}
        </Flex>
        <Box bg="primary" p={3} justifyContent="center" flexDirection="column">
          <Box width="400px" mx="auto">
            <Heading.h2 color={"white"}>Rimble App Demo</Heading.h2>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Header;
