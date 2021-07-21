import React, {useContext} from 'react';
import {GlobalState} from "../../../GlobalState";
import {Link} from "react-router-dom";

function OrderHistory(props) {
    const state = useContext(GlobalState);
    const [history] = state.userAPI.history


    return (
        <div>
            <div className="history-page">
                <h2>History</h2>

                <h4>You have {history.length} ordered</h4>

                <table>
                    <thead>
                    <tr>
                        <th>Payment ID</th>
                        <th>Date of Purchased</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        history.map(item => (
                            <tr key={item._id}>
                                <td>{item.paymentID}</td>
                                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                <td><Link to={`/history/${item._id}`}>View</Link></td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default OrderHistory;