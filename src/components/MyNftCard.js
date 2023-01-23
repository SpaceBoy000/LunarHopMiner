import * as React from 'react';
import CardContent from "@mui/material/CardContent";
import { useState, useEffect } from 'react';
import { styled } from "@mui/system";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ethers } from 'ethers';

const CardWrapper = styled("div")(({ theme }) => ({
    minWidth: '250px',
    margin: '10px',
    padding: '5px',
    width: '250px',
    display: 'inline-block',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    overflow: 'hidden',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 2px 3px',
    borderRadius: '20px',
    background: '#E75353',
    marginBottom: '24px',
    border: '1px solid #FEB800'
}));


export default function MyNftCard({contract, LunarHopNFTs, userInfo, no}) {
    let level = userInfo.level.toString();

    // console.log("NFT Contract: ", contract);
    // console.log("NFT UserInfo: ", userInfo);
    // console.log("NFT Level: ", level);
    // console.log("NFT Key: ", no);
    const [countdown, setCountdown] = useState({
        alive: true,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    const [claimableReward, setClaimableRewards] = useState(0);

    const getCountdown = (deadline) => {
        const now = Date.now() / 1000;
        const total = Number(deadline) + 24 * 3600 - now;
        const period = now - Number(deadline);
        const dailyROI = LunarHopNFTs[level][1].properties[0].value;
        const rewards = (dailyROI * period / 86400);
        setClaimableRewards(rewards);
        const seconds = Math.floor((total) % 60);
        const minutes = Math.floor((total / 60) % 60);
        const hours = Math.floor((total / (60 * 60)) % 24);
        const days = Math.floor(total / (60 * 60 * 24));

        return {
            total,
            days,
            hours,
            minutes,
            seconds
        };
    }

    useEffect(() => {
        const interval = setInterval(() => {
            try {
                // console.log("userInfo == ", userInfo[0].lastWithdraw.toString());
                const data = getCountdown(userInfo.lastWithdraw.toString());
                setCountdown({
                    alive: data.total > 0,
                    days: data.days,
                    hours: data.hours,
                    minutes: data.minutes,
                    seconds: data.seconds
                })
            } catch (err) {
                console.log(err);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [])

    async function buyAgain() {
        // const res = await axios.get(`http://135.181.15.84:443/action?address=${userWalletAddress}&action="compound"`);
        console.log("buyAgain: ", no);
        try {
            await contract.buyAgain(no);
        } catch (err) {
            console.error("buyAgain error: ", err);
        }
    }
    
    async function claim() {
        // const res = await axios.get(`http://135.181.15.84:443/action?address=${userWalletAddress}&action="compound"`);
        console.log("claim: ", no);
        try {
            await contract.claimRewards(no);
        } catch (err) {
            console.error("buyAgain error: ", err);
        }
    }
    
    async function sell() {
        // const res = await axios.get(`http://135.181.15.84:443/action?address=${userWalletAddress}&action="compound"`);
        console.log("sell: ", no);
        try {
            await contract.sellLunarHop(no);
        } catch (err) {
            console.error("buyAgain error: ", err);
        }
    }

    return (
        <CardWrapper>
            <Typography variant="h5" color='#FEB800' paddingBottom={1}>
                {countdown.alive == true ? (countdown.hours) + "h " + countdown.minutes + "m " + countdown.seconds + "s " : "You can claim now."}
            </Typography>
            <img src={LunarHopNFTs[level][0].path} alt="nft" width="100%" style={{borderRadius: '20px'}}/>
            <div>
                <Box padding={2}>
                    <Grid container justifyContent="space-between">
                        <Typography variant="body1" className='text-white' gutterBottom >Total Income</Typography>
                        <Typography className='text-yellow' gutterBottom >{LunarHopNFTs[level][1].properties[1].value}$</Typography>
                    </Grid>
                    <Grid container justifyContent="space-between">
                        <Typography variant="body1" className='text-white' gutterBottom >Dailiy ROI</Typography>
                        <Typography className='text-yellow' gutterBottom >{LunarHopNFTs[level][1].properties[0].value}$</Typography>
                    </Grid>
                    <Grid container justifyContent="space-between">
                        <Typography variant="body1" className='text-white' gutterBottom >Already Earned</Typography>
                        <Typography className='text-yellow' gutterBottom >{Number(ethers.utils.formatEther(userInfo.totalEarned)).toFixed(2)}$</Typography>
                    </Grid>
                    <Grid container justifyContent="space-between">
                        <Typography variant="body1" className='text-white' gutterBottom >Rewards</Typography>
                        <Typography className='text-yellow' gutterBottom >{claimableReward.toFixed(2)}$</Typography>
                    </Grid>
                </Box>
                <div style={{textAlign:'center', display:'flex', flexDirection:'column'}}>
                    <button className='btn_buy' style={{background:'#FEB800'}} onClick={buyAgain}>Buy Again</button>
                    <button className='btn_buy' onClick={claim}>Claim</button>
                    <button className='btn_buy' onClick={sell}>Sell</button>
                </div>
            </div>
        </CardWrapper>
    );
}