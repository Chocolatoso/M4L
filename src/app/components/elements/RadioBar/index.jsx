import React, { Component } from 'react';
import PlayerCode from './PlayerCode';
import PlayerList from './PlayerList';


export default class RadioPlayer extends Component {


    componentDidMount() {


   
    }

    render() {
        return (
            <div>
                <PlayerCode />
                <PlayerList />
            </div>
        );
    }
}