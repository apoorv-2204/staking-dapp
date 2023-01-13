
require("@nomicfoundation/hardhat-toolbox");

require('dotenv').config()
require("@nomiclabs/hardhat-etherscan");
module.exports = {
  defaultNetwork: "hardhat",
  solidity: {
    version: "0.8.6",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      }
    }
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      chainId: 5,
    },
    mumbai: {
      // https://docs.unstoppabledomains.com/manage-domains/guides/add-polygon-to-metamask/

      url: `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.WALLET_PRIVATE_KEY],
      chainId: 80001,
    },
    // etherscan: {
    //   apiKey: {
    //     goerli: process.env.ETHERSCAN_API_KEY,
    //   },
    // },
  },
  gasReporter: {
    enabled: true,
    currency: "INR",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    token: "avax",
    outputFile: 'gas-report.txt',
    noColors: true,
    showTimeSpent: true,
  },

}
