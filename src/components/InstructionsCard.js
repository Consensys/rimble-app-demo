import React from "react";
import { Box, Heading, Text, Link, Flex, Button } from "rimble-ui";

class InstructionsCard extends React.Component {
  render() {
    return (
      <Flex justifyContent={"center"}>
        <Box maxWidth={"400px"} mt={4} mx={3}>
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
            px={3}
            alignItems={"center"}
            justifyContent={["center", "space-between"]}
            flexWrap={"wrap"}
          >
            <Link
              href="https://github.com/ConsenSys/rimble-app-demo"
              target="_blank"
              title="Source code for the Rimble App Demo"
              mb={[3, "initial"]}
            >
              View Code GitHub
            </Link>

            {this.props.route === "default" ? (
              <Button.Outline
                size="small"
                onClick={() => this.props.showRoute("onboarding")}
                width={[1, "auto"]}
              >
                Onboarding Debugger
              </Button.Outline>
            ) : (
              <Button.Outline
                size="small"
                onClick={() => this.props.showRoute("default")}
                width={[1, "auto"]}
              >
                Default View
              </Button.Outline>
            )}
          </Flex>
        </Box>
      </Flex>
    );
  }
}

export default InstructionsCard;
