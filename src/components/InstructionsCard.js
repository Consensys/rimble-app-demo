import React from "react";
import { Box, Heading, Text, Link, Flex, Button } from "rimble-ui";

class InstructionsCard extends React.Component {
  render() {
    return (
      <Box width={"400px"} mx="auto" mt={4}>
        <Heading.h3>Instructions:</Heading.h3>
        <ol>
          <li>
            <Text p={1}>Make sure MetaMask is working in your browser</Text>
          </li>
          <li>
            <Text p={1}>Set the network to Rinkeby Test Network</Text>
          </li>
          <li>
            <Text p={1}>You'll need a little bit of ETH for gas fees</Text>
          </li>
        </ol>
        <Flex
          borderTop={1}
          borderColor={"#ccc"}
          py={4}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Link
            href="https://github.com/ConsenSys/rimble-app-demo"
            target="_blank"
          >
            View Code GitHub
          </Link>

          {this.props.route === "default" ? (
            <Button.Outline
              size="small"
              onClick={() => this.props.showRoute("onboarding")}
            >
              Onboarding Debugger
            </Button.Outline>
          ) : (
            <Button.Outline
              size="small"
              onClick={() => this.props.showRoute("default")}
            >
              Default View
            </Button.Outline>
          )}
        </Flex>
      </Box>
    );
  }
}

export default InstructionsCard;
