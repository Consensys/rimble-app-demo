import React from "react";
import { Box, Heading, Text, Link, Flex, Button, Icon, Flash } from "rimble-ui";

class InstructionsCard extends React.Component {
  render() {
    return (
      <Flex justifyContent={"center"}>
        <Box maxWidth={"640px"} mt={4} mx={3}>
          <Flash variant={'info'}>
            <Flex>
              <Box m={1} mr={3} >
                <Icon name="Info" size={'2rem'} />
              </Box>
              <Box mr={3} pt={1}>
                <Heading fontSize={3} my={0} lineHeight={1.5}>
                  You're going to need Rinkeby ETH
                </Heading>
                <Text color={'inherit'} my={2}>
                  If you don't have any, you can request some for free. All you need is a Facebook or Twitter account.{" "}
                </Text>
                <Link
                  href="https://faucet.rinkeby.io/"
                  target="_blank"
                  title="Head to the Rinkeby faucet"
                >
                  <Box display={'inline-flex'} alignItems={'center'}>
                    Get Rinkeby ETH
                    <Icon name={'OpenInNew'} size={'18px'} mb={'2px'} ml={2} />
                  </Box>
                </Link>
              </Box>
            </Flex>
          </Flash>
          <Flex
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
