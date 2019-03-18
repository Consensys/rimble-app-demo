import React from "react";
import { Box, Flex, Button, Heading } from "rimble-ui";


class Header extends React.Component {
  render() {
    return (
      <Box>
        <Flex justifyContent="flex-end" bg={"white"}>
          <Button
            m={3}
            onClick={this.props.validateAccount}
            size="small"
            backgroundColor={"white"}
          >
            Connect
          </Button>
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
