import StakingAbi from '../constants/Staking.json';
import TokenAbi from '../constants/RewardToken.json';
import { Form } from 'web3uikit';
import { ethers } from 'ethers';
import { useState, useEffect } from "react";
import { Card, Button } from 'web3uikit';
import ContractsInfo from '../constants/ContractInfo.json';
import { useMoralis, useWeb3Contract } from 'react-moralis';

export function WithdrawForm() {
    const stakingAddress = "0xFA26a6Cf45689Bf7b4d6Ef72b5898343ed4A4a5f";
    const tesTokenAddress = "0x52249D502a67e99A14061D7D9174F567aA398FED";

    const { runContractFunction } = useWeb3Contract();

    let approveOptions = {
        abi: TokenAbi.abi,
        contractAddress: tesTokenAddress,
        functionName: 'approve'
    };

    let stakeOptions = {
        abi: StakingAbi.abi,
        contractAddress: stakingAddress,
        functionName: 'stake'
    };

    async function handleStakeSubmit(data) {
        const amountToApprove = data.data[0].inputResult;
        approveOptions.params = {
            amount: ethers.utils.parseEther(amountToApprove, 'ether'),
            spender: stakingAddress
        };

        const tx = await runContractFunction({
            params: approveOptions,
            onError: (error) => console.log(error),
            onSuccess: () => {
                handleApproveSuccess(approveOptions.params.amount);
            }
        });
    }

    async function handleApproveSuccess(amountToStakeFormatted) {
        stakeOptions.params = {
            amount: amountToStakeFormatted
        };

        const tx = await runContractFunction({
            params: stakeOptions,
            onError: (error) => console.log(error)
        });

        console.log(tx)
        console.log(tx.wait)

        await tx.wait(2)
        console.log('Stake transaction complete', tx);
    }

    return (
        <div className='text-black'>
            <Form
                onSubmit={handleStakeSubmit}
                data={[
                    {
                        inputWidth: '50%',
                        name: 'Amount to stake ',
                        type: 'number',
                        value: '',
                        key: 'amountToStake'
                    }
                ]}
                title="Stake Now!"
            ></Form>
        </div>
    );
}

export default WithdrawForm;