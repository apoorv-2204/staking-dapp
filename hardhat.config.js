require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()
require("@nomiclabs/hardhat-etherscan");

module.exports = {
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
      url: `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API}`,
      accounts: [process.env.MAIN_ACCOUNT],
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
    coinmarketcap: "eb06a943-2bc6-43b7-8e53-5ebd04c84048",
    token: "avax",
    outputFile: 'gas-report.txt',
    noColors: true,
    showTimeSpent: true,
  }

}
