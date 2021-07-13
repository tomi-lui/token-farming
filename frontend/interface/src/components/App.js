import React, { Component, useEffect } from 'react'
import Navbar from './Navbar'
import './App.css'
import { useState } from 'react'
import Web3 from 'web3'
import DaiToken from '../abis/DaiToken.json'
import FijiToken from '../abis/FijiToken.json'
import TokenFarm from '../abis/TokenFarm.json'


// load web3
async function loadWeb3() {
  if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
}


function App() {

    // useEffect
    useEffect( () => {
      loadWeb3()
      loadBlockChainData()
    }, [])

    // state variables
    const [loading, setLoading] = useState(true)
    const [account, setAccount] = useState('0x0')
    const [daiToken, setDaiToken] = useState({})
    const [fijiToken, setFijiToken] = useState({})
    const [tokenFarm, setTokenFarm] = useState({})
    const [fijiTokenBalance, setFijiTokenBalance] = useState('0')
    const [daiTokenBalance, setDaiTokenBalance] = useState('0')
    const [stakingBalance, setStakingBalance] = useState('0')




    async function loadBlockChainData() {

        // connect to web3      
        const web3 = window.web3

        // get current account
        const accounts = await web3.eth.getAccounts()
        setAccount(accounts[0])
        console.log(accounts);

        // get network id
        const networkId = await web3.eth.net.getId()

        // to create the javascript smart contract, we need the abi and the contract itself

        // get daiToken network data
        const daiTokenData = DaiToken.networks[networkId]
        if (daiTokenData) { // if contract detected

          // create a daiToken contract
          const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address)

          setDaiToken(daiToken)
          
          // get daiToken balance of current user
          let daiBalance = await daiToken.methods.balanceOf(account).call()
          setDaiTokenBalance(daiBalance)

          console.log("balance: ", daiBalance);

        } else {
          alert('DaiToken contract not deployed to detected network')
        }


        // get FijiToken network data
        const fijiTokenData = FijiToken.networks[networkId]
        if (fijiTokenData) { // if contract detected

          // create a FijiToken contract
          const fijiToken = new web3.eth.Contract(FijiToken.abi, fijiTokenData.address)
          setFijiToken(fijiToken)
          
          // get fijiToken balance of current user
          let daiBalance = await fijiToken.methods.balanceOf(account).call()
          setFijiTokenBalance(daiBalance)

        } else {
          alert('FijiToken contract not deployed to detected network')
        }



        // get TokenFarm network data
        const tokenFarmData = TokenFarm.networks[networkId]
        if (tokenFarmData) { // if contract detected

          // create a TokenFarm contract
          const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address)
          setTokenFarm(tokenFarm)

          // get staking balance
          let stakingBalance = await tokenFarm.methods.stakingBalance(account).call()
          setStakingBalance(stakingBalance)

        } else {
          alert('tokenFarm contract not deployed to detected network')
        }


        setLoading(false)
    }

    return (
      <div>
        <Navbar account={account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>

                <h1>Hello, World!</h1>

              </div>
            </main>
          </div>
        </div>
      </div>
    );
}


export default App;
