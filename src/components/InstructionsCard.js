import React from "react";
import { Box, Heading, Text, Link, Flex, Button, Icon, Flash } from "rimble-ui";

class InstructionsCard extends React.Component {
  render() {
    return (
      <Flex justifyContent={"center"}>
        <Box maxWidth={"400px"} mt={4} mx={3}>
          <Flex>
            <Box>
              <Icon name="Info" color="primary" mx={3} my={3} />
            </Box>
            <Box>
              <Heading.h4>You're going to need Rinkeby ETH</Heading.h4>
              <Text mb={4}>
                If you don't have any, you can request some for free. All you need is a Facebook or Twitter account.{" "}
                <Link
                  href="https://faucet.rinkeby.io/"
                  target="_blank"
                  title="Head to the Rinkeby faucet"
                >
                  Get Rinkeby ETH
                </Link>
              </Text>
            </Box>
          </Flex>
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
          <Flash variant="">
          <Flex>
          <Box alignItems="center" alignSelf="center" mr={3}>
            <Icon name="Build" />
          </Box>
          <Box alignItems="center" alignSelf="center">
            <Text fontSize="1">
              Built with{' '}
                <Link
                  href="https://github.com/ConsenSys/rimble-ui"
                  target="_blank"
                  title="Repo for Rimble UI components"
                  mb={[3, "initial"]}>
                Rimble-UI components
                </Link>{' '}
              and{' '}
              <Link
                href="https://github.com/ConsenSys/rimble-web3-components"
                target="_blank"
                title="Repo for Rimble Web3 components"
                mb={[3, "initial"]}>
              Rimble-Web3-components
              </Link>
            </Text>
            </Box>
            </Flex>
          </Flash>
        </Box>
      </Flex>
    );
  }
}

export default InstructionsCard;
