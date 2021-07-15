import React from 'react'
import { useState, useRef } from 'react'
import img_dai from '../dai.png'

const Main = ({balances, stakeTokens}) => {

    // states
    const [input, setInput] = useState("")
    // refs
    const inputRef = useRef()

    const handleSubmit = event => {
        event.preventDefault();
        let amount = window.web3.utils.toWei(input, 'Ether') 
        stakeTokens(amount)
    }

    return (
        <div id="content" className="mt-3">

            {/* table */}
            <table className="table table-borderless tet-muted text-center">
                <thead>
                    <tr>
                        <th>Staking Balance</th>
                        <th>Reward Balance</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{window.web3.utils.fromWei(balances[2], 'ether')} DAI</td>
                        <td>{window.web3.utils.fromWei(balances[1], 'ether')} FIJI</td>
                    </tr>
                </tbody>
            </table>


            {/* form  */}
            <div className="card mb-4 p-3">
                <form 
                    className="mb-3"
                    onSubmit={handleSubmit}
                >
                    <div>
                        <label className="float-start"><b>Stake Tokens</b></label>
                        <span className="float-end text-muted">
                            Balance: {window.web3.utils.fromWei(balances[0], 'ether')}
                            {/* Balance: {balances[0]} */}
                        </span>
                    </div>

                    <div className="input-group mb-4">
                        {/* textbox */}
                        <input
                            ref={inputRef}
                            onChange={event => setInput(event.target.value)}
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="0"
                            required
                        >
                        </input>

                        {/* submit button */}
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <img src={img_dai} height='32' alt=""/>
                                &nbsp;&nbsp;&nbsp; DAI
                            </div>
                        </div>

                    </div>
                        {/* stake button */}
                        <button type="submit" className="btn btn-primary col-12 btn-lg">STAKE!</button>
                </form>
            </div>
            
        </div>
    )
}

export default Main
