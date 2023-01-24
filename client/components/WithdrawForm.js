import StakingAbi from '../constants/Staking.json';
import { Form } from 'web3uikit';
import { ethers } from 'ethers';
import { useState, useEffect } from "react";
import ContractsInfo from '../constants/ContractInfo.json';
import { useWeb3Contract } from 'react-moralis';
import { ToastContainer, toast } from 'react-toastify';

export function WithdrawForm() {
    var success = false;

    const { runContractFunction } = useWeb3Contract()
    const withdrawOptions = {
        abi: StakingAbi.abi,
        contractAddress: ContractsInfo.stakingAddress,
        functionName: 'withdraw',
        params: {}
    }

    async function handleWithdraw(data) {
        const amountToWithdraw = data.data[0].inputResult;
        withdrawOptions.params = {
            amount: ethers.utils.parseEther(amountToWithdraw, 'ether')
        };

        const tx = await runContractFunction({
            params: withdrawOptions,
            onError: (error) => {
                toast.info(`Failure ${error}`);
                console.log(error)
            },
            onSuccess: () => {
                handleWithdrawSuccess(withdrawOptions.params.amount);
            },
            wait: 2
        });
        console.log(tx)
    }

    async function handleWithdrawSuccess(withdrawAmountFormatteds) {
        toast.info(`SUcces withdraw success ${withdrawAmountFormatteds}`);
    }

    return (
        <div className='text-black'>
            <Form
                onSubmit={handleWithdraw}
                data={[
                    {
                        inputWidth: '50%',
                        name: 'Amount To Withdraw',
                        type: 'number',
                        value: '',
                        key: 'amountToWithdraw'
                    }
                ]}
                title="Withdrew  Now!"
            ></Form>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
}

export default WithdrawForm;