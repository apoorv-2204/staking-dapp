import { useState, useEffect } from "react";
import { Card, Button } from 'web3uikit';
import TokenAbi from '../constants/RewardToken.json';
import StakingAbi from '../constants/Staking.json';
import ContractsInfo from '../constants/ContractInfo.json';
import { useMoralis, useWeb3Contract } from 'react-moralis';
import { ethers } from 'ethers';


export default function RewardsForm() {
    const { account, isWeb3Enabled } = useMoralis();
    console.log('account- reward', account);
    const [earned, updateEarned] = useState(0);
    const [claim, updateClaimed] = useState(false);

    const { runContractFunction: getEarnedBalance } = useWeb3Contract({
        abi: StakingAbi.abi, contractAddress: ContractsInfo.stakingAddress,
        functionName: 'earned', params: { account }
    });

    const { runContractFunction: claimRewards } = useWeb3Contract({
        abi: StakingAbi.abi,
        contractAddress: ContractsInfo.stakingAddress, functionName: 'claimReward'
    });

    useEffect(() => {
        async function updateRewardsEarned() {
            const earned = (await getEarnedBalance({ onError: (error) => console.log(error) })).toString();
            updateEarned((parseFloat(earned) / 1e18).toFixed(18));
        }
        if (isWeb3Enabled) updateRewardsEarned();

    }, [account, isWeb3Enabled, getEarnedBalance, claim])



    async function handleClaimRewards() {
        console.log('handleClaimRewards');
        const claimed = await claimRewards({ onError: (error) => console.log(error) });
        await claimed.wait(1);
        updateClaimed(true);
    }

    return (
        <>
            <br />
            <div className="text-black">

                <div className='text-black'>
                    <div
                        style={{
                            width: '250px'
                        }}
                    >
                        <Card
                            description="Claim Rewards"
                            onClick={() => handleClaimRewards()}
                            title=""
                            tooltipText={<span style={{ width: 200 }}>"Claim Rewards"</span>}
                        >
                            <div >
                                <span >Rewards Earned: </span>
                                <span >{earned} </span>
                            </div>
                            <div>

                                {/* <Button
                                    color="green"
                                    onClick={() => { handleClaimRewards() }}
                                    text="Colored Button: Green"
                                    theme="colored"
                                /> */}
                            </div>
                        </Card>
                    </div>
                </div>
            </div >
        </>
    );
}

