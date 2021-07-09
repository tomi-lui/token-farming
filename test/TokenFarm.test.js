const DaiToken = artifacts.require('DaiToken')
const FijiToken = artifacts.require('FijiToken')
const TokenFarm = artifacts.require('TokenFarm')

require('chai')
  .use(require('chai-as-promised'))
  .should()

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

contract('TokenFarm', ([owner, investor]) => {
  let daiToken, fijiToken, tokenFarm

  before(async () => {
    // Load Contracts
    daiToken = await DaiToken.new()
    fijiToken = await FijiToken.new()
    tokenFarm = await TokenFarm.new(fijiToken.address, daiToken.address)

    // Transfer all Dapp tokens to farm (1 million)
    await fijiToken.transfer(tokenFarm.address, tokens('1000000'))

    // Send tokens to investor
    await daiToken.transfer(investor, tokens('100'), { from: owner })
  })

  describe('Mock DAI deployment', async () => {
    it('has a name', async () => {
      const name = await daiToken.name()
      assert.equal(name, 'Mock DAI Token')
    })
  })

  describe('Fiji Token deployment', async () => {
    it('has a name', async () => {
      const name = await fijiToken.name()
      assert.equal(name, 'Fiji Token')
    })
  })

  describe('Token Farm deployment', async () => {
    it('has a name', async () => {
      const name = await tokenFarm.name()
      assert.equal(name, 'Token Farm')
    })

    it('contract has tokens', async () => {
      let balance = await fijiToken.balanceOf(tokenFarm.address)
      assert.equal(balance.toString(), tokens('1000000'))
    })
  })

  describe('Farming tokens', async () => {

    it('rewards investors for staking mDai tokens', async () => {
            let result
            
            result = await daiToken.balanceOf(owner)
            console.log("owner balance:")
            console.log(result.toString())
            console.log(result.address)
            

            // Check investor balance before staking
            result = await daiToken.balanceOf(investor)
            assert.equal(result.toString(), tokens('100'), 'investor Mock DAI wallet balance correct before staking')

            // Stake Mock DAI Tokens
            await daiToken.approve(tokenFarm.address, tokens('100'), { from: investor })
            await tokenFarm.stakeTokens(tokens('100'), { from: investor })

        })
    })
})