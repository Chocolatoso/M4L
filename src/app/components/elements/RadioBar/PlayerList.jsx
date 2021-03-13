import React, { Component, Fragment } from 'react';
import tt from 'counterpart';

export default class PlayerList extends Component {


    render() {
        return (
            <div id="hap-playlist-list">
                <div id="playlist-audio">
                    <div className="hap-playlist-item" data-type="audio"
                        data-path="https://www.risingstargame.com/audio/radio/2.%20The%20Beautiful%20Ones.mp3" data-artist="Marcozannone"
                        data-title="Hopes for Tomorrow"
                        data-share="http://audiojungle.net/item/hopes-for-tomorrow/8256750?ref=Tean"
                        data-download="https://www.risingstargame.com/audio/radio/2.%20The%20Beautiful%20Ones.mp3"
                        data-link="http://audiojungle.net/item/hopes-for-tomorrow/8256750?ref=Tean" />

                
                </div>
                <div id="playlist-soundcloud">
                    {/* track set/playlist */}
                    <div className="hap-playlist-item" data-type="soundcloud"
                        data-path="https://soundcloud.com/simps1988/sets/mainstage-music-a-state-of" data-limit={20} />
                </div>
            </div>
        );
    }
}