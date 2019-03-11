import React from "react";
import { Card, Heading, Box, Flex, Text } from "rimble-ui";

class TransactionsCard extends React.Component {
  render() {
    return (
      <Card width={"400px"} mx={"auto"} px={4}>
        <Heading.h2 fontSize={3} textAlign={"center"} px={4} mb={5}>
          Transactions
        </Heading.h2>
        <Box>
          {Object.keys(this.props.transactions).length > 0 ? (
            <Flex>
              <Text width={"33%"} textAlign={"center"} fontWeight="bold">
                txHash
              </Text>
              <Text width={"33%"} textAlign={"center"} fontWeight="bold">
                Status
              </Text>
              <Text width={"33%"} textAlign={"center"} fontWeight="bold">
                Confirmations
              </Text>
            </Flex>
          ) : null}

          {Object.keys(this.props.transactions).length < 1 ? (
            <Text textAlign={"center"}>No recent transactions</Text>
          ) : (
            Object.keys(this.props.transactions).map((keyName, keyIndex) => {
              let txHash = "";
              if (this.props.transactions[keyName].transactionHash) {
                txHash = this.props.transactions[
                  keyName
                ].transactionHash.toString();
                const txStart = txHash.substr(0, 7);
                const txEnd = txHash.substr(txHash.length - 4);
                txHash = txStart + "..." + txEnd;
              }

              return (
                <Flex key={keyIndex}>
                  <Text width={"33%"} textAlign={"center"}>
                    {txHash}
                  </Text>
                  <Text width={"33%"} textAlign={"center"}>
                    {this.props.transactions[keyName].status}
                  </Text>
                  <Text width={"33%"} textAlign={"center"}>
                    {this.props.transactions[keyName].confirmationCount}
                  </Text>
                </Flex>
              );
            })
          )}
        </Box>
      </Card>
    );
  }
}

export default TransactionsCard;
