const { assert } = require('chai')
var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
chai.should()

const DaiToken = artifacts.require('DaiToken')
const FijiToken = artifacts.require('FijiToken')
const TokenFarm = artifacts.require('TokenFarm')


function toWei(n) {
    return web3.utils.toWei(n, 'ether')
}


contract('TokenFarm', ([owner, investor]) => {

    // initialize variables
    let daiToken, fijiToken, tokenFarm

    // before running tests
    before(async() => {
        daiToken = await DaiToken.new()
        fijiToken = await FijiToken.new()
        tokenFarm = await TokenFarm.new(fijiToken.address, daiToken.address)

        // transfer all Fiji tokens to farm (1 million)
        await fijiToken.transfer(tokenFarm.address, toWei('1000000'))

        // Send mock dai tokens to investor to prototype
        // { from: owner } specifies who is calling this function
        await daiToken.transfer(investor, toWei('100'), { from: owner } )

    })

    // test contract name
    describe('Dai Token Deployment', async() => {
        it('Has a name', async ()=> {
            const name = await daiToken.name()
            console.log(name)
            assert.equal(name, 'Mock DAI Token')
        })
    })

    describe('Fiji Token Deployment', async() => {
        it('Has a name', async ()=> {
            const name = await fijiToken.name()
            console.log(name)
            assert.equal(name, 'Fiji Token')
        })
    })

    describe('Token Farm Deployment', async() => {
        it('Has a name', async ()=> {
            const name = await tokenFarm.name()
            console.log(name)
            assert.equal(name, 'Token Farm')
        })

        // test investors balance of DAI holdings
        it('contract has tokens', async () => {
            let balance = await fijiToken.balanceOf(tokenFarm.address)
            assert.equal(balance.toString(), toWei('1000000'))
        })


    })

})