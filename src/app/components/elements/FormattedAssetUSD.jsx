import React from 'react';
import {
    formatDecimal,
    parsePayoutAmount,
} from 'app/utils/ParsersAndFormatters';
import tt from 'counterpart';

export default class FormattedAssetUSD extends React.Component {

    constructor(props) {
        super(props);

        this.state = { usd: [0, 0], isFetching: true };
    }

    //    parsePayoutAmount()
    //    formatDecimal()

    componentDidMount = () => {
        console.info("MONTANDO COMPONENTE FORMAT ASSETS USD");
        this.fetchValue();
    }

    fetchValue = () => {
        fetch("https://api.hive-engine.com/rpc/contracts", {
            "headers": {
                "accept": "application/json, text/plain, ",
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
        }).then(response => response.json()).then(result => {
            const { amount } = this.props;
            if (amount && typeof amount === 'string') {
                amount = parsePayoutAmount(amount);
            }
            const lasPrice = result.result[0].lastPrice
            const valueInHive = lasPrice * amount;
            fetch("https://api.coingecko.com/api/v3/simple/price?ids=hive&vs_currencies=usd&include_24hr_change=true", {
                "headers": {
                    "accept": "application/json, text/plain, "
                },
            }).then(response => response.json()).then(res => {
                const hiveValue = res.hive.usd;
                this.setState({ ...this.state, usd: formatDecimal(valueInHive * hiveValue), isFetching: false })
            }).catch(e => {
                this.setState({ ...this.state, usd: formatDecimal(0), isFetching: false })
            })
        }).catch(e => {
            this.setState({ ...this.state, usd: formatDecimal(0), isFetching: false })
        })
    }

    render = () => {


        //const { classname } = this.props;
        const { usd, isFetching } = this.state;

        return (

            <span className={`FormattedAsset `}>
                {isFetching ? (<span className="asset"> </span>) : (

                    <span >
                        <span className="asset"> USD </span>
                        <span className="integer">{usd[0]}</span>
                        <span className="decimal">{usd[1]}</span>
                    </span>
                )}

            </span>
        )
    }

}