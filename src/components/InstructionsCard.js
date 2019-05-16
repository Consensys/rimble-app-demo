import React from "react";
import { Box, Heading, Text, Link, Flex, Button, Icon } from "rimble-ui";

class InstructionsCard extends React.Component {
  render() {
    return (
      <Box width={"400px"} mx="auto" my={4}>
      <Flex>
      <Box>
        <Icon name="Info" color="primary" mx={3} my={3}/>
      </Box>
      <Box>
        <Heading.h4>You're going to need Rinkeby ETH</Heading.h4>
        <Text mb={4}>
          If you don't have any Rinkeby ETH, request some funds. You'll need a Facebook or Twitter account to request funds.{" "}
              <Link
                href="https://faucet.rinkeby.io/"
                target="_blank"
                title="Head to the Rinkeby faucet">
                  Get Rinkeby ETH
              </Link>
        </Text>
        </Box>
        </Flex>


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
