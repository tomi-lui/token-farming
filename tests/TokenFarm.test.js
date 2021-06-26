

const DaiToken = artifacts.require('DaiToken')
const FijiToken = artifacts.require('FijiToken')
const TokenFarm = artifacts.require('TokenFarm')

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('TokenFarm', (accounts) => {

    // test contract name
    describe('Dai Token Deployment', async() => {
        it('Has a name', async ()=> {
            let daiToken = await DaiToken.new()
            const name = await daiToken.name()
            console.log(name)
            assert.equal(name, 'Dai Token')
        })
    })

})