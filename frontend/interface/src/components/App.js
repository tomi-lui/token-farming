import React, { Component, useEffect, useState } from 'react'
import Web3 from 'web3'
import Navbar from './Navbar'
import Main from './Main'
import './App.css'
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
    const [fijiTokenBalance, setFijiTokenBalance] = useState('')
    const [daiTokenBalance, setDaiTokenBalance] = useState('')
    const [stakingBalance, setStakingBalance] = useState('')
    const [networkId, setNetworkId] = useState()

    // print variables for testing
    function printVars(){
        console.log("current account:", account);
        console.log("network id", networkId);
        console.log("DAI balance: ", daiTokenBalance);
        console.log("fiji balance: ", fijiTokenBalance);
        console.log("staking balance: ", stakingBalance);
    }

    // allow users to stake tokens
    async function stakeTokens(amount) {
      console.log("staking ", amount, "DAI tokens");
      console.log(tokenFarm._address);
      console.log("typeof amount:", typeof(amount));
      setLoading(true)
      // first approve the transaction
      daiToken.methods.approve(tokenFarm._address, amount)
      .send({ from: account })
      .on('transactionHash', (hash) => {
        tokenFarm.methods.stakeTokens(amount)
        .send({ from: account })
        .on('transactionHash', (hash) => {
          console.log(hash);
        })
      })
      setLoading(false)
      console.log("take tokens finished");
      loadBlockChainData()
      
    }

    async function loadBlockChainData() {
        /*
        this function creates javascript contracts for 
        the fijiToken, DaiToken and tokenFarm.
        Then calls to retrieve user data
        */


        // connect to web3      
        const web3 = window.web3

        // loop to wait for connection
        while (!web3.eth.net.isListening()) {
          console.log("trying to connecting");
        }
        console.log("web3 is listening");

        // get current account    
        const accounts = await web3.eth.getAccounts()
        setAccount(accounts[0])

        // get network id
        let networkId = await web3.eth.net.getId()
        setNetworkId(networkId)

        // to create the javascript smart contract, we need the abi and the contract itself


        loadDaiData()
        loadFijiData()
        loadFarmData()
        printVars()
        setLoading(false)
    }

    async function loadFarmData() {
        
      const web3 = window.web3

        // get TokenFarm network data
        const tokenFarmData = TokenFarm.networks[networkId]
        if (tokenFarmData) { // if contract detected

          // create a TokenFarm contract
          const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address)
          setTokenFarm(tokenFarm)

          try {
            // get staking balance
            let stakingBalance = await tokenFarm.methods.stakingBalance(account).call()
            setStakingBalance(stakingBalance.toString())
          } catch (error) {
            console.log(error)
          }

        } else {
          console.log('tokenFarm contract not deployed to detected network')
        }
    }

    async function loadFijiData() {

        const web3 = window.web3
        
        // get FijiToken network data
        const fijiTokenData = FijiToken.networks[networkId]
        if (fijiTokenData) { // if contract detected

          // create a FijiToken contract
          const fijiToken = new web3.eth.Contract(FijiToken.abi, fijiTokenData.address)
          setFijiToken(fijiToken)
          
          // get fijiToken balance of current user
          try {
            let fijiBalance = await fijiToken.methods.balanceOf(account).call()
            setFijiTokenBalance(fijiBalance.toString())

          } catch (error) {
            console.log(error);
          }

        } else {
          console.log('FijiToken contract not deployed to detected network')
        }
    }

    async function loadDaiData() {

        const web3 = window.web3

        // get daiToken contract, and network data
        const daiTokenData = DaiToken.networks[networkId]
        if (daiTokenData) { // if contract detected

          // create and set daiToken contract
          const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address)
          setDaiToken(daiToken)
          
          // get and set daiToken balance of current user
          let daiBalance = "0" ;
          if (account !== "0x0") {
            daiBalance = await daiToken.methods.balanceOf(account).call()
            console.log("daiBalance",daiBalance);
          }
          setDaiTokenBalance(daiBalance.toString())

        } else { // if contract not detected
            console.log('DaiToken contract not deployed to detected network')
        }
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

                <h1>Hello, World!</h1>/
                {!loading 
                ? <Main 
                  balances={[daiTokenBalance, fijiTokenBalance, stakingBalance]}
                  stakeTokens={stakeTokens}
                />
                :<div>Loading...</div>
                }


              </div>
            </main>
          </div>
        </div>
      </div>
    );
}


export default App;
