import React from "react";
import { Box, Flex, Button, Heading } from "rimble-ui";
import NetworkIndicator from "@rimble/network-indicator";

class Header extends React.Component {
  render() {
    return (
      <Box>
        <Flex
          alignItems={"center"}
          justifyContent={["space-between", "flex-end"]}
          bg={"white"}
          px={3}
          py={2}
        >
          <Box mr={4}>
            <NetworkIndicator
              currentNetwork={this.props.network.current.id}
              requiredNetwork={this.props.network.required.id}
            />
          </Box>


        </Flex>
        <Box bg="primary" p={3} justifyContent="center" flexDirection="column">
          <Box maxWidth="400px" mx="auto">
            <Heading.h2 color={"white"}>Rimble App Demo</Heading.h2>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Header;
