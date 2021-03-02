import React from 'react';
import tt from 'counterpart';
import {
    formatDecimal,
    parsePayoutAmount,
} from 'app/utils/ParsersAndFormatters';

const SidebarTokenPrice = ({

}) => {

const total = [0,0];
const total2= [0,0];
//    parsePayoutAmount()
//    formatDecimal()

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
                            <div>{tt('g.valor')}</div>
                            <div>
                                <span className="integer">{total[0]}</span>
                                <span className="decimal">{total[1]}</span>
                            </div>
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
                            <div>{tt('g.valor')}</div>
                            <div>
                                <span className="integer">{total2[0]}</span>
                                <span className="decimal">{total2[1]}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>


    );
};

export default SidebarTokenPrice;