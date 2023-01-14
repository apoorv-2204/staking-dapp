1) move ahead by seconds
2)  move ahead by blocks
3)  1 dday =>86,400
4)  auto mine hardhat blocks => mine blocks instad of waiting 
5)  development patterns
6)  we are just adding blocks ?? without txns???????? https://hardhat.org/hardhat-network/docs/reference
7)  Instead of Time dependent rewards , we can block nb based reward system
8)  sir you were giving pdf to understand maths of staking /basis points
9)  move forward in time dont want to wait
10) / sc is allowed only approved to manipulate stake Amount
11) bcz the balance remain same is due to staking token being same, we can have d/f token also , instead of rt we can have srt
12) time dependent unit tests
13) https://trufflesuite.com/blog/introducing-ganache-7/#6-fast-forward-time


### INfura
1) Infrastructure as a Service,Blockchain Nodes as a service,provid an api to connect to this blockchain 
2) alchemy and infura

#### 
Infura 
=> web appllication => https
=> iot websocket 
https://polygon-mumbai.infura.io/v3/
https://app.infura.io/dashboard/ethereum/

https://faucet.polygon.technology/
why we are not use infura api in wallet
https://mumbai.polygonscan.com/
https://matic-mumbai.chainstacklabs.com

chainid: mumbai testnet


### CTC
You are correct that IERC20 is an interface in Solidity, which means it is not a contract that can be instantiated on its own.<br>
 However, the IERC20() constructor takes an address of an already deployed ERC-20 contract as its argument. When the IERC20() <br>
 constructor is called, it creates a new instance of the IERC20 interface, and assigns the address of the deployed ERC-20 contract<br>
  to this instance of the interface. This allows the contract to interact with the functions and variables of the deployed ERC-20 <br>
  contract as if it were an instance of the IERC20 interface.<br>

This is a common pattern in solidity to interact with external contracts, when a contract A want to interact with contract B, <br>
contract A will use an interface that contract B should implement, and use the address of contract B to create a new instance of<br>
 the interface, this way contract A can interact with contract B by calling the functions defined in the interface.<br>
 ```solidity 
        s_stakingToken=IERC20(stakingToken);
        s_rewardsToken=IERC20(rewardsToken);
```

 ### UI

 #### Moralis

Provides module of ease devlopment in web3
- isWeb3Enabled
- Account Management
- 