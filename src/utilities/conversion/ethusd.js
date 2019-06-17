import React from "react";
import { Flex, Box, Text } from "rimble-ui";

// Address of the deployed smart contract (from etherscan)
const contractAddress = "0x729D19f657BD0614b4985Cf1D82531c67569197B";

// Copied from remix ide
const contractAbi = [
  {
    constant: false,
    inputs: [{ name: "owner_", type: "address" }],
    name: "setOwner",
    outputs: [],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "", type: "bytes32" }],
    name: "poke",
    outputs: [],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "poke",
    outputs: [],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "compute",
    outputs: [{ name: "", type: "bytes32" }, { name: "", type: "bool" }],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "wat", type: "address" }],
    name: "set",
    outputs: [],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "wat", type: "address" }],
    name: "unset",
    outputs: [],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "", type: "address" }],
    name: "indexes",
    outputs: [{ name: "", type: "bytes12" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "next",
    outputs: [{ name: "", type: "bytes12" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "read",
    outputs: [{ name: "", type: "bytes32" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "peek",
    outputs: [{ name: "", type: "bytes32" }, { name: "", type: "bool" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "", type: "bytes12" }],
    name: "values",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "min_", type: "uint96" }],
    name: "setMin",
    outputs: [],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "authority_", type: "address" }],
    name: "setAuthority",
    outputs: [],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "void",
    outputs: [],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "pos", type: "bytes12" },
      { name: "wat", type: "address" }
    ],
    name: "set",
    outputs: [],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "authority",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "pos", type: "bytes12" }],
    name: "unset",
    outputs: [],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "next_", type: "bytes12" }],
    name: "setNext",
    outputs: [],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "min",
    outputs: [{ name: "", type: "uint96" }],
    payable: false,
    type: "function"
  },
  {
    anonymous: true,
    inputs: [
      { indexed: true, name: "sig", type: "bytes4" },
      { indexed: true, name: "guy", type: "address" },
      { indexed: true, name: "foo", type: "bytes32" },
      { indexed: true, name: "bar", type: "bytes32" },
      { indexed: false, name: "wad", type: "uint256" },
      { indexed: false, name: "fax", type: "bytes" }
    ],
    name: "LogNote",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, name: "authority", type: "address" }],
    name: "LogSetAuthority",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, name: "owner", type: "address" }],
    name: "LogSetOwner",
    type: "event"
  }
];

class EthToUsd extends React.Component {
  state = {
    value: 0,
    lastUpdated: Date.now(),
    runAgain: true
  };

  componentDidMount() {}

  componentDidUpdate() {
    if (this.state.runAgain === false) {
      return;
    }
    if (typeof this.props.web3 !== "undefined" && this.props.web3 !== null) {
      // Init the contract after the web3 provider has been determined
      const contract = new this.props.web3.eth.Contract(
        contractAbi,
        contractAddress
      );

      window.contract = contract;
      window.Web3 = this.props.web3;

      debugger;

      console.log("Contract: ", contract);

      let contractValue = {};

      try {
        contract.methods.read.call((error, result) => {
          console.log("result:", result);
          contractValue = result;
        });
      } catch (error) {
        console.log("error: ", error);
      }

      var output = contract.methods.read().call((error, result) => {
        console.log("error:", error);
        console.log("result:", result);
        contractValue = result;
        return result;
      });

      console.log("output: ", output);

      // const contractValue = contract.methods.compute()[0];

      console.log("Contract value: ", contractValue);

      // const value = this.props.web3.utils.fromWei(contractValue);

      // console.log("Value: ", value);

      // this.setState({ value: value });
      this.setState({ runAgain: false });
    }
  }

  render() {
    return (
      <Box>
        <Flex px={0} justifyContent="space-between" alignItems={"center"}>
          <Text fontWeight={3}>Eth to USD:</Text>
        </Flex>

        <Text
          fontSize={"5rem"}
          fontWeight={1}
          lineHeight={1}
          textAlign={"center"}
          my={5}
        >
          {this.state.value}
        </Text>
      </Box>
    );
  }
}

export default EthToUsd;
