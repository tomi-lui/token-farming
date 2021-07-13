import React from 'react'
import { useState } from 'react'
import img_dai from '../dai.png'

const Main = ({balances}) => {

    // states
    const [input, setInput] = useState("")


    console.log(balances);

    return (
        <div id="content" className="mt-3">
            <table className="table table-borderless tet-muted text-center">
                <thead>
                    <tr>
                        <th>Staking Balance</th>
                        <th>Reward Balance</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{balances[2]} DAI</td>
                        <td>{balances[1]} FIJI</td>
                    </tr>
                </tbody>
            </table>


            {/* form  */}

            <div className="card mb-4">
                <form className="mb-3">
                    <div>
                        <label className="float-start"><b>Stake Tokens</b></label>
                        <span className="float-end text-muted">
                            Balance: {balances[0]}
                        </span>
                    </div>

                    <div className="input-group mb-4">
                        {/* textbox */}
                        <input
                            type="text"
                            ref={(input) => { setInput(input) }}
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
