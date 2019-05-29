import React from "react";
import { Box, Flex, Button, Heading } from "rimble-ui";
import NetworkIndicator from "@rimble/network-indicator";

class Header extends React.Component {
  render() {
    return (
      <Box bg="primary" p={3} justifyContent="center" flexDirection="column">
        <Box maxWidth="400px" mx="auto">
          <Heading fontSize={4} color={"white"}>Rimble App Demo</Heading>
        </Box>
      </Box>
    );
  }
}

export default Header;
