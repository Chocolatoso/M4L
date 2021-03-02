import React from 'react';
import tt from 'counterpart';
import {
    formatDecimal,
    parsePayoutAmount,
} from 'app/utils/ParsersAndFormatters';

export default class SidebarTokenPrice extends React.Component {
    constructor(props) {
        super(props);
        this.state = { state: props.initialState, isFetching: true, total: 0, total2: 0, error: false, totalUSD: [0, 0], total2USD: [0, 0] };
    }

    //    parsePayoutAmount()
    //    formatDecimal()

    componentDidMount = () => {
        console.info("MONTANDO COMPONENTE SIDEBAR TOKEN PRICE");
        this.fetchValue();
    }


    fetchValue = () => {
        this.setState({ ...this.state, isFetching: true });
        fetch("https://api.hive-engine.com/rpc/contracts", {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "es-419,es;q=0.9",
                "access-control-allow-origin": "*",
                "content-type": "application/json",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "cross-site"
            },
            "body": "{\"jsonrpc\":\"2.0\",\"id\":12,\"method\":\"find\",\"params\":{\"contract\":\"market\",\"table\":\"metrics\",\"query\":{\"symbol\":{\"$in\":[\"VIBES\",\"VIBESM\"]}},\"limit\":1000,\"offset\":0,\"indexes\":[]}}",
            "method": "POST",
            "mode": "cors",
            "credentials": "omit"
        }).then(response => response.json())
            .then(result => {


                fetch("https://api.coingecko.com/api/v3/simple/price?ids=hive&vs_currencies=usd&include_24hr_change=true", {
                    "headers": {
                        "accept": "application/json, text/plain, */*",
                        "accept-language": "es-419,es;q=0.9",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "cross-site"
                    },
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": null,
                    "method": "GET",
                    "mode": "cors",
                    "credentials": "omit"
                }).then(response => response.json()).then(res => {
                    const hiveValue = res.hive.usd;
                    const total = formatDecimal(parsePayoutAmount(result.result[0].lastPrice));
                    const total2 = formatDecimal(parsePayoutAmount(result.result[1].lastPrice));
                    const totalUSD = formatDecimal(parsePayoutAmount(total * hiveValue));
                    const total2USD = formatDecimal(parsePayoutAmount(total2 * hiveValue));

                    this.setState({ users: result, isFetching: false, error: false, total: total, total2: total2, totalUSD, total2USD })
                }).catch(e => {
                    this.setState({ ...this.state, isFetching: false, error: true, total: [0, 0], total2: [0, 0], totalUSD: [0, 0], total2USD: [0, 0] });
                });

            })
            .catch(e => {
                console.log(e);
                this.setState({ ...this.state, isFetching: false, error: true, total: [0, 0], total2: [0, 0], totalUSD: [0, 0], total2USD: [0, 0] });
            });

    };


    render = () => {
        const { isFetching, error, total, total2, totalUSD, total2USD } = this.state;

        return (
            <div className="c-sidebar__module">
                <div className="c-sidebar__header">
                    <div className="SidebarToken__header">
                        <h3 className="c-sidebar__h3">
                            <a
                                href={`https://hive-engine.com/?p=market&t=VIBES`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                VIBES
                            </a>
                        </h3>
                    </div>
                </div>
                <div className="c-sidebar__content">
                    <ul className="c-sidebar__list-small">
                        <li className="c-sidebar__list-item">
                            <div className="SidebarToken__item">
                                <div>Hive</div>
                                {isFetching ? (<div> {tt('g.loading')} </div>) : (<div>
                                    <span className="integer">${total[0]}</span>
                                    <span className="decimal">{total[1]}</span>
                                </div>)}


                            </div>
                        </li>
                        <li className="c-sidebar__list-item">
                            <div className="SidebarToken__item">
                                <div>USD</div>
                                {isFetching ? (<div> {tt('g.loading')} </div>) : (<div>
                                    <span className="integer">${totalUSD[0]}</span>
                                    <span className="decimal">{totalUSD[1]}</span>
                                </div>)}


                            </div>
                        </li>
                    </ul>
                </div>
                <div className="c-sidebar__header">
                    <div className="SidebarToken__header">
                        <h3 className="c-sidebar__h3">
                            <a
                                href={`https://hive-engine.com/?p=market&t=VIBESM`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                VIBESM
                            </a>
                        </h3>
                    </div>
                </div>
                <div className="c-sidebar__content">
                    <ul className="c-sidebar__list-small">
                        <li className="c-sidebar__list-item">
                            <div className="SidebarToken__item">
                                <div>Hive</div>
                                {isFetching ? (<div> {tt('g.loading')} </div>) : (<div>
                                    <span className="integer">${total2[0]}</span>
                                    <span className="decimal">{total2[1]}</span>
                                </div>)}
                            </div>
                        </li>
                        <li className="c-sidebar__list-item">
                            <div className="SidebarToken__item">
                                <div>USD</div>
                                {isFetching ? (<div> {tt('g.loading')} </div>) : (<div>
                                    <span className="integer">${total2USD[0]}</span>
                                    <span className="decimal">{total2USD[1]}</span>
                                </div>)}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }


}

