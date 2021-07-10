

const TokenFarm = artifacts.require('TokenFarm')

module.exports = async function(callback) {
    let tokenFarm = await TokenFarm.deployed()
    await tokenFarm.issueTokens()

    console.log("Tokens issued.")
    callback()
}

// // truffle exec issue workaround,
// // credits to: http://codingwithpassion.blogspot.com/2018/03/truffle-external-scripts-working-example.html
// module.exports = function(callback) {
//     let Web3 = require('web3');
//     const truffleContract = require('truffle-contract')
//     let contract = truffleContract(require('../build/contracts/TokenFarm.json'));
//     var provider = new Web3.providers.HttpProvider("http://localhost:7545");
//     var web3 = new Web3(provider);
//     contract.setProvider(web3.currentProvider);

//     //workaround: https://github.com/trufflesuite/truffle-contract/issues/57
//     if (typeof contract.currentProvider.sendAsync !== "function") {
//         contract.currentProvider.sendAsync = function() {
//             return contract.currentProvider.send.apply(
//                 contract.currentProvider, arguments
//             );
//         };
//     }
    
//     console.log("script running.")




//     // contract.deployed().then(function(instance){
//     //     return instance.yourFunction();
//     // }).then(response => {
//     //     console.log(response);
//     // });
// }