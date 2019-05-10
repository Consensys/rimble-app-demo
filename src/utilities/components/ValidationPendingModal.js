import React from "react";
import {
  Card,
  Heading,
  Text,
  Icon,
  Modal,
  Flex,
  Box,
  ToastMessage,
  Button
} from "rimble-ui";
import NetworkOverview from "./NetworkOverview";
import theme from "../../theme";

class ValidationPendingModal extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.isOpen}>
        <Card p={5} maxWidth={"960px"}>
          <Button.Text
            icononly
            icon={"Close"}
            color={"moon-gray"}
            position={"absolute"}
            top={0}
            right={0}
            mt={3}
            mr={3}
            onClick={this.props.closeModal}
          />

          <Flex justifyContent={"center"} alignContent={"stretch"}>
            <Box width={"400px"} flex={"1 1 auto"}>
              <Flex flexDirection={"column"} alignContent={"center"}>
                <Box>
                  <Text color={theme.colors.primary} caps>
                    Current Network
                  </Text>
                  <NetworkOverview network={this.props.currentNetwork} />
                </Box>

                <Box my={4}>
                  <Text color={theme.colors.primary} caps>
                    New to Bounties Explorer?
                  </Text>
                  <Text fontWeight={3}>The blockchain is public</Text>
                  <Text>
                    It's possible to use your account's address to see all your
                    blockchain activity. Only connect accounts you don't mind
                    being linked to your Bounties Explorer profile.
                  </Text>
                </Box>
              </Flex>
            </Box>

            <Flex borderRight={1} borderColor={"#999"} mx={3}>
              <Text />
            </Flex>

            <Flex flexDirection={"column"} p={3}>
              <Flex justifyContent={"center"} my={4}>
                <Icon name="Link" color="#666" size="40" />
              </Flex>

              <Heading.h2>Verify your account</Heading.h2>

              <Text mb={4}>
                To connect securely and prove you have access to this account,
                sign the message in your MetaMask extension. A signature request
                should automatically appear. If not, open it using the MetaMask
                icon in your browser.
              </Text>

              <Box bg={"#f3f2fd"} borderRadius={2} p={3} mb={4}>
                <Text>Address: {this.props.account}</Text>
              </Box>

              <ToastMessage
                message={"Waiting for connection confirmation..."}
                secondaryMessage={"This won't cost your any Ether"}
                icon={"InfoOutline"}
              />
            </Flex>
          </Flex>
        </Card>
      </Modal>
    );
  }
}

export default ValidationPendingModal;
