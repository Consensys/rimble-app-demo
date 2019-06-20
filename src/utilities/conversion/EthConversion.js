import React from "react";
import Web3 from "web3";
import MakerDaoEthUsd from "./MakerDAO-ethusd";

// Address of the deployed smart contract (from etherscan)
const contractAddress = "0x729D19f657BD0614b4985Cf1D82531c67569197B";

// Copied from remix ide
const contractAbi = MakerDaoEthUsd;

class EthConvervsion extends React.Component {
  state = {
    lastUpdated: "",
    lastChecked: Date.now(),
    ethusd: 0,
    accountBalanceConverted: null
  };

  initWeb3Provider = async () => {
    let web3 = {};

    const web3Provider = new Web3.providers.HttpProvider(
      "https://mainnet.infura.io/v3/26c828d9b75641dbabb8177a744280c4"
    );
    web3 = new Web3(web3Provider);

    var ether_port =
      "wss://mainnet.infura.io/ws/v3/26c828d9b75641dbabb8177a744280c4";
    var wsWeb3 = new Web3(new Web3.providers.WebsocketProvider(ether_port));

    this.setState({ conversionWeb3: web3, wsWeb3: wsWeb3 }, () => {
      return;
    });
  };

  setContract = async () => {
    const contract = new this.state.conversionWeb3.eth.Contract(
      contractAbi,
      contractAddress
    );

    this.setState({ contract: contract });
  };

  getEthToUsd = async contract => {
    const value = await contract.methods.read().call();
    return value;
  };

  convertToDecimal = value => {
    value = this.state.conversionWeb3.utils.hexToNumberString(value);
    value = this.state.conversionWeb3.utils.fromWei(value);
    return value;
  };

  setSecondsSinceLastChecked() {
    setInterval(() => {
      this.setTimeSinceLastUpdated();
    }, 10000);
  }

  getAllEvents = async () => {
    let events = {};

    const options = {
      fromBlock: 7996664
    };

    events = await this.state.contract.events.LogNote(
      options,
      (error, event) => {
        if (event !== null) {
          console.log("getAllEvents callback", event);
          console.log("blockDetails", event.blockNumber);

          this.getBlockTime(event.blockNumber);
        }
      }
    );

    return events;
  };

  getBlockTime = async block => {
    const blockDetails = await this.state.conversionWeb3.eth.getBlock(
      block,
      (error, result) => {
        console.log("blockDetails: ", result);
        const timestamp = result.timestamp * 1000;

        this.setState(
          {
            lastBlockTimestamp: timestamp
          },
          () => {
            console.log("lastBlockTimestamp: ", timestamp);
            this.setTimeSinceLastUpdated();
            return result.timestamp;
          }
        );
      }
    );

    return blockDetails;
  };

  setTimeSinceLastUpdated = () => {
    if (this.state.lastBlockTimestamp) {
      const timeDifference = Date.now() - this.state.lastBlockTimestamp;
      console.log("timeDifference: ", timeDifference);
      const minutes = Math.floor(timeDifference / 60000);
      const seconds = ((timeDifference % 60000) / 1000).toFixed(0);

      const timeString = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
      this.setState({ lastUpdated: timeString });
    }
  };

  subscribeToContract = () => {
    const subscription = this.state.wsWeb3.eth
      .subscribe(
        "logs",
        {
          address: contractAddress
        },
        (error, result) => {
          if (!error) {
            console.log("subscribeToContract result", result);
          }

          console.error("subscribeToContract error", error);
        }
      )
      .on("data", log => {
        console.log("subscribeToContract data: ", log);
        this.getBlockTime(log.blockNumber);
        this.calculateAccountBalance();
      })
      .on("changed", log => {
        console.log("subscribeToContract changed: ", log);
      });

    this.setState({ subscription: subscription });
  };

  calculateAccountBalance = () => {
    if (this.props.accountBalance !== null) {
      console.log("accountBalance: ", this.props.accountBalance);
      const accountBalanceConverted = (
        this.props.accountBalance * this.state.ethusd
      ).toFixed(2);

      this.setState({
        accountBalanceConverted
      });

      this.props.updateAccountBalanceUsd(accountBalanceConverted);
    }
  };

  async componentDidMount() {
    await this.initWeb3Provider();
    await this.setContract();

    try {
      let result = await this.getEthToUsd(this.state.contract);
      let ethusd = this.convertToDecimal(result);
      this.setState({ ethusd: ethusd });

      let allEvents = await this.getAllEvents(this.state.contract);
    } catch (error) {
      console.log(error);
    }

    this.subscribeToContract();

    this.setSecondsSinceLastChecked();
  }

  componentWillUnmount() {
    this.state.subscription.unsubscribe((error, success) => {
      if (success) {
        console.log("Successfully unsubscribed!");
      }
    });
  }

  componentDidUpdate() {
    if (this.state.accountBalanceConverted === null) {
      this.calculateAccountBalance();
    }
  }

  render() {
    return (
      <>
        {this.props.debugging && (
          <div>
            <h1>Eth to USD:</h1>
            {this.state.ethusd === 0 ? (
              "Loading"
            ) : (
              <div>
                <h2>1 ETH = {this.state.ethusd} USD</h2>
                <p>
                  <div>Last updated: {this.state.lastUpdated} minutes ago</div>
                </p>
                <p>
                  <a
                    href="https://makerdao.com/feeds/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    from MakerDAO
                  </a>
                </p>
                {this.props.accountBalance && (
                  <div>
                    Account balance: ${this.state.accountBalanceConverted}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </>
    );
  }
}

export default EthConvervsion;
