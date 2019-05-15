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
  Loader
} from "rimble-ui";
import GeneralUtil from "../GeneralUtil";

class ConnectionPendingModal extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.isOpen}>
        <Card p={[3, 5]} maxWidth={"600px"}>
          <Flex justifyContent={"flex-end"} mr={[-3, -5]} mt={[-3, -5]}>
            <Button.Text
              icononly
              icon={"Close"}
              color={"moon-gray"}
              onClick={this.props.closeModal}
            />
          </Flex>

          <Flex flexDirection={"column"} justifyContent={"space-between"}>
            <Heading.h2 my={3}>Connect Ethereum account</Heading.h2>

            <Text my={4}>
              Confirm the request that's just appeared. If you can't see a
              request, open your{" "}
              {GeneralUtil.hasMetaMask()
                ? `MetaMask extension`
                : `dApp browser settings`}
              .
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
                  <Text fontWeight={4}>
                    Waiting for connection confirmation...
                  </Text>
                  <Text fontWeight={2}>This won’t cost you any Ether</Text>
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
