import React, { useEffect, useState } from 'react';
import { useMoralis, useWeb3Contract } from 'react-moralis';
import StakingAbi from '../constants/Staking.json';
import TokenAbi from '../constants/RewardToken.json';
import Contracts from '../constants/ContractInfo.json';


function StakeDetails() {
  const { account, isWeb3Enabled } = useMoralis();
  const [rtBalance, setRtBalance] = useState('0');
  const [stakedBalance, setStakedBalance] = useState('0');
  const [earnedBalance, setEarnedBalance] = useState('0');
  const [rewardRate, updateRewardRate] = useState(0);

  //   To learn more about which versions of Node.js are supported go to https://hardhat.org/nodejs-versions
  // RewardToken contract deployed to: 0x52249D502a67e99A14061D7D9174F567aA398FED
  // Staking contract deployed to: 0xFA26a6Cf45689Bf7b4d6Ef72b5898343ed4A4a5f


  const { runContractFunction: getRTBalance } = useWeb3Contract({
    abi: TokenAbi.abi,
    contractAddress: Contracts.rewardTokenAddress,
    functionName: 'balanceOf',
    params: { account }
  });

  const { runContractFunction: getStakedBalance } = useWeb3Contract({
    abi: StakingAbi.abi,
    contractAddress: Contracts.stakingAddress,
    functionName: 'getStaked',
    params: {
      account
    }
  });

  const { runContractFunction: getEarnedBalance } = useWeb3Contract({
    abi: StakingAbi.abi,
    contractAddress: Contracts.stakingAddress,
    functionName: 'earned',
    params: {
      account
    }
  });

  const { runContractFunction: getRewardRate } = useWeb3Contract({ abi: StakingAbi.abi, contractAddress: Contracts.stakingAddress, functionName: 'REWARD_RATE', params: {} });


  useEffect(() => {
    async function updateUiValues() {
      const rtBalance = (await getRTBalance({ onError: (error) => console.log(error) })).toString();
      const formattedRtBalance = parseFloat(rtBalance) / 1e18;
      const formattedRtBalaceRounded = formattedRtBalance.toFixed(2);
      setRtBalance(formattedRtBalaceRounded);

      const stakedBalace = (await getStakedBalance({ onError: (error) => console.log(error) })).toString();
      const formattedStakedBalance = parseFloat(stakedBalace) / 1e18;
      const formattedStakedBalanceRounded = formattedStakedBalance.toFixed(2);
      setStakedBalance(formattedStakedBalanceRounded);

      const earnedBalance = (await getEarnedBalance({ onError: (error) => console.log(error) })).toString();
      const formattedEarnedBalance = parseFloat(earnedBalance) / 1e18;
      const formattedEarnedBalanceRounded = formattedEarnedBalance.toFixed(18);
      setEarnedBalance(formattedEarnedBalanceRounded);

      const rewardRate = (await getRewardRate({ onError: (error) => console.log(error) })).toString();
      updateRewardRate(rewardRate);
    }

    if (isWeb3Enabled) updateUiValues();

  }, [account, getEarnedBalance, getRTBalance, getStakedBalance, isWeb3Enabled]);
  return (
    <div className='p-3'>
      <div className='font-bold m-2'>RT Balance is: {rtBalance}</div>
      <div className='font-bold m-2'>Earned Balance is: {earnedBalance}</div>
      <div className='font-bold m-2'>Staked Balance is: {stakedBalance}</div>
      <div className='font-bold m-2'>Reward Rate is: {rewardRate}</div>
    </div>
  );
}

// experimental
// function RewardRateUI() {
//   // const { data, error, runContractFunction, isFetching, isLoading }
//   var a = useWeb3Contract({
//     abi: StakingAbi.abi,
//     contractAddress: Contracts.stakingAddress,
//     functionName: "REWARD_RATE"
//   });
//   console.log(a);
//   // { data: null, error: null, isFetching: false, isLoading: false, runContractFunction: ƒ }
//   // { data, error, runContractFunction, isFetching, isLoading }

//   return (
//     <>
//       {/* <div>
//         {error && <ErrorMessage error={error} />}
//         <button onClick={async () => (await runContractFunction()).toString()} disabled={isFetching}>REward Rat</button>
//         {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
//       </div> */}
//     </>
//   );
// }

export default StakeDetails;