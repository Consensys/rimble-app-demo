import React from "react";
import {
  Card,
  Heading,
  Text,
  Icon,
  Button,
  Modal,
  Flex,
  Box,
  ToastMessage,
  Loader
} from "rimble-ui";
import NetworkOverview from "./NetworkOverview";
import theme from "./../../theme";

class ConnectionPendingModal extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.isOpen}>
        <Card p={5} maxWidth={"600px"}>
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

          <Flex flexDirection={"column"} justifyContent={"space-between"}>
            <Heading.h2 my={3}>
              Connect Ethereum account
            </Heading.h2>

            <Text my={4}>
              Confirm the request that's just appeared. If you can't see a request, open your MetaMask extension.
            </Text>

              <Box bg={"#f6f6fc"} p={3} display={["none", "block"]}>
                <Flex alignItems={"center"}>
                  <Box position={"relative"} width={"4em"}>
                    <Box>
                      <Loader size={"3em"} />
                    </Box>
                    <Box position={"absolute"} top={"1em"} left={"1em"}>
                      <Icon name="Settings" size={"1em"} />
                    </Box>
                  </Box>
                  <Box>
                    <Text fontWeight={4}>Waiting for connection confirmation...</Text>
                    <Text fontWeight={2}>
                      This won’t cost you any Ether
                    </Text>
                  </Box>
                </Flex>
              </Box>
          </Flex>
        </Card>
      </Modal>
    );
  }
}

export default ConnectionPendingModal;
