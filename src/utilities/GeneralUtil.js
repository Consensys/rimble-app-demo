// Checks for MetaMask
const GeneralUtil = {
  hasMetaMask: () => {
    let hasMetaMask = false;

    if (typeof window.ethereum !== "undefined") {
      hasMetaMask = typeof window.ethereum.isMetaMask !== "undefined";
    }

    return hasMetaMask;
  }
};

export default GeneralUtil;
