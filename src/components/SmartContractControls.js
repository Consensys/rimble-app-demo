import React from "react";
import { Flex, Box, Text, Button, OutlineButton } from "rimble-ui";

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
      if (tx.status === "success" && this.state.needsUpdate) {
        console.log("Getting updated number.");
        this.getNumber();
        return false;
      } else {
        return false;
      }
    });
  };

  resetCounter = () => {
    this.props.contractMethodSendWrapper("reset");
  };

  incrementCounter = () => {
    this.props.contractMethodSendWrapper("incrementCounter");
    this.setState({
      needsUpdate: true
    });
  };

  decrementCounter = () => {
    this.props.contractMethodSendWrapper("decrementCounter");
    this.setState({
      needsUpdate: true
    });
  };

  componentDidMount() {
    // Init the contract after the web3 provider has been determined
    this.props.initContract(contractAddress, contractAbi).then(() => {
      // Can finally interact with contract
      this.getNumber();
    });
  }

  componentDidUpdate(prevProps, prevState) {
    this.processTransactionUpdates(prevProps);
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

          <OutlineButton
            size={"small"}
            onClick={this.resetCounter}
            disabled={!this.props.account}
          >
            Reset
          </OutlineButton>
        </Flex>

        <Box py={4}>
          <Text fontSize={6} textAlign={"center"}>
            {this.state.value}
          </Text>
        </Box>

        <Flex
          px={0}
          pt={4}
          borderTop={1}
          borderColor={"#E8E8E8"}
          justifyContent="space-between"
        >
          <Button size={"medium"} mr={4} onClick={this.incrementCounter}>
            Increase value
          </Button>

          <Button size={"medium"} onClick={this.decrementCounter}>
            Decrease value
          </Button>
        </Flex>
      </Box>
    );
  }
}

export default SmartContractControls;
