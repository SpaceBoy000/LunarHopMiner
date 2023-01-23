import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react'
// import AOS from 'aos';
// import 'aos/dist/aos.css';
import './App.css';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
// import moment from 'moment';
import { useContract } from 'wagmi'
import wealthMountainABI from './contracts/WealthMountainBSC.json';
// import erc20ABI from './contracts/erc20ABI.json';
import styled from "styled-components";
import { Tabs, Tab, TabPanel } from "./components/tabs/tabs";
// import SelectObject from "./components/SelectCoin";
// import { FaCopy, FaWallet, FaUserShield, FaSearchDollar } from 'react-icons/fa';
import { Accordion } from "react-bootstrap";
import { GiHamburgerMenu } from "react-icons/gi"
// import axios from "axios";
// import RealTimeChart from "./chart";
import { Toast } from './utils';
import Web3 from "web3";
import MyNftCard from './components/MyNftCard';
import FAQList from './components/faq/FaqAccordian';


import logoImg from "./assets/img/logos/logo.svg";

import rabbitsImg from "./assets/img/rabbits.png";
import coinImg from "./assets/img/chinese_coin.png";
import gateImg from "./assets/img/chinese_gate.png";

import plusIcon from "./assets/icons/plusIcon.svg";
import minusIcon from "./assets/icons/minusIcon.svg";

import nft1 from "./assets/img/nfts/1.png";
import nft2 from "./assets/img/nfts/2.png";
import nft3 from "./assets/img/nfts/3.png";
import nft4 from "./assets/img/nfts/4.png";
import nft5 from "./assets/img/nfts/5.png";
import nft6 from "./assets/img/nfts/6.png";

// import abiDecoder from "abi-decoder";
// window.Buffer = window.Buffer || require("buffer").Buffer;
import {
    Button,
    Card,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    CardDeck,
    Container,
    Col,
    FormGroup,
    Form,
    Input,
    InputGroup,
    Label,
    Table,
    Row
} from "reactstrap";
import { ethers, Contract } from 'ethers';

// AOS.init({ duration: 2000 });
const TabsContainer = styled.div`
  display: flex;
  padding: 2px;
`;

const Item = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    padding: '5px 20px',
    margin: '0px 20px',
    textAlign: 'center',
    fontSize: "20px",
    // color: theme.palette.text.secondary,
    color: 'white',
    // border: "solid white 2px",
    // borderRadius: "1.25rem",
    // background: "#000000b8",
    minWidth: '150px',
    alignSelf: 'center',
    fontFamily: 'Roboto',
}));

const Wrapper = styled("div")(({ theme }) => ({
    minWidth: "250px",
    margin: "10px",
    width: '250px',
    display: 'inline-block',
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    overflow: "hidden",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 2px 3px",
    borderRadius: "20px",
    // background: theme.palette.purple.main,
    marginBottom: "24px",
    border: 'solid 1px #0e131f',
    '&:hover': {
      boxShadow: "0 0 0.1em #fff, 0 0 0.2em #fff, 0 0 0.3em #fff, 0 0 0.4em #f5ea1a, 0 0 0.6em #e0f734, 0 0 0.8em #ebf705, 0 0 1em #e1f414, 0 0 1.2em #cde60f",
    },
    [theme.breakpoints.down('md')]: {
      width: '90%',
    }
  }));

const web3 = new Web3(
    new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org/")
);


// const abiCoder = require("web3-eth-abi");
// const investFunc = /^0x3acb1a0a/;
// const claimFunc = /^0x9ddf840d/;
// const inputs = [
//     {
//         "internalType": "uint256",
//         "name": "amtx",
//         "type": "uint256"
//     },
//     {
//         "internalType": "address",
//         "name": "ref",
//         "type": "address"
//     }
// ];

// const decodeFunction = (data) => {
//     let decoded = abiCoder.decodeParameters(inputs, data.slice(10));   
//     // console.log("decoded: ", decoded.amtx / 10 ** 18);
//     return decoded.amtx / 10 ** 18;
// }

export function shorten(str, length = 6) {
    if (str.length < 10) return str;
    return `${str.slice(0, length)}...${str.slice(str.length - 4)}`;
}

function WealthMountain() {
    const LunarHopNFTs = [
        [
          {
            path: nft1,
            name: 'Common'
          },
          {
            properties : [
              {
                label: "Daily Return",
                value: 2,
              },
              {
                label: "Price",
                value: 50,
              },
              {
                label: "Life Span",
                value: 30,
              },
              {
                label: "Total Income",
                value: 60,
              }
            ]
          },
        ],
        [
            {
              path: nft2,
              name: 'Uncommon'
            },
            {
              properties : [
                {
                  label: "Daily Return",
                  value: 4.2,
                },
                {
                  label: "Price",
                  value: 100,
                },
                {
                  label: "Life Span",
                  value: 30,
                },
                {
                  label: "Total Income",
                  value: 126,
                }
              ]
            },
        ],
        [
            {
              path: nft3,
              name: 'Rare'
            },
            {
              properties : [
                {
                  label: "Daily Return",
                  value: 22,
                },
                {
                  label: "Price",
                  value: 500,
                },
                {
                  label: "Life Span",
                  value: 45,
                },
                {
                  label: "Total Income",
                  value: 990,
                }
              ]
            },
        ],
        [
            {
              path: nft4,
              name: 'Super Rare'
            },
            {
              properties : [
                {
                  label: "Daily Return",
                  value: 45,
                },
                {
                  label: "Price",
                  value: 1000,
                },
                {
                  label: "Life Span",
                  value: 45,
                },
                {
                  label: "Total Income",
                  value: 2025,
                }
              ]
            },
        ],
        [
          {
            path: nft5,
            name: 'Legendary'
          },
          {
            properties : [
              {
                label: "Daily Return",
                value: 235,
              },
              {
                label: "Price",
                value: 5000,
              },
              {
                label: "Life Span",
                value: 60,
              },
              {
                label: "Total Income",
                value: 14100,
              }
            ]
          },
        ],
        [
            {
              path: nft6,
              name: 'Mytical'
            },
            {
              properties : [
                {
                  label: "Daily Return",
                  value: 480,
                },
                {
                  label: "Price",
                  value: 10000,
                },
                {
                  label: "Life Span",
                  value: 60,
                },
                {
                  label: "Total Income",
                  value: 28800,
                }
              ]
            },
        ],
    ];

    const faqData = [
        {
          title: `What is Lunar Hop?`,
          content: 
            <p>
                Lunar Hop NFTs were blended into the creation as it attracts you bring luck today and in the future. The more Lunar Hop NFT you have, the greater wealth you will attract.
            </p>
        },
        {
            title: `Who can own Lunar Hop NFT?`,
            content: 
              <p>
                You, me or anyone from around the globe can own Lunar Hop NFT. Anyone deserves to prosper and earn good luck for infinite wealth.
              </p>
        },
        {
            title: `What is Lunar Hop Miner?`,
            content: 
              <p>
                The Lunar Hop Miner is the primary staking platform that provide users an opportunity to collect and earn good fortune over time.
              </p>
        },
        {
            title: `How do I get in touch with the team?`,
            content: 
              <p>
                 Follow us on Instagram, Twitter, and Discord for more updates and announcements.
              </p>
        } 
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 0,
        slidesToScroll: 1
    };

    const [sliderValue, setSliderValue] = useState('50');
    const [dropdownOpen, setOpen] = React.useState(false);
    const [userInfo, setUserInfo] = useState([]);
    const [investInfo, setInvestInfo] = useState([5]);
    const [activeTab, setActiveTab] = useState(0);
    const [calcTotalDividends, setCalcTotalDividends] = useState("")
    const [initalStakeAfterFees, setInitalStakeAfterFees] = useState("")
    const [dailyPercent, setDailyPercent] = useState("");
    const [dailyValue, setDailyValue] = useState("");
    const [stakingAmount, setStakingAmount] = useState("");
    const [calculatedDividends, setCalculatedDividends] = useState(0);
    const [contractBalance, setContractBalance] = useState("");
    const [referralAccrued, setReferralAccrued] = useState("");
    const [totalUsers, setTotalUsers] = useState("");
    const [userDepositInfo, setUserDepositInfo] = useState([]);
    const [totalClaimableRewards, setTotalClaimableRewards] = useState([]);
    // const [totalCompounds, setTotalCompounds] = useState("")
    // const [totalCollections, setTotalCollections] = useState("")
    const [contract, setContract] = useState(undefined)
    const [signer, setSigner] = useState(undefined)
    const [userWalletAddress, setUserWalletAddress] = useState('none');
    const [userStablecoinBalance, setUserStablecoinBalance] = useState(0);
    const [stablecoinAllowanceAmount, setStablecoinAllowanceAmount] = useState(0);
    const stableCoin = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';
    // const stableCoin = '0xe98e93Fde3A05Bc703f307Ee63be9507d1f48554';
    // const wealthContract = '0x4d0b1621dfCC820ca196470Be89857De7E45316D'; // test
    const wealthContract = '0xca3E36fC417535875015aA359aEa2F2250bB9034';    // main net
    const scanLinkSuffix = 'https://bscscan.com/address/';
    const [refBonusLoading, setRefBonusLoading] = useState(false);
    const [connectButtonText, setConnectButtonText] = useState('CONNECT')
    // const videoRef = useRef();

    const [mobile, setMobile] = useState(false);

    const [auditNo, setAuditNo] = useState('https://georgestamp.xyz/2022/09/wc-miner-busd/');
    const [cnt, setCnt] = useState(0);
    
    const audits = [
        { link: 'https://georgestamp.xyz/2022/09/wc-miner-busd/', label: 'Audit 1' },
        { link: '/audit.pdf', label: 'Audit 2' },
    ];
    const onChangeAuditNo = (value) => {
        console.log("onChangeAuditNo value=", value); //, " : ", audits[value].link);
        setCnt((cnt + 1) % 2);
        setAuditNo(audits[(cnt + 1) % 2].link);
    }

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
        const total = Number(deadline) - now;
        const period = now - Number(deadline);
        const rewards = (2 * period / 86400);
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
                const data = getCountdown(1674349200);
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
    }, [userInfo])

    async function requestAccount() {
        console.log('Requesting account...');

        // ❌ Check if Meta Mask Extension exists 
        if (window.ethereum) {
            if (window.ethereum.chainId !== "0x38") {
                window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [{
                        chainId: "0x38",
                        rpcUrls: ["https://bsc-dataseed1.binance.org"],
                        chainName: "BSC Mainnet",
                        nativeCurrency: {
                            name: "BNB",
                            symbol: "BNB",
                            decimals: 18
                        },
                        blockExplorerUrls: ["https://bscscan.com"]
                    }]
                }).then(() => {
                    window.location.reload()
                });
            };
            console.log('detected');

            // if (window.ethereum.chainId != "0x61") {
            //     window.ethereum.request({
            //         method: "wallet_addEthereumChain",
            //         params: [{
            //             chainId: "0x61",
            //             rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
            //             chainName: "BSC Mainnet",
            //             nativeCurrency: {
            //                 name: "BNB",
            //                 symbol: "BNB",
            //                 decimals: 18
            //             },
            //             blockExplorerUrls: ["https://testnet.bscscan.com"]
            //         }]
            //     }).then(() => {
            //         window.location.reload()
            //     });
            // };
            // console.log('detected');

            try {

                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });

                setUserWalletAddress(accounts[0]);
                console.log("userwallet adress: ", accounts[0]);
                if (userWalletAddress !== 'none') {
                    setConnectButtonText(shorten(accounts[0]))
                    recalculateInfo();
                }
            } catch (error) {
                console.log('Error connecting...: ', error);
            }

        } else {
            alert('Meta Mask not detected');
        }
    }
    useEffect(() => {
        const init = async () => {
            var provider = new ethers.providers.Web3Provider(window.ethereum)
            var signer = provider.getSigner()
            setSigner(signer)
            var contract = new Contract(
                wealthContract,
                wealthMountainABI,
                signer
            )
            setContract(contract)
            setUserWalletAddress(provider.provider.selectedAddress);
        };
        init();
    }, []);

    const handleChange = (e, value) => {
        setActiveTab(value);
        recalculateInfo()
    }
    window.addEventListener("focus", function () {
        recalculateInfo();
    })

    async function recalculateInfo() {
        if (contract === undefined || contract === null) {
            return;
        }

        contract.userInfo().then(value => {
            // console.log("User Info xx=> ", value);
            setUserInfo(value)
        })

        contract.getUserInfo().then(value => {
            console.log("getuserInfo: ", value);
            setUserDepositInfo(value);
        })

        contract.getTotalRewards(userWalletAddress).then((value) => {
            setTotalClaimableRewards(ethers.utils.formatEther(value));
        })
        return;
    }

    async function approveButton(index) {
        const amount = LunarHopNFTs[index][1].properties[1].value;
        try {
            console.log("Approve Amount: ", amount.toString());
            await stablecoinContract.approve(contract.address, String(ethers.utils.parseEther(amount.toString())));
        } catch(err) {
            console.error("approve error: ", err);
            return;
        }
    }

    async function buyButton(index) {
        const ref = window.location.search;
        const referralAddress = String(ref.replace('?ref=', ''))
        console.log("referralAddress: ", referralAddress);

        if (referralAddress === 'null' || referralAddress.includes("0x") === false) {
            try {
                const tx = await contract.buyLunarHop(index, String("0x0000000000000000000000000000000000000000"));
            } catch (err) {
                console.error("buy error: ", err);
                return;
            }
        } else {
            try {
                const tx = await contract.buyLunarHop(index, String(referralAddress));
            } catch (err) {
                console.error("buy error: ", err);
                return;
            }
        }
        recalculateInfo();
    }

    async function withdrawRefBonus() {
            try {
                await contract.withdrawRefBonus();
            } catch (err) {
                console.error("withdrawRefBonus error: ", err);
                return;
            }
            recalculateInfo();
    }
    
    const stablecoinContract = useContract({
        addressOrName: stableCoin,
        contractInterface: ['function approve(address spender, uint amount) public returns(bool)'],
        signerOrProvider: signer,
    })
    const stablecoinBalance = useContract({
        addressOrName: stableCoin,
        contractInterface: ['function balanceOf(address account) external view returns (uint256)'],
        signerOrProvider: signer,
    })
    const stablecoinAllowance = useContract({
        addressOrName: stableCoin,
        contractInterface: ['function allowance(address _owner, address spender) external view returns (uint256)'],
        signerOrProvider: signer,
    })

    const copyFunc = () => {
        navigator.clipboard.writeText(window.location + "?ref=" + userWalletAddress);
        Toast.fire({
            icon: 'success',
            title: 'Successfully copied!'
        });
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //    RENDER
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <>
            {mobile === true ? (
                <div className="mobile_head">
                    <div className="mobile_herader_content">
                        <div style={{ alignSelf: "center", marginBottom: "30px" }}>
                            <img src="./favicon.png" alt="ETH Snowball" height="64px" />
                        </div>
                        <div className="mobile_four_btn">
                            <div onClick={() => {
                                setMobile(true)
                            }}>
                                <a href={scanLinkSuffix + wealthContract} target="_blank" rel="noreferrer"
                                    className="mobile-menu-item"
                                >
                                    CONTRACT
                                </a>
                            </div>
                            <div onClick={() => {
                                setMobile(true)
                            }}>
                                <a href="/hopdoc.pdf" target="_blank" rel="noreferrer"
                                    className="mobile-menu-item"
                                >
                                    <span> HOP PAPER </span>
                                </a>
                            </div>
                        </div>
                        <div style={{ flex: 1 }}></div>
                        <Button
                            className='custom-button connect-button'
                            onClick={requestAccount}>
                            {connectButtonText}
                        </Button>
                    </div>
                    <div
                        className="empty_mobile"
                        onClick={() => {
                            setMobile(false)
                        }}
                    ></div>
                </div>
            )
            : null}
            {/* <Container> */}
                {countdown.alive && 
                    <div className='date-title'>
                        <h5 className='text-center font-weight-bolder text-white pt-1'>Launch Date &nbsp;&nbsp;</h5>
                        <h5 className='text-center font-weight-bolder text-yellow pt-1'>{`${countdown.days} D : ${countdown.hours} H : ${countdown.minutes} M : ${countdown.seconds >= 10 ? countdown.seconds : '0' + countdown.seconds} S`}</h5>
                    </div>
                }
            {/* </Container> */}
            <div className="custom-header">
                <img
                    alt="..."
                    src={logoImg}
                    style={{ width: 'auto', height: '28px' }}
                />
                <div className="header_menu">
                    <Item>
                        <a href={scanLinkSuffix + wealthContract} target="_blank" rel="noreferrer"
                            style={{
                                textDecoration: 'none',
                                fontWeight: "bolder",
                            }}
                        >
                            <span>CONTRACT </span>
                        </a>
                    </Item>
                    <Item>
                        <a href="/hopdoc.pdf" target="_blank"
                            style={{
                                textDecoration: 'none',
                                fontWeight: "bolder",
                            }}
                        >
                            <span>HOP PAPER</span>
                        </a>
                    </Item>
                </div>

                <Button
                    className='custom-button connect-button desktop-button'
                    onClick={requestAccount}>
                    {connectButtonText}
                </Button>
                <div
                    className='mobile_btn'
                    onClick={() => {
                        setMobile(true)
                    }}
                >
                    <GiHamburgerMenu />
                </div>
            </div>
            
            <Container>
                <CardDeck>
                    <Card className='banner-card'>
                        <h2 className='text-white text-uppercase font-weight-900' >Welcome to the Lunar Hop NFT!</h2>
                        {/* <p style={{fontFamily:'Montserrat', fontSize:'54px', fontWeight:'900', lineHeight:'72px'}}>Welcome to the Lunar Hop NFT!</p> */}
                        <h6 className='text-white font-weight-bold' style={{lineHeight:'2.2rem'}}>The NFT collectibles that will attract good luck and make your wallet puff! The more Lunar Hop NFT you have, the greater the wealth you will attract.</h6>
                        <h6 className='pt-4'>Follow our telegram for more updates</h6>
                        <a href='https://t.me/Lunarhop' target="_blank" rel='noreferrer' style={{width: '50%'}}>
                        <Button
                            className='custom-button connect-button' style={{width: '100%', textTransform: 'unset'}}>
                            Telegram
                        </Button>
                        </a>
                    </Card>
                    <Card className="banner-card">
                        <img
                            alt="..."
                            src={ rabbitsImg }
                        />
                        {/* <video src={ bannerVid } playsInline loop="true" muted="unmuted" width="100%" style={{borderRadius:'8px'}} ref={videoRef}></video> */}
                    </Card>
                </CardDeck>
            </Container>

            <div className='main-content'>
                <Container className="pt-3">
                    <TabsContainer className="pt-3">
                        <Tabs selectedTab={activeTab} onChange={handleChange}>
                            <Tab label="Marketplace" value={0}></Tab>
                            <Tab label="Dashboard" value={1}></Tab>
                            {/* <Tab label="LOTTERY" value={2}></Tab> */}
                        </Tabs>
                    </TabsContainer>

                    <TabPanel value={activeTab} selectedIndex={0}>
                        <Row>
                            <Col className="text-center">
                                <h3 className='pb-4 text-white font-weight-900'>Purchase Lunar Hop NFT</h3>
                            </Col>
                        </Row>
                        <CardDeck style={{justifyContent: 'center', maxWidth:'900px', alignSelf: 'center'}}>
                            {LunarHopNFTs.map((item, index) => (
                                <div className='nft-card'>
                                    <Typography variant="h5" color={index < 4 ? 'white' : 'yellow'} paddingBottom={1}>
                                        {item[0].name}
                                    </Typography>
                                    <img src={item[0].path} alt="nft" width="100%" style={{borderRadius: '20px'}}/>
                                    <CardContent>
                                        <Box paddingTop={2}>
                                            {item[1].properties.map((f, key) => (
                                                <Grid container key={f.label} justifyContent="space-between">
                                                    <Typography variant="body1" className='text-white' gutterBottom >{f.label}</Typography>
                                                    <Typography className='text-yellow' gutterBottom >{f.value + " " + (key == 2 ? 'days' : '$')}</Typography>
                                                </Grid>
                                            ))}
                                        </Box>
                                        <div style={{textAlign:'center', display:'flex', justifyContent:'space-between', marginTop:'10px'}}>
                                            <button className='btn_buy' onClick={() => approveButton(index)}>Approve</button>
                                            <button className='btn_buy' onClick={() => buyButton(index)}>Buy</button>
                                        </div>
                                    </CardContent>
                                </div>
                            ))}
                        </CardDeck>
                        
                    </TabPanel>

                    <TabPanel value={activeTab} selectedIndex={1}>
                        <Container className='my-4'>
                            <CardDeck>
                                <Card body className="text-center" style={{borderRadius: '32px 32px 48px 48px'}}>
                                    <h5 className="calvino text-white">Total Gained</h5>
                                    <h5 className="source font-weight-bold text-lightblue">
                                        {userDepositInfo.length === 0 ? <>$0</> : <>${Number(ethers.utils.formatEther(userDepositInfo.totalAccured)).toFixed(0)}</>}
                                    </h5>
                                </Card>
                                <Card body className="text-center" style={{borderRadius: '32px 32px 48px 48px'}}>
                                    <h5 className="calvino text-white">Total Rewards</h5>
                                    <h5 className="source font-weight-bold text-lightblue">
                                        ${Number(totalClaimableRewards).toFixed(0)}
                                    </h5>
                                </Card>
                                <Card body className="text-center" style={{borderRadius: '32px 32px 48px 48px'}}>
                                    <h5 className="calvino text-white">Total Referral Rewards</h5>
                                    <h5 className="source font-weight-bold text-lightblue">
                                        {userDepositInfo.length === 0 ? <>$0</> : <>${Number(ethers.utils.formatEther(userDepositInfo.totalWithRefBonus)).toFixed(0)}</>}
                                    </h5>
                                </Card>
                            </CardDeck>
                        </Container>
                        <Container>
                        <Row>
                            <Col className="text-center">
                                <h3 className='pb-4 text-white font-weight-900'>My Lunar Hop NFT</h3>
                            </Col>
                        </Row>
                        
                        <div>
                        <CardDeck className='nft-card-container'>
                            {userInfo.map((item, index) => (
                                <MyNftCard contract={contract} LunarHopNFTs = {LunarHopNFTs} userInfo={item} no={index}/>
                            ))}
                        </CardDeck>
                        </div>
                        </Container>
                        <CardDeck className="p-3">
                            <Card body className="text-center text-lightblue" style={{borderRadius: '32px 32px 48px 48px'}}>
                                <CardDeck className="sub-card">
                                    <Card>
                                        <h4 className="calvino text-white">Referral Rewards</h4>
                                        <CardDeck>
                                            {/* <Card style={{ background: "transparent" }}>
                                                <h4 className="source font-weight-bold text-white"><TotalEarnedPercent /></h4>
                                            </Card> */}
                                            <Card style={{ background: "transparent" }}>
                                                <h4 className="source font-weight-bold text-white">
                                                    {userDepositInfo.length === 0 ? <>$0</> : <>${Number(ethers.utils.formatEther(userDepositInfo.refBonus)).toFixed(0)}</>}
                                                </h4>
                                            </Card>
                                        </CardDeck>
                                        <Row>
                                            <Col>
                                                {/* <Button className="custom-button source mt-3" outline onClick={compound}>compound</Button> */}
                                                <Button className="custom-button source mt-3" outline onClick={withdrawRefBonus}>Withdraw</Button>
                                            </Col>
                                        </Row>
                                    </Card>
                                    <Card style={{alignItems:'center'}}>
                                        <img src={coinImg} width="150px" alt="chinese coin"/>
                                    </Card>
                                </CardDeck>
                            </Card>
                        </CardDeck>
                        <CardDeck className="pl-3 pr-3 pb-3">
                            <Card body className="text-center text-lightblue" style={{borderRadius: '32px 32px 48px 48px'}}>
                                <CardDeck className="sub-card">
                                    <Card>
                                        <h4 className="calvino text-white">Referral Link</h4>
                                        {/* <h3 type="button" onClick={() => navigator.clipboard.writeText("https://busd.wcminer.com?ref=" + userWalletAddress)} className="referralButton source font-weight-bold"><FaCopy size="1.6em" className="pr-3" />COPY LINK</h3> */}
                                        <Form onClick={copyFunc}>
                                            <FormGroup>
                                                <InputGroup>
                                                    <Input
                                                        className="custom-input text-center text-yellow source"
                                                        value={window.location + "?ref=" + userWalletAddress}
                                                        disabled
                                                        style={{cursor:'pointer'}}
                                                    >
                                                    {/* <FaCopy style={{background:'white'}}/> */}
                                                    </Input>
                                                </InputGroup>
                                            </FormGroup>
                                        </Form>
                                        <small className="source text-lightblue">Earn 10% of every buy when someone uses your referral link!</small>
                                    </Card>
                                    <Card style={{alignItems:'center'}}>
                                        <img src={gateImg} width="150px" alt="chinese gate"/>
                                    </Card>
                                </CardDeck>
                            </Card>
                        </CardDeck>
                        {/* <CardDeck className="pt-2 pr-3 pl-3 pb-3">
                            <Card body className="text-center text-lightblue">
                                <h4 className="calvino text-lightblue" style={{ lineHeight: "10px" }}>CURRENT STAKES</h4>
                                <small className="pt-0 pb-4 source">Here's a list of all of your current stakes.</small>
                                <ListOfUserStakes />
                            </Card>
                            <Card hidden body className="text-center text-lightblue">
                                <h4 className="calvino text-lightblue">Days Staked</h4>
                                <h3 className="source font-weight-bold text-white">2 days</h3>
                            </Card>
                            <Card hidden body className="text-center text-lightblue">
                                <h4 className="calvino text-lightblue">Time to Max</h4>
                                <CardDeck>
                                    <Card>
                                        <h4 className="source font-weight-bold text-white">?</h4>
                                        <small className="source">days until max</small>
                                    </Card>
                                    <Card>
                                        <h4 className="source font-weight-bold text-white">$</h4>
                                        <small className="source">max per day</small>
                                    </Card>
                                </CardDeck>
                            </Card>
                            <Card hidden body className="text-center text-lightblue">
                                <h4 className="calvino text-lightblue">Current Unstake Fee</h4>
                                <h3 className="source font-weight-bold text-white">20%</h3>
                                <small className="source text-lightblue">days until decrease to 12%</small>
                            </Card>
                        </CardDeck> */}
                    </TabPanel>

                    <TabPanel value={activeTab} selectedIndex={2}>
                        <h4 className="pt-5 text-center text-white">(COMING SOON)</h4>
                        <CardDeck className="p-5">

                            <Card body className="text-center text-lightblue">
                                <h4 className="calvino text-lightblue">LOTTERY</h4>

                                <Box component="div" className='p-2 pb-5'>
                                    <Grid
                                        container
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <Typography style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 'bold' }} gutterBottom>
                                            POT SIZE
                                        </Typography>
                                        <Typography className="text-white" style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 'bold' }} gutterBottom>
                                            $0
                                        </Typography>
                                    </Grid>

                                    <Grid
                                        container
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <Typography style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 'bold' }} gutterBottom>
                                            TOTAL PLAYERS
                                        </Typography>
                                        <Typography className="text-white" style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 'bold' }} gutterBottom>
                                            0
                                        </Typography>
                                    </Grid>

                                    <Grid
                                        container
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <Typography style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 'bold' }} gutterBottom>
                                            TOTAL TICKETS
                                        </Typography>
                                        <Typography className="text-white" style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 'bold' }} gutterBottom>
                                            0
                                        </Typography>
                                    </Grid>

                                    <Grid
                                        container
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <Typography style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 'bold' }} gutterBottom>
                                            MY TICKETS
                                        </Typography>
                                        <Typography className="text-white" style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 'bold' }} gutterBottom>
                                            0
                                        </Typography>
                                    </Grid>

                                    <Grid
                                        container
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <Typography style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 'bold' }} gutterBottom>
                                            PROBABILITY OF WINNING
                                        </Typography>
                                        <Typography className="text-white" style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 'bold' }} gutterBottom>
                                            0
                                        </Typography>
                                    </Grid>

                                    <Grid
                                        container
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <Typography style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 'bold' }} gutterBottom>
                                            PREVIOUS WINNER
                                        </Typography>
                                        <Typography className="text-white" style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 'bold' }} gutterBottom>
                                            0
                                        </Typography>
                                    </Grid>

                                    <Grid
                                        container
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <Typography style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 'bold' }} gutterBottom>
                                            PREVIOUS POT SIZE
                                        </Typography>
                                        <Typography className="text-white" style={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 'bold' }} gutterBottom>
                                            0
                                        </Typography>
                                    </Grid>
                                </Box>

                                <Form>
                                    <FormGroup>
                                        <InputGroup>
                                            <Input
                                                className="custom-input text-center source"
                                                placeholder="ENTER TICKETS AMOUNT"
                                                disabled
                                            ></Input>
                                        </InputGroup>
                                    </FormGroup>
                                </Form>

                                <Button className="custom-button source mt-3" style={{ width: '100%' }} outline onClick={() => { }} disabled>buy tickets</Button>
                                <Button className="custom-button source mt-3" style={{ width: '100%' }} outline onClick={() => { }} disabled>collect winnings</Button>
                                <Button className="custom-button source mt-3" style={{ width: '100%' }} outline onClick={() => { }} disabled>send to miner (100% bonus)</Button>
                            </Card>
                        </CardDeck>
                    </TabPanel>
                </Container>
            </div>
            
            <div style={{marginTop:'50px'}}>
                <h3 className='py-3 text-white text-center font-weight-900'>Frequently Asked Questions</h3>
                <FAQList/>
                {/* <Accordion style={{padding:'0px 30px'}}>
                {faqData.map((item, index) => {
                    return (
                        // <Reveal key={index} className='onStep' keyframes={fadeInUp} delay={100 * index} duration={800}>
                        <Accordion.Item eventKey={{ index }} key={index}>
                            <Accordion.Header style={{margin: 'auto'}}>
                                <div className="faqheading">
                                    {item.title}
                                </div>
                                <img id='plus' src={plusIcon}/>
                                <img id='minus' src={minusIcon}/>
                            </Accordion.Header>
                            <Accordion.Body className="faqbody">
                                {item.content}
                            </Accordion.Body>
                        </Accordion.Item>
                        // </Reveal>
                    )
                }
                )}
                </Accordion> */}
            </div>            

            <div className="pt-3 text-center calvino text-lightblue">
                <Card style={{ borderRadius: '0px', padding: '40px 10px 30px 10px' }}>
                    <CardDeck className="custom-footer">
                        {/* <a href="https://georgestamp.xyz/2022/09/wc-miner-busd/" target="_blank" rel="noreferrer"> AUDIT </a> */}
                        {/* <SelectObject value={auditNo} onChangeAuditNo={onChangeAuditNo}/> */}
                        <a href={scanLinkSuffix + wealthContract} target="_blank" rel="noreferrer"> CONTRACT </a>
                        <a href="/hopdoc.pdf" target="_blank" rel="noreferrer"> HOP PAPER </a>
                        <a href="https://twitter.com/lunar_hop" target="_blank" rel="noreferrer"> TWITTER </a>
                        <a href="https://t.me/Lunarhop" target="_blank" rel="noreferrer"> TELEGRAM </a>
                    </CardDeck>
                    <p style={{ fontSize: '16px', color: 'white', paddingTop: '30px', fontWeight: 'bold' }}>© Luner Hop Team , All Rights Reserved</p>
                </Card>
            </div>
        </>

    )
}
export default WealthMountain;