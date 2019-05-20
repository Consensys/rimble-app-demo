import React from "react";
import { Flex, Box, Text, Button } from "rimble-ui";

// Address of the deployed smart contract (from etherscan)
const contractAddress = "0x0f69f0ac4b92bf0d101b5747eed3fa6b653a36f8";

// Copied from remix ide
const contractAbi = [
  {
    constant: false,
    inputs: [],
    name: "decrementCounter",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "incrementCounter",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "reset",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    constant: true,
    inputs: [],
    name: "getCounter",
    outputs: [
      {
        name: "",
        type: "int256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  }
];

class SmartContractControls extends React.Component {
  state = {
    value: 0,
    needsUpdate: false
  };

  // gets the number stored in smart contract storage
  getNumber = ({ ...props }) => {
    try {
      this.props.contract.methods
        .getCounter()
        .call()
        .then(value => {
          value = Number(value.toString());
          this.setState({ value, needsUpdate: false });
          console.log("Updated number");
        })
        .catch(error => {
          console.log(error);
          this.setState({ error });
        });
    } catch (error) {
      console.log("error", error);
    }
  };

  // Check for updates to the transactions collection
  processTransactionUpdates = prevProps => {
    Object.keys(this.props.transactions).map(key => {
      let tx = this.props.transactions[key];
      console.log("Needs updated number: ", tx.status, this.state.needsUpdate);
      // Will not work if there is a tx started before a prior tx has success -- first will flip needsUpdate to false
      if (tx.status === "success" && this.state.needsUpdate) {
        console.log("Getting updated number.");
        this.getNumber();
        return false;
      } else {
        console.log("Not updating number.");
        return false;
      }
    });
  };

  resetCounter = () => {
    this.props.contractMethodSendWrapper("reset");
  };

  incrementCounter = () => {
    let needsUpdate = true;
    this.props.contractMethodSendWrapper(
      "incrementCounter",
      (txStatus, transaction) => {
        console.log("incrementCounter callback: ", txStatus, transaction);
        if (
          txStatus === "confirmation" &&
          transaction.status === "success" &&
          needsUpdate
        ) {
          this.getNumber();
          needsUpdate = false;
        }
      }
    );
  };

  decrementCounter = () => {
    this.props.contractMethodSendWrapper("decrementCounter");
  };

  componentDidMount() {
    // Init the contract after the web3 provider has been determined
    this.props.initContract(contractAddress, contractAbi).then(() => {
      // Can finally interact with contract
      this.getNumber();
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // this.processTransactionUpdates(prevProps);
  }

  render() {
    return (
      <Box>
        <Flex
          px={0}
          pb={4}
          borderBottom={1}
          borderColor={"#E8E8E8"}
          justifyContent="space-between"
          alignItems="end"
        >
          <Text mb={2} fontSize={3}>
            Smart contract value
          </Text>

          <Button.Outline
            size={"small"}
            onClick={this.resetCounter}
            disabled={!this.props.account}
          >
            Reset
          </Button.Outline>
        </Flex>

        <Box py={4}>
          <Text fontSize={6} textAlign={"center"}>
            {this.state.value}
          </Text>
        </Box>

        <Box mx={-1}>
          <Flex
            px={0}
            pt={4}
            borderTop={1}
            borderColor={"#E8E8E8"}
            justifyContent="space-between"
            flexWrap={["wrap", "no-wrap"]}
          >
            <Button
              size="medium"
              width={[1, "initial"]}
              onClick={this.decrementCounter}
              my={1}
              px={3}
            >
              Decrease value
            </Button>
            <Button
              size="medium"
              width={[1, "initial"]}
              onClick={this.incrementCounter}
              my={1}
              px={3}
            >
              Increase value
            </Button>
          </Flex>
        </Box>
      </Box>
    );
  }
}

export default SmartContractControls;
