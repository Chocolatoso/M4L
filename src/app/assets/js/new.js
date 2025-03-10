var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(f) {
    var b = 0;
    return function() {
        return b < f.length ? { done: !1, value: f[b++] } : { done: !0 };
    };
};
$jscomp.arrayIterator = function(f) {
    return { next: $jscomp.arrayIteratorImpl(f) };
};
$jscomp.makeIterator = function(f) {
    var b =
        'undefined' != typeof Symbol && Symbol.iterator && f[Symbol.iterator];
    return b ? b.call(f) : $jscomp.arrayIterator(f);
};
(function(f) {
    var b = function() {};
    b.isEmpty = function(g) {
        return 0 == g.replace(/^\s+|\s+$/g, '').length;
    };
    b.strip = function(g) {
        return g.replace(/^\s+|\s+$/g, '');
    };
    b.isNumber = function(g) {
        return !isNaN(parseFloat(g)) && isFinite(g);
    };
    b.isMobile = function() {
        return /Android|webOS|iPhone|iPad|iPod|sony|BlackBerry/i.test(
            navigator.userAgent
        );
    };
    b.isChrome = function() {
        return !!f.chrome && (!!f.chrome.webstore || !!f.chrome.runtime);
    };
    b.isSafari = function() {
        return (
            0 <
            Object.prototype.toString.call(f.HTMLElement).indexOf('Constructor')
        );
    };
    b.isIE = function() {
        var g = -1;
        if ('Microsoft Internet Explorer' == navigator.appName) {
            var A = navigator.userAgent,
                r = /MSIE ([0-9]{1,}[.0-9]{0,})/;
            null != r.exec(A) && (g = parseFloat(RegExp.$1));
        } else
            'Netscape' == navigator.appName &&
                ((A = navigator.userAgent),
                (r = /Trident\/.*rv:([0-9]{1,}[.0-9]{0,})/),
                null != r.exec(A) && (g = parseFloat(RegExp.$1)));
        return -1 != g ? !0 : !1;
    };
    b.isIOS = function() {
        return navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
    };
    b.isAndroid = function() {
        return -1 < navigator.userAgent.indexOf('Android');
    };
    b.hasDownloadSupport = function() {
        return 'download' in document.createElement('a');
    };
    b.qualifyURL = function(g) {
        var A = document.createElement('a');
        A.href = g;
        return A.href;
    };
    b.relativePath = function(g) {
        return /^(?:[a-z]+:)?\/\//i.test(g);
    };
    b.closestNumber = function(g, A) {
        return g.reduce(function(r, B) {
            return Math.abs(B - A) < Math.abs(r - A) ? B : r;
        });
    };
    b.b64DecodeUnicode = function(g) {
        return decodeURIComponent(
            atob(g)
                .split('')
                .map(function(A) {
                    return (
                        '%' + ('00' + A.charCodeAt(0).toString(16)).slice(-2)
                    );
                })
                .join('')
        );
    };
    b.hasLocalStorage = function() {
        try {
            return 'localStorage' in f && null !== f.localStorage;
        } catch (g) {
            return !1;
        }
    };
    b.volumeCanBeSet = function() {
        var g = document.createElement('audio');
        if (!g) return !1;
        g.volume = 0;
        return 0 == g.volume ? !0 : !1;
    };
    b.randomiseArray = function(g) {
        var A = [],
            r = [],
            B;
        for (B = 0; B < g; B++) A[B] = B;
        for (B = 0; B < g; B++) {
            var K = Math.round(Math.random() * (A.length - 1));
            r[B] = A[K];
            A.splice(K, 1);
        }
        return r;
    };
    b.valueLimit = function(g, A, r) {
        return g < A ? A : g > r ? r : g;
    };
    b.sortArray = function(g, A) {
        var r,
            B = g.length,
            K = [];
        for (r = 0; r < B; r++) K[r] = g[A[r]];
        return K;
    };
    b.sortNumericArray = function(g) {
        g.sort(function(A, r) {
            return A - r;
        });
    };
    b.shuffleArray = function(g) {
        for (var A = g.length - 1; 0 < A; A--) {
            var r = Math.floor(Math.random() * (A + 1)),
                B = $jscomp.makeIterator([g[r], g[A]]);
            g[A] = B.next().value;
            g[r] = B.next().value;
        }
        return g;
    };
    b.keysrt = function(g, A, r) {
        var B = 1;
        r && (B = -1);
        return g.sort(function(K, N) {
            var Q = K[A],
                F = N[A];
            return B * (Q < F ? -1 : Q > F ? 1 : 0);
        });
    };
    b.keysrt2 = function(g, A, r, B) {
        var K = 1;
        B && (K = -1);
        return g.sort(function(N, Q) {
            var F = N[A][r],
                H = Q[A][r];
            return K * (F < H ? -1 : F > H ? 1 : 0);
        });
    };
    b.keysrt3 = function(g, A, r) {
        g.sort(function(B, K) {
            var N = K[r];
            return A.indexOf(B[r]) > A.indexOf(N) ? 1 : -1;
        });
        return g;
    };
    b.parseXML = function(g) {
        if (f.ActiveXObject && f.GetObject) {
            var A = new ActiveXObject('Microsoft.XMLDOM');
            A.loadXML(g);
            return A;
        }
        if (f.DOMParser) return new DOMParser().parseFromString(g, 'text/xml');
        throw Error('No XML parser available');
    };
    b.formatTime = function(g) {
        g = Math.round(g, 10);
        var A = Math.floor(g / 3600),
            r = Math.floor((g - 3600 * A) / 60);
        g = g - 3600 * A - 60 * r;
        if (0 < A)
            return (
                10 > A && (A = '0' + A),
                10 > r && (r = '0' + r),
                10 > g && (g = '0' + g),
                A + ':' + r + ':' + g
            );
        10 > r && (r = '0' + r);
        10 > g && (g = '0' + g);
        return r + ':' + g;
    };
    b.formatTimeWithMiliseconds = function(g) {
        var A = parseInt(g.split(':')[0]),
            r = parseInt(g.split(':')[1]),
            B = parseInt(g.split(':')[2]);
        g = parseInt(g.split(',')[1] || g.split('.')[1]);
        return Math.round(100 * (3600 * A + 60 * r + B + g / 1e3)) / 100;
    };
    b.toSeconds = function(g) {
        g = g.split(/[\.:,]+/);
        return Number(3600 * +g[0] + 60 * +g[1] + +g[2]);
    };
    b.formatNumber = function(g) {
        return 9 > g ? '0' + (g + 1) : g + 1;
    };
    b.nFormatter = function(g, A) {
        var r = [
                { value: 1e18, symbol: 'E' },
                { value: 1e15, symbol: 'P' },
                { value: 1e12, symbol: 'T' },
                { value: 1e9, symbol: 'G' },
                { value: 1e6, symbol: 'M' },
                { value: 1e3, symbol: 'k' },
            ],
            B = /\.0+$|(\.[0-9]*[1-9])0+$/,
            K;
        for (K = 0; K < r.length; K++)
            if (g >= r[K].value)
                return (
                    (g / r[K].value).toFixed(A).replace(B, '$1') + r[K].symbol
                );
        return g.toFixed(A).replace(B, '$1');
    };
    b.hmsToSecondsOnly = function(g) {
        g = g.split(':');
        for (var A = 0, r = 1; 0 < g.length; )
            (A += r * parseInt(g.pop())), (r *= 60);
        return A;
    };
    b.canPlayMp3 = function() {
        var g = document.createElement('audio');
        return !(
            !g.canPlayType || !g.canPlayType('audio/mpeg;').replace(/no/, '')
        );
    };
    b.canPlayWav = function() {
        var g = document.createElement('audio');
        return !(
            !g.canPlayType || !g.canPlayType('audio/wav;').replace(/no/, '')
        );
    };
    b.canPlayAac = function() {
        var g = document.createElement('audio');
        return !(
            !g.canPlayType || !g.canPlayType('audio/aac;').replace(/no/, '')
        );
    };
    b.canPlayOgg = function() {
        var g = document.createElement('audio');
        return !(
            !g.canPlayType ||
            !g.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, '')
        );
    };
    b.canPlayFlac = function() {
        var g = document.createElement('audio');
        return !(
            !g.canPlayType || !g.canPlayType('audio/flac;').replace(/no/, '')
        );
    };
    b.hasCanvas = function() {
        return !!document.createElement('canvas');
    };
    b.getElementOffsetTop = function(g) {
        g = g.getBoundingClientRect();
        var A = document.body,
            r = document.documentElement;
        return Math.round(
            g.bottom -
                100 +
                (f.pageYOffset || r.scrollTop || A.scrollTop) -
                (r.clientTop || A.clientTop || 0)
        );
    };
    b.getScrollTop = function(g) {
        g = document.documentElement;
        return (f.pageYOffset || g.scrollTop) - (g.clientTop || 0);
    };
    b.getEvents = function() {
        var g = {};
        'ontouchstart' in f
            ? ((g.downEvent = 'touchstart mousedown'),
              (g.moveEvent = 'touchmove mousemove'),
              (g.upEvent = 'touchend mouseup'))
            : f.PointerEvent
              ? ((g.downEvent = 'pointerdown'),
                (g.moveEvent = 'pointermove'),
                (g.upEvent = 'pointerup'))
              : ((g.downEvent = 'mousedown'),
                (g.moveEvent = 'mousemove'),
                (g.upEvent = 'mouseup'));
        return g;
    };
    b.getUrlParameter = function(g) {
        var A = {};
        f.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(r, B, K) {
            A[B] = K;
        });
        return g ? A[g] : A;
    };
    f.HAPUtils = b;
})(window);
(function(f, b) {
    f.HAPPlaylistManager = function(g) {
        function A() {
            t = HAPUtils.randomiseArray(N);
            console.log(t);
        }
        var r = this,
            B = g.loop,
            K = g.random,
            N,
            Q = !1,
            F = -1,
            H,
            D,
            p = !1,
            t = [],
            C = !1;
        this.setCounter = function(l, u) {
            'undefined' === typeof u && (u = !0);
            F = u ? F + parseInt(l, 10) : parseInt(l, 10);
            if (isNaN(F))
                alert(
                    'HAPPlaylistManager message: No active media, counter = ' +
                        F
                );
            else if (((Q = !1), 'playlist' == B || 'single' == B)) {
                if (K)
                    if (F > N - 1) {
                        F = t[N - 1];
                        A();
                        if (t[0] == F) {
                            var z = t.splice(0, 1);
                            t.push(z);
                        }
                        F = 0;
                    } else
                        0 > F &&
                            ((F = t[0]),
                            A(),
                            t[N - 1] == F &&
                                ((z = t.splice(N - 1, 1)), t.unshift(z)),
                            (F = N - 1));
                else F > N - 1 ? (F = 0) : 0 > F && (F = N - 1);
                b(r).trigger(
                    'HAPPlaylistManager.COUNTER_READY',
                    r.getCounter()
                );
            } else
                'off' == B &&
                    (F > N - 1
                        ? ((F = N - 1), (Q = !0))
                        : 0 > F && ((F = 0), (Q = !0)),
                    Q
                        ? b(r).trigger('HAPPlaylistManager.PLAYLIST_END')
                        : b(r).trigger(
                              'HAPPlaylistManager.COUNTER_READY',
                              r.getCounter()
                          ));
        };
        this.getCounter = function() {
            return K ? (C ? F : t[F]) : F;
        };
        this.advanceHandler = function(l) {
            C = !1;
            p
                ? ((p = !1),
                  D + l > N - 1
                      ? ((F = N - 1),
                        b(r).trigger(
                            'HAPPlaylistManager.COUNTER_READY',
                            r.getCounter()
                        ))
                      : 0 > D + l
                        ? ((F = 0),
                          b(r).trigger(
                              'HAPPlaylistManager.COUNTER_READY',
                              r.getCounter()
                          ))
                        : r.setCounter(D + l, !1))
                : r.setCounter(l);
        };
        this.processPlaylistRequest = function(l) {
            C = !1;
            K && ((C = !0), (H = l), p || ((D = F), (p = !0)));
            r.setCounter(l, !1);
        };
        this.setPlaylistItems = function(l, u) {
            'undefined' === typeof u && (u = !0);
            u && (F = -1);
            N = l;
            K && A();
        };
        this.reSetCounter = function(l) {
            'undefined' === typeof l
                ? (F = -1)
                : ((l = parseInt(l, 10)),
                  N
                      ? (l > N - 1 ? (l = N - 1) : 0 > l && (l = 0), (F = l))
                      : (F = -1));
        };
        this.setRandom = function(l) {
            (K = l) && A();
            if (K) {
                var u = t.length;
                for (l = 0; l < u; l++)
                    if (t[l] == F) {
                        if (0 == l) break;
                        l = t.splice(l, 1);
                        t.unshift(parseInt(l, 10));
                        break;
                    }
                F = 0;
            } else p ? ((F = H), (p = !1)) : (F = t[F]);
        };
        this.setLooping = function(l) {
            B = l;
        };
        this.getPosition = function(l) {
            return t.indexOf(l);
        };
    };
})(window, jQuery);
(function(f, b) {
    f.HAPCirclePlayer = function(g) {
        function A(u) {
            K.length &&
                (p.clearRect(0, 0, H, H),
                p.beginPath(),
                p.arc(H / 2, H / 2, l - N / 2, -C, t * u - C, !1),
                (p.strokeStyle = D),
                (p.lineCap = 'butt'),
                (p.lineWidth = N),
                p.stroke());
        }
        g = g.parent;
        var r = g.find('.hap-circle-player'),
            B = g.find('.hap-load-canvas'),
            K = g.find('.hap-progress-canvas'),
            N = parseInt(r.attr('data-stroke-size'), 10);
        if (B.length)
            var Q = B.attr('data-color'),
                F = B[0].getContext('2d'),
                H = B.width();
        if (K.length) {
            var D = K.attr('data-color'),
                p = K[0].getContext('2d');
            H = K.width();
        }
        var t = 2 * Math.PI,
            C = Math.PI / 2,
            l = H / 2;
        this.drawSeekbar = function(u, z, L) {
            B.length &&
                B.length &&
                (F.clearRect(0, 0, H, H),
                F.beginPath(),
                F.arc(H / 2, H / 2, l - N / 2, -C, t * u - C, !1),
                (F.strokeStyle = Q),
                (F.lineCap = 'butt'),
                (F.lineWidth = N),
                F.stroke());
            K.length && A(z / L);
        };
        this.clear = function() {
            K.length && p.clearRect(0, 0, H, H);
            B.length && F.clearRect(0, 0, H, H);
        };
        this.setProgress = function(u) {
            var z = u.pageX - r.offset().left - H / 2;
            u = u.pageY - r.offset().top - H / 2;
            z = Math.atan2(u, z);
            z > -1 * Math.PI && z < -0.5 * Math.PI && (z = 2 * Math.PI + z);
            z =
                Math.max(0, Math.min((z + Math.PI / 2) / 2 * Math.PI * 10)) /
                100;
            K.length && (p.clearRect(0, 0, H, H), A(z));
            return z;
        };
        this.trackTooltip = function(u) {
            var z = u.pageX - r.offset().left;
            u = u.pageY - r.offset().top;
            z = Math.atan2(u - H / 2, z - H / 2);
            z > -1 * Math.PI && z < -0.5 * Math.PI && (z = 2 * Math.PI + z);
            return (
                Math.max(0, Math.min((z + Math.PI / 2) / 2 * Math.PI * 10)) /
                100
            );
        };
    };
})(window, jQuery);
(function(f, b) {
    f.HAPAdManager = function(g, A, r, B, K, N, Q) {
        function F() {
            B.removeEventListener('loadedmetadata', F, !1);
            b(z).trigger('HAPAdManager.ADPRE_PLAY');
            W = B;
            W.addEventListener('timeupdate', u, !1);
            u();
        }
        function H() {
            G++;
            if (G < ba.adPre.length) {
                W.src = ba.adPre[G];
                var la = W.play();
                void 0 !== la &&
                    la.then(function() {})['catch'](function(db) {});
            } else
                W.removeEventListener('timeupdate', u, !1),
                    B.removeEventListener('ended', H, !1),
                    (y = !1),
                    (G = 0),
                    b(z).trigger('HAPAdManager.ADPRE_ENDED');
        }
        function D() {
            L && !E
                ? (E = !0)
                : (V &&
                      (b(z).trigger('HAPAdManager.ADMID_PLAY'),
                      (W = h),
                      W.addEventListener('timeupdate', u, !1)),
                  (M = !0),
                  (h.volume = ia),
                  b(A).trigger('adMidPlay', {
                      instance: A,
                      instanceName: g.instanceName,
                      media: ba.adMid,
                  }));
        }
        function p() {
            L && !Y
                ? (Y = !0)
                : (V &&
                      (W.removeEventListener('timeupdate', u, !1),
                      b(z).trigger('HAPAdManager.ADMID_ENDED')),
                  (M = !1),
                  b(A).trigger('adMidEnded', {
                      instance: A,
                      instanceName: g.instanceName,
                      media: ba.adMid,
                  }),
                  t());
        }
        function t() {
            n && clearTimeout(n);
            n = setTimeout(function() {
                n = null;
                A.getMediaPlaying() &&
                    (G++,
                    G > ba.adMid.length - 1 && (G = 0),
                    (h.src = ba.adMid[G]),
                    h.play());
            }, parseInt(ba.adMidInterval || 1e4, 10) + g.dataInterval);
        }
        function C() {
            B.removeEventListener('loadedmetadata', C, !1);
            b(z).trigger('HAPAdManager.ADEND_PLAY');
            W = B;
            W.addEventListener('timeupdate', u, !1);
        }
        function l() {
            G++;
            if (G < ba.adEnd.length) {
                W.src = ba.adEnd[G];
                var la = W.play();
                void 0 !== la &&
                    la.then(function() {})['catch'](function(db) {});
            } else
                W.removeEventListener('timeupdate', u, !1),
                    W.removeEventListener('ended', l, !1),
                    (ca = !1),
                    b(z).trigger('HAPAdManager.ADEND_ENDED');
        }
        function u() {
            if (y || ca)
                var la = B.currentTime,
                    db = B.duration;
            else M && ((la = h.currentTime), (db = h.duration));
            HAPUtils.isNumber(la) &&
                HAPUtils.isNumber(db) &&
                (K.width(la / db * qa),
                (la = parseInt(db - la, 10)),
                N.find('span').html(HAPUtils.formatTime(la)));
        }
        var z = this,
            L = navigator.userAgent.match(/(iPad|iPhone|iPod)/g),
            V = g.pauseAudioDuringAds,
            W,
            y,
            h,
            n,
            M,
            E,
            Y,
            ca,
            G = 0,
            ba = r,
            ia = g.volume,
            qa = Q;
        this.initAdPre = function() {
            y = !0;
            B.addEventListener('loadedmetadata', F, !1);
            B.addEventListener('ended', H, !1);
            B.src = ba.adPre[G];
        };
        this.forceAdMidAudio = function() {
            b(z).trigger('HAPAdManager.IOS_ADMID_FIX_START', !0);
            h ||
                ((h = document.createElement('audio')),
                h.addEventListener('play', D, !1),
                h.addEventListener('ended', p, !1));
            h.src = g.sourcePath + 'data/silence.mp3';
            h.play();
        };
        this.adMidStartHandler = function() {
            h ||
                ((h = document.createElement('audio')),
                h.addEventListener('play', D, !1),
                h.addEventListener('ended', p, !1));
            L ? Y && t() : t();
        };
        this.adMidPlayHandler = function() {
            n || (L ? Y && t() : t());
        };
        this.clearAdMidTimeout = function() {
            n && (clearTimeout(n), (n = null));
        };
        this.toggleAdMidAudio = function() {
            if (h && V)
                if (h.paused) {
                    var la = h.play();
                    void 0 !== la &&
                        la.then(function() {})['catch'](function(db) {});
                } else h.pause();
        };
        this.setAdEnd = function() {
            ca = !0;
            G = 0;
            B.addEventListener('loadedmetadata', C, !1);
            B.addEventListener('ended', l, !1);
            B.src = ba.adEnd[G];
            var la = B.play();
            void 0 !== la && la.then(function() {})['catch'](function(db) {});
        };
        this.isAdOn = function() {
            return y || M || ca;
        };
        this.isAdPreOn = function() {
            return y;
        };
        this.isAdMidOn = function() {
            return M;
        };
        this.isAdEndOn = function() {
            return ca;
        };
        this.setAdData = function(la) {
            ba = la;
            G = 0;
        };
        this.setSeekBarSize = function(la) {
            qa = la;
        };
        this.setVolume = function(la) {
            ia = la;
            h && (h.volume = ia);
        };
        this.cleanAds = function() {
            W && W.removeEventListener('timeupdate', u, !1);
            y &&
                (B.removeEventListener('loadedmetadata', F, !1),
                B.removeEventListener('ended', H, !1),
                (y = !1));
            n && (clearTimeout(n), (n = null));
            M && (h && (h.pause(), (h.src = '')), (M = !1));
            ca &&
                (B.removeEventListener('loadedmetadata', C, !1),
                B.removeEventListener('ended', l, !1),
                (ca = !1));
        };
    };
})(window, jQuery);
(function(f, b) {
    f.HAPRadioData = function(g, A) {
        function r() {
            var E = D.path;
            ';' == E.substring(E.length - 1) &&
                (E = E.substring(0, E.length - 1));
            '/' == E.substring(E.length - 1) &&
                (E = E.substring(0, E.length - 1));
            if (g.enableCors) {
                f.radioDataXHR && f.radioDataXHR.abort();
                var Y = new XMLHttpRequest();
                Y.onerror = function(G) {};
                Y.onreadystatechange = function() {
                    if (4 === this.readyState) {
                        if (200 === this.status) {
                            if (D.version && 1 == D.version)
                                var G = Y.responseText.split(','),
                                    ba = G[6];
                            else
                                (G = JSON.parse(Y.responseText)),
                                    (ba = G.songtitle);
                            p = G;
                            var ia = ba.split('-');
                            G = b.trim(ia[0]);
                            ia = b.trim(ia[1]);
                            t = { artist: G, title: ia, thumb: null };
                            C
                                ? C != ba &&
                                  (g.getRadioArtwork
                                      ? N(G, ia)
                                      : u ||
                                        b(H).trigger(
                                            'HAPRadioData.DATA_READY',
                                            t
                                        ))
                                : g.getRadioArtwork
                                  ? N(G, ia)
                                  : u ||
                                    b(H).trigger('HAPRadioData.DATA_READY', t);
                        }
                        C = ba;
                    } else
                        l ||
                            (y && clearInterval(y),
                            (y = setInterval(function() {
                                r();
                            }, h)));
                };
                if (D.version && 1 == D.version)
                    Y.open('GET', V[W] + E + '/7.html', !0);
                else {
                    var ca = g.sid || '1';
                    Y.open(
                        'GET',
                        V[W] + E + '/stats?sid=' + ca + '&json=1',
                        !0
                    );
                }
                Y.send();
                f.radioDataXHR = Y;
            } else
                (ca = D.sid || '1'),
                    b.ajax({
                        dataType: 'jsonp',
                        url: E + '/stats?sid=' + ca + '&json=1',
                        success: function(G) {
                            console.log(G);
                            var ba = G.songtitle;
                            p = G;
                            var ia = G.songtitle.split('-');
                            G = b.trim(ia[0]);
                            ia = b.trim(ia[1]);
                            t = { artist: G, title: ia, thumb: null };
                            C
                                ? C != ba &&
                                  (g.getRadioArtwork
                                      ? N(G, ia)
                                      : u ||
                                        b(H).trigger(
                                            'HAPRadioData.DATA_READY',
                                            t
                                        ))
                                : g.getRadioArtwork
                                  ? N(G, ia)
                                  : u ||
                                    b(H).trigger('HAPRadioData.DATA_READY', t);
                            C = ba;
                        },
                        error: function() {
                            console.log('Error getShoutcastData');
                        },
                    });
        }
        function B() {
            var E = D.path;
            ';' == E.substring(E.length - 1) &&
                (E = E.substring(0, E.length - 1));
            '/' == E.substring(E.length - 1) &&
                (E = E.substring(0, E.length - 1));
            f.radioXHR && f.radioXHR.abort();
            var Y = new XMLHttpRequest();
            Y.onerror = function(ca) {};
            Y.onreadystatechange = function() {
                if (4 === this.readyState)
                    if (200 === this.status) {
                        if (-1 < this.responseText.indexOf('{"icestats":')) {
                            var ca = JSON.parse(this.responseText);
                            if (void 0 === ca.icestats.source.length)
                                var G = ca.icestats.source;
                            else {
                                var ba,
                                    ia = ca.icestats.source.length;
                                for (ba = 0; ba < ia; ba++)
                                    if (
                                        0 <=
                                        ca.icestats.source[
                                            ba
                                        ].listenurl.indexOf(D.mountpoint)
                                    ) {
                                        G = ca.icestats.source[ba];
                                        break;
                                    }
                            }
                            p = G;
                            if (G.yp_currently_playing)
                                var qa = G.yp_currently_playing;
                            else
                                (ca = G.artist),
                                    (G = G.title),
                                    ca && G
                                        ? (qa = ca + '-' + G)
                                        : G && (qa = G);
                        } else
                            -1 < this.responseText.indexOf('class="streamdata"')
                                ? -1 <
                                      this.responseText.indexOf(
                                          'Mount Point /' + D.mountpoint
                                      ) &&
                                  ((G = this.responseText.substr(
                                      this.responseText.indexOf(
                                          'Mount Point /' + D.mountpoint
                                      )
                                  )),
                                  (G = G.substr(G.indexOf('Current Song:'))),
                                  (G = G.substr(
                                      G.indexOf('<td class="streamdata">') + 23
                                  )),
                                  (G = G.substr(0, G.indexOf('</td>'))),
                                  HAPUtils.isEmpty(G) || (qa = G))
                                : -1 <
                                      this.responseText.indexOf(
                                          'class="streamstats"'
                                      ) &&
                                  -1 <
                                      this.responseText.indexOf(
                                          'Mount Point /' + D.mountpoint
                                      ) &&
                                  ((G = this.responseText.substr(
                                      this.responseText.indexOf(
                                          'Mount Point /' + D.mountpoint
                                      )
                                  )),
                                  (G = G.substr(
                                      G.indexOf('Currently playing:')
                                  )),
                                  (G = G.substr(
                                      G.indexOf('<td class="streamstats">') + 24
                                  )),
                                  (G = G.substr(0, G.indexOf('</td>'))),
                                  HAPUtils.isEmpty(G) || (qa = G));
                        qa
                            ? ((G = qa.split('-')),
                              (ca = b.trim(G[0])),
                              (G = b.trim(G[1])),
                              (t = { artist: ca, title: G, thumb: null }),
                              C
                                  ? C != qa &&
                                    (g.getRadioArtwork
                                        ? N(ca, G)
                                        : u ||
                                          b(H).trigger(
                                              'HAPRadioData.DATA_READY',
                                              t
                                          ))
                                  : g.getRadioArtwork
                                    ? N(ca, G)
                                    : u ||
                                      b(H).trigger(
                                          'HAPRadioData.DATA_READY',
                                          t
                                      ),
                              (C = qa))
                            : ((t = { artist: n, title: M, thumb: null }),
                              u || b(H).trigger('HAPRadioData.DATA_READY', t));
                    } else
                        404 == this.status && 'Not Found' == this.statusText
                            ? (L++,
                              z[L]
                                  ? l || (y && clearInterval(y), B())
                                  : ((t = { artist: n, title: M, thumb: null }),
                                    u ||
                                        b(H).trigger(
                                            'HAPRadioData.DATA_READY',
                                            t
                                        )))
                            : l ||
                              (y && clearInterval(y),
                              (y = setInterval(function() {
                                  B();
                              }, h)));
            };
            g.enableCors
                ? Y.open('GET', V[W] + E + z[L], !0)
                : Y.open('GET', E + z[L], !0);
            Y.send();
            f.radioXHR = Y;
        }
        function K() {
            f.radioDataXHR && f.radioDataXHR.abort();
            var E = new XMLHttpRequest();
            E.onerror = function(ca) {};
            E.onreadystatechange = function() {
                if (4 === this.readyState)
                    if (200 === this.status) {
                        console.log(E.responseText);
                        var ca = JSON.parse(E.responseText),
                            G = ca.artist,
                            ba = ca.title,
                            ia = G + ' - ' + ba,
                            qa = ca.thumb || null;
                        p = ca;
                        t = { artist: G, title: ba, thumb: qa };
                        C
                            ? C != ia &&
                              (g.getRadioArtwork && null == qa
                                  ? N(G, ba)
                                  : u ||
                                    b(H).trigger('HAPRadioData.DATA_READY', t))
                            : g.getRadioArtwork && null == qa
                              ? N(G, ba)
                              : u || b(H).trigger('HAPRadioData.DATA_READY', t);
                        C = ia;
                    } else
                        l ||
                            (y && clearInterval(y),
                            (y = setInterval(function() {
                                K();
                            }, h)));
            };
            var Y =
                'http://www.radiojar.com/api/stations/' +
                D.mountpoint +
                '/now_playing/';
            g.enableCors ? E.open('GET', V[W] + Y, !0) : E.open('GET', Y, !0);
            E.send();
            f.radioDataXHR = E;
        }
        function N(E, Y) {
            if (!u) {
                E = Q(E);
                Y = F(Y);
                var ca =
                        V[W] +
                        'https://itunes.apple.com/search?type=jsonp&term==' +
                        encodeURI(E) +
                        '-' +
                        encodeURI(Y) +
                        '&media=music&limit=1',
                    G = new XMLHttpRequest();
                G.onerror = function(ba) {};
                G.onreadystatechange = function() {
                    if (4 === this.readyState)
                        if (200 === this.status) {
                            var ba = JSON.parse(this.responseText);
                            if (ba.resultCount) {
                                var ia = A.width();
                                ia = HAPUtils.closestNumber(g.artworkSize, ia);
                                ba = ba.results[0].artworkUrl100.replace(
                                    '100x100',
                                    ia + 'x' + ia
                                );
                            } else ba = D.thumbDefault;
                            t.thumb = ba;
                            u || b(H).trigger('HAPRadioData.DATA_READY', t);
                            l = !0;
                        } else
                            403 === this.status &&
                                (W++, W > V.length - 1 && (W = 0), N(E, Y));
                };
                G.open('GET', ca, !0);
                G.send();
                f.artworkDataXHR = G;
            }
        }
        function Q(E) {
            E = E.toLowerCase();
            E = b.trim(E);
            E.includes('&')
                ? (E = E.substr(0, E.indexOf(' &')))
                : E.includes('feat')
                  ? (E = E.substr(0, E.indexOf(' feat')))
                  : E.includes('ft.') && (E = E.substr(0, E.indexOf(' ft.')));
            return E;
        }
        function F(E) {
            E = E.toLowerCase();
            E = b.trim(E);
            E.includes('&')
                ? (E = E.replace('&', 'and'))
                : E.includes('(')
                  ? (E = E.substr(0, E.indexOf(' (')))
                  : E.includes('ft') && (E = E.substr(0, E.indexOf(' ft')));
            return E;
        }
        var H = this;
        HAPUtils.isMobile();
        var D,
            p,
            t,
            C,
            l,
            u,
            z = ['/status-json.xsl', '/status.xsl'],
            L = 0,
            V = g.cors.split(',').map(function(E) {
                return E.trim();
            }),
            W = 0,
            y,
            h = g.lastPlayedInterval,
            n = g.defaultSongArtist,
            M = g.defaultSongTitle;
        0 == A.length && (g.getRadioArtwork = !1);
        this.getData = function(E) {
            E && (D = E);
            u = !1;
            'shoutcast' == D.type
                ? r()
                : 'icecast' == D.type
                  ? B()
                  : 'radiojar' == D.type
                    ? K()
                    : console.log('HAPRadioData unknown radio data!');
        };
        this.getData2 = function() {
            u = !1;
            y && clearInterval(y);
            y = setInterval(function() {
                'shoutcast' == D.type
                    ? r()
                    : 'icecast' == D.type
                      ? B()
                      : 'radiojar' == D.type
                        ? K()
                        : console.log('HAPRadioData unknown radio data!');
            }, h);
        };
        this.destroy = function() {
            u = !0;
            y && clearInterval(y);
            y = null;
            f.radioDataXHR && (f.radioDataXHR.abort(), delete f.radioDataXHR);
            f.artworkDataXHR &&
                (f.artworkDataXHR.abort(), delete f.artworkDataXHR);
            W = 0;
            l = !1;
            C = null;
        };
        this.getRadioData = function() {
            return p;
        };
    };
})(window, jQuery);
(function(f, b) {
    f.HAPYoutubeLoader = function(g) {
        function A(C) {
            b
                .ajax({ url: C, dataType: 'jsonp' })
                .done(function(l) {
                    if (l.error && l.error.message)
                        console.log(l.error.message);
                    else {
                        var u,
                            z = l.items.length;
                        (D = l.nextPageToken) && (D = H + '&pageToken=' + D);
                        for (u = 0; u < z && Q.length != p; u++) {
                            var L = l.items[u];
                            if (
                                'youtube_playlist' == K ||
                                'youtube_single' == K ||
                                'youtube_single_list' == K
                            )
                                L.status
                                    ? 'public' == L.status.privacyStatus &&
                                      Q.push(r(L, K))
                                    : L.snippet &&
                                      'Private video' != L.snippet.title &&
                                      Q.push(r(L, K));
                        }
                        if ('youtube_single' == K || 'youtube_single_list' == K)
                            b(B).trigger('HAPYoutubeLoader.END_LOAD', {
                                data: Q,
                                nextPageToken: D,
                            });
                        else if (Q.length < p)
                            if (D) {
                                Q.length + F > p &&
                                    ((F = p - Q.length),
                                    (l = D.substr(
                                        0,
                                        H.indexOf('&maxResults=') + 12
                                    )),
                                    (u = D.substr(H.indexOf('&key='))),
                                    (D = l + F.toString() + u));
                                if ('youtube_playlist' == K) var V = D;
                                A(V);
                            } else
                                b(B).trigger('HAPYoutubeLoader.END_LOAD', {
                                    data: Q,
                                    nextPageToken: D,
                                });
                        else
                            b(B).trigger('HAPYoutubeLoader.END_LOAD', {
                                data: Q,
                                nextPageToken: D,
                            });
                    }
                })
                .fail(function(l, u, z) {
                    console.log(l, u, z);
                });
        }
        function r(C, l) {
            var u = jQuery.extend(!0, {}, N);
            u.type = 'youtube';
            'youtube_single' == l || 'youtube_single_list' == l
                ? (u.mp3 = C.id)
                : 'youtube_playlist' == l && (u.mp3 = C.contentDetails.videoId);
            C.snippet &&
                (!u.title && C.snippet.title && (u.title = C.snippet.title),
                !u.description &&
                    C.snippet.description &&
                    (u.description = C.snippet.description),
                C.snippet.publishedAt && (u.date = C.snippet.publishedAt),
                !C.thumb &&
                    C.snippet.thumbnails &&
                    (C.snippet.thumbnails.medium
                        ? (u.thumb = C.snippet.thumbnails.medium.url)
                        : C.snippet.thumbnails.high
                          ? (u.thumb = C.snippet.thumbnails.high.url)
                          : C.snippet.thumbnails['default'] &&
                            (u.thumb = C.snippet.thumbnails['default'].url)));
            if (C.contentDetails && C.contentDetails.duration) {
                var z = C.contentDetails.duration,
                    L = z.match(/\d+/g);
                0 <= z.indexOf('M') &&
                    -1 == z.indexOf('H') &&
                    -1 == z.indexOf('S') &&
                    (L = [0, L[0], 0]);
                0 <= z.indexOf('H') &&
                    -1 == z.indexOf('M') &&
                    (L = [L[0], 0, L[1]]);
                0 <= z.indexOf('H') &&
                    -1 == z.indexOf('M') &&
                    -1 == z.indexOf('S') &&
                    (L = [L[0], 0, 0]);
                z = 0;
                3 == L.length &&
                    ((z += 3600 * parseInt(L[0])),
                    (z += 60 * parseInt(L[1])),
                    (z += parseInt(L[2])));
                2 == L.length &&
                    ((z += 60 * parseInt(L[0])), (z += parseInt(L[1])));
                1 == L.length && (z += parseInt(L[0]));
                u.duration = z;
            }
            return u;
        }
        var B = this,
            K,
            N,
            Q = [],
            F = 50,
            H,
            D,
            p,
            t = g.youtubeAppId;
        this.resumeLoad = function(C) {
            Q = [];
            C
                ? ((H = C.substr(0, C.lastIndexOf('&pageToken='))), A(C))
                : b(B).trigger('HAPYoutubeLoader.END_LOAD', {
                      data: Q,
                      nextPageToken: C,
                  });
        };
        this.setData = function(C) {
            if (t) {
                Q = [];
                N = C;
                p = N.limit || 400;
                F = 50;
                p < F && (F = p);
                K = N.type;
                D = null;
                var l = '';
                -1 < g.playlistItemContent.indexOf('title') && (l += 'title,');
                -1 < g.playlistItemContent.indexOf('description') &&
                    (l += 'description,');
                -1 < g.playlistItemContent.indexOf('date') &&
                    (l += 'publishedAt,');
                -1 < g.playlistItemContent.indexOf('thumb') &&
                    (l += 'thumbnails,');
                0 < l.length
                    ? ((l = l.substr(0, l.length - 1)),
                      (C = ',snippet'),
                      (l = ',snippet(' + l + ')'))
                    : (l = C = '');
                if ('youtube_single' == K || 'youtube_single_list' == K) {
                    'youtube_single_list' == K &&
                        (N.path = N.path.replace(/\s+/g, ''));
                    if (-1 < g.playlistItemContent.indexOf('duration'))
                        var u = ',contentDetails',
                            z = ',contentDetails(duration)';
                    else z = u = '';
                    H =
                        'https://www.googleapis.com/youtube/v3/videos?id=' +
                        N.path +
                        '&key=' +
                        t +
                        '&part=id' +
                        C +
                        u +
                        '&fields=items(id' +
                        l +
                        z +
                        ')';
                } else
                    'youtube_playlist' == K &&
                        (H =
                            'https://www.googleapis.com/youtube/v3/playlistItems?playlistId=' +
                            N.path +
                            '&maxResults=' +
                            F +
                            '&key=' +
                            t +
                            '&part=contentDetails' +
                            C +
                            '&fields=items(contentDetails(videoId)' +
                            l +
                            '),nextPageToken');
                A(H);
            } else alert('Youtube API key missing! Set API key in settings.');
        };
        this.getNextPageToken = function() {
            return D;
        };
    };
})(window, jQuery);
(function(f, b) {
    f.HAPPlaybackRateSlider = function(g) {
        function A(h) {
            if (!H) {
                if ('touchstart' == h.type) {
                    if (((h = h.originalEvent.touches), !(h && 0 < h.length)))
                        return !1;
                } else h.preventDefault();
                H = !0;
                N.on(L.moveEvent, function(n) {
                    a: {
                        if ('touchmove' == n.type) {
                            if (
                                n.originalEvent.touches &&
                                n.originalEvent.touches.length
                            )
                                var M = n.originalEvent.touches;
                            else if (
                                n.originalEvent.changedTouches &&
                                n.originalEvent.changedTouches.length
                            )
                                M = n.originalEvent.changedTouches;
                            else break a;
                            if (1 < M.length) break a;
                            M = M[0];
                        } else M = n;
                        n.preventDefault();
                        r(M);
                        B(M);
                    }
                }).on(L.upEvent, function(n) {
                    a: if (H) {
                        H = !1;
                        N.off(L.moveEvent).off(L.upEvent);
                        if ('touchend' == n.type) {
                            if (
                                n.originalEvent.touches &&
                                n.originalEvent.touches.length
                            )
                                var M = n.originalEvent.touches;
                            else if (
                                n.originalEvent.changedTouches &&
                                n.originalEvent.changedTouches.length
                            )
                                M = n.originalEvent.changedTouches;
                            else break a;
                            if (1 < M.length) break a;
                            M = M[0];
                        } else M = n;
                        n.preventDefault();
                        r(M);
                        t.hide();
                    }
                });
            }
            return !1;
        }
        function r(h) {
            D
                ? ((h = Math.max(
                      0,
                      Math.min(1, (h.pageY - C.offset().top) / z)
                  )),
                  (h = 1 - h))
                : (h = Math.max(
                      0,
                      Math.min(1, (h.pageX - C.offset().left) / z)
                  ));
            K.setValue(h);
        }
        function B(h) {
            var n = D ? h.pageY - C.offset().top : h.pageX - C.offset().left;
            0 > n ? (n = 0) : n > z && (n = z);
            n = Math.max(0, Math.min(1, n / z));
            if (!HAPUtils.isNumber(n)) return !1;
            D && (n = 1 - n);
            n = V + (W - V) * n;
            n = Math.round(10 * n) / 10;
            t.text(n);
            n = F[0].getBoundingClientRect();
            var M = u[0].getBoundingClientRect();
            if (D) {
                var E = parseInt(
                    M.left - n.left - t.outerWidth() / 2 + u.outerWidth() / 2
                );
                h = parseInt(
                    h.pageY - Q.scrollTop() - n.top - t.outerHeight() - 10
                );
                h < M.top - n.top - t.outerHeight() - 10
                    ? (h = M.top - n.top - t.outerHeight() - 10)
                    : h > M.top - n.top + u.outerHeight() - t.outerHeight() &&
                      (h = M.top - n.top + u.outerHeight() - t.outerHeight());
            } else
                (E = parseInt(
                    h.pageX - Q.scrollLeft() - n.left - t.outerWidth() / 2
                )),
                    (h = parseInt(M.top - n.top - t.outerHeight())),
                    E < M.left - n.left
                        ? (E = M.left - n.left)
                        : E >
                              M.left -
                                  n.left +
                                  u.outerWidth() -
                                  t.outerWidth() &&
                          (E =
                              M.left -
                              n.left +
                              u.outerWidth() -
                              t.outerWidth());
            t.css({ left: E + 'px', top: h + 'px' }).show();
        }
        var K = this,
            N = b(document),
            Q = b(f),
            F = g.wrapper,
            H,
            D = g.isVertical,
            p = D ? 'height' : 'width',
            t = g.tooltip,
            C = g.sliderBg,
            l = g.sliderLevel,
            u = g.seekbar,
            z = D ? C.height() : C.width(),
            L = HAPUtils.getEvents(),
            V = Number(g.settings.playbackRateMin),
            W = Number(g.settings.playbackRateMax);
        u.on(L.downEvent, function(h) {
            A(h);
            return !1;
        });
        this.setValue = function(h) {
            HAPUtils.isNumber(z) || (z = D ? C.height() : C.width());
            l.css(p, h * z + 'px');
            h = V + (W - V) * h;
            h = Math.round(10 * h) / 10;
            b(K).trigger('HAPPlaybackRateSlider.RANGE_CHANGE', { value: h });
        };
        this.setVisual = function(h) {
            h = (h - V) / (W - V);
            HAPUtils.isNumber(z) || (z = D ? C.height() : C.width());
            l.css(p, h * z + 'px');
        };
        if (!HAPUtils.isMobile()) {
            var y = function() {
                u.off(L.moveEvent, B).off('mouseout', y);
                N.off('mouseout', y);
                t.hide();
            };
            u.on('mouseover', function() {
                H ||
                    (u.on(L.moveEvent, B).on('mouseout', y),
                    N.on('mouseout', y));
            });
        }
        this.setVisual(g.settings.playbackRate);
    };
})(window, jQuery);
(function(f, b) {
    f.HAPRangeSlider = function(g) {
        function A(D) {
            if (!K) {
                if ('touchstart' == D.type) {
                    if (((D = D.originalEvent.touches), !(D && 0 < D.length)))
                        return !1;
                } else D.preventDefault();
                K = !0;
                B.on(N.moveEvent, function(p) {
                    a: {
                        if ('touchmove' == p.type) {
                            if (
                                p.originalEvent.touches &&
                                p.originalEvent.touches.length
                            )
                                var t = p.originalEvent.touches;
                            else if (
                                p.originalEvent.changedTouches &&
                                p.originalEvent.changedTouches.length
                            )
                                t = p.originalEvent.changedTouches;
                            else break a;
                            if (1 < t.length) break a;
                            t = t[0];
                        } else t = p;
                        p.preventDefault();
                        b(r).trigger('HAPRangeSlider.RANGE_CHANGE', {
                            point: t,
                            elem: H,
                            event: t,
                        });
                    }
                }).on(N.upEvent, function(p) {
                    a: if (K) {
                        K = !1;
                        B.off(N.moveEvent).off(N.upEvent);
                        if ('touchend' == p.type) {
                            if (
                                p.originalEvent.touches &&
                                p.originalEvent.touches.length
                            )
                                var t = p.originalEvent.touches;
                            else if (
                                p.originalEvent.changedTouches &&
                                p.originalEvent.changedTouches.length
                            )
                                t = p.originalEvent.changedTouches;
                            else break a;
                            if (1 < t.length) break a;
                            t = t[0];
                        } else t = p;
                        p.preventDefault();
                        b(r).trigger('HAPRangeSlider.RANGE_CHANGE', {
                            point: t,
                            elem: H,
                        });
                    }
                });
            }
            return !1;
        }
        var r = this,
            B = b(document);
        b(f);
        var K,
            N = HAPUtils.getEvents(),
            Q = g.range_handle_a,
            F = g.range_handle_b,
            H;
        Q.on(N.downEvent, function(D) {
            H = b(this).css('z-index', 1);
            F.css('z-index', 0);
            A(D);
            return !1;
        });
        F.on(N.downEvent, function(D) {
            H = b(this).css('z-index', 1);
            Q.css('z-index', 0);
            A(D);
            return !1;
        });
        this.isDrag = function() {
            return K;
        };
    };
})(window, jQuery);
(function(f, b) {
    f.HAPLyrics = function(g) {
        function A() {
            var p,
                t = B.length;
            for (p = 0; p < t; p++) {
                var C = B[p].start;
                var l = p < t - 1 ? B[p + 1].start : B[p].start;
                var u = document.createElement('div');
                u.className = g.itemClass;
                g.scrollContainer.appendChild(u);
                K.push(u);
                u.dataset.start = C;
                u.dataset.end = l;
                u.innerHTML = B[p].text;
                r.useSeekOnLyrics &&
                    u.addEventListener('click', function() {
                        var z = Number(this.getAttribute('data-start'));
                        z = new CustomEvent('HAPLyrics.LYRICS_CLICKED', {
                            detail: z,
                        });
                        document.dispatchEvent(z);
                    });
            }
            p = new CustomEvent('HAPLyrics.LYRICS_READY', { detail: B });
            document.dispatchEvent(p);
        }
        var r = g.settings,
            B = [],
            K = [],
            N = !0,
            Q,
            F = r.lyricsAutoScroll,
            H = b(g.scrollContainer),
            D = b(g.wrapContainer);
        this.load = function(p) {
            N = !0;
            if ('file:' == f.location.protocol)
                return (
                    console.log('Getting lyrics requires server connection.'),
                    !1
                );
            Q && (Q.abort(), (Q = null));
            Q = new XMLHttpRequest();
            Q.onreadystatechange = function() {
                if (4 == Q.readyState && N) {
                    var t =
                        -1 < p.indexOf('.lrc')
                            ? 'lrc'
                            : -1 < p.indexOf('.vtt')
                              ? 'vtt'
                              : -1 < p.indexOf('.srt') ? 'srt' : 'lrc';
                    B = [];
                    var C = Q.responseText;
                    if ('lrc' == t) {
                        C = C.split('\n');
                        var l,
                            u = C.length;
                        for (l = 0; l < u; l++) {
                            C[l] = C[l].replace(/(^\s*)|(\s*$)/g, '');
                            var z = C[l].substring(
                                C[l].indexOf('[') + 1,
                                C[l].indexOf(']')
                            );
                            z = z.split(':');
                            if (!isNaN(parseInt(z[0]))) {
                                var L = C[l].match(/\[(\d+:.+?)\]/g);
                                t = 0;
                                var V,
                                    W = L.length;
                                for (V = 0; V < W; V++) t += L[V].length;
                                t = C[l].substring(t);
                                if (!HAPUtils.isEmpty(t))
                                    for (V = 0; V < W; V++)
                                        (z = L[V].substring(
                                            1,
                                            L[V].length - 1
                                        )),
                                            (z = z.split(':')),
                                            B.push({
                                                start: (
                                                    60 * parseFloat(z[0]) +
                                                    parseFloat(z[1])
                                                ).toFixed(3),
                                                text: t,
                                            });
                            }
                        }
                    } else if ('vtt' == t || 'srt' == t)
                        for (z in ((t = C.replace(/\r\n|\r|\n/g, '\n')),
                        (t = HAPUtils.strip(t)),
                        (C = t.split('\n\n')),
                        (u = 0),
                        C))
                            if (
                                ((l = C[z].split('\n')),
                                'WEBVTT' != l &&
                                    2 <= l.length &&
                                    'WEBVTT' != l[0])
                            ) {
                                if (2 < l.length) {
                                    if (
                                        ((t = HAPUtils.strip(
                                            l[1].split(' --\x3e ')[0]
                                        )),
                                        (V = HAPUtils.strip(
                                            l[1].split(' --\x3e ')[1]
                                        )),
                                        (W = l[2]),
                                        3 < l.length)
                                    )
                                        for (L = 3; L < l.length; L++)
                                            W += '\n' + l[L];
                                } else
                                    (t = HAPUtils.strip(
                                        l[0].split(' --\x3e ')[0]
                                    )),
                                        (V = HAPUtils.strip(
                                            l[0].split(' --\x3e ')[1]
                                        )),
                                        (W = l[1]);
                                B[u] = {};
                                B[u].start = HAPUtils.formatTimeWithMiliseconds(
                                    t
                                );
                                B[u].end = HAPUtils.formatTimeWithMiliseconds(
                                    V
                                );
                                B[u].text = W;
                                u++;
                            }
                    A();
                }
            };
            Q.onerror = function(t) {
                console.log(t);
            };
            Q.open('GET', p);
            Q.send();
        };
        this.setAutoScroll = function(p) {
            F = p;
        };
        this.setData = function(p) {
            B = p;
            A();
        };
        this.synchronize = function(p) {
            H.find('.hap-lyrics-item').each(function() {
                var C = parseFloat(b(this).attr('data-start')),
                    l = parseFloat(b(this).attr('data-end'));
                if (p >= C && p <= l)
                    return (
                        b(this).hasClass('hap-lyrics-item-active') ||
                            (H.find('.hap-lyrics-item').removeClass(
                                'hap-lyrics-item-active'
                            ),
                            b(this).addClass('hap-lyrics-item-active'),
                            (H.movingHighlight = !0)),
                        !1
                    );
            });
            H.currentHighlight = H.find('.hap-lyrics-item-active');
            0 == H.currentHighlight.length && (H.currentHighlight = null);
            if (F && H.currentHighlight) {
                var t = Math.floor(
                    D.scrollTop() +
                        H.currentHighlight.position().top -
                        (D.height() / 2 + H.currentHighlight.height() / 2)
                );
                t != Math.floor(D.scrollTop()) &&
                    H.movingHighlight &&
                    (D.scrollTop(t), (H.movingHighlight = !1));
            }
        };
        this.deactivate = function() {
            Q && (Q.abort(), (Q = null));
            N = !1;
            g.scrollContainer.innerHTML = '';
        };
    };
})(window, jQuery);
(function(f, b) {
    f.HAPDialog = function(g, A, r) {
        function B(y, h, n, M) {
            if ('lyrics' == y)
                var E = Q('lyrics'),
                    Y = 'hap_lyrics_dialog_' + r.instanceName;
            else
                'video' == y &&
                    ((E = Q('video')),
                    (Y = 'hap_video_dialog_' + r.instanceName));
            var ca =
                    f.innerWidth ||
                    document.documentElement.clientWidth ||
                    document.body.clientWidth,
                G =
                    f.innerHeight ||
                    document.documentElement.clientHeight ||
                    document.body.clientHeight;
            h > ca && (h = ca);
            n > G && (n = G);
            E.css({ width: h + 'px', height: n + 'px' });
            n -= 75;
            E.find('.hap-dialog-content').css('height', n + 'px');
            'lyrics' == y
                ? E.find('.hap-lyrics-wrap').css('height', n + 'px')
                : 'video' == y &&
                  E.find('.hap-video-wrap').css({
                      height: n + 'px',
                      width: h + 'px',
                  });
            localStorage &&
                M &&
                ((y = localStorage.getItem(Y)
                    ? JSON.parse(localStorage.getItem(Y))
                    : {}),
                (E = E[0].getBoundingClientRect()),
                (y.pos = E),
                localStorage.setItem(Y, JSON.stringify(y)));
        }
        function K(y) {
            var h,
                n = D.length;
            for (h = 0; h < n; h++)
                if (y == D[h].itemHandle) {
                    p = D[h];
                    var M = !0;
                    break;
                }
            return M;
        }
        function N(y) {
            var h,
                n = D.length;
            for (h = 0; h < n; h++)
                if (y == D[h].itemResizeHandle) {
                    l = D[h];
                    var M = !0;
                    break;
                }
            return M;
        }
        function Q(y) {
            var h,
                n = D.length;
            for (h = 0; h < n; h++)
                if (y == D[h].element) {
                    var M = b(D[h].itemDialog);
                    break;
                }
            return M;
        }
        function F(y) {
            if (K(y.target)) {
                if ('touchstart' == y.type)
                    if ((y = y.originalEvent.touches) && 0 < y.length)
                        (p.initialX = y[0].pageX - p.xOffset),
                            (p.initialY = y[0].pageY - p.yOffset);
                    else return !1;
                else
                    y.preventDefault(),
                        (p.initialX = y.pageX - p.xOffset),
                        (p.initialY = y.pageY - p.yOffset);
                C.on(t.moveEvent, function(h) {
                    a: if (p) {
                        if ('touchmove' == h.type) {
                            if (
                                h.originalEvent.touches &&
                                h.originalEvent.touches.length
                            )
                                var n = h.originalEvent.touches;
                            else if (
                                h.originalEvent.changedTouches &&
                                h.originalEvent.changedTouches.length
                            )
                                n = h.originalEvent.changedTouches;
                            else break a;
                            if (1 < n.length) break a;
                            h.preventDefault();
                            p.currentX = n[0].pageX - p.initialX;
                            p.currentY = n[0].pageY - p.initialY;
                        } else
                            h.preventDefault(),
                                (p.currentX = h.pageX - p.initialX),
                                (p.currentY = h.pageY - p.initialY);
                        p.xOffset = p.currentX;
                        p.yOffset = p.currentY;
                        p.itemDialog.style.left = p.currentX + 'px';
                        p.itemDialog.style.top = p.currentY + 'px';
                    }
                }).on(t.upEvent, function(h) {
                    p &&
                        (C.off(t.moveEvent).off(t.upEvent),
                        (p.initialX = p.currentX),
                        (p.initialY = p.currentY),
                        p.itemDialog.classList.contains('hap-lyrics-holder')
                            ? localStorage &&
                              ((h = localStorage.getItem(
                                  'hap_lyrics_dialog_' + r.instanceName
                              )
                                  ? JSON.parse(
                                        localStorage.getItem(
                                            'hap_lyrics_dialog_' +
                                                r.instanceName
                                        )
                                    )
                                  : {}),
                              (h.currentX = p.currentX),
                              (h.currentY = p.currentY),
                              localStorage.setItem(
                                  'hap_lyrics_dialog_' + r.instanceName,
                                  JSON.stringify(h)
                              ))
                            : p.itemDialog.classList.contains(
                                  'hap-video-holder'
                              ) &&
                              localStorage &&
                              ((h = localStorage.getItem(
                                  'hap_video_dialog_' + r.instanceName
                              )
                                  ? JSON.parse(
                                        localStorage.getItem(
                                            'hap_video_dialog_' + r.instanceName
                                        )
                                    )
                                  : {}),
                              (h.currentX = p.currentX),
                              (h.currentY = p.currentY),
                              localStorage.setItem(
                                  'hap_video_dialog_' + r.instanceName,
                                  JSON.stringify(h)
                              )),
                        (p = null));
                });
            }
            return !1;
        }
        function H(y) {
            if (N(y.target)) {
                if ('touchstart' == y.type)
                    if ((y = y.originalEvent.touches) && 0 < y.length)
                        var h = y[0];
                    else return !1;
                else (h = y), y.preventDefault();
                l.startMouseX = h.pageX;
                l.startMouseY = h.pageY;
                l.dragStartWidth = l.itemDialog.offsetWidth;
                l.dragStartHeight = l.itemDialog.offsetHeight;
                C.on(t.moveEvent, function(n) {
                    a: {
                        if ('touchmove' == n.type) {
                            if (
                                n.originalEvent.touches &&
                                n.originalEvent.touches.length
                            )
                                var M = n.originalEvent.touches;
                            else if (
                                n.originalEvent.changedTouches &&
                                n.originalEvent.changedTouches.length
                            )
                                M = n.originalEvent.changedTouches;
                            else break a;
                            if (1 < M.length) break a;
                            M = M[0];
                        } else M = n;
                        n.preventDefault();
                        n = parseInt(
                            l.dragStartWidth + (M.pageX - l.startMouseX),
                            10
                        );
                        M = parseInt(
                            l.dragStartHeight + (M.pageY - l.startMouseY),
                            10
                        );
                        n < l.itemResizeMinW && (n = l.itemResizeMinW);
                        M < l.itemResizeMinH && (M = l.itemResizeMinH);
                        B(l.element, n, M, !0);
                    }
                }).on(t.upEvent, function(n) {
                    l && ((l = null), C.off(t.moveEvent).off(t.upEvent));
                });
            }
            return !1;
        }
        var D = A,
            p,
            t = HAPUtils.getEvents(),
            C = b(document),
            l;
        this.setTranslateInit = function(y, h, n) {
            var M,
                E = D.length;
            for (M = 0; M < E; M++)
                if (
                    D[M].itemDialog.classList.contains('hap-dialog') &&
                    D[M].itemDialog.classList.contains(y)
                ) {
                    var Y = D[M];
                    break;
                }
            Y &&
                ((y = g[0].getBoundingClientRect()),
                0 >= y.top + n && (n = -y.top),
                0 >= y.left + h && (h = -y.left),
                (Y.itemDialog.style.left = h + 'px'),
                (Y.itemDialog.style.top = n + 'px'),
                (Y.initialX = h),
                (Y.initialY = n),
                (Y.currentX = h),
                (Y.currentY = n),
                (Y.xOffset = h),
                (Y.yOffset = n),
                (Y.dragInited = !0));
        };
        (r.clearDialogCacheOnStart || r.isPopup) &&
            localStorage &&
            (localStorage.removeItem('hap_lyrics_dialog_' + r.instanceName),
            localStorage.removeItem('hap_video_dialog_' + r.instanceName));
        var u = D.length;
        for (A = 0; A < u; A++) {
            var z = D[A];
            z.xOffset = 0;
            z.yOffset = 0;
            b(z.itemHandle)
                .css('cursor', 'move')
                .on(t.downEvent, function(y) {
                    F(y);
                    return !1;
                });
            if (z.itemResizeHandle)
                b(z.itemResizeHandle).on(t.downEvent, function(y) {
                    H(y);
                    return !1;
                });
            if ('lyrics' == z.element)
                if (
                    (b(z.itemDialog)
                        .find('.hap-lyrics-autoscroll')
                        .on('change', function() {
                            var y = b(this).is(':checked'),
                                h = new CustomEvent(
                                    'HAPDialog.LYRICS_AUTOSCROLL_CHANGE',
                                    { detail: y }
                                );
                            document.dispatchEvent(h);
                            localStorage &&
                                ((h = localStorage.getItem(
                                    'hap_lyrics_dialog_' + r.instanceName
                                )
                                    ? JSON.parse(
                                          localStorage.getItem(
                                              'hap_lyrics_dialog_' +
                                                  r.instanceName
                                          )
                                      )
                                    : {}),
                                (h.autoScroll = y),
                                localStorage.setItem(
                                    'hap_lyrics_dialog_' + r.instanceName,
                                    JSON.stringify(h)
                                ));
                        }),
                    localStorage &&
                        localStorage.getItem(
                            'hap_lyrics_dialog_' + r.instanceName
                        ))
                ) {
                    var L = JSON.parse(
                        localStorage.getItem(
                            'hap_lyrics_dialog_' + r.instanceName
                        )
                    );
                    if (L.pos) {
                        var V = L.pos.width,
                            W = L.pos.height;
                        B('lyrics', V, W);
                    } else
                        f
                            .getComputedStyle(
                                document.querySelector('.hap-lyrics-holder')
                            )
                            .getPropertyValue('width');
                    L.currentX &&
                        L.currentY &&
                        this.setTranslateInit(
                            'hap-lyrics-holder',
                            L.currentX,
                            L.currentY
                        );
                    V = L.autoScroll ? 'checked' : '';
                    b(z.itemDialog)
                        .find('.hap-lyrics-autoscroll')
                        .prop('checked', V);
                    z = new CustomEvent('HAPDialog.LYRICS_AUTOSCROLL_CHANGE', {
                        detail: L.autoScroll,
                    });
                    document.dispatchEvent(z);
                } else
                    r.lyricsAutoScroll &&
                        (b(z.itemDialog)
                            .find('.hap-lyrics-autoscroll')
                            .prop('checked', 'checked'),
                        (z = new CustomEvent(
                            'HAPDialog.LYRICS_AUTOSCROLL_CHANGE',
                            { detail: r.lyricsAutoScroll }
                        )),
                        document.dispatchEvent(z)),
                        this.setTranslateInit('hap-lyrics-holder', 0, 0);
            else
                'video' == z.element &&
                    (localStorage &&
                    localStorage.getItem('hap_video_dialog_' + r.instanceName)
                        ? ((L = JSON.parse(
                              localStorage.getItem(
                                  'hap_video_dialog_' + r.instanceName
                              )
                          )),
                          L.pos &&
                              ((V = L.pos.width),
                              (W = L.pos.height),
                              B('video', V, W)),
                          L.currentX &&
                              L.currentY &&
                              this.setTranslateInit(
                                  'hap-video-holder',
                                  L.currentX,
                                  L.currentY
                              ))
                        : this.setTranslateInit('hap-video-holder', 0, 0));
        }
    };
})(window, jQuery);
(function(f, b) {
    f.HAPVolumeSlider = function(g) {
        function A(y) {
            if (!z) {
                if ('touchstart' == y.type) {
                    if (((y = y.originalEvent.touches), !(y && 0 < y.length)))
                        return !1;
                } else y.preventDefault();
                z = !0;
                C.on(l.moveEvent, function(h) {
                    a: {
                        if ('touchmove' == h.type) {
                            if (
                                h.originalEvent.touches &&
                                h.originalEvent.touches.length
                            )
                                var n = h.originalEvent.touches;
                            else if (
                                h.originalEvent.changedTouches &&
                                h.originalEvent.changedTouches.length
                            )
                                n = h.originalEvent.changedTouches;
                            else break a;
                            if (1 < n.length) break a;
                            n = n[0];
                        } else n = h;
                        h.preventDefault();
                        r(n);
                    }
                }).on(l.upEvent, function(h) {
                    a: if (z) {
                        z = !1;
                        C.off(l.moveEvent).off(l.upEvent);
                        if ('touchend' == h.type) {
                            if (
                                h.originalEvent.touches &&
                                h.originalEvent.touches.length
                            )
                                var n = h.originalEvent.touches;
                            else if (
                                h.originalEvent.changedTouches &&
                                h.originalEvent.changedTouches.length
                            )
                                n = h.originalEvent.changedTouches;
                            else break a;
                            if (1 < n.length) break a;
                            n = n[0];
                        } else n = h;
                        h.preventDefault();
                        r(n);
                        F && F.hide();
                    }
                });
            }
            return !1;
        }
        function r(y) {
            L
                ? ((u = Math.max(
                      0,
                      Math.min(1, (y.pageY - p.offset().top) / V)
                  )),
                  (u = 1 - u))
                : (u = Math.max(
                      0,
                      Math.min(1, (y.pageX - p.offset().left) / V)
                  ));
            K.setValue(u);
        }
        function B(y) {
            var h = L ? y.pageY - p.offset().top : y.pageX - p.offset().left;
            0 > h ? (h = 0) : h > V && (h = V);
            h = Math.max(0, Math.min(1, h / V));
            if (!HAPUtils.isNumber(h)) return !1;
            L && (h = 1 - h);
            h = parseInt(100 * h, 10);
            F.text(h + ' %');
            h = g.container[0].getBoundingClientRect();
            var n = D[0].getBoundingClientRect();
            if (L) {
                var M = parseInt(
                    n.left - h.left - F.outerWidth() / 2 + D.outerWidth() / 2
                );
                y = parseInt(
                    y.pageY - Q.scrollTop() - h.top - F.outerHeight() - 20
                );
                y < n.top - h.top - F.outerHeight() - 10
                    ? (y = n.top - h.top - F.outerHeight() - 10)
                    : y > n.top - h.top + D.outerHeight() - F.outerHeight() &&
                      (y = n.top - h.top + D.outerHeight() - F.outerHeight());
            } else
                (M = parseInt(
                    y.pageX - Q.scrollLeft() - h.left - F.outerWidth() / 2
                )),
                    (y = parseInt(n.top - h.top - F.outerHeight()) - 15),
                    M < n.left - h.left
                        ? (M = n.left - h.left)
                        : M >
                              n.left -
                                  h.left +
                                  D.outerWidth() -
                                  F.outerWidth() &&
                          (M =
                              n.left -
                              h.left +
                              D.outerWidth() -
                              F.outerWidth());
            0 > y + h.top &&
                (y = parseInt(n.top - h.top + F.outerHeight() + 20));
            F.css({ left: M + 'px', top: y + 'px' }).show();
        }
        var K = this,
            N = HAPUtils.isMobile(),
            Q = b(f),
            F = g.tooltip,
            H = g.container.find('.hap-volume-toggle'),
            D = g.container.find('.hap-volume-seekbar'),
            p = g.container.find('.hap-volume-bg'),
            t = g.container.find('.hap-volume-level'),
            C = b(document),
            l = HAPUtils.getEvents(),
            u = g.volume,
            z,
            L = D.hasClass('hap-volume-vertical'),
            V = L ? p.height() : p.width();
        if (0 == D.length || (H.hasClass('hap-volume-toggable') && !N))
            H.on('click', function() {
                b(K).trigger('HAPVolumeSlider.TOGGLE_MUTE');
            });
        D.on(l.downEvent, function(y) {
            A(y);
            return !1;
        });
        this.setValue = function(y) {
            K.setVisual(y);
            b(K).trigger('HAPVolumeSlider.VOLUME_CHANGE', y);
        };
        this.setVisual = function(y) {
            u = y;
            y = L ? 'height' : 'width';
            HAPUtils.isNumber(V) || (V = L ? p.height() : p.width());
            t.css(y, u * V + 'px');
            H.children().hide();
            0 == u
                ? H.find('.hap-btn-volume-off').show()
                : 0 < u && 0.5 > u
                  ? H.find('.hap-btn-volume-down').show()
                  : H.find('.hap-btn-volume-up').show();
        };
        if (F && !N) {
            var W = function() {
                D.off(l.moveEvent, B).off('mouseout', W);
                C.off('mouseout', W);
                F.hide();
            };
            D.on('mouseover', function() {
                z ||
                    (D.on(l.moveEvent, B).on('mouseout', W),
                    C.on('mouseout', W));
            });
        }
        K.setVisual(u);
    };
})(window, jQuery);
var hapjq = jQuery;
(function(f) {
    f.fn.hap = function(b) {
        function g() {
            ea = x.mp3 || x.path;
            -1 != ea.indexOf('ebsfm:') &&
                (ea = HAPUtils.b64DecodeUnicode(ea.substr(6)));
            if (Ud)
                Fa &&
                    ((c = 0),
                    b.resumeTime ? (c = resumeTime) : x.start && (c = x.start),
                    ya
                        ? X.loadVideoById({
                              videoId: ea,
                              startSeconds: c,
                              endSeconds: x.end,
                              suggestedQuality: x.quality,
                          })
                        : X.cueVideoById({
                              videoId: ea,
                              startSeconds: c,
                              endSeconds: x.end,
                              suggestedQuality: x.quality,
                          }));
            else {
                if (0 == Ea.length) {
                    alert(
                        'Using Youtube requires player to have thumbnail image in player where Youtube player will be placed. Please use demo which has thumbnail in player! hap-player-thumb element'
                    );
                    return;
                }
                Eb = f('<div class="hap-youtube-holder"/>').appendTo(Ea);
                var a = 'ytplayer' + Math.floor(16777215 * Math.random()),
                    c =
                        'https:' == window.location.protocol
                            ? 'https:'
                            : 'http:',
                    d = window.location.href.split('/');
                d = d[0] + '//' + d[2];
                var e = '&origin=' + d;
                c =
                    c +
                    '//www.youtube.com/embed/' +
                    ea +
                    '?enablejsapi=1&controls=0&rel=0&showinfo=0&playsinline=1&modestbranding=1&wmode=transparent&iv_load_policy=3&cc_load_policy=0';
                /^http/.test(d) && (c += e);
                b.resumeTime
                    ? ((c += '&start=' + b.resumeTime), delete b.resumeTime)
                    : x.start && (c += '&start=' + x.start);
                x.end && (c += '&end=' + x.end);
                kd = f('<iframe/>', {
                    id: a,
                    frameborder: 0,
                    src: c,
                    width: '100%',
                    height: '100%',
                    webkitAllowFullScreen: !1,
                    mozallowfullscreen: !1,
                    allowFullScreen: !1,
                    allow:
                        'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
                }).addClass('hap-media');
                Eb.show().prepend(kd);
                window.YT ||
                    ((c = document.createElement('script')),
                    (c.src = 'https://www.youtube.com/iframe_api'),
                    (d = document.getElementsByTagName('script')[0]),
                    d.parentNode.insertBefore(c, d));
                var k = setInterval(function() {
                    window.YT &&
                        window.YT.Player &&
                        (k && clearInterval(k),
                        (X = new YT.Player(a, {
                            events: {
                                onReady: A,
                                onStateChange: r,
                                onError: B,
                            },
                        })));
                }, 100);
                Ud = !0;
            }
            Eb.show();
        }
        function A(a) {
            Fa = !0;
            b.forceYoutubeChromeless && kd.addClass('hap-yt-clean');
            Vd && ya && X.playVideo();
        }
        function r(a) {
            Eb.is(':visible') &&
                -1 != a.data &&
                (0 == a.data
                    ? mb && Ga && !Qa && !yc.isDrag()
                      ? ((Qa = !0), X.seekTo(Ha), X.playVideo())
                      : zc || ((zc = !0), ld())
                    : 1 == a.data
                      ? (md ||
                            ((zc = !1),
                            X.setPlaybackRate(Number(b.playbackRate)),
                            Wd ||
                                (Wd = f(
                                    '<div class="hap-iframe-blocker"></div>'
                                )
                                    .css('display', 'block')
                                    .appendTo(Eb)),
                            (Vd = ya = md = !0),
                            b.hideYoutubeAfterStart && Eb.css('opacity', 0),
                            mb &&
                                (Nb.html('00:00'),
                                Ob.html(HAPUtils.formatTime(X.getDuration())))),
                        mb &&
                            Ga &&
                            setTimeout(function() {
                                clearTimeout(this);
                                Qa = !1;
                            }, 1e3),
                        rb && clearInterval(rb),
                        (rb = setInterval(Xd, Yd)),
                        Zd())
                      : 2 == a.data && $d());
        }
        function B(a) {
            f(q).trigger('soundError', {
                instance: q,
                instanceName: b.instanceName,
                media: x,
                error: a,
            });
        }
        function K() {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: x.title,
                artist: x.artist || '',
                album: x.album || '',
                artwork: [{ src: x.thumb || '' }],
            });
        }
        function N(a) {
            var c = w[0].getBoundingClientRect(),
                d = a[0].getBoundingClientRect();
            fa.text(a.attr('data-tooltip'));
            var e = parseInt(d.top - c.top - fa.outerHeight());
            a = parseInt(
                d.left - c.left - fa.outerWidth() / 2 + a.outerWidth() / 2
            );
            a + fa.outerWidth() > w.width()
                ? (a = w.width() - fa.outerWidth())
                : 0 > a && (a = 0);
            0 > e + c.top &&
                (e = parseInt(d.top - c.top + fa.outerHeight() + 15));
            fa.css({ left: a + 'px', top: e + 'px' }).show();
        }
        function Q(a) {
            if (T) {
                if (!Fb) {
                    if ('touchstart' == a.type) {
                        if (
                            ((a = a.originalEvent.touches),
                            !(a && 0 < a.length))
                        )
                            return !1;
                    } else a.preventDefault();
                    Fb = !0;
                    Gb.on(Hb.moveEvent, function(c) {
                        a: {
                            if ('touchmove' == c.type) {
                                if (
                                    c.originalEvent.touches &&
                                    c.originalEvent.touches.length
                                )
                                    var d = c.originalEvent.touches;
                                else if (
                                    c.originalEvent.changedTouches &&
                                    c.originalEvent.changedTouches.length
                                )
                                    d = c.originalEvent.changedTouches;
                                else break a;
                                if (1 < d.length) break a;
                                d = d[0];
                            } else d = c;
                            c.preventDefault();
                            F(d);
                        }
                    }).on(Hb.upEvent, function(c) {
                        a: if (Fb) {
                            Fb = !1;
                            Gb.off(Hb.moveEvent).off(Hb.upEvent);
                            if ('touchend' == c.type) {
                                if (
                                    c.originalEvent.touches &&
                                    c.originalEvent.touches.length
                                )
                                    var d = c.originalEvent.touches;
                                else if (
                                    c.originalEvent.changedTouches &&
                                    c.originalEvent.changedTouches.length
                                )
                                    d = c.originalEvent.changedTouches;
                                else break a;
                                if (1 < d.length) break a;
                                d = d[0];
                            } else d = c;
                            c.preventDefault();
                            F(d, !0);
                            fa.hide();
                        }
                    });
                }
                return !1;
            }
        }
        function F(a, c) {
            if (dc) d = Ac.setProgress(a);
            else {
                d = a.pageX - Bc.offset().left;
                0 > d ? (d = 0) : d > Ia && (d = Ia);
                var d = Math.max(0, Math.min(1, d / Ia));
            }
            if (c) {
                if ('youtube' == J) X && Fa && X.seekTo(d * X.getDuration());
                else if (O && !isNaN(O.duration)) {
                    var e = O.duration;
                    var k = d * e;
                    k > e - 2 && (k = e - 2);
                    console.log(k);
                    try {
                        O.currentTime = k;
                    } catch (m) {
                        console.log(m);
                    }
                }
                ec || Ra.width(d * Ia);
            } else Ra.width(d * Ia);
        }
        function H(a) {
            if (dc)
                (c = Ac.trackTooltip(a)),
                    (d = w[0].getBoundingClientRect()),
                    (e = Xa[0].getBoundingClientRect()),
                    (k = parseInt(e.top - d.top - fa.outerHeight() - 20)),
                    (a = parseInt(
                        e.left -
                            d.left -
                            fa.outerWidth() / 2 +
                            Xa.outerWidth() / 2
                    )),
                    a + fa.outerWidth() > w.width()
                        ? (a = w.width() - fa.outerWidth())
                        : 0 > a && (a = 0),
                    0 > k + d.top &&
                        (k = parseInt(e.top - d.top + fa.outerHeight() + 20));
            else {
                c = a.pageX - Bc.offset().left;
                if (!HAPUtils.isNumber(c)) return !1;
                0 > c ? (c = 0) : c > Ia && (c = Ia);
                var c = Math.max(0, Math.min(1, c / Ia)),
                    d = w[0].getBoundingClientRect(),
                    e = Xa[0].getBoundingClientRect();
                a = parseInt(
                    a.pageX - ae.scrollLeft() - d.left - fa.outerWidth() / 2
                );
                var k = parseInt(e.top - d.top - fa.outerHeight(), 10) - 10;
                a < e.left - d.left
                    ? (a = e.left - d.left)
                    : a > e.left - d.left + Xa.outerWidth() - fa.outerWidth() &&
                      (a = e.left - d.left + Xa.outerWidth() - fa.outerWidth());
                0 > k + d.top &&
                    (k = parseInt(e.top - d.top + fa.outerHeight() + 15));
            }
            fa.css({ left: a + 'px', top: k + 'px' });
            if (!HAPUtils.isNumber(c)) return !1;
            if ('youtube' == J) {
                if (X && Fa) {
                    var m = X.getDuration();
                    k = c * m;
                }
            } else O && ((m = O.duration), (k = c * m));
            HAPUtils.isNumber(m) &&
                HAPUtils.isNumber(m) &&
                fa
                    .html(
                        HAPUtils.formatTime(k) + ' / ' + HAPUtils.formatTime(m)
                    )
                    .show();
        }
        function D(a) {
            a = Math.max(0, Math.min(1, a / Ma));
            var c = 'youtube' == J ? X.getDuration() : O.duration;
            return a * c;
        }
        function p(a) {
            if (!T || b.disableSongSkip || (Z && Z.isAdOn())) return !1;
            a = f(a.currentTarget);
            ya = nd = !0;
            fc();
            gc && x.adMid && !hc && Z.forceAdMidAudio();
            if (sb) {
                var c = a.closest('.hap-accordion-item').attr('data-id');
                if (c != ic) {
                    ic = c;
                    ja = jc[ic].data;
                    S = ja.length;
                    for (c = 0; c < S; c++) ja[c].id = c;
                    ha.setPlaylistItems(S);
                }
            }
            a = a.closest('.hap-playlist-item').attr('data-id');
            ha.processPlaylistRequest(a);
            -1 < sa.indexOf('hap-art-narrow-light') && q.togglePlaylist();
            f(q).trigger('clickPlaylistItem', {
                instance: q,
                instanceName: b.instanceName,
            });
        }
        function t(a) {
            a.preventDefault();
            if (!T) return !1;
            f(a.currentTarget)
                .closest('.hap-playlist-item')
                .addClass('hap-playlist-item-selected');
            f(q).trigger('overPlaylistItem', {
                instance: q,
                instanceName: b.instanceName,
            });
        }
        function C(a) {
            a.preventDefault();
            if (!T) return !1;
            a = f(a.currentTarget).closest('.hap-playlist-item');
            a.hasClass('hap-playlist-item-disabled') ||
                a.removeClass('hap-playlist-item-selected');
            f(q).trigger('outPlaylistItem', {
                instance: q,
                instanceName: b.instanceName,
            });
        }
        function l(a) {
            if (!T) return !1;
            a = f(a.currentTarget);
            if (
                a.hasClass('hap-playlist-toggle') ||
                a.hasClass('hap-playlist-close')
            )
                q.togglePlaylist();
            else if (a.hasClass('hap-skip-backward'))
                q.seekBackward(b.seekTime);
            else if (a.hasClass('hap-skip-forward')) q.seekForward(b.seekTime);
            else if (a.hasClass('hap-prev-toggle')) {
                gc && x.adMid && !hc && Z.forceAdMidAudio();
                if (b.disableSongSkip || (Z && Z.isAdOn())) return !1;
                q.previousMedia();
            } else if (a.hasClass('hap-playback-toggle'))
                gc && x.adMid && !hc && Z.forceAdMidAudio(), q.togglePlayback();
            else if (a.hasClass('hap-next-toggle')) {
                gc && x.adMid && !hc && Z.forceAdMidAudio();
                if (b.disableSongSkip || (Z && Z.isAdOn())) return !1;
                q.nextMedia();
            } else if (
                a.hasClass('hap-playback-rate-toggle') ||
                a.hasClass('hap-playback-rate-close')
            )
                a.hasClass('hap-playback-rate-toggle') &&
                    (Ga && q.toggleRange(), kc.is(':visible') && kc.hide()),
                    lc.toggle();
            else if (
                a.hasClass('hap-lyrics-toggle') ||
                a.hasClass('hap-lyrics-close')
            )
                q.toggleLyrics();
            else if (
                a.hasClass('hap-video-toggle') ||
                a.hasClass('hap-video-close')
            )
                q.toggleVideo();
            else if (
                a.hasClass('hap-range-toggle') ||
                a.hasClass('hap-range-close')
            )
                a.hasClass('hap-range-toggle') &&
                    (kc.is(':visible') && kc.hide(),
                    lc.is(':visible') && lc.hide()),
                    q.toggleRange();
            else if (a.hasClass('hap-loop-toggle'))
                Ib.find('.hap-btn').hide(),
                    Jb++,
                    Jb > mc.length - 1 && (Jb = 0),
                    (b.loopState = mc[Jb]),
                    Ib.find('.hap-btn-loop-' + b.loopState).show(),
                    ha.setLooping(b.loopState),
                    N(Ib.find('.hap-btn:visible'));
            else if (a.hasClass('hap-random-toggle'))
                (b.randomPlay = !b.randomPlay),
                    ha.setRandom(b.randomPlay),
                    eb.find('.hap-btn').hide(),
                    b.randomPlay
                        ? eb.find('.hap-btn-random-on').show()
                        : eb.find('.hap-btn-random-off').show(),
                    N(eb.find('.hap-btn:visible'));
            else if (a.hasClass('hap-sort-alpha'))
                HAPUtils.isEmpty(Sa)
                    ? (Sa = 'title-asc')
                    : 'title-asc' == Sa
                      ? (Sa = 'title-desc')
                      : 'title-desc' == Sa && (Sa = 'title-asc'),
                    q.sort(Sa),
                    N(nb.find('.hap-btn:visible'));
            else if (a.hasClass('hap-popup-toggle')) {
                if (b.isPopup) return !1;
                hapOpenPopup(b, q);
            } else if (
                a.hasClass('hap-share-toggle') ||
                a.hasClass('hap-share-close')
            )
                a.hasClass('hap-share-toggle') &&
                    (Ga && q.toggleRange(), lc.is(':visible') && lc.hide()),
                    kc.toggle();
            else if (a.hasClass('hap-share-item')) {
                if (!J) return !1;
                od &&
                    od.share(
                        a.attr('data-type').toLowerCase(),
                        x,
                        q.getCurrentMediaUrl()
                    );
            }
        }
        function u() {
            va &&
                (f(q).trigger('playlistItemEnabled', {
                    instance: q,
                    instanceName: b.instanceName,
                    item: va,
                }),
                va.removeClass(
                    'hap-playlist-item-selected hap-playlist-item-disabled'
                ),
                (va = null));
        }
        function z(a) {
            va && u();
            va = P.children('.hap-playlist-item').eq(a);
            if (va.length) {
                va.addClass(
                    'hap-playlist-item-selected hap-playlist-item-disabled'
                );
                if (b.usePlaylistScroll && 0 < S) {
                    if (!nd)
                        if ('mcustomscrollbar' == b.playlistScrollType)
                            if ('undefined' !== typeof mCustomScrollbar)
                                setTimeout(function() {
                                    'horizontal' == b.playlistScrollOrientation
                                        ? Na.mCustomScrollbar(
                                              'scrollTo',
                                              parseInt(va.position().left),
                                              { scrollInertia: 500 }
                                          )
                                        : Na.mCustomScrollbar(
                                              'scrollTo',
                                              parseInt(va.position().top),
                                              { scrollInertia: 500 }
                                          );
                                }, 1e3);
                            else
                                var c = setInterval(function() {
                                    'undefined' !== typeof mCustomScrollbar &&
                                        (clearInterval(c),
                                        'horizontal' ==
                                        b.playlistScrollOrientation
                                            ? Na.mCustomScrollbar(
                                                  'scrollTo',
                                                  parseInt(va.position().left),
                                                  { scrollInertia: 500 }
                                              )
                                            : Na.mCustomScrollbar(
                                                  'scrollTo',
                                                  parseInt(va.position().top),
                                                  { scrollInertia: 500 }
                                              ));
                                }, 100);
                        else
                            'perfect-scrollbar' == b.playlistScrollType &&
                                setTimeout(function() {
                                    'horizontal' == b.playlistScrollOrientation
                                        ? Na.stop().animate(
                                              {
                                                  scrollTop:
                                                      va[0].offsetLeft + 'px',
                                              },
                                              { duration: 500 }
                                          )
                                        : Na.stop().animate(
                                              {
                                                  scrollTop:
                                                      va[0].offsetTop + 'px',
                                              },
                                              { duration: 500 }
                                          );
                                }, 1e3);
                    nd = !1;
                }
                f(q).trigger('playlistItemDisabled', {
                    instance: q,
                    instanceName: b.instanceName,
                    item: va,
                });
            }
        }
        function L(a) {
            oa = !0;
            Ba.show();
            Kb && Cc();
            var c = pd.length ? pd.find(a) : f(a);
            if (0 == c.length)
                return (
                    alert(
                        'Failed playlist selection! Playlist - ' +
                            a +
                            ' does not exist. Check activePlaylist option in settings!'
                    ),
                    (oa = !1),
                    Ba.hide(),
                    !1
                );
            Ta =
                void 0 != c.attr('data-playlist-id')
                    ? c.attr('data-playlist-id')
                    : null;
            b.activePlaylist = a;
            f(q).trigger('playlistStartLoad', {
                instance: q,
                instanceName: b.instanceName,
            });
            c.find('.hap-playlist-options').length &&
                ((aa = c
                    .find('.hap-playlist-options')
                    .clone()
                    .prependTo(P)),
                (tb = parseInt(aa.attr('data-add-more-limit'), 10)),
                (Pb = parseInt(aa.attr('data-add-more-num-results'), 10)),
                (ub = parseInt(aa.attr('data-add-more-offset'), 10)),
                (Dc = aa.attr('data-add-more-sort-order')),
                (Ec = aa.attr('data-add-more-sort-direction')),
                void 0 != aa.attr('data-taxonomy') &&
                    (Fc = aa.attr('data-taxonomy')),
                void 0 != aa.attr('data-category') &&
                    (Gc = aa.attr('data-category')),
                void 0 != aa.attr('data-tag') && (Hc = aa.attr('data-tag')),
                void 0 != aa.attr('data-match') && (Ic = aa.attr('data-match')),
                void 0 == aa.attr('data-thumb-global') ||
                    HAPUtils.isEmpty(aa.attr('data-thumb-global')) ||
                    (nc = aa.attr('data-thumb-global')),
                void 0 == aa.attr('data-start') ||
                    HAPUtils.isEmpty(aa.attr('data-start')) ||
                    (Jc = Number(aa.attr('data-start'))),
                void 0 == aa.attr('data-end') ||
                    HAPUtils.isEmpty(aa.attr('data-end')) ||
                    (Kc = Number(aa.attr('data-end'))),
                void 0 != aa.attr('data-add-more-on-total-scroll') && (fb = !0),
                void 0 != aa.attr('data-media-prefix-url') &&
                    (gb = aa.attr('data-media-prefix-url')),
                void 0 != aa.attr('data-ad-pre') &&
                    ((Qb = aa
                        .attr('data-ad-pre')
                        .split(',')
                        .map(function(k) {
                            return k.trim();
                        })),
                    void 0 != aa.attr('data-shuffle-ads') &&
                        1 < Qb.length &&
                        HAPUtils.shuffleArray(Qb)),
                void 0 != aa.attr('data-ad-mid') &&
                    ((Rb = aa
                        .attr('data-ad-mid')
                        .split(',')
                        .map(function(k) {
                            return k.trim();
                        })),
                    void 0 != aa.attr('data-shuffle-ads') &&
                        1 < Rb.length &&
                        HAPUtils.shuffleArray(Rb),
                    void 0 != aa.attr('data-ad-mid-interval') &&
                        (Lc = aa.attr('data-ad-mid-interval'))),
                void 0 != aa.attr('data-ad-end') &&
                    ((Sb = aa
                        .attr('data-ad-end')
                        .split(',')
                        .map(function(k) {
                            return k.trim();
                        })),
                    void 0 != aa.attr('data-shuffle-ads') &&
                        1 < Sb.length &&
                        HAPUtils.shuffleArray(Sb)));
            var d, e;
            c.children('.hap-playlist-item').each(function() {
                d = f(this);
                e = d.attr('data-type');
                RegExp(/^audio|hls$/).test(e) &&
                d.hasClass('hap-playlist-item-ready')
                    ? pa.push(d.clone())
                    : pa.push(n(f(this)));
            });
            S = pa.length;
            h();
        }
        function V(a) {
            console.log(a);
            f
                .ajax({ type: 'GET', url: a.path, dataType: 'html' })
                .done(function(c) {
                    var d = {};
                    f(c)
                        .children('.hap-playlist-item')
                        .each(function() {
                            d = n(f(this));
                            a.origtype && (d.origtype = a.origtype);
                            void 0 != a.mediaId && (d.mediaId = a.mediaId);
                            pa.push(d);
                        });
                    S = pa.length;
                    h();
                })
                .fail(function(c, d, e) {
                    console.log('Error processXml: ' + c, d, e);
                    h();
                });
        }
        function W(a) {
            if ('file:' == window.location.protocol)
                return (
                    console.log(
                        'Reading m3u files requires server connection.'
                    ),
                    !1
                );
            f
                .ajax({ type: 'GET', url: a.path })
                .done(function(c) {
                    var d, e;
                    c
                        .replace('#EXTM3U', '')
                        .split('#EXTINF:')
                        .slice(1)
                        .map(function(k, m) {
                            d = f.extend(!0, {}, a);
                            d.type = 'audio';
                            e = k.split('\n').slice(0, -1);
                            d.mp3 = f.trim(e[1]);
                            var v = e[0].split(',');
                            if (1 < v.length) {
                                var R = v[0];
                                HAPUtils.isNumber(R) &&
                                    -1 != R &&
                                    (d.duration = R);
                                v = v[1];
                            } else v = v[0];
                            -1 < v.indexOf('-')
                                ? ((v = v.split('-')),
                                  (d.title = f.trim(v[1])),
                                  v[0].match(/^\d+(\s*)+\./)
                                      ? ((v = v[0].substr(
                                            v[0].indexOf('.') + 1
                                        )),
                                        (d.artist = f.trim(v[1])))
                                      : (d.artist = f.trim(v[0])))
                                : (d.title = f.trim(v));
                            da.push(d);
                        });
                    h();
                })
                .fail(function(c, d, e) {
                    console.log('Error process m3u: ' + c, d, e);
                    h();
                });
        }
        function y(a) {
            f
                .ajax({ type: 'GET', url: a.path, dataType: 'json' })
                .done(function(c) {
                    vb = -1;
                    da = [];
                    pa = [];
                    Kb = P;
                    Array.isArray(c) ? (pa = c) : pa.push(c);
                    if (a.origtype && void 0 != a.mediaId) {
                        var d = pa.length;
                        for (c = 0; c < d; c++)
                            (pa[c].origtype = a.origtype),
                                (pa[c].mediaId = a.mediaId);
                    }
                    S = pa.length;
                    h();
                })
                .fail(function(c, d, e) {
                    console.log('Error processJson: ' + c, d, e);
                    h();
                });
        }
        function h() {
            vb++;
            if (vb > S - 1) Ya();
            else {
                var a = pa[vb],
                    c = a.type;
                if (c)
                    if ('soundcloud' == c)
                        if (
                            ((ra = 'soundcloud'),
                            a.limit
                                ? ((za = a.limit), a.loadMore && (Ca = !0))
                                : ((za = 999999999), (Ca = !1)),
                            (Ua = []),
                            window.SC)
                        )
                            Tb(!0, a.path);
                        else {
                            be();
                            var d = setInterval(function() {
                                qd && (d && clearInterval(d), Tb(!0, a.path));
                            }, 100);
                        }
                    else
                        'podcast' == c
                            ? ((ra = 'podcast'), la(a))
                            : 'itunes_podcast_music' == c
                              ? db(a)
                              : 'folder' == c
                                ? ((ra = 'folder'), E(a))
                                : 'folder_accordion' == c
                                  ? ((sb = !0), Y(a))
                                  : 'json_accordion' == c
                                    ? ((sb = !0), ca(a))
                                    : 'gdrive_folder' == c
                                      ? G(a)
                                      : 'hls' == c
                                        ? (da.push(a), h())
                                        : 'audio' == c
                                          ? (da.push(a), h())
                                          : 'shoutcast' == c ||
                                            'icecast' == c ||
                                            'radiojar' == c
                                            ? (da.push(a), h())
                                            : 'youtube_single' == c ||
                                              'youtube_playlist' == c
                                              ? a.noApi
                                                ? (da.push(a), h())
                                                : ((ra = 'youtube'),
                                                  a.loadMore && (Ca = !0),
                                                  hb || M('youtube'),
                                                  hb.setData(a))
                                              : 'xml' == c
                                                ? V(a)
                                                : 'json' == c
                                                  ? y(a)
                                                  : 'm3u' == c && W(a);
                else da.push(a), h();
            }
        }
        function n(a) {
            var c = {};
            c.type = c.origtype = a.attr('data-type');
            c.origclasses = a.attr('class');
            a.find('.hap-custom-content').length &&
                (c.content = a.find('.hap-custom-content').html());
            void 0 != a.attr('data-noapi') && (c.noApi = !0);
            void 0 != a.attr('data-category') &&
                (c.category = a.attr('data-category'));
            void 0 != a.attr('data-tag') && (c.tag = a.attr('data-tag'));
            void 0 != a.attr('data-video') &&
                ((c.video = a.attr('data-video')),
                -1 != c.video.indexOf('ebsfm:') &&
                    (c.video = HAPUtils.b64DecodeUnicode(c.video.substr(6))));
            void 0 != a.attr('data-media-id') &&
                (c.mediaId = parseInt(a.attr('data-media-id'), 10));
            void 0 != a.attr('data-audio-preview') &&
                (c.audioPreview = a.attr('data-audio-preview'));
            void 0 != a.attr('data-path')
                ? (c.path = a.attr('data-path'))
                : void 0 != a.attr('data-mp3')
                  ? (c.path = a.attr('data-mp3'))
                  : void 0 != a.attr('data-wav')
                    ? (c.path = a.attr('data-wav'))
                    : void 0 != a.attr('data-aac')
                      ? (c.path = a.attr('data-aac'))
                      : void 0 != a.attr('data-flac') &&
                        (c.path = a.attr('data-flac'));
            c.path &&
                -1 != c.path.indexOf('ebsfm:') &&
                (c.path = HAPUtils.b64DecodeUnicode(c.path.substr(6)));
            void 0 != a.attr('data-mountpoint') &&
                (c.mountpoint = a.attr('data-mountpoint'));
            void 0 != a.attr('data-version') &&
                (c.version = a.attr('data-version'));
            void 0 != a.attr('data-sid') && (c.sid = a.attr('data-sid'));
            void 0 != a.attr('data-lyrics') &&
                ((c.lyrics = a.attr('data-lyrics')),
                -1 != c.lyrics.indexOf('ebsfm:') &&
                    (c.lyrics = HAPUtils.b64DecodeUnicode(c.lyrics.substr(6))));
            void 0 != a.attr('data-limit') &&
                (c.limit = Math.abs(parseInt(a.attr('data-limit'), 10)));
            nc
                ? (c.thumb = nc)
                : void 0 != a.attr('data-thumb') &&
                  (c.thumb = a.attr('data-thumb'));
            void 0 != a.attr('data-thumb-small') &&
                (c.thumbSmall = a.attr('data-thumb-small'));
            void 0 != a.attr('data-thumb-default') &&
                (c.thumbDefault = a.attr('data-thumb-default'));
            void 0 != a.attr('data-thumb-alt') &&
                (c.thumbAlt = a.attr('data-thumb-alt'));
            void 0 != a.attr('data-title') && (c.title = a.attr('data-title'));
            void 0 != a.attr('data-description')
                ? (c.description = a.attr('data-description'))
                : a.find('.hap-playlist-description').length &&
                  (c.descriptionHtml = a
                      .find('.hap-playlist-description')
                      .remove()
                      .wrap('<p>')
                      .parent()
                      .html());
            void 0 != a.attr('data-artist') &&
                (c.artist = a.attr('data-artist'));
            void 0 != a.attr('data-album') && (c.album = a.attr('data-album'));
            void 0 != a.attr('data-download') &&
                (c.download = a.attr('data-download'));
            void 0 != a.attr('data-duration') &&
                (c.duration = a.attr('data-duration'));
            void 0 != a.attr('data-date') && (c.date = a.attr('data-date'));
            void 0 != a.attr('data-id3') && (c.id3 = !0);
            Jc
                ? (c.start = Jc)
                : void 0 != a.attr('data-start') &&
                  (c.start = Math.abs(a.attr('data-start')));
            Kc
                ? (c.end = Kc)
                : void 0 != a.attr('data-end') &&
                  (c.end = Math.abs(a.attr('data-end')));
            void 0 != a.attr('data-link') &&
                ((c.link = a.attr('data-link')),
                (c.target = '_blank'),
                void 0 != a.attr('data-target') &&
                    (c.target = a.attr('data-target')),
                void 0 != a.attr('data-rel') && (c.rel = a.attr('data-rel')));
            void 0 != a.attr('data-sort') && (c.sort = a.attr('data-sort'));
            void 0 != a.attr('data-active-accordion') &&
                (c.activeAccordion = a.attr('data-active-accordion'));
            a.html().length && (c.customContent = a.html());
            void 0 != a.attr('data-load-more') && (Ca = !0);
            void 0 != a.attr('data-ad-pre')
                ? ((c.adPre = a
                      .attr('data-ad-pre')
                      .split(',')
                      .map(function(d) {
                          return d.trim();
                      })),
                  void 0 != a.attr('data-shuffle-ads') &&
                      1 < c.adPre.length &&
                      HAPUtils.shuffleArray(c.adPre))
                : Qb && (c.adPre = Qb);
            void 0 != a.attr('data-ad-mid')
                ? ((c.adMid = a
                      .attr('data-ad-mid')
                      .split(',')
                      .map(function(d) {
                          return d.trim();
                      })),
                  void 0 != a.attr('data-shuffle-ads') &&
                      1 < c.adMid.length &&
                      HAPUtils.shuffleArray(c.adMid),
                  void 0 != a.attr('data-ad-mid-interval') &&
                      (c.adMidInterval = a.attr('data-ad-mid-interval')))
                : Rb && ((c.adMid = Rb), Lc && (c.adMidInterval = Lc));
            void 0 != a.attr('data-ad-end')
                ? ((c.adEnd = a
                      .attr('data-ad-end')
                      .split(',')
                      .map(function(d) {
                          return d.trim();
                      })),
                  void 0 != a.attr('data-shuffle-ads') &&
                      1 < c.adEnd.length &&
                      HAPUtils.shuffleArray(c.adEnd))
                : Sb && (c.adEnd = Sb);
            return c;
        }
        function M(a) {
            'youtube' == a &&
                ((hb = new HAPYoutubeLoader(b)),
                f(hb).on('HAPYoutubeLoader.END_LOAD', function(c, d) {
                    var e,
                        k = d.data.length;
                    for (e = 0; e < k; e++) {
                        var m = d.data[e];
                        da.push(m);
                    }
                    ma = d.nextPageToken;
                    wa ? Ya() : h();
                }));
        }
        function E(a) {
            if ('file:' == window.location.protocol)
                return (
                    console.log('Reading folders requires server connection.'),
                    !1
                );
            a.limit
                ? ((za = a.limit), a.loadMore && (Ca = !0))
                : (za = 999999999);
            var c = a.path.replace(/\/\//g, '/'),
                d = b.sourcePath + 'includes/folder_parser.php';
            c = { dir: c };
            var e = za;
            ma = [];
            a.id3 ? ((ob = Aa = da.length - 1), (rd = !0)) : (rd = !1);
            f
                .ajax({ type: 'GET', url: d, data: c, dataType: 'json' })
                .done(function(k) {
                    var m,
                        v = k.length;
                    a.sort &&
                        ('filename-asc' == a.sort
                            ? HAPUtils.keysrt(k, 'filename')
                            : 'filename-desc' == a.sort
                              ? HAPUtils.keysrt(k, 'filename', !0)
                              : 'date-asc' == a.sort
                                ? HAPUtils.keysrt(k, 'filemtime')
                                : 'date-desc' == a.sort &&
                                  HAPUtils.keysrt(k, 'filemtime', !0));
                    for (m = 0; m < v; m++) {
                        var R = k[m];
                        var U = f.extend(!0, {}, a);
                        U.type = 'audio';
                        var ta = R.fullpath;
                        U.path = ta;
                        b.createDownloadIconsInPlaylist &&
                            !U.download &&
                            (U.download = ta);
                        b.createLinkIconsInPlaylist && !U.link && (U.link = ta);
                        U.title || (U.title = R.filename);
                        m < e ? (da.push(U), Aa++) : ma.push(U);
                    }
                    0 == ma.length && ((Ca = !1), (ma = null));
                    a.id3
                        ? ('undefined' === typeof jsmediatags &&
                              console.log(
                                  'Link to jsmediatags.js missing in head tag!'
                              ),
                          ia())
                        : h();
                })
                .fail(function(k, m, v) {
                    console.log('Error processFolder: ' + k.responseText, m, v);
                    h();
                });
        }
        function Y(a) {
            if ('file:' == window.location.protocol)
                return (
                    console.log('Reading folders requires server connection.'),
                    !1
                );
            var c = a.path.replace(/\/\//g, '/');
            f
                .ajax({
                    type: 'GET',
                    url: b.sourcePath + 'includes/folder_accordion.php',
                    data: { dir: c },
                    dataType: 'json',
                })
                .done(function(d) {
                    var e,
                        k = d.length,
                        m;
                    for (e = 0; e < k; e++) {
                        var v = d[e].children;
                        jc.push({ media: v });
                        var R = v.length;
                        for (m = 0; m < R; m++) {
                            var U = v[m];
                            var ta = { type: 'audio' };
                            void 0 != a.mediaId && (ta.mediaId = a.mediaId);
                            var xa = U.fullpath;
                            ta[U.extension] = xa;
                            b.createDownloadIconsInPlaylist &&
                                !ta.download &&
                                (ta.download = xa);
                            b.createLinkIconsInPlaylist &&
                                !ta.link &&
                                (ta.link = xa);
                            ta.title || (ta.title = U.filename);
                            v[m] = ta;
                        }
                    }
                    ce(d, a);
                    Da || (Da = 0);
                    ic = Da;
                    P = Mc = P.find('.hap-accordion-item[data-id="' + Da + '"]')
                        .addClass(
                            'hap-accordion-item-inited hap-accordion-item-opened'
                        )
                        .find('.hap-accordion-item-content');
                    da = d[Da].children;
                    a.id3
                        ? ((sd = !0),
                          'undefined' === typeof jsmediatags &&
                              console.log(
                                  'Link to jsmediatags.js missing in head tag!'
                              ),
                          (ob = -1),
                          (Aa = da.length - 1),
                          qa())
                        : Ya();
                })
                .fail(function(d, e, k) {
                    console.log('Error processFolderAccordion: ' + d, e, k);
                    h();
                });
        }
        function ca(a) {
            if ('file:' == window.location.protocol)
                return (
                    console.log('Reading json requires server connection.'), !1
                );
            f
                .ajax({ type: 'GET', url: a.path, dataType: 'json' })
                .done(function(c) {
                    var d,
                        e = c.length,
                        k;
                    for (d = 0; d < e; d++) {
                        var m = c[d].children;
                        jc.push({ media: m });
                        a.sort &&
                            ('filename-asc' == a.sort
                                ? HAPUtils.keysrt(m, 'filename')
                                : 'filename-desc' == a.sort
                                  ? HAPUtils.keysrt(m, 'filename', !0)
                                  : 'date-asc' == a.sort
                                    ? HAPUtils.keysrt(m, 'filemtime')
                                    : 'date-desc' == a.sort &&
                                      HAPUtils.keysrt(m, 'filemtime', !0));
                        var v = m.length;
                        for (k = 0; k < v; k++) {
                            var R = m[k];
                            var U = { type: 'audio' };
                            void 0 != a.mediaId && (U.mediaId = a.mediaId);
                            R = gb ? gb + '/' + c[d].parent + '/' + R : R;
                            U.mp3 = R;
                            b.createDownloadIconsInPlaylist &&
                                !U.download &&
                                (U.download = R);
                            b.createLinkIconsInPlaylist &&
                                !U.link &&
                                (U.link = R);
                            m[k] = U;
                        }
                    }
                    ce(c, a);
                    Da || (Da = 0);
                    ic = Da;
                    P = Mc = P.find('.hap-accordion-item[data-id="' + Da + '"]')
                        .addClass(
                            'hap-accordion-item-inited hap-accordion-item-opened'
                        )
                        .find('.hap-accordion-item-content');
                    da = c[Da].children;
                    a.id3
                        ? ((sd = !0),
                          'undefined' === typeof jsmediatags &&
                              console.log(
                                  'Link to jsmediatags.js missing in head tag!'
                              ),
                          (ob = -1),
                          (Aa = da.length - 1),
                          qa())
                        : Ya();
                })
                .fail(function(c, d, e) {
                    console.log('Error processJsonAccordion: ' + c, d, e);
                    h();
                });
        }
        function G(a) {
            if ('file:' == window.location.protocol)
                return (
                    console.log(
                        'Reading files from folders locally is not possible! This requires server connection.'
                    ),
                    !1
                );
            if (HAPUtils.isEmpty(b.gDriveAppId))
                return (
                    console.log('gDriveAppId has not been set in settings!'), !1
                );
            f
                .ajax({
                    url:
                        "https://www.googleapis.com/drive/v3/files?q='" +
                        a.path +
                        "'+in+parents&pageSize=1000&key=" +
                        b.gDriveAppId,
                    dataType: 'jsonp',
                })
                .done(function(c) {
                    var d,
                        e = c.files.length,
                        k = [],
                        m = [];
                    for (d = 0; d < e; d++) {
                        var v = c.files[d];
                        /mp3|mpeg|mpeg3|wav|aac|adts/.test(v.mimeType)
                            ? m.push(v)
                            : /jpg|jpeg|png/.test(v.mimeType) && k.push(v);
                    }
                    a.sort &&
                        ('filename-asc' == a.sort
                            ? (HAPUtils.keysrt(m, 'name'),
                              HAPUtils.keysrt(k, 'name'))
                            : 'filename-desc' == a.sort &&
                              (HAPUtils.keysrt(m, 'name', !0),
                              HAPUtils.keysrt(k, 'name', !0)));
                    e = m.length;
                    for (d = 0; d < e; d++) {
                        v = m[d];
                        c = f.extend(!0, {}, a);
                        c.type = 'audio';
                        var R = v.name.substr(v.name.lastIndexOf('.') + 1);
                        c[R.toLowerCase()] =
                            'https://drive.google.com/uc?export=view&id=' +
                            v.id;
                        b.createDownloadIconsInPlaylist &&
                            !c.download &&
                            (c.download =
                                'https://drive.google.com/uc?export=download&id=' +
                                v.id);
                        b.createLinkIconsInPlaylist &&
                            !c.link &&
                            (c.link =
                                'https://drive.google.com/open?id=' + v.id);
                        !c.thumb &&
                            k[d] &&
                            (c.thumb =
                                'https://drive.google.com/uc?export=view&id=' +
                                k[d].id);
                        c.title ||
                            (c.title = v.name.substr(
                                0,
                                v.name.lastIndexOf('.')
                            ));
                        da.push(c);
                    }
                    h();
                })
                .fail(function(c, d, e) {
                    console.log('Error processGdriveFolder: ' + c, d, e);
                    h();
                });
        }
        function ba() {
            if (!ma) return !1;
            oa = !0;
            Ba.show();
            da = ma.splice(0, za);
            0 == ma.length && (ma = null);
            rd ? ((ob = -1), (Aa = da.length - 1), ia()) : Ya();
        }
        function ia() {
            var a = da[Aa];
            jsmediatags.read(a.path || a.mp3 || a.wav || a.aac, {
                onSuccess: function(c) {
                    c = c.tags;
                    var d = c.picture;
                    c.artist && (a.artist = c.artist);
                    c.title && (a.title = c.title);
                    c.album && (a.album = c.album);
                    if (b.getId3Image && d) {
                        var e = '',
                            k,
                            m = d.data.length;
                        for (k = 0; k < m; k++)
                            e += String.fromCharCode(d.data[k]);
                        a.thumb =
                            'data:' + d.format + ';base64,' + window.btoa(e);
                        a.thumbIsBase64 = !0;
                    }
                    c.TLEN && (a.duration = c.TLEN.data / 1e3);
                    Aa--;
                    Aa > ob ? ia() : wa ? Ya() : h();
                },
                onError: function(c) {
                    console.log('ID3 error: ', c.type, c.info);
                    Aa--;
                    Aa > ob ? ia() : h();
                },
            });
        }
        function qa() {
            var a = da[Aa];
            jsmediatags.read(a.path || a.mp3 || a.wav || a.aac, {
                onSuccess: function(c) {
                    c = c.tags;
                    var d = c.picture;
                    c.artist && (a.artist = c.artist);
                    c.title && (a.title = c.title);
                    c.album && (a.album = c.album);
                    if (b.getId3Image && d) {
                        var e = '',
                            k,
                            m = d.data.length;
                        for (k = 0; k < m; k++)
                            e += String.fromCharCode(d.data[k]);
                        a.thumb =
                            'data:' + d.format + ';base64,' + window.btoa(e);
                        a.thumbIsBase64 = !0;
                    }
                    c.TLEN && (a.duration = c.TLEN.data / 1e3);
                    Aa--;
                    Aa > ob ? qa() : Ya();
                },
                onError: function(c) {
                    console.log('ID3 error: ', c.type, c.info);
                    Aa--;
                    Aa > ob ? qa() : Ya();
                },
            });
        }
        function la(a) {
            if ('file:' == window.location.protocol)
                console.log('Using Podcast requires server connection!');
            else {
                a.limit
                    ? ((za = a.limit), a.loadMore && (Ca = !0))
                    : (za = 999999999);
                var c = Ae + '?url=' + encodeURIComponent(a.path),
                    d = za;
                ma = [];
                f
                    .ajax({ url: c, dataType: 'json', cache: !1 })
                    .done(function(e) {
                        e = e.contents.substr(e.contents.indexOf('<?xml'));
                        var k = HAPUtils.parseXML(e),
                            m,
                            v,
                            R,
                            U = 0;
                        f(k).find('image').length &&
                        f(k)
                            .find('image')
                            .attr('href')
                            ? (R = f(k)
                                  .find('image')
                                  .attr('href'))
                            : f(e).find('itunes\\:image').length &&
                              f(e)
                                  .find('itunes\\:image')
                                  .attr('href') &&
                              (R = f(e)
                                  .find('itunes\\:image')
                                  .attr('href'));
                        R &&
                            R.lastIndexOf('&size=Large') &&
                            (R = R.replace('=Large', '=Small'));
                        f(k)
                            .find('item')
                            .each(function() {
                                m = f(this);
                                v = f.extend(!0, {}, a);
                                v.type = 'audio';
                                v.mp3 = m.find('enclosure').attr('url');
                                !v.title &&
                                    m.find('title').length &&
                                    (v.title = m.find('title').text());
                                v.artist ||
                                    (m.find('author').length
                                        ? (v.artist = m.find('author').text())
                                        : m.find('itunes\\:author').length &&
                                          (v.artist = m
                                              .find('itunes\\:author')
                                              .text()));
                                m.find('pubDate').length &&
                                    (v.date = m.find('pubDate').text());
                                if (
                                    !v.description &&
                                    m.find('description').length
                                ) {
                                    var ta = m.find('description').text(),
                                        xa = document.createElement('div');
                                    xa.innerHTML = ta;
                                    v.description =
                                        xa.textContent || xa.innerText || '';
                                }
                                v.duration ||
                                    (m.find('itunes\\:duration').length
                                        ? (v.duration = m
                                              .find('itunes\\:duration')
                                              .text())
                                        : m.find('duration').length &&
                                          (v.duration = m
                                              .find('duration')
                                              .text()));
                                v.thumb ||
                                    (m.find('image').length &&
                                    m.find('image').attr('href')
                                        ? (v.thumb = m
                                              .find('image')
                                              .attr('href'))
                                        : m.find('itunes\\:image').length &&
                                          m.find('itunes\\:image').attr('href')
                                          ? (v.thumb = m
                                                .find('itunes\\:image')
                                                .attr('href'))
                                          : R && (v.thumb = R));
                                v.thumb.lastIndexOf('&size=Large') &&
                                    (v.thumb = v.thumb.replace(
                                        '=Large',
                                        '=Small'
                                    ));
                                b.createDownloadIconsInPlaylist &&
                                    !v.download &&
                                    (v.download = v.mp3);
                                m.find('link').length &&
                                    !v.link &&
                                    b.createLinkIconsInPlaylist &&
                                    (v.link = m.find('link').text());
                                U < d ? da.push(v) : ma.push(v);
                                U++;
                            });
                        h();
                    })
                    .fail(function(e, k, m) {
                        console.log(
                            'Error processPodcast: ' + e.responseText,
                            k,
                            m
                        );
                        h();
                    });
            }
        }
        function db(a) {
            if ('file:' == window.location.protocol)
                console.log('Using Podcast requires server connection!');
            else {
                var c = a.path.match(/id(\d+)/);
                (c = c ? c[1] : url.match(/\d+/))
                    ? f
                          .ajax({
                              url: 'https://itunes.apple.com/lookup',
                              data: { id: parseInt(c), entity: 'podcast' },
                              type: 'GET',
                              dataType: 'jsonp',
                          })
                          .done(function(d) {
                              a.path = d.results[0].feedUrl;
                              la(a);
                          })
                          .fail(function(d, e, k) {
                              console.log(
                                  'Error processiTunes: ' + d.responseText,
                                  e,
                                  k
                              );
                              h();
                          })
                    : (console.log('No Podcast ID found!'), h());
            }
        }
        function be() {
            if ('file:' == window.location.protocol)
                console.log('Using SoundCloud requires server connection!');
            else {
                HAPUtils.isEmpty(b.soundCloudAppId) &&
                    (console.log(
                        'soundCloudAppId has not been set in settings!'
                    ),
                    (b.soundCloudAppId =
                        b.scak[Math.floor(Math.random() * b.scak.length)]));
                var a = document.createElement('script');
                a.src = 'https://connect.soundcloud.com/sdk.js';
                var c = document.getElementsByTagName('script')[0];
                c.parentNode.insertBefore(a, c);
                var d = setInterval(function() {
                    window.SC &&
                        (d && clearInterval(d),
                        SC.initialize({ client_id: b.soundCloudAppId }),
                        (qd = !0));
                }, 100);
            }
        }
        function Tb(a, c) {
            SC.get(
                a
                    ? 'https://api.soundcloud.com/resolve.json?url=' +
                      c +
                      '&client_id=' +
                      b.soundCloudAppId
                    : c,
                { limit: za, linked_partitioning: 1 },
                function(d, e) {
                    if (e) {
                        for (
                            console.log('Error getSoundCloudPage: ' + e);
                            Ua.length;

                        )
                            da.push(Ua.splice(0, 1)[0]);
                        h();
                    } else {
                        if ('track' == d.kind) Nc(d);
                        else if ('playlist' == d.kind) {
                            var k,
                                m = d.tracks.length;
                            if (Ua.length + m >= za) {
                                m = za - Ua.length;
                                var v = !0;
                            }
                            for (k = 0; k < m; k++) Nc(d.tracks[k]);
                        } else if (d.collection)
                            for (
                                m = d.collection.length,
                                    Ua.length + m >= za &&
                                        ((m = za - Ua.length), (v = !0)),
                                    k = 0;
                                k < m;
                                k++
                            )
                                Nc(d.collection[k]);
                        else {
                            if (d.username) {
                                k = d.uri;
                                k = /likes/.test(c)
                                    ? k + '/likes'
                                    : /favorites/.test(c)
                                      ? k + '/favorites'
                                      : k + '/tracks';
                                Tb(!1, k);
                                return;
                            }
                            if (f.isArray(d))
                                for (
                                    m = d.length,
                                        Ua.length + m >= za &&
                                            ((m = za - Ua.length), (v = !0)),
                                        k = 0;
                                    k < m;
                                    k++
                                )
                                    Nc(d[k]);
                        }
                        ma = d.next_href ? d.next_href : null;
                        if (d.next_href && !v) Tb(!1, d.next_href);
                        else {
                            for (; Ua.length; ) da.push(Ua.splice(0, 1)[0]);
                            h();
                        }
                    }
                }
            );
        }
        function td() {
            if (!ma) return !1;
            oa = !0;
            Ba.show();
            da = [];
            da = ma.splice(0, za);
            0 == ma.length && (ma = null);
            Ya();
        }
        function ud() {
            if (!ma) return !1;
            oa = !0;
            Ba.show();
            vb = 0;
            pa = [];
            S = 1;
            if (window.SC) Tb(!1, ma);
            else {
                be();
                var a = setInterval(function() {
                    qd && (a && clearInterval(a), Tb(!1, ma));
                }, 100);
            }
        }
        function Nc(a) {
            if (a.streamable && a.stream_url) {
                var c = f.extend(!0, {}, pa[vb]);
                c.type = 'audio';
                a.duration && (c.duration = a.duration / 1e3);
                -1 == a.stream_url.indexOf('?')
                    ? (c.mp3 = a.stream_url + '?client_id=' + b.soundCloudAppId)
                    : (c.mp3 =
                          a.stream_url + '&client_id=' + b.soundCloudAppId);
                b.createDownloadIconsInPlaylist &&
                    !c.download &&
                    a.downloadable &&
                    a.download_url &&
                    (c.download = c.mp3.replace(/\/stream\\?/, '/download'));
                !c.title && a.title && (c.title = a.title);
                !c.description &&
                    a.description &&
                    (c.description = a.description);
                !c.thumb && a.artwork_url && (c.thumb = a.artwork_url);
                a.created_at && (c.date = a.created_at);
                c.favoritingsCount = parseInt(
                    a.favoritings_count ? a.favoritings_count : 0,
                    10
                );
                c.playbackCount = parseInt(
                    a.playback_count ? a.playback_count : 0,
                    10
                );
                c.hotness = c.favoritingsCount + c.playbackCount;
                a.permalink_url &&
                    b.createLinkIconsInPlaylist &&
                    !c.link &&
                    (c.link = a.permalink_url);
                c.sc_data = a;
                Ua.push(c);
            }
        }
        function Ya() {
            var a,
                c = wb ? Za : ja.length,
                d = da.length,
                e,
                k,
                m,
                v,
                R,
                U = 0,
                ta = [],
                xa;
            vd = [];
            for (a = 0; a < d; a++) {
                var Ub = a + c;
                wb && U++;
                var I = Oc ? da[a].data : da[a];
                var Pc = I.type;
                if (b.usePlaylist) {
                    if (I.type) {
                        var ka = (R = v = m = k = xa = null);
                        -1 != Ja.indexOf('thumb') &&
                            (e = I.thumbSmall || I.thumb || I.thumbDefault) &&
                            ('soundcloud' == I.origtype &&
                                b.soundCloudThumbQualityInPlaylist &&
                                (e = e.replace(
                                    'large.jpg',
                                    b.soundCloudThumbQualityInPlaylist
                                )),
                            !gb ||
                                I.thumbIsBase64 ||
                                HAPUtils.relativePath(e) ||
                                (e = gb + e),
                            (k = I.thumbAlt
                                ? I.thumbAlt
                                : I.title
                                  ? I.title.replace(/"/g, "'")
                                  : 'image'),
                            (k =
                                '<img class="hap-thumbimg" src="' +
                                e +
                                '" alt="' +
                                k +
                                '"/>'));
                        -1 != Ja.indexOf('description') &&
                            (I.description &&
                                ((m = I.description),
                                b.limitDescriptionText &&
                                    0 != b.limitDescriptionText &&
                                    m.length >
                                        parseInt(b.limitDescriptionText, 10) &&
                                    ((e = m.substr(
                                        0,
                                        parseInt(b.limitDescriptionText, 10)
                                    )),
                                    (m = m.substr(
                                        parseInt(b.limitDescriptionText, 10)
                                    )),
                                    (m =
                                        e +
                                        '<span class="hap-playlist-description-read-more-text">' +
                                        m +
                                        '</span><span class="hap-playlist-description-read-more-dots">...</span>&nbsp;<span class="hap-playlist-description-read-more-btn" title="' +
                                        b.limitDescriptionReadMoreText +
                                        '">' +
                                        b.limitDescriptionReadMoreText +
                                        '</span>'))),
                            I.descriptionHtml && (v = I.descriptionHtml));
                        -1 != Ja.indexOf('duration') &&
                            I.duration &&
                            (R = isNaN(I.duration)
                                ? -1 == I.duration.lastIndexOf(':')
                                  ? HAPUtils.formatTime(I.duration)
                                  : I.duration
                                : HAPUtils.formatTime(I.duration));
                        -1 != Ja.indexOf('date') &&
                            I.date &&
                            (ka = new Date(I.date).toDateString().slice(4, 10));
                        I.origclasses || (I.origclasses = 'hap-playlist-item');
                        e = f('<div class="' + I.origclasses + '"/>');
                        delete I.origclasses;
                        var wd = f(
                            '<div class="hap-playlist-item-content"/>'
                        ).appendTo(e);
                        -1 != Ja.indexOf('thumb') &&
                            k &&
                            f(
                                '<div class="hap-playlist-thumb">' +
                                    k +
                                    '</div>'
                            ).appendTo(wd);
                        if (
                            -1 != Ja.indexOf('title') ||
                            (-1 != Ja.indexOf('description') && I.description)
                        ) {
                            k = f('<div class="hap-playlist-info">').appendTo(
                                wd
                            );
                            if (-1 != Ja.indexOf('title') && I.title) {
                                var xb =
                                    '<div class="hap-playlist-title-wrap">';
                                b.useNumbersInPlaylist &&
                                    (xb +=
                                        '<div class="hap-playlist-title-num"></div>');
                                I.artist && I.title
                                    ? (xb =
                                          'title' == Be[0]
                                              ? xb +
                                                ('<div class="hap-playlist-title">' +
                                                    I.title +
                                                    '</div>' +
                                                    b.artistTitleSeparator +
                                                    '<div class="hap-playlist-artist">' +
                                                    I.artist +
                                                    '</div>')
                                              : xb +
                                                ('<div class="hap-playlist-artist">' +
                                                    I.artist +
                                                    '</div>' +
                                                    b.artistTitleSeparator +
                                                    '<div class="hap-playlist-title">' +
                                                    I.title +
                                                    '</div>'))
                                    : I.title
                                      ? (xb +=
                                            '<div class="hap-playlist-title">' +
                                            I.title +
                                            '</div>')
                                      : I.artist &&
                                        (xb +=
                                            '<div class="hap-playlist-artist">' +
                                            I.artist +
                                            '</div>');
                                xb += '</div>';
                                k.append(xb);
                            }
                            -1 != Ja.indexOf('description') &&
                                (m
                                    ? f(
                                          '<div class="hap-playlist-description">' +
                                              m +
                                              '</div>'
                                      ).appendTo(k)
                                    : v && k.append(v));
                        }
                        if (
                            (-1 != Ja.indexOf('duration') && I.duration) ||
                            (-1 != Ja.indexOf('date') && I.date)
                        )
                            (v = f('<div class="hap-playlist-info2">').appendTo(
                                wd
                            )),
                                -1 != Ja.indexOf('duration') &&
                                    R &&
                                    f(
                                        '<div class="hap-playlist-duration">' +
                                            R +
                                            '</div>'
                                    ).appendTo(v),
                                -1 != Ja.indexOf('date') &&
                                    ka &&
                                    f(
                                        '<div class="hap-playlist-date">' +
                                            ka +
                                            '</div>'
                                    ).appendTo(v);
                        e.attr('data-type', Pc);
                        void 0 != I.mediaId &&
                            e.attr('data-media-id', I.mediaId);
                        I.title &&
                            ((ka = I.title.replace(/['"\|]/g, '')),
                            (R = q.getTitle(I, !0)),
                            e.attr({
                                title: R,
                                'data-title': I.title,
                                'data-safe-title': ka,
                            }),
                            (I.safeTitle = ka));
                        I.artist &&
                            ((ka = I.artist.replace(/['"\|]/g, '')),
                            e.attr({
                                'data-artist': I.artist,
                                'data-safe-artist': ka,
                            }),
                            (I.safeArtist = ka));
                        I.description &&
                            ((ka = I.description.replace(/"/g, "'")),
                            e.attr('data-description', ka));
                        I.category && e.attr('data-category', I.category);
                        I.tag && e.attr('data-tag', I.tag);
                        b.useStatistics && Qc.length
                            ? ((xa = f(
                                  '<div class="hap-playlist-icons"></div>'
                              ).appendTo(e)),
                              (ka = f('<div class="hap-stats"></div>')),
                              xa.prepend(ka),
                              -1 != Qc.indexOf('plays') &&
                                  ((R = f(
                                      '<div class="hap-stat-icon hap-play-count" title="' +
                                          b.tooltipStatPlays +
                                          '">' +
                                          b.statPlayIcon +
                                          '<span>0</span></div>'
                                  )),
                                  ka.append(R)),
                              -1 != Qc.indexOf('likes') &&
                                  ((R = f(
                                      '<div class="hap-stat-icon hap-like-count" title="' +
                                          b.tooltipStatLikes +
                                          '">' +
                                          b.statLikeIcon +
                                          '<span>0</span></div>'
                                  )),
                                  ka.append(R)),
                              -1 != Qc.indexOf('downloads')
                                  ? ((R =
                                        xd && void 0 != I.download
                                            ? f(
                                                  '<a href="' +
                                                      I.download +
                                                      '" class="hap-stat-icon hap-download-count" download aria-label="' +
                                                      b.tooltipStatDownloads +
                                                      '" title="' +
                                                      b.tooltipStatDownloads +
                                                      '">' +
                                                      b.statDownloadIcon +
                                                      '<span>0</span></a>'
                                              )
                                            : f(
                                                  '<div class="hap-stat-icon hap-download-count hap-no-download" title="' +
                                                      b.tooltipStatDownloads +
                                                      '">' +
                                                      b.statDownloadIcon +
                                                      '<span>0</span></div>'
                                              )),
                                    ka.append(R))
                                  : xd &&
                                    I.download &&
                                    ((xa = f(
                                        '<div class="hap-playlist-icons"></div>'
                                    ).appendTo(e)),
                                    (ka = f(
                                        '<a class="hap-download" href="' +
                                            I.download +
                                            '" download title="' +
                                            b.downloadIconTitle +
                                            '" aria-label="' +
                                            b.downloadIconTitle +
                                            '">' +
                                            b.downloadIcon +
                                            '</a>'
                                    )),
                                    xa.prepend(ka)))
                            : xd &&
                              I.download &&
                              ((xa = f(
                                  '<div class="hap-playlist-icons"></div>'
                              ).appendTo(e)),
                              (ka = f(
                                  '<a class="hap-download" href="' +
                                      I.download +
                                      '" download title="' +
                                      b.downloadIconTitle +
                                      '" aria-label="' +
                                      b.downloadIconTitle +
                                      '">' +
                                      b.downloadIcon +
                                      '</a>'
                              )),
                              xa.prepend(ka));
                        I.link &&
                            (xa ||
                                (xa = f(
                                    '<div class="hap-playlist-icons"></div>'
                                ).appendTo(e)),
                            (ka =
                                '<a class="hap-link" href="' +
                                I.link +
                                '" target="' +
                                (I.target || '_blank') +
                                '" title="' +
                                b.linkIconTitle +
                                '" aria-label="' +
                                b.linkIconTitle +
                                '"'),
                            I.rel && (ka += ' rel="' + I.rel + '"'),
                            (ka += '>' + b.linkIcon + '</a>'),
                            xa.prepend(f(ka)));
                        I.customContent &&
                            (e.append(I.customContent), delete I.customContent);
                    } else e = I;
                    if (wb) {
                        de
                            ? de.after(e)
                            : Vb
                              ? e.appendTo(P)
                              : P.children('div')
                                    .eq(Za)
                                    .before(e);
                        var de = e;
                    } else e.appendTo(P);
                    b.addPlaylistEvents &&
                        (e.on(
                            'click',
                            '.hap-playlist-thumb, .hap-playlist-title-wrap',
                            p
                        ),
                        oc ||
                            (e.on(
                                'mouseenter ',
                                '.hap-playlist-thumb, .hap-playlist-title-wrap',
                                t
                            ),
                            e.on(
                                'mouseleave',
                                '.hap-playlist-thumb, .hap-playlist-title-wrap',
                                C
                            )));
                } else
                    b.useStatistics &&
                        void 0 != I.mediaId &&
                        (I.title &&
                            ((ka = I.title.replace(/['"\|]/g, '')),
                            (I.safeTitle = ka)),
                        I.artist &&
                            ((ka = I.artist.replace(/['"\|]/g, '')),
                            (I.safeArtist = ka)));
                void 0 != Ta && (I.playlistId = Ta);
                sb
                    ? ta.push({ id: a, type: Pc, data: I })
                    : ja.splice(Ub, 0, { id: Ub, type: Pc, data: I });
                vd.push({ id: Ub, type: Pc, data: I });
            }
            sb
                ? (b.allowOnlyOneOpenedAccordion ||
                      yb.addClass('hap-force-hidden'),
                  Na.addClass('hap-accordion'),
                  (jc[Da].data = ta),
                  ee
                      ? (pc(!1), b.useStatistics && Rc())
                      : ((ja = ta),
                        pc(!0),
                        b.useStatistics && Rc(),
                        ha.setPlaylistItems(S)),
                  Sc(),
                  (U = Mc[0]),
                  (U.style.height = U.scrollHeight + 'px'),
                  (yd = !1),
                  (ee = !0))
                : (Na.removeClass('hap-accordion'),
                  (Kb = P),
                  pc(!0),
                  b.useStatistics && Rc(),
                  wb
                      ? ((Ub = ha.getCounter()),
                        ha.setPlaylistItems(S, !1),
                        Za <= Ub && (Vb || ha.reSetCounter(Ub + U)),
                        Tc && ha.setCounter(Za, !1),
                        (Uc = !1))
                      : ha.setPlaylistItems(S),
                  Sc());
        }
        function Ce(a) {
            Ba.show();
            Da = a.attr('data-id');
            P = Mc = a
                .addClass('hap-accordion-item-inited')
                .find('.hap-accordion-item-content');
            da = jc[Da].media;
            sd ? ((ob = -1), (Aa = da.length - 1), qa()) : Ya();
        }
        function ce(a, c) {
            var d,
                e = a.length,
                k = '';
            for (d = 0; d < e; d++) {
                var m = a[d].parent.replace(/"/g, "'");
                'undefined' !== c.activeAccordion &&
                    c.activeAccordion == m &&
                    (Da = d);
                k +=
                    '<div class="hap-accordion-item" data-id="' +
                    d +
                    '" title="' +
                    m +
                    '"><span class="hap-accordion-item-title">' +
                    m +
                    '</span><div class="hap-accordion-item-content">';
                a[d].description &&
                    (k +=
                        '<span class="hap-accordion-item-description">' +
                        a[d].description +
                        '</span>');
                k += '</div></div>';
            }
            P.html(k);
        }
        function pc(a) {
            a && (S = ja.length);
            if (b.usePlaylist) {
                var c = 0,
                    d,
                    e,
                    k;
                P.find('.hap-playlist-item').each(function() {
                    d = f(this).attr('data-id', c);
                    k = d.find('.hap-playlist-title');
                    k.length &&
                        b.useNumbersInPlaylist &&
                        ((e =
                            HAPUtils.formatNumber(c) + b.numberTitleSeparator),
                        d.find('.hap-playlist-title-num').length
                            ? d.find('.hap-playlist-title-num').html(e)
                            : k.before(
                                  f(
                                      '<div class="hap-playlist-title-num">' +
                                          e +
                                          '</div>'
                                  )
                              ));
                    a && (ja[c].id = c);
                    c++;
                });
            }
        }
        function Rc() {
            var a,
                c = [];
            for (a = 0; a < S; a++) {
                var d = ja[a].data;
                d.id = a;
                if (!d.hapStatsSet) {
                    var e = void 0 != d.mediaId ? d.mediaId : null;
                    c.push({
                        media_id: e,
                        title: d.safeTitle || d.title || '',
                        artist: d.safeArtist || d.artist || '',
                    });
                    d.hapStatsSet = !0;
                }
            }
            c.length && zb('hap_all_count', null, c);
        }
        function zd(a) {
            if ('mcustomscrollbar' == b.playlistScrollType)
                if ('undefined' === typeof mCustomScrollbar) {
                    var c = document.createElement('script');
                    c.type = 'text/javascript';
                    c.src = HAPUtils.qualifyURL(
                        b.sourcePath + b.mCustomScrollbar_js
                    );
                    c.onload = c.onreadystatechange = function() {
                        (this.readyState && 'complete' != this.readyState) ||
                            zd(a);
                    };
                    c.onerror = function() {
                        alert('Error loading ' + this.src);
                    };
                    var d = document.getElementsByTagName('script')[0];
                    d.parentNode.insertBefore(c, d);
                } else
                    a.mCustomScrollbar({
                        axis:
                            'horizontal' == b.playlistScrollOrientation
                                ? 'x'
                                : 'y',
                        theme: b.playlistScrollTheme,
                        scrollInertia: 0,
                        mouseWheel: {
                            normalizeDelta: !0,
                            deltaFactor: 50,
                            preventDefault: !0,
                        },
                        keyboard: { enable: !1 },
                        advanced: { autoExpandHorizontalScroll: !0 },
                        callbacks: {
                            onOverflowYNone: function() {
                                a
                                    .find('.mCSB_container')
                                    .addClass('hap-mCSB_full');
                            },
                            onOverflowY: function() {
                                a
                                    .find('.mCSB_container')
                                    .removeClass('hap-mCSB_full');
                            },
                            onTotalScroll: function() {
                                Ca
                                    ? ma &&
                                      ra &&
                                      !oa &&
                                      ((oa = !0),
                                      Ba.show(),
                                      (wa = !0),
                                      (da = []),
                                      ua && ua.css('opacity', 0),
                                      'soundcloud' == ra
                                          ? ud()
                                          : 'podcast' == ra
                                            ? td()
                                            : 'folder' == ra
                                              ? ba()
                                              : 'youtube' == ra &&
                                                (hb || M('youtube'),
                                                hb.resumeLoad(ma)))
                                    : fb && (wa || Vc());
                            },
                        },
                    });
            else
                'perfect-scrollbar' == b.playlistScrollType &&
                    ('function' !== typeof PerfectScrollbar
                        ? ((c = document.createElement('script')),
                          (c.type = 'text/javascript'),
                          (c.src = HAPUtils.qualifyURL(
                              b.sourcePath + b.perfectScrollbar_js
                          )),
                          (c.onload = c.onreadystatechange = function() {
                              (this.readyState &&
                                  'complete' != this.readyState) ||
                                  zd(a);
                          }),
                          (c.onerror = function() {
                              alert('Error loading ' + this.src);
                          }),
                          (d = document.getElementsByTagName('script')[0]),
                          d.parentNode.insertBefore(c, d))
                        : ((ib = new PerfectScrollbar(a[0], {
                              wheelSpeed: 2,
                              wheelPropagation: !0,
                              minScrollbarLength: 30,
                          })),
                          a[0].addEventListener(
                              'horizontal' == b.playlistScrollOrientation
                                  ? 'ps-x-reach-end'
                                  : 'ps-y-reach-end',
                              function() {
                                  Ca
                                      ? ma &&
                                        ra &&
                                        !oa &&
                                        ((oa = !0),
                                        Ba.show(),
                                        (wa = !0),
                                        (da = []),
                                        ua && ua.css('opacity', 0),
                                        'soundcloud' == ra
                                            ? ud()
                                            : 'podcast' == ra
                                              ? td()
                                              : 'folder' == ra
                                                ? ba()
                                                : 'youtube' == ra &&
                                                  (hb || M('youtube'),
                                                  hb.resumeLoad(ma)))
                                      : fb && (wa || Vc());
                              }
                          )));
        }
        function Sc() {
            Ba.hide();
            oa = !1;
            if (!T) {
                T = !0;
                if (
                    aa &&
                    void 0 != aa.attr('data-use-pagination') &&
                    ((Lb = Math.ceil(Pb / tb)), Pb > tb)
                ) {
                    Ka = 0;
                    Ad(Ka);
                    var a;
                    for (a = 0; a < Lb; a++) {
                        var c = 0 == a ? { page: 0 } : { page: null };
                        Wb.push(c);
                    }
                    fe(Ka);
                }
                P.on(
                    'click',
                    '.hap-playlist-description-read-more-btn',
                    function(k) {
                        k = f(this);
                        var m = k.closest('.hap-playlist-description'),
                            v = m.find(
                                '.hap-playlist-description-read-more-text'
                            );
                        m = m.find('.hap-playlist-description-read-more-dots');
                        'none' == m.css('display')
                            ? (k
                                  .html(b.limitDescriptionReadMoreText)
                                  .attr(
                                      'title',
                                      b.limitDescriptionReadMoreText
                                  ),
                              m.css('display', 'inline'))
                            : (k
                                  .html(b.limitDescriptionReadLessText)
                                  .attr(
                                      'title',
                                      b.limitDescriptionReadLessText
                                  ),
                              m.css('display', 'none'));
                        v.slideToggle('fast');
                    }
                );
                b.usePlaylistScroll && !qc && (Na.length && zd(Na), (qc = !0));
                setTimeout(function() {
                    b.hidePlayerUntilMusicStart ||
                        (-1 < sa.indexOf('hap-fixed') && ge(),
                        b.addResizeEvent && Bd(),
                        setTimeout(function() {
                            Wc.css('opacity', 1);
                        }, 50));
                    f(q).trigger('setupDone', {
                        instance: q,
                        instanceName: b.instanceName,
                    });
                }, 100);
                sb &&
                    ((Ab = w.find('.hap-accordion-item').eq(Da)),
                    w.find('.hap-accordion-item-title').on('click', function() {
                        var k = f(this).closest('.hap-accordion-item');
                        if (k.hasClass('hap-accordion-item-opened')) {
                            k.removeClass('hap-accordion-item-opened');
                            var m = k.find('.hap-accordion-item-content')[0];
                            m.style.height = '0';
                        } else {
                            b.allowOnlyOneOpenedAccordion &&
                                Ab &&
                                Ab != k &&
                                (Ab.removeClass('hap-accordion-item-opened'),
                                (m = Ab.find('.hap-accordion-item-content')[0]),
                                (m.style.height = '0'),
                                Ab.find('.hap-playlist-item').each(function() {
                                    f(this).show();
                                }));
                            Cd.val('');
                            yb.hide();
                            if (k.hasClass('hap-accordion-item-inited'))
                                (m = k.find('.hap-accordion-item-content')[0]),
                                    (m.style.height = m.scrollHeight + 'px');
                            else {
                                if (yd) return !1;
                                yd = !0;
                                Ce(k);
                            }
                            Ab = k.addClass('hap-accordion-item-opened');
                        }
                    }));
            }
            if (b.usePlaylist && 0 < S) {
                var d = [];
                P.find('.hap-thumbimg:not(.hap-visible)').each(function() {
                    d.push(f(this));
                });
                var e = 0;
                a = d.length;
                for (c = 0; c < a; c++)
                    setTimeout(function() {
                        clearTimeout(this);
                        d[e].addClass('hap-visible');
                        e++;
                    }, 50 + 50 * c);
                HAPUtils.isEmpty(Sa) || q.sort(Sa);
            }
            if (!Xc && ((Xc = !0), !wb && !wa && 0 < S))
                if (void 0 != b.mediaId) {
                    b.mediaTitle
                        ? ((a = P.find(
                              '.hap-playlist-item[data-media-id=' +
                                  b.mediaId +
                                  '][data-safe-title="' +
                                  b.mediaTitle +
                                  '"]'
                          )),
                          0 == a.length &&
                              (a = P.find(
                                  '.hap-playlist-item[data-media-id=' +
                                      b.mediaId +
                                      ']'
                              )),
                          delete b.mediaTitle)
                        : (a = P.find(
                              '.hap-playlist-item[data-media-id=' +
                                  b.mediaId +
                                  ']'
                          ));
                    a = P.children('.hap-playlist-item').index(a);
                    if (void 0 == a || -1 == a)
                        return (
                            alert(
                                'No media with ID to load! LoadMedia failed.'
                            ),
                            !1
                        );
                    delete b.mediaId;
                    ha.processPlaylistRequest(a);
                } else
                    (a = b.activeItem),
                        a > S - 1 && (a = S - 1),
                        -1 < a && ha.setCounter(a, !1);
            wa = wb = !1;
            ua &&
                (Ca
                    ? ma
                      ? ua.css('opacity', 1)
                      : (ua.remove(), (ua = null), (Ca = !1))
                    : fb
                      ? 0 < Pb
                        ? Pb > ub
                          ? ua.css('opacity', 1)
                          : (ua.remove(), (ua = null), (fb = !1))
                        : (ua.remove(), (ua = null))
                      : (ua.remove(), (ua = null)));
            f(q).trigger('playlistEndLoad', {
                instance: q,
                instanceName: b.instanceName,
                loadMoreOnTotalScroll: Ca,
                addMoreOnTotalScroll: fb,
                playlistLength: S,
            });
            -1 < sa.indexOf('hap-wall') &&
                (Yc
                    ? P.masonry('reloadItems')
                    : ('undefined' === typeof f.fn.masonry &&
                          console.log(
                              'Link to masonry.pkgd.min.js file missing in head tag!'
                          ),
                      'function' !== typeof imagesLoaded &&
                          console.log(
                              'Link to imagesloaded.pkgd.min file missing in head tag!'
                          ),
                      (Yc = P.masonry({
                          itemSelector: '.hap-playlist-item',
                          columnWidth: '.hap-grid-sizer',
                      }))),
                P.imagesLoaded(function() {
                    Yc.masonry('layout');
                }),
                P.find('.hap-playlist-item-content:not(.hap-has-overlay)').each(
                    function() {
                        f(this)
                            .addClass('hap-has-overlay')
                            .find('.hap-playlist-thumb')
                            .after(f('<div class="hap-wall-overlay"></div>'));
                    }
                ));
        }
        function he() {
            pb = new Hls();
            Dd = Hls.isSupported();
            ie = !0;
            pb.on(Hls.Events.MEDIA_ATTACHED, function() {
                pb.loadSource(ea);
            });
            pb.on(Hls.Events.ERROR, function(a, c) {
                if (c.fatal)
                    switch (c.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            console.log(
                                'fatal network error encountered, try to recover'
                            );
                            pb.startLoad();
                            break;
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            console.log(
                                'fatal media error encountered, try to recover'
                            );
                            pb.recoverMediaError();
                            break;
                        default:
                            pb.destroy();
                    }
            });
        }
        function rc() {
            if ('hls' == J) {
                if (((ea = x.path), !ie)) {
                    if ('undefined' === typeof Hls) {
                        var a = document.createElement('script');
                        a.type = 'text/javascript';
                        a.src = 'https://cdn.jsdelivr.net/npm/hls.js@latest';
                        a.onload = a.onreadystatechange = function() {
                            (this.readyState &&
                                'complete' != this.readyState) ||
                                (he(), rc());
                        };
                        a.onerror = function() {
                            alert('Error loading ' + this.src);
                        };
                        var c = document.getElementsByTagName('script')[0];
                        c.parentNode.insertBefore(a, c);
                    } else he(), rc();
                    return;
                }
            } else
                'shoutcast' == J || 'icecast' == J || 'radiojar' == J
                    ? ((ea = b.useCorsForAudio ? b.cors + x.path : x.path),
                      x.mountpoint && (ea += x.mountpoint),
                      'shoutcast' == J &&
                          '/;' != ea.substring(ea.length - 2) &&
                          (ea += '/;'),
                      Xb ||
                          ('undefined' === typeof HAPRadioData &&
                              console.log(
                                  'link to radio.js file missing in head tag!'
                              ),
                          (Xb = new HAPRadioData(b, Ea)),
                          f(Xb).on('HAPRadioData.DATA_READY', function(d, e) {
                              e.title && (x.title = e.title);
                              e.artist && (x.artist = e.artist);
                              e.thumb && (x.thumb = e.thumb);
                              Ed();
                              Xb.getData2();
                          })),
                      Xb.getData(x))
                    : b.useAudioPreview && x.audioPreview
                      ? (ea = x.audioPreview)
                      : De && x.mp3
                        ? (ea = x.mp3)
                        : Ee && x.aac
                          ? (ea = x.aac)
                          : Fe && x.wav
                            ? (ea = x.wav)
                            : Ge && x.flac
                              ? (ea = x.flac)
                              : x.path && (ea = x.path);
            if (ea) {
                -1 != ea.indexOf('ebsfm:') &&
                    (ea = HAPUtils.b64DecodeUnicode(ea.substr(6)));
                'audio' == J &&
                    gb &&
                    !HAPUtils.relativePath(ea) &&
                    (ea = gb + ea);
                Yb.on('ended', function() {
                    (Z && Z.isAdEndOn()) ||
                        (mb && Ga && !Qa && !yc.isDrag()
                            ? ((Qa = !0), (O.currentTime = Ha), O.play())
                            : ld());
                })
                    .on('canplay', function(d) {})
                    .on('canplaythrough', function(d) {})
                    .on('loadedmetadata', function() {
                        try {
                            O.playbackRate = Number(b.playbackRate);
                        } catch (e) {}
                        'audio' == J &&
                            (b.resumeTime
                                ? ((O.currentTime = b.resumeTime),
                                  delete b.resumeTime)
                                : x.start && (O.currentTime = x.start));
                        var d = O.duration;
                        HAPUtils.isNumber(d) &&
                            ($a.html(HAPUtils.formatTime(d)),
                            mb &&
                                (Nb.html('00:00'),
                                Ob.html(HAPUtils.formatTime(d))));
                    })
                    .on('play', function() {
                        Zd();
                    })
                    .on('pause', function() {
                        $d();
                    })
                    .on('seeked', function() {
                        mb &&
                            Ga &&
                            setTimeout(function() {
                                clearTimeout(this);
                                Qa = !1;
                            }, 500);
                        na &&
                            (qb || (na.currentTime = O.currentTime), (qb = !1));
                    })
                    .on('error', function(d) {
                        f(q).trigger('soundError', {
                            instance: q,
                            instanceName: b.instanceName,
                            media: x,
                            error: d,
                        });
                    });
                if ('hls' == J) {
                    if ('file:' == window.location.protocol)
                        return (
                            console.log(
                                'Playing HLS requires server connection!'
                            ),
                            !1
                        );
                    if (Dd) pb.attachMedia(O);
                    else if (O.canPlayType('application/vnd.apple.mpegurl'))
                        O.src = ea;
                    else if (x.mp3) O.src = x.mp3;
                    else {
                        alert(
                            'This browser or device does not support HLS extension. Please use mp3 audio for playback!'
                        );
                        return;
                    }
                    ya &&
                        ((a = O.play()),
                        void 0 !== a &&
                            a.then(function() {})['catch'](function(d) {}));
                } else
                    (O.src = ea),
                        ya &&
                            ((a = O.play()),
                            void 0 !== a &&
                                a.then(function() {})['catch'](function(d) {
                                    console.log(d);
                                }));
                O.volume = b.volume;
                ya = !0;
                'shoutcast' != J &&
                    'icecast' != J &&
                    'radiojar' != J &&
                    (rb && clearInterval(rb), (rb = setInterval(Xd, Yd)));
            } else
                alert(
                    'No required audio format supplied! Please add mp3 audio format to play!'
                );
        }
        function Xd() {
            if (!(Fb || (b.pauseAudioDuringAds && Z && Z.isAdOn()))) {
                if ('youtube' == J) {
                    if (X) {
                        var a = X.getCurrentTime(),
                            c = X.getDuration();
                        var d = X.getVideoLoadedFraction();
                    }
                } else if (
                    O &&
                    ((a = O.currentTime),
                    (c = O.duration),
                    HAPUtils.isNumber(a) &&
                        HAPUtils.isNumber(c) &&
                        'undefined' !== typeof O.buffered &&
                        0 != O.buffered.length)
                ) {
                    try {
                        var e = O.buffered.end(O.buffered.length - 1);
                    } catch (k) {}
                    isNaN(e) || (d = e / c);
                }
                HAPUtils.isNumber(a) &&
                    HAPUtils.isNumber(c) &&
                    (!Zc &&
                        0 < a &&
                        ab &&
                        ((Zc = !0),
                        f(q).trigger('soundPlay', {
                            instance: q,
                            instanceName: b.instanceName,
                            media: x,
                        })),
                    dc
                        ? Ac.drawSeekbar(d, a, c)
                        : (Ra.width(a / c * Ia), d && je.width(d * Ia)),
                    jb.html(HAPUtils.formatTime(a)),
                    $a.html(HAPUtils.formatTime(c)),
                    !Fb && x.end && a >= x.end
                        ? ld()
                        : mb &&
                          Ga &&
                          !Qa &&
                          !yc.isDrag() &&
                          (parseInt(a, 10) < parseInt(Ha, 10) || a > bb)
                          ? ((Qa = !0), q.seek(Ha))
                          : x.lyrics &&
                            kb &&
                            $c &&
                            Zb &&
                            ab &&
                            kb.synchronize(a));
            }
        }
        function Zd() {
            ec ||
                ((ec = !0),
                (Ia = Bc.width()),
                f(q).trigger('soundStart', {
                    instance: q,
                    instanceName: b.instanceName,
                    media: x,
                }),
                x.adMid && Z.adMidStartHandler());
            x.adMid && Z.adMidPlayHandler();
            if (
                b.togglePlaybackOnMultipleInstances &&
                1 < hap_mediaArr.length
            ) {
                var a,
                    c = hap_mediaArr.length;
                for (a = 0; a < c; a++)
                    q != hap_mediaArr[a].inst &&
                        hap_mediaArr[a].inst.pauseMedia();
            }
            na &&
                (qb ||
                    ((a = na.play()),
                    void 0 !== a &&
                        a.then(function() {})['catch'](function(d) {})),
                (qb = !1));
            Zc &&
                f(q).trigger('soundPlay', {
                    instance: q,
                    instanceName: b.instanceName,
                    media: x,
                });
            Va.find('.hap-btn-play').hide();
            Va.find('.hap-btn-pause').show();
            ab = !0;
            b.autoPlayAfterFirst && ((ya = !0), (b.autoPlay = !0));
            b.hidePlayerUntilMusicStart && ke();
            ad &&
                'undefined' !== typeof ga &&
                ga('send', {
                    hitType: 'event',
                    eventCategory: 'Modern audio player: ' + b.instanceName,
                    eventAction: 'played',
                    eventLabel:
                        'title: ' +
                        q.getTitle(x, !0) +
                        ' | time: ' +
                        Math.round(q.getCurrentTime()),
                    nonInteraction: !0,
                });
            -1 < sa.indexOf('hap-fixed') && le(!0);
        }
        function $d() {
            Va.find('.hap-btn-play').show();
            Va.find('.hap-btn-pause').hide();
            na && (qb || na.pause(), (qb = !1));
            ab = !1;
            f(q).trigger('soundPause', {
                instance: q,
                instanceName: b.instanceName,
                media: x,
            });
            ad &&
                'undefined' !== typeof ga &&
                ga('send', {
                    hitType: 'event',
                    eventCategory: 'Modern audio player: ' + b.instanceName,
                    eventAction: 'paused',
                    eventLabel:
                        'title: ' +
                        q.getTitle(x, !0) +
                        ' | time: ' +
                        Math.round(q.getCurrentTime()),
                    nonInteraction: !0,
                });
            -1 < sa.indexOf('hap-fixed') && le();
        }
        function ld() {
            Z && Z.clearAdMidTimeout();
            f(q).trigger('soundEnd', {
                instance: q,
                instanceName: b.instanceName,
                media: x,
            });
            b.useStatistics && zb('hap_finish_count', La);
            ad &&
                'undefined' !== typeof ga &&
                ga('send', {
                    hitType: 'event',
                    eventCategory: 'Modern audio player: ' + b.instanceName,
                    eventAction: 'ended',
                    eventLabel: 'title: ' + q.getTitle(x, !0),
                    nonInteraction: !0,
                });
            x.adEnd ? Z.setAdEnd() : b.stopOnSongEnd || me();
        }
        function me(a) {
            var c = x.start || 0;
            'single' == b.loopState
                ? (a || fc(),
                  'youtube' == J
                      ? X && (X.seekTo(c), X.playVideo())
                      : (a && (O.src = ea), (O.currentTime = c), O.play()))
                : ('off' != b.loopState && 'playlist' != b.loopState) ||
                  q.nextMedia();
        }
        function $b() {
            rb && clearInterval(rb);
            Z &&
                (Z.cleanAds(),
                Ra.removeClass('hap-ad-progress-level'),
                Bb.hide());
            'shoutcast' == J || 'icecast' == J || 'radiojar' == J
                ? Xb.destroy()
                : 'hls' == J
                  ? Dd && pb.detachMedia()
                  : 'youtube' == J &&
                    X &&
                    ((zc = !0), Eb.hide(), Fa && X.stopVideo(), (md = !1));
            O && (O.pause(), (O.src = ''));
            Yb &&
                Yb.off(
                    'ended canplay canplaythrough loadedmetadata pause play error timeupdate seeked'
                );
            jb.html('00:00');
            $a.html('00:00');
            ne.html('');
            oe.html('');
            Ra.width(0);
            je.width(0);
            J = null;
            Tc = ec = ab = !1;
            pe || (ya = !1);
            mb && q.resetRange();
            Va.find('.hap-btn-play').show();
            Va.find('.hap-btn-pause').hide();
            Zc = !1;
            Oa && Oa.find('.hap-lyrics-container').html('');
            kb && kb.deactivate();
            Zb = $c = !1;
            na && (na.pause(), (na.src = ''), (na = null), bd.html(''));
        }
        function Cc() {
            'undefined' !== typeof f.fn.masonry && Yc && P.masonry('destroy');
            J && ($b(), va && u());
            b.sortableTracks &&
                b.sortableTracksSet &&
                (P.sortable('destroy'), (b.sortableTracksSet = !1));
            P.empty();
            Kb = null;
            Xc = wb = !1;
            S = 0;
            vb = -1;
            ja = [];
            da = [];
            pa = [];
            ha.reSetCounter();
            Sb = Lc = Rb = Qb = Kc = Jc = nc = aa = null;
            fb = !1;
            gb = null;
            wa = !1;
            ra = ma = null;
            Ca = !1;
            Ic = Hc = Gc = Fc = Ec = Dc = ub = Pb = tb = null;
            Sa = '';
            nb.find('.hap-btn-sort-alpha-up').hide();
            nb.find('.hap-btn-sort-alpha-down').show();
            Cd.val('');
            yb.hide();
            sc = tc = null;
            Wb = [];
            Ea.css('backgroundImage', 'none').css('opacity', 0);
            f(q).trigger('destroyPlaylist', {
                instance: q,
                instanceName: b.instanceName,
            });
        }
        function fc() {
            cd && Fd && (ja[La].data.start = q.getCurrentTime());
            b.useStatistics &&
                (zb('hap_play_count', La),
                60 > q.getCurrentTime() && zb('hap_skipped_first_minute', La));
        }
        function Bd() {
            if (!T || !b.addResizeEvent) return !1;
            Ia = Bc.width();
            Z && Z.setSeekBarSize(Ia);
            fa.hide();
            var a = w.width();
            a < b.playlistItemMultilineWidth
                ? P.addClass('hap-playlist-item-multiline')
                : P.removeClass('hap-playlist-item-multiline');
            if (b.breakPointArr) {
                var c,
                    d = b.breakPointArr.length;
                for (c = 0; c < d; c++) {
                    var e = b.breakPointArr[c];
                    a < e
                        ? w.addClass('hap-breakpoint-' + e.toString())
                        : w.removeClass('hap-breakpoint-' + e.toString());
                }
            }
            mb && Ga && q.resizeRange();
        }
        function Ed() {
            x.title || x.artist
                ? (q.getTitle(x), Yb.attr('title', q.getTitle(x, !0)))
                : Yb.attr('title', '');
            x.title && ne.html(x.title);
            x.artist && oe.html(x.artist);
            x.description && w.find('.hap-player-desc').html(x.description);
            if ((!Gd || !nc) && Ea.length) {
                var a = x.thumb || x.thumbDefault;
                a ? qe(a) : 'youtube' == J && Ea.css('opacity', 1);
            }
        }
        function qe(a) {
            !gb || x.thumbIsBase64 || HAPUtils.relativePath(a) || (a = gb + a);
            'soundcloud' == x.origtype &&
                b.soundCloudThumbQuality &&
                (a = a.replace('large.jpg', b.soundCloudThumbQuality));
            a = encodeURI(a);
            -1 < Ea.css('backgroundImage').indexOf(a) ||
                (x.title
                    ? Ea.attr('aria-label', x.title)
                    : Ea.attr('aria-label', ''),
                Gd
                    ? (Ea.css('opacity', 0),
                      setTimeout(function() {
                          Ea.css('backgroundImage', 'url(' + a + ')').css(
                              'opacity',
                              1
                          );
                      }, 300))
                    : Ea.css('backgroundImage', 'url(' + a + ')').css(
                          'opacity',
                          1
                      ),
                (Gd = !0),
                (-1 < sa.indexOf('hap-metalic') ||
                    -1 < sa.indexOf('hap-poster')) &&
                    w.find('.hap-player-image').fadeOut(300, function() {
                        f(this)
                            .css('backgroundImage', 'url(' + a + ')')
                            .fadeIn(300);
                    }));
        }
        function He() {
            var a = x.title || '';
            a =
                'https://itunes.apple.com/search?type=jsonp&term==' +
                encodeURI(x.artist || '') +
                '-' +
                encodeURI(a) +
                '&media=music&limit=1';
            f
                .ajax({ url: a, dataType: 'jsonp' })
                .done(function(c) {
                    if (c.results[0] && c.results[0].artworkUrl100) {
                        var d = Ea.width();
                        d = HAPUtils.closestNumber(b.artworkSize, d);
                        c = c.results[0].artworkUrl100.replace(
                            '100x100',
                            d + 'x' + d
                        );
                        ja[La].data.thumb = c;
                        qe(c);
                    }
                })
                .fail(function(c, d, e) {
                    console.log(c, d, e);
                });
        }
        function zb(a, c, d) {
            if ('file:' != window.location.protocol) {
                if ('hap_all_count' == a)
                    var e = [
                        { name: 'action', value: a },
                        { name: 'data', value: JSON.stringify(d) },
                    ];
                else if ('hap_play_count' == a) {
                    if (!ja[c]) return;
                    e = ja[c].data;
                    void 0 == Ta &&
                        void 0 != e.playlistId &&
                        (Ta = e.playlistId);
                    e = [
                        { name: 'action', value: a },
                        {
                            name: 'percentToCountAsPlay',
                            value: b.percentToCountAsPlay,
                        },
                        { name: 'playlist_id', value: Ta },
                        { name: 'player_id', value: b.playerId },
                        { name: 'media_id', value: e.mediaId },
                        { name: 'audio_url', value: ea },
                        {
                            name: 'title',
                            value: e.safeTitle || e.title || '',
                        },
                        {
                            name: 'artist',
                            value: e.safeArtist || e.artist || '',
                        },
                        { name: 'album', value: e.album || '' },
                        {
                            name: 'thumb',
                            value: e.thumb || e.thumbDefault || '',
                        },
                        { name: 'currentTime', value: O.currentTime },
                        { name: 'duration', value: O.duration },
                        { name: 'countryData', value: JSON.stringify(re) },
                    ];
                } else
                    'hap_download_count' == a ||
                    'hap_like_count' == a ||
                    'hap_finish_count' == a
                        ? ((e = ja[c].data),
                          void 0 == Ta &&
                              void 0 != e.playlistId &&
                              (Ta = e.playlistId),
                          (e = [
                              { name: 'action', value: a },
                              { name: 'playlist_id', value: Ta },
                              { name: 'player_id', value: b.playerId },
                              {
                                  name: 'media_id',
                                  value: e.mediaId,
                              },
                              { name: 'audio_url', value: ea },
                              {
                                  name: 'title',
                                  value: e.safeTitle || e.title || '',
                              },
                              {
                                  name: 'artist',
                                  value: e.safeArtist || e.artist || '',
                              },
                              { name: 'album', value: e.album || '' },
                              {
                                  name: 'thumb',
                                  value: e.thumb || e.thumbDefault || '',
                              },
                          ]))
                        : 'hap_skipped_first_minute' == a &&
                          ((e = ja[c].data),
                          (e = [
                              { name: 'action', value: a },
                              { name: 'playlist_id', value: Ta },
                              { name: 'player_id', value: b.playerId },
                              { name: 'media_id', value: e.mediaId },
                              { name: 'audio_url', value: ea },
                              {
                                  name: 'title',
                                  value: e.safeTitle || e.title || '',
                              },
                              {
                                  name: 'artist',
                                  value: e.safeArtist || e.artist || '',
                              },
                              { name: 'album', value: e.album || '' },
                              {
                                  name: 'thumb',
                                  value: e.thumb || e.thumbDefault || '',
                              },
                          ]));
                d = b.ajax_url;
                console.log(e);
                f
                    .ajax({ url: d, type: 'post', data: e, dataType: 'json' })
                    .done(function(k) {
                        if (b.usePlaylist && k) {
                            var m = P.find(
                                '.hap-playlist-item[data-id="' + c + '"]'
                            );
                            if ('hap_like_count' == a && k.c_like)
                                m
                                    .find('.hap-like-count span')
                                    .html(
                                        HAPUtils.nFormatter(
                                            parseInt(k.c_like, 10),
                                            1
                                        )
                                    );
                            else if ('hap_download_count' == a && k.c_download)
                                m
                                    .find('.hap-download-count span')
                                    .html(
                                        HAPUtils.nFormatter(
                                            parseInt(k.c_download, 10),
                                            1
                                        )
                                    );
                            else if ('hap_play_count' == a && k.c_play)
                                m
                                    .find('.hap-play-count span')
                                    .html(
                                        HAPUtils.nFormatter(
                                            parseInt(k.c_play, 10),
                                            1
                                        )
                                    );
                            else if ('hap_all_count' == a) {
                                var v = k.length,
                                    R;
                                for (m = 0; m < v; m++) {
                                    var U = k[m];
                                    U.title && U.artist && U.media_id
                                        ? (R = P.find(
                                              '.hap-playlist-item[data-media-id="' +
                                                  U.media_id +
                                                  '"][data-safe-title="' +
                                                  U.title +
                                                  '"][data-safe-artist="' +
                                                  U.artist +
                                                  '"]'
                                          ))
                                        : U.title && U.artist
                                          ? (R = P.find(
                                                '.hap-playlist-item[data-safe-title="' +
                                                    U.title +
                                                    '"][data-safe-artist="' +
                                                    U.artist +
                                                    '"]'
                                            ))
                                          : U.title
                                            ? (R = P.find(
                                                  '.hap-playlist-item[data-media-id="' +
                                                      U.media_id +
                                                      '"][data-safe-title="' +
                                                      U.title +
                                                      '"]'
                                              ))
                                            : U.artist &&
                                              (R = P.find(
                                                  '.hap-playlist-item[data-media-id="' +
                                                      U.media_id +
                                                      '"][data-safe-artist="' +
                                                      U.artist +
                                                      '"]'
                                              ));
                                    R.find('.hap-like-count span').html(
                                        HAPUtils.nFormatter(
                                            parseInt(U.c_like, 10),
                                            1
                                        )
                                    );
                                    R.find('.hap-download-count span').html(
                                        HAPUtils.nFormatter(
                                            parseInt(U.c_download, 10),
                                            1
                                        )
                                    );
                                    R.find('.hap-play-count span').html(
                                        HAPUtils.nFormatter(
                                            parseInt(U.c_play, 10),
                                            1
                                        )
                                    );
                                }
                            }
                        }
                    })
                    .fail(function(k, m, v) {
                        console.log('Error getStats: ' + k.responseText, m, v);
                    });
            }
        }
        function le(a) {
            Cb.find('.hap-btn').hide();
            a
                ? Cb.find('.hap-btn-pause').show()
                : Cb.find('.hap-btn-play').show();
        }
        function Vc() {
            Ba.show();
            wa = !0;
            ua && ua.css('opacity', 0);
            f
                .ajax({
                    url: b.ajax_url,
                    type: 'post',
                    data: [
                        { name: 'action', value: 'hap_add_more' },
                        { name: 'playlist_id', value: Ta },
                        { name: 'addMoreOffset', value: ub },
                        { name: 'addMoreLimit', value: tb },
                        { name: 'addMoreSortOrder', value: Dc },
                        { name: 'addMoreSortDirection', value: Ec },
                        {
                            name: 'encryptMediaPaths',
                            value: b.encryptMediaPaths,
                        },
                        { name: 'taxonomy', value: Fc },
                        { name: 'category', value: Gc },
                        { name: 'tag', value: Hc },
                        {
                            name: 'match',
                            value: Ic,
                        },
                    ],
                    dataType: 'json',
                })
                .done(function(a) {
                    console.log(a);
                    aa &&
                        void 0 != aa.attr('data-add-more-offset') &&
                        ((ub =
                            parseInt(aa.attr('data-add-more-offset'), 10) + tb),
                        aa.attr('data-add-more-offset', ub));
                    q.addTrack(a);
                })
                .fail(function(a, c, d) {
                    console.log(a, c, d);
                    q.endLoadMore();
                });
        }
        function Ie() {
            Ba.show();
            wa = !0;
            var a = [
                { name: 'action', value: 'hap_paginate' },
                { name: 'playlist_id', value: Ta },
                { name: 'addMoreOffset', value: ub },
                { name: 'addMoreLimit', value: tb },
                { name: 'addMoreSortOrder', value: Dc },
                { name: 'addMoreSortDirection', value: Ec },
                { name: 'encryptMediaPaths', value: b.encryptMediaPaths },
                { name: 'taxonomy', value: Fc },
                { name: 'category', value: Gc },
                { name: 'tag', value: Hc },
                { name: 'match', value: Ic },
            ];
            console.log(a);
            f
                .ajax({
                    url: b.ajax_url,
                    type: 'post',
                    data: a,
                    dataType: 'json',
                })
                .done(function(c) {
                    console.log(c);
                    P.find('.hap-playlist-item:visible')
                        .addClass('hap-pagination-hidden')
                        .each(function() {
                            f(this)
                                .find('.hap-thumbimg')
                                .removeClass('hap-visible');
                        });
                    q.addTrack(c);
                    Ad(Ka);
                    fe();
                })
                .fail(function(c, d, e) {
                    console.log(c, d, e);
                    q.endLoadMore();
                });
        }
        function fe() {
            Wb[Ka].page = Ka;
            var a = [];
            P.find('.hap-playlist-item:not(.hap-pagination-hidden)').each(
                function() {
                    a.push(f(this));
                }
            );
            Wb[Ka].media_id = a;
        }
        function Ad(a) {
            a += 1;
            var c = '<div class="hap-pagination-container">';
            1 < a &&
                (c +=
                    '<div class="hap-pagination-page hap-pagination-prev" data-page-id="prev" title="' +
                    b.paginationPreviousBtnTitle +
                    '">' +
                    b.paginationPreviousBtnText +
                    '</div>');
            3 < a &&
                (c +=
                    '<div class="hap-pagination-page hap-pagination-start" data-page-id="0">1</div><div class="hap-pagination-dots">...</div>');
            if (0 < a - 2) {
                var d = a - 2;
                c +=
                    '<div class="hap-pagination-page" data-page-id="' +
                    (d - 1) +
                    '">' +
                    d +
                    '</div>';
            }
            0 < a - 1 &&
                ((d = a - 1),
                (c +=
                    '<div class="hap-pagination-page" data-page-id="' +
                    (d - 1) +
                    '">' +
                    d +
                    '</div>'));
            d = a;
            c +=
                '<div class="hap-pagination-page hap-pagination-currentpage" data-page-id="' +
                (d - 1) +
                '">' +
                d +
                '</div>';
            a + 1 < Lb + 1 &&
                ((d = a + 1),
                (c +=
                    '<div class="hap-pagination-page" data-page-id="' +
                    (d - 1) +
                    '">' +
                    d +
                    '</div>'));
            a + 2 < Lb + 1 &&
                ((d = a + 2),
                (c +=
                    '<div class="hap-pagination-page" data-page-id="' +
                    (d - 1) +
                    '">' +
                    d +
                    '</div>'));
            a < Lb - 2 &&
                ((d = Lb),
                (c +=
                    '<div class="hap-pagination-dots">...</div><div class="hap-pagination-page hap-pagination-end" data-page-id="' +
                    (d - 1) +
                    '">' +
                    d +
                    '</div>'));
            a < Lb &&
                (c +=
                    '<div class="hap-pagination-page hap-pagination-next" data-page-id="next" title="' +
                    b.paginationNextBtnTitle +
                    '">' +
                    b.paginationNextBtnText +
                    '</div>');
            c += '</div>';
            sc
                ? sc.html(c)
                : w.append('<div class="hap-pagination-wrap">' + c + '</div>');
            se ||
                ((se = !0),
                (sc = w
                    .find('.hap-pagination-wrap')
                    .on(
                        'click',
                        '.hap-pagination-page:not(.hap-pagination-currentpage)',
                        function() {
                            if (!T || oa || wa) return !1;
                            wa = !0;
                            tc && tc.removeClass('hap-pagination-currentpage');
                            tc = f(this).addClass('hap-pagination-currentpage');
                            var e = f(this).attr('data-page-id');
                            Ka =
                                'prev' == e
                                    ? Ka - 1
                                    : 'next' == e ? Ka + 1 : parseInt(e, 10);
                            null == Wb[Ka].page
                                ? ((ub = Ka * tb), Ie())
                                : (P.find('.hap-playlist-item:visible')
                                      .addClass('hap-pagination-hidden')
                                      .each(function() {
                                          f(this)
                                              .find('.hap-thumbimg')
                                              .removeClass('hap-visible');
                                      }),
                                  f(Wb[Ka].media_id).each(function() {
                                      var k = f(this)
                                          .removeClass('hap-pagination-hidden')
                                          .find('.hap-thumbimg')
                                          .removeClass('hap-visible');
                                      setTimeout(function() {
                                          k.addClass('hap-visible');
                                      }, 20);
                                  }),
                                  Ad(Ka),
                                  (wa = !1));
                        }
                    )),
                (tc = sc.find('.hap-pagination-currentpage')));
        }
        function ke() {
            b.hidePlayerUntilMusicStart &&
                ((b.hidePlayerUntilMusicStart = !1),
                Wc.removeClass('hap-music-player-force-hidden'),
                Bd(),
                -1 < sa.indexOf('hap-fixed') && ge(),
                setTimeout(function() {
                    Wc.css('opacity', 1);
                }, 50));
        }
        function ge() {
            -1 < sa.indexOf('hap-fixed') &&
                (Mb.on('click', function() {
                    b.playerOpened
                        ? (w.stop().animate(
                              { bottom: -w.height() + 'px' },
                              {
                                  duration: 400,
                                  complete: function() {
                                      Mb.find('.hap-btn').hide();
                                      Mb.find('.hap-btn-player-open').show();
                                      0 < S && J && Cb.show();
                                  },
                              }
                          ),
                          (b.playlistOpened = !1))
                        : (w.stop().animate(
                              {
                                  bottom: -Pa.height() + 'px',
                              },
                              { duration: 400 }
                          ),
                          Mb.find('.hap-btn').hide(),
                          Mb.find('.hap-btn-player-close').show(),
                          Cb.hide());
                    b.playerOpened = !b.playerOpened;
                }),
                Cb.on('click', function(a) {
                    q.togglePlayback();
                }),
                Cb.find('.hap-btn-play').show(),
                w.hasClass('hap-fixed-inited') ||
                    (w.addClass('hap-fixed-inited'),
                    setTimeout(function() {
                        b.playerOpened
                            ? (b.playlistOpened
                                  ? w.css({ bottom: '0px' })
                                  : w.css({ bottom: -Pa.height() + 'px' }),
                              Mb.find('.hap-btn-player-close').show())
                            : ((b.playlistOpened = !1),
                              w.css({ bottom: -w.height() + 'px' }),
                              Mb.find('.hap-btn-player-open').show(),
                              0 < S && J && Cb.show());
                    }, 20)));
        }
        b = f.extend(
            !0,
            {},
            {
                sharemanager_js: 'js/sharemanager.js',
                perfectScrollbar_js: 'js/perfect-scrollbar.min.js',
                mCustomScrollbar_js: 'js/jquery.mCustomScrollbar.concat.min.js',
                mediaId: null,
                mediaTitle: null,
                resumeTime: null,
                sourcePath: '',
                instanceName: '',
                queryInstance: '',
                playlistItemContent: '',
                playlistTitleOrder: 'title,artist',
                statisticsContent: 'plays,likes,downloads',
                dataInterval: 250,
                volume: 0.5,
                activeItem: 0,
                numberTitleSeparator: '.&nbsp;',
                artistTitleSeparator: '&nbsp;-&nbsp;',
                useNumbersInPlaylist: !1,
                preload: 'auto',
                autoPlay: !1,
                loopState: 'playlist',
                playbackRate: 1,
                addResizeEvent: !0,
                addPlaylistEvents: !0,
                sortableTracksSet: !1,
                pauseAudioDuringAds: !0,
                randomPlay: !1,
                usePlaylist: !0,
                playlistScrollType: 'mcustomscrollbar',
                useVideoControls: !1,
                usePlaylistScroll: !1,
                useKeyboardNavigationForPlayback: !1,
                keyboardControls: [
                    { keycode: 37, action: 'seekBackward' },
                    { keycode: 39, action: 'seekForward' },
                    { keycode: 32, action: 'togglePlayback' },
                    { keycode: 38, action: 'volumeUp' },
                    { keycode: 40, action: 'volumeDown' },
                    { keycode: 77, action: 'toggleMute' },
                    { keycode: 33, action: 'nextMedia' },
                    { keycode: 34, action: 'previousMedia' },
                    { keycode: 82, action: 'rewind' },
                ],
                togglePlaybackOnMultipleInstances: !0,
                useTitleScroll: !1,
                clearDialogCacheOnStart: !0,
                useSeekOnLyrics: !0,
                lyricsAutoOpen: !1,
                videoAutoOpen: !1,
                titleScrollSpeed: 1,
                titleScrollSeparator: ' *** ',
                continousKey: 'hap-continous-key',
                lyricsAutoScroll: !0,
                useMediaSession: !0,
                createDownloadIconsInPlaylist: !1,
                createLinkIconsInPlaylist: !1,
                limitDescriptionReadMoreText: 'Read more',
                limitDescriptionReadLessText: 'Read less',
                scak: '4e6c7139ca2791a89863367ba374a28e r4wruADPCq7iqJomagvYpdehvILa2bgE b972bf0e059078490e8579b43bf95923 64c56d14d1844681f7cca8c61ec0082a 86b6a66bb2d863f5d64dd8a91cd8de94 8da368dc752f739dcf6e4abb8317548d b4bee2a55625cf4ab8e3f7ea1d35e103 0aff03b3b79c2ac02fd2283b300735bd'.split(
                    ' '
                ),
                useShare: !0,
                percentToCountAsPlay: 25,
                scrollToPlayer: 0,
                linkIconTitle: 'Tip',
                downloadIconTitle: 'Download',
                tooltipStatPlays: 'Plays',
                tooltipStatLikes: 'Likes',
                tooltipStatDownloads: 'Downloads',
                artworkSize: [100, 200, 250, 340, 460, 600],
                soundCloudThumbQuality: 't300x300.jpg',
                playbackRateMin: 0.5,
                playbackRateMax: 2,
                sortOrder: '',
                modifierKey: '',
                getId3Image: !0,
                useContinousPlayback: !1,
                playlistItemMultilineWidth: 600,
                searchDescriptionInPlaylist: !0,
                hideYoutubeAfterStart: !1,
                getRadioArtwork: !0,
                defaultSongArtist: 'DATA NOT AVAILABLE',
                defaultSongTitle: 'DATA NOT AVAILABLE',
                lastPlayedInterval: 1e4,
                enableCors: !0,
                cors:
                    'https://kastproxy-us.herokuapp.com/,https://kastproxy-eu.herokuapp.com/,https://cors-anywhere.herokuapp.com/,https://cors.io/?',
                useCorsForAudio: !1,
                seekTime: 10,
                paginationPreviousBtnTitle: 'Previous',
                paginationPreviousBtnText: 'Prev',
                paginationNextBtnTitle: 'Next',
                paginationNextBtnText: 'Next',
                whatsAppWarning: 'Please share this content on mobile device!',
                downloadIcon:
                    "<svg viewBox='0 0 512 512'><path d='M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z'></path></svg>",
                linkIcon:
                    "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 110.94 108.64'><defs><style>.cls-1{fill:none;}.cls-2{clip-path:url(#clip-path);}.cls-3{clip-path:url(#clip-path-2);}.cls-4{clip-path:url(#clip-path-3);}.cls-5{clip-path:url(#clip-path-4);}.cls-6{clip-path:url(#clip-path-5);}.cls-7{clip-path:url(#clip-path-6);}.cls-8{clip-path:url(#clip-path-7);}.cls-9{clip-path:url(#clip-path-8);}.cls-10{fill:url(#Degradado_sin_nombre_23);}.cls-11{fill:#229ac4;}</style><clipPath id='clip-path'><path class='cls-1' d='M18.53,23.5,18.2,86.36,17.86,86h0a48.63,48.63,0,0,1,.68-62.44Z'/></clipPath><clipPath id='clip-path-2'><rect class='cls-1' x='1.86' y='18.5' width='21.67' height='72.86'/></clipPath><clipPath id='clip-path-3'><path class='cls-1' d='M47.51,55.29v47.87a48.44,48.44,0,0,1-18.67-7.31V40.44A41.17,41.17,0,0,1,38.5,45.7,36,36,0,0,1,47.51,55.29Z'/></clipPath><clipPath id='clip-path-4'><rect class='cls-1' x='23.84' y='35.44' width='28.67' height='72.72'/></clipPath><clipPath id='clip-path-5'><path class='cls-1' d='M82.05,40.44V96a48.41,48.41,0,0,1-18.67,7.21V55.29a36,36,0,0,1,9-9.59A41.17,41.17,0,0,1,82.05,40.44Z'/></clipPath><clipPath id='clip-path-6'><rect class='cls-1' x='58.37' y='35.44' width='28.67' height='72.76'/></clipPath><clipPath id='clip-path-7'><path class='cls-1' d='M104.25,55.13A48.46,48.46,0,0,1,93.37,85.81c-.33.41-.67.82-1,1.22V23.23a47.84,47.84,0,0,1,5.35,7.49s0,0,0,0A48.44,48.44,0,0,1,104.25,55.13Z'/></clipPath><clipPath id='clip-path-8'><rect class='cls-1' x='87.35' y='18.23' width='21.9' height='73.8'/></clipPath><linearGradient id='Degradado_sin_nombre_23' x1='55.67' y1='38.84' x2='55.67' y2='6.59' gradientUnits='userSpaceOnUse'><stop offset='0.18' stop-color='#229ac4'/><stop offset='0.51' stop-color='#15c3dd'/><stop offset='0.83' stop-color='#0be5f2'/><stop offset='1' stop-color='#07f2fa'/></linearGradient></defs><g id='Capa_2' data-name='Capa 2'><g id='Capa_1-2' data-name='Capa 1'><g class='cls-2'><g class='cls-3'><image width='47' height='152' transform='translate(1.39 18.4) scale(0.48)' xlink:href='data:image/png;base64,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'/></g></g><g class='cls-4'><g class='cls-5'><image width='61' height='153' transform='translate(23.47 35.2) scale(0.48)' xlink:href='data:image/png;base64,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'/></g></g><g class='cls-6'><g class='cls-7'><image width='61' height='153' transform='translate(58.03 35.2) scale(0.48)' xlink:href='data:image/png;base64,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'/></g></g><g class='cls-8'><g class='cls-9'><image width='46' height='155' transform='translate(87.31 17.92) scale(0.48)' xlink:href='data:image/png;base64,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'/></g></g><path class='cls-10' d='M84.78,16.23C82.56,17,74.29,20.44,69,24.47A69.61,69.61,0,0,0,55.4,38.84,56.49,56.49,0,0,0,43.11,24.79C38.75,21.31,28.62,16.9,26.56,16A48.3,48.3,0,0,1,39.07,9.3l.1,0a51.43,51.43,0,0,1,34,.44l0,0A46.65,46.65,0,0,1,84.78,16.23Z'/><path class='cls-11' d='M106.94,35.07A60.34,60.34,0,0,1,110,52.59a57.3,57.3,0,0,1-.07,7.52c-1.48,19-12.43,32.42-27.87,41.11v3.56a55.95,55.95,0,0,0,24.84-69.71Z'/><path class='cls-11' d='M.17,60.17a55.72,55.72,0,0,0,28.66,44.61v-3.56C13.39,92.53,2.45,79.1,1,60.11A57.3,57.3,0,0,1,.9,52.59,60.34,60.34,0,0,1,4,35.07,55.58,55.58,0,0,0,.17,60.17Z'/><path class='cls-11' d='M55.59,0h-.07A55.55,55.55,0,0,0,21.87,11.41c-1,.75-1.37,1.1-1.37,1.1A61.89,61.89,0,0,1,55.52.92h.07a61.89,61.89,0,0,1,35,11.61,11,11,0,0,0-1.32-1.08A55.64,55.64,0,0,0,55.59,0Z'/></g></g></svg>",
                statDownloadIcon:
                    "<svg viewBox='0 0 512 512'><path d='M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zM212 140v116h-70.9c-10.7 0-16.1 13-8.5 20.5l114.9 114.3c4.7 4.7 12.2 4.7 16.9 0l114.9-114.3c7.6-7.6 2.2-20.5-8.5-20.5H300V140c0-6.6-5.4-12-12-12h-64c-6.6 0-12 5.4-12 12z'></path></svg>",
                statLikeIcon:
                    "<svg viewBox='0 0 512 512'><path d='M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z'></path></svg>",
                statPlayIcon:
                    "<svg viewBox='0 0 512 512'><path d='M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z'></path></svg>",
            },
            b
        );
        var dd = HAPUtils.getUrlParameter(),
            uc = [],
            Hd = [];
        if (
            decodeURIComponent(dd['hap-query-instance']) == b.instanceName &&
            (Object.keys(dd).forEach(function(a) {
                if (0 == a.indexOf('hap-')) {
                    var c = a.substr(4).replace(/-([a-z])/g, function(d) {
                        return d[1].toUpperCase();
                    });
                    if ((a = decodeURIComponent(dd[a]).replace(/\+/g, ' ')))
                        b.hasOwnProperty(c)
                            ? ('true' === a
                                  ? (a = !0)
                                  : 'false' === a && (a = !1),
                              (b[c] = a))
                            : ((a = a.split(',').map(function(d) {
                                  return d.trim();
                              })),
                              uc.push({ key: c, value: a }));
                }
            }),
            uc.length)
        ) {
            var Wa,
                ed,
                vc = uc.length,
                Je = uc[0].value.length;
            for (ed = 0; ed < Je; ed++) {
                var Id = {};
                for (Wa = 0; Wa < vc; Wa++) {
                    var Jd = uc[Wa];
                    var ac = Jd.value[ed];
                    'true' === ac ? (ac = !0) : 'false' === ac && (ac = !1);
                    Id[Jd.key] = ac;
                    'type' === Jd.key && (Id.origtype = ac);
                }
                Hd.push(Id);
            }
        }
        dd = null;
        var w = f(this).css('display', 'block'),
            Wc = w.find('.hap-player-outer');
        b.hidePlayerUntilMusicStart &&
            Wc.addClass('hap-music-player-force-hidden');
        var sa = '';
        void 0 != w.attr('class') && (sa = w.attr('class').split(/\s+/));
        if (b.customClass)
            if (-1 < b.customClass.indexOf('|')) {
                var te = b.customClass.split(',');
                vc = te.length;
                for (Wa = 0; Wa < vc; Wa++) {
                    var ue = te[Wa].split('|');
                    w.find(ue[0]).addClass(ue[1]);
                }
            } else w.addClass(b.customClass);
        b.markup && w.append(b.markup);
        var pd = f(b.playlistList),
            Pa = w.find('.hap-playlist-holder'),
            Na = w.find('.hap-playlist-inner');
        w.find('.hap-playlist-inner-wrap');
        var P = w.find('.hap-playlist-content'),
            yb = w.find('.hap-playlist-filter-msg'),
            nb = w.find('.hap-sort-alpha'),
            Ke = w.find('.hap-popup-toggle'),
            Bc = w.find('.hap-progress-bg'),
            je = w.find('.hap-load-level'),
            Ra = w.find('.hap-progress-level');
        w.find('.hap-volume-toggle');
        w.find('.hap-volume-seekbar');
        w.find('.hap-volume-bg');
        w.find('.hap-volume-level');
        var Oa = w.find('.hap-lyrics-holder'),
            Kd = w.find('.hap-lyrics-toggle'),
            Db = w.find('.hap-video-holder'),
            bd = w.find('.hap-video-wrap'),
            Ld = w.find('.hap-video-toggle'),
            fd = w.find('.hap-player-holder'),
            Ea = w.find('.hap-player-thumb').attr('role', 'img'),
            kc = w.find('.hap-share-holder'),
            lc = w.find('.hap-playback-rate-holder'),
            Le = w.find('.hap-playback-rate-toggle'),
            ne = w.find('.hap-player-title'),
            oe = w.find('.hap-player-artist'),
            jb = w.find('.hap-media-time-current'),
            $a = w.find('.hap-media-time-total'),
            Bb = w.find('.hap-media-time-ad'),
            Va = w.find('.hap-playback-toggle'),
            Ib = w.find('.hap-loop-toggle'),
            eb = w.find('.hap-random-toggle'),
            Md = w.find('.hap-range-toggle'),
            ve = w.find('.hap-range-holder'),
            Me = w.find('.hap-share-toggle'),
            Ba = w.find('.hap-preloader'),
            Cb = w.find('.hap-playback-toggle-ex'),
            Mb = w.find('.hap-player-toggle-ex'),
            oc = HAPUtils.isMobile(),
            we = HAPUtils.hasLocalStorage(),
            ya = b.autoPlay,
            pe = ya,
            Ja = b.playlistItemContent.replace(/\s+/g, '').split(','),
            Be = b.playlistTitleOrder.replace(/\s+/g, '').split(','),
            Qc = b.statisticsContent
                ? b.statisticsContent.replace(/\s+/g, '').split(',')
                : '',
            cd = b.useContinousPlayback && we,
            Fd = cd && b.continousPlaybackTrackAllSongs,
            Nd =
                b.useMediaSession &&
                'mediaSession' in navigator &&
                'file:' != window.location.protocol,
            ad = b.useGa && b.gaTrackingId,
            Sa = b.sortOrder,
            Ne = b.fetchPlayerArtwork && Ea.length;
        b.playlistContent && (P = f(b.playlistContent));
        var q = this,
            T,
            oa;
        f('body');
        var ae = f(window),
            Gb = f(document),
            Od,
            xd = HAPUtils.hasDownloadSupport(),
            gc = HAPUtils.isIOS();
        HAPUtils.isAndroid();
        var De = HAPUtils.canPlayMp3(),
            Fe = HAPUtils.canPlayWav(),
            Ee = HAPUtils.canPlayAac(),
            Ge = HAPUtils.canPlayFlac();
        HAPUtils.isChrome();
        HAPUtils.isSafari();
        var Ae = b.sourcePath + 'includes/ba-simple-proxy.php',
            mc = ['playlist', 'single', 'off'],
            Jb = mc.indexOf(b.loopState),
            xe = ['audio', 'hls', 'shoutcast', 'icecast', 'radiojar'],
            Oe = 'audio youtube_single hls shoutcast icecast radiojar'.split(
                ' '
            ),
            gb,
            se,
            tc,
            sc,
            Lb,
            Ka,
            Wb = [],
            Yc,
            ib,
            Aa,
            ob,
            Yb = f(document.createElement('audio')).attr('preload', b.preload),
            O = Yb[0],
            Zc,
            fb,
            tb,
            Pb,
            ub,
            Dc,
            Ec,
            Fc,
            Gc,
            Hc,
            Ic,
            na,
            gd,
            qb,
            ma,
            wa,
            ra,
            Ca,
            rd,
            qd,
            za,
            Ua = [],
            pb,
            Dd,
            ie,
            Xb,
            Z,
            hc,
            kb,
            $c,
            Zb,
            kd,
            hb,
            Eb,
            X,
            Ud,
            Fa,
            md,
            zc,
            Wd,
            Vd,
            qc,
            nd,
            Gd,
            nc,
            Jc,
            Kc,
            Qb,
            Rb,
            Lc,
            Sb,
            Vb,
            Za,
            wb,
            Tc,
            vb = -1,
            Oc,
            ja = [],
            vd = [],
            da = [],
            pa = [],
            aa,
            S = 0,
            Xc,
            Kb,
            Ta,
            va,
            ec,
            J,
            ea,
            La,
            ab = !1,
            Uc,
            re,
            x,
            Yd = b.dataInterval,
            rb,
            Fb,
            Ia,
            Hb = HAPUtils.getEvents(),
            Pd = 0.5,
            Ab,
            yd,
            sb,
            Mc,
            ee,
            Da,
            ic,
            jc = [],
            sd;
        sb && (b.usePlaylist = !0);
        -1 == Ja.indexOf('description') && (b.searchDescriptionInPlaylist = !1);
        'undefined' === typeof window.hap_mediaArr &&
            (window.hap_mediaArr = []);
        window.hap_mediaArr.push({ inst: q, id: b.instanceName });
        oc && (ya = !1);
        b.autoPlayAfterFirst && ((ya = !1), (pe = !0));
        0 > b.volume ? (b.volume = 0) : 1 < b.volume && (b.volume = 1);
        0 != b.volume && (Pd = b.volume);
        -1 == Jb && (b.loopState = 'off');
        Jb = mc.indexOf(b.loopState);
        Ib.find('.hap-btn-loop-' + b.loopState).show();
        b.randomPlay
            ? eb.find('.hap-btn-random-on').show()
            : eb.find('.hap-btn-random-off').show();
        if (b.playlistSelector)
            f(b.playlistSelector).on('change', function() {
                q.loadPlaylist(f(this).val());
            });
        b.breakPointArr &&
            'string' === typeof b.breakPointArr &&
            ((b.breakPointArr = b.breakPointArr.split(',')),
            HAPUtils.sortNumericArray(b.breakPointArr));
        0 == P.length &&
            ((b.usePlaylist = !1),
            (b.usePlaylistScroll = !1),
            (b.useNumbersInPlaylist = !1));
        nb.find('.hap-btn-sort-alpha-down').show();
        Va.find('.hap-btn-play').show();
        b.sortableTracks && !b.sortableTracksSet && setSortableTracks();
        if (b.scrollToPlayer && !b.isPopup) {
            delete b.scrollToPlayer;
            var Pe = w.offset().top;
            f('html,body').animate({ scrollTop: Pe }, 500);
        }
        var ua = w.find('.hap-load-more-btn').on('click', function() {
                if (!T || wa) return !1;
                Ca ? q.loadMore() : fb && Vc();
                ua && ua.css('opacity', 0);
            }),
            hd = [];
        Oa.length &&
            hd.push({
                element: 'lyrics',
                itemHandle: Oa.find('.hap-dialog-header-drag')[0],
                itemResizeHandle: Oa.find('.hap-dialog-resizable')[0],
                itemResizeMinW: parseInt(Oa.css('min-width'), 10),
                itemResizeMinH: parseInt(Oa.css('min-height'), 10),
                itemDialog: Oa[0],
            });
        Db.length &&
            hd.push({
                element: 'video',
                itemHandle: Db.find('.hap-dialog-header-drag')[0],
                itemResizeHandle: Db.find('.hap-dialog-resizable')[0],
                itemResizeMinW: parseInt(Db.css('min-width'), 10),
                itemResizeMinH: parseInt(Db.css('min-height'), 10),
                itemDialog: Db[0],
            });
        hd.length &&
            (document.addEventListener(
                'HAPDialog.LYRICS_AUTOSCROLL_CHANGE',
                function(a) {
                    b.lyricsAutoScroll = a.detail;
                    kb && kb.setAutoScroll(b.lyricsAutoScroll);
                }
            ),
            new HAPDialog(w, hd, b));
        this.toggleLyrics = function() {
            Zb ? Oa.css('display', 'none') : Oa.css('display', 'block');
            Zb = !Zb;
        };
        this.toggleVideo = function() {
            if (gd) Db.css('display', 'none'), na && na.pause();
            else if ((Db.css('display', 'block'), na && ab)) {
                var a = na.play();
                void 0 !== a &&
                    a
                        .then(function() {
                            var c = q.getCurrentTime();
                            c && (na.currentTime = c);
                        })
                        ['catch'](function(c) {});
            }
            gd = !gd;
        };
        Gb.on('click', '[data-time-marker]', function(a) {
            a.preventDefault();
            if (!T || void 0 == f(this).attr('data-time-marker')) return !1;
            a = HAPUtils.hmsToSecondsOnly(f(this).attr('data-time-marker'));
            q.seek(a);
            ab || q.playMedia();
            a = w.offset().top;
            f('html,body').animate({ scrollTop: a }, 500);
        });
        var Cd = b.searchSelector
            ? f(b.searchSelector)
            : w.find('.hap-search-filter');
        Cd.on('keyup', function() {
            if (0 == S) return !1;
            var a = f(this)
                    .val()
                    .toLowerCase(),
                c,
                d = 0;
            if (sb)
                if (b.allowOnlyOneOpenedAccordion) {
                    for (c = 0; c < S; c++) {
                        var e = Ab.find('.hap-playlist-item').eq(c);
                        var k = '';
                        e.find('.hap-playlist-title').length &&
                            (k += e
                                .find('.hap-playlist-title')
                                .html()
                                .toLowerCase());
                        e.find('.hap-playlist-artist').length &&
                            (k += e
                                .find('.hap-playlist-artist')
                                .html()
                                .toLowerCase());
                        b.searchDescriptionInPlaylist &&
                            e.find('.hap-playlist-description').length &&
                            (k += e
                                .find('.hap-playlist-description')
                                .html()
                                .toLowerCase());
                        -1 < k.indexOf(a) ? e.show() : (e.hide(), d++);
                    }
                    d == S ? yb.show() : yb.hide();
                } else {
                    d = Pa.find('.hap-accordion-item-opened');
                    d.find('.hap-accordion-item-content').each(function() {
                        '' == a
                            ? f(this).removeClass(
                                  'hap-accordion-item-content-search'
                              )
                            : f(this).addClass(
                                  'hap-accordion-item-content-search'
                              );
                    });
                    var m = d.find('.hap-playlist-item').length;
                    for (c = 0; c < m; c++)
                        (e = d.find('.hap-playlist-item').eq(c)),
                            (k = ''),
                            e.find('.hap-playlist-title').length &&
                                (k += e
                                    .find('.hap-playlist-title')
                                    .html()
                                    .toLowerCase()),
                            e.find('.hap-playlist-artist').length &&
                                (k += e
                                    .find('.hap-playlist-artist')
                                    .html()
                                    .toLowerCase()),
                            b.searchDescriptionInPlaylist &&
                                e.find('.hap-playlist-description').length &&
                                (k += e
                                    .find('.hap-playlist-description')
                                    .html()
                                    .toLowerCase()),
                            -1 < k.indexOf(a) ? e.show() : e.hide();
                }
            else {
                for (c = 0; c < S; c++)
                    (e = P.find('.hap-playlist-item').eq(c)),
                        (k = ''),
                        e.find('.hap-playlist-title').length &&
                            (k += e
                                .find('.hap-playlist-title')
                                .html()
                                .toLowerCase()),
                        e.find('.hap-playlist-artist').length &&
                            (k += e
                                .find('.hap-playlist-artist')
                                .html()
                                .toLowerCase()),
                        b.searchDescriptionInPlaylist &&
                            e.find('.hap-playlist-description').length &&
                            (k += e
                                .find('.hap-playlist-description')
                                .html()
                                .toLowerCase()),
                        -1 < k.indexOf(a) ? e.show() : (e.hide(), d++);
                d == S ? yb.show() : yb.hide();
            }
        });
        if (b.useShare)
            if ('undefined' === typeof HAPShareManager) {
                var bc = document.createElement('script');
                bc.type = 'text/javascript';
                bc.src = HAPUtils.qualifyURL(b.sourcePath + b.sharemanager_js);
                bc.onload = bc.onreadystatechange = function() {
                    (this.readyState && 'complete' != this.readyState) ||
                        (od = new HAPShareManager(b));
                };
                bc.onerror = function() {
                    alert('Error loading ' + this.src);
                };
                var ye = document.getElementsByTagName('script')[0];
                ye.parentNode.insertBefore(bc, ye);
            } else var od = new HAPShareManager(b);
        var ha = new HAPPlaylistManager({
            loop: b.loopState,
            random: b.randomPlay,
        });
        f(ha)
            .on('HAPPlaylistManager.COUNTER_READY', function(a, c) {
                J && $b();
                La = c;
                x = ja[La].data;
                x.type || ((x = n(x)), (ja[La].data = x));
                console.log(x);
                J = x.type;
                'youtube_single' == J && (J = 'youtube');
                if (Uc) Uc = !1;
                else {
                    if (x.lyrics && Oa.length) {
                        if (!kb) {
                            $c = !1;
                            if (b.lyricsWrap && b.lyricsContainer)
                                var d = f(b.lyricsWrap)[0],
                                    e = f(b.lyricsContainer)[0];
                            else
                                (d = Oa.find('.hap-lyrics-wrap')[0]),
                                    (e = Oa.find('.hap-lyrics-container')[0]);
                            kb = new HAPLyrics({
                                wrapContainer: d,
                                scrollContainer: e,
                                settings: b,
                                itemClass: 'hap-lyrics-item',
                                activeClass: 'hap-lyrics-item-active',
                            });
                            document.addEventListener(
                                'HAPLyrics.LYRICS_CLICKED',
                                function(v) {
                                    if (
                                        Z &&
                                        Z.isAdOn() &&
                                        b.pauseAudioDuringAds
                                    )
                                        return !1;
                                    q.seek(v.detail);
                                    q.playMedia();
                                }
                            );
                            document.addEventListener(
                                'HAPLyrics.LYRICS_READY',
                                function(v) {
                                    v.detail && (x.lyricsContent = v.detail);
                                    $c = !0;
                                    b.lyricsAutoOpen &&
                                        (Zb || q.toggleLyrics());
                                }
                            );
                        }
                        x.lyricsContent
                            ? kb.setData(x.lyricsContent)
                            : kb.load(x.lyrics);
                        Kd.show();
                    } else Kd.hide();
                    if (x.video && bd.length) {
                        d = ' nofullscreen';
                        b.useVideoFullscreen && (d = '');
                        e = ' disablepictureinpicture';
                        b.useVideoPictureInPicture && (e = '');
                        var k = ' nodownload';
                        b.useVideoDownload && (k = '');
                        var m = '';
                        b.useVideoControls && (m = ' controls');
                        d =
                            '<video class="hap-video" preload="' +
                            b.preload +
                            '" muted playsinline' +
                            e +
                            ' controlsList="noremoteplayback' +
                            k +
                            d +
                            m +
                            '">';
                        d += '<source src="' + x.video + '" />';
                        d += '</video>';
                        b.useVideoControls ||
                            (d += '<div class="hap-video-blocker"></div>');
                        bd.html(d);
                        na = bd.find('.hap-video')[0];
                        na.addEventListener('canplay', function() {
                            if (b.playbackRate)
                                try {
                                    na.playbackRate = Number(b.playbackRate);
                                } catch (v) {}
                        });
                        b.useVideoControls &&
                            (na.addEventListener('play', function() {
                                qb = !0;
                                q.playMedia();
                            }),
                            na.addEventListener('pause', function() {
                                qb = !0;
                                q.pauseMedia();
                            }),
                            na.addEventListener('seeked', function() {
                                qb = !0;
                                q.seek(na.currentTime);
                            }));
                        b.videoAutoOpen && (gd || q.toggleVideo());
                        Ld.show();
                    } else Ld.hide();
                    'shoutcast' == J || 'icecast' == J || 'radiojar' == J
                        ? (Md.hide(), Xa.hide(), jb.hide(), $a.hide())
                        : (Md.show(),
                          Xa.show(),
                          jb.show(),
                          $a.show(),
                          Ed(),
                          Nd && K());
                    if (Fd && b.lastPositionArr)
                        for (e = b.lastPositionArr.length, d = 0; d < e; d++)
                            if (
                                ((k = b.lastPositionArr[d]),
                                k.title &&
                                    x.title == k.title &&
                                    x.artist == k.artist)
                            ) {
                                x.start = k.start;
                                break;
                            }
                    z(La);
                    x.thumb || x.thumbDefault || !Ne || He();
                    if (x.adPre || x.adMid || x.adEnd)
                        Z
                            ? Z.setAdData(x)
                            : ('undefined' === typeof HAPAdManager &&
                                  console.log(
                                      'link to admanager.js file missing in head tag!'
                                  ),
                              (Z = new HAPAdManager(b, q, x, O, Ra, Bb, Ia)),
                              f(Z)
                                  .on(
                                      'HAPAdManager.IOS_ADMID_FIX_START',
                                      function(v, R) {
                                          hc = !0;
                                      }
                                  )
                                  .on('HAPAdManager.ADPRE_PLAY', function(
                                      v,
                                      R
                                  ) {
                                      Ra.addClass('hap-ad-progress-level');
                                      jb.hide();
                                      $a.hide();
                                      Bb.show();
                                  })
                                  .on('HAPAdManager.ADPRE_ENDED', function(
                                      v,
                                      R
                                  ) {
                                      Ra.removeClass('hap-ad-progress-level');
                                      Bb.hide();
                                      'shoutcast' != J &&
                                          'icecast' != J &&
                                          'radiojar' != J &&
                                          (jb.show(), $a.show());
                                      'youtube' == J ? g() : rc();
                                  })
                                  .on('HAPAdManager.ADMID_PLAY', function(
                                      v,
                                      R
                                  ) {
                                      q.pauseMedia();
                                      Ra.addClass('hap-ad-progress-level');
                                      jb.hide();
                                      $a.hide();
                                      Bb.show();
                                  })
                                  .on('HAPAdManager.ADMID_ENDED', function(
                                      v,
                                      R
                                  ) {
                                      Ra.removeClass('hap-ad-progress-level');
                                      Bb.hide();
                                      'shoutcast' != J &&
                                          'icecast' != J &&
                                          'radiojar' != J &&
                                          (jb.show(), $a.show());
                                      q.playMedia();
                                  })
                                  .on('HAPAdManager.ADEND_PLAY', function(
                                      v,
                                      R
                                  ) {
                                      Ra.addClass('hap-ad-progress-level');
                                      jb.hide();
                                      $a.hide();
                                      Bb.show();
                                  })
                                  .on('HAPAdManager.ADEND_ENDED', function(
                                      v,
                                      R
                                  ) {
                                      Ra.removeClass('hap-ad-progress-level');
                                      Bb.hide();
                                      'shoutcast' != J &&
                                          'icecast' != J &&
                                          'radiojar' != J &&
                                          (jb.show(), $a.hide());
                                      b.stopOnSongEnd || me(!0);
                                  }));
                    x.adPre
                        ? (Z.initAdPre(),
                          (ya = !0),
                          (O.volume = b.volume),
                          (d = O.play()),
                          void 0 !== d &&
                              d.then(function() {})['catch'](function(v) {}))
                        : 'youtube' == J
                          ? (g(), b.hidePlayerUntilMusicStart && ke())
                          : rc();
                }
            })
            .on('HAPPlaylistManager.PLAYLIST_END', function() {
                f(q).trigger('playlistEnd', {
                    instance: q,
                    instanceName: b.instanceName,
                });
            });
        window.onYouTubeIframeAPIReady = function() {};
        ad &&
            (window.ga ||
                (function(a, c, d, e, k, m, v) {
                    a.GoogleAnalyticsObject = k;
                    a[k] =
                        a[k] ||
                        function() {
                            (a[k].q = a[k].q || []).push(arguments);
                        };
                    a[k].l = 1 * new Date();
                    m = c.createElement(d);
                    v = c.getElementsByTagName(d)[0];
                    m.async = 1;
                    m.src = e;
                    v.parentNode.insertBefore(m, v);
                })(
                    window,
                    document,
                    'script',
                    'https://www.google-analytics.com/analytics.js',
                    'ga'
                ),
            ga('create', b.gaTrackingId, 'auto'),
            ga('send', 'pageview'),
            w.on('click', '.hap-download', function(a) {
                if (!T) return !1;
                window.ga &&
                    ((a = f(this)
                        .closest('.hap-playlist-item')
                        .find('.hap-playlist-title')
                        .html()),
                    ga('send', {
                        hitType: 'event',
                        eventCategory: 'Modern audio player: ' + b.instanceName,
                        eventAction: 'downloaded',
                        eventLabel: 'title: ' + a,
                        nonInteraction: !0,
                    }));
            }));
        cd
            ? (window.attachEvent || window.addEventListener)(
                  gc ? 'pagehide' : 'beforeunload',
                  function(a) {
                      window.event && (window.event.cancelBubble = !0);
                      if (!T || !J) return !1;
                      a = {
                          activePlaylist: b.activePlaylist,
                          volume: b.volume,
                          activeItem: ha.getCounter(),
                          resumeTime: q.getCurrentTime(),
                          autoPlay: ab,
                      };
                      if (Fd) {
                          var c,
                              d = [];
                          for (c = 0; c < S; c++) {
                              var e = ja[c].data;
                              e.start &&
                                  d.push({
                                      title: e.title,
                                      artist: e.artist,
                                      start: e.start,
                                  });
                          }
                          a.lastPositionArr = d;
                      }
                      localStorage.setItem(b.continousKey, JSON.stringify(a));
                  }
              )
            : localStorage.removeItem(b.continousKey);
        Nd &&
            (navigator.mediaSession.setActionHandler('play', function() {
                q.playMedia();
            }),
            navigator.mediaSession.setActionHandler('pause', function() {
                q.pauseMedia();
            }),
            navigator.mediaSession.setActionHandler(
                'previoustrack',
                function() {
                    q.previousMedia();
                }
            ),
            navigator.mediaSession.setActionHandler('nexttrack', function() {
                q.nextMedia();
            }),
            navigator.mediaSession.setActionHandler('seekbackward', function() {
                q.seekBackward();
            }),
            navigator.mediaSession.setActionHandler('seekforward', function() {
                q.seekForward();
            }));
        var fa = w.find('.hap-tooltip');
        oc ||
            (fa.length &&
                'static' == w.css('position') &&
                console.log(
                    'player css position is static, therefore tooltip might not work correctly. Please set wrapper css position to other than static if you use tooltip in player.'
                ),
            w
                .on('mouseenter', '[data-tooltip]', function(a) {
                    var c = f(this);
                    a = w[0].getBoundingClientRect();
                    var d = c[0].getBoundingClientRect();
                    fa.text(c.attr('data-tooltip'));
                    var e = parseInt(d.top - a.top - fa.outerHeight());
                    c = parseInt(
                        d.left -
                            a.left -
                            fa.outerWidth() / 2 +
                            c.outerWidth() / 2
                    );
                    var k =
                        window.innerWidth ||
                        document.documentElement.clientWidth ||
                        document.body.clientWidth;
                    0 > c + a.left
                        ? (c = parseInt(d.left - a.left + 15))
                        : c + a.left + fa.outerWidth() > k &&
                          (c = parseInt(
                              d.left + d.width - a.left - fa.outerWidth()
                          ));
                    0 > e + a.top &&
                        (e = parseInt(d.top - a.top + fa.outerHeight() + 15));
                    fa.css({ left: c + 'px', top: e + 'px' }).show();
                })
                .on('mouseleave', '[data-tooltip]', function(a) {
                    fa.hide();
                }));
        var dc = w.find('.hap-circle-player').length,
            Ac;
        dc &&
            HAPUtils.hasCanvas() &&
            ('undefined' === typeof HAPCirclePlayer
                ? console.log(
                      'Link to circleplayer.js file missing in head tag!'
                  )
                : (Ac = new HAPCirclePlayer({
                      settings: b,
                      parent: w,
                  })));
        var Xa = dc ? w.find('.hap-progress-canvas') : w.find('.hap-seekbar');
        Xa.on(Hb.downEvent, function(a) {
            if (
                (b.disableSeekbarInRange && Ga) ||
                b.disableSeekbar ||
                b.disableSongSkip ||
                (Z && Z.isAdOn()) ||
                !J
            )
                return !1;
            Q(a);
            return !1;
        });
        if (!oc) {
            var id = function() {
                Xa.off(Hb.moveEvent, H).off('mouseout', id);
                Gb.off('mouseout', id);
                fa.hide();
            };
            Xa.on('mouseover', function() {
                if (!Fb) {
                    if (Z && Z.isAdOn()) return !1;
                    Xa.on(Hb.moveEvent, H).on('mouseout', id);
                    Gb.on('mouseout', id);
                }
            });
        }
        var jd = new HAPVolumeSlider({
            volume: b.volume,
            container: w,
            tooltip: fa,
        });
        f(jd).on('HAPVolumeSlider.VOLUME_CHANGE', function(a, c) {
            b.volume = c;
            q.setVolume(b.volume);
        });
        f(jd).on('HAPVolumeSlider.TOGGLE_MUTE', function(a) {
            q.toggleMute();
        });
        var cb = w.find('.hap-range-handle-a'),
            lb = w.find('.hap-range-handle-b');
        parseInt(cb.attr('data-width'), 10);
        parseInt(lb.attr('data-width'), 10);
        var Ha,
            bb,
            wc,
            xc,
            Ga,
            Qa,
            Qd = w.find('.hap-range-bg'),
            Ma,
            Rd = w.find('.hap-range-level'),
            Nb = w.find('.hap-range-min-time'),
            Ob = w.find('.hap-range-max-time');
        q.toggleRange = function() {
            J &&
                (Ga
                    ? (ve.css('display', 'none'), (Qa = !0))
                    : (ve.css('display', 'block'),
                      (Ma = Qd.width()),
                      (wc = parseInt(cb.css('left'), 10)),
                      (xc = parseInt(lb.css('left'), 10)),
                      (Ha = D(wc)),
                      (bb = D(xc)),
                      (Qa = !1)),
                (Ga = !Ga));
        };
        q.resetRange = function() {
            Ga = !1;
            Qa = !0;
            cb.css('left', 0);
            lb.css('left', Ma);
            Nb.html('00:00');
            Ob.html('00:00');
        };
        q.setRange = function(a, c) {
            var d = q.getDuration();
            if ('undefined' === typeof d) return !1;
            0 > a && (a = 0);
            c > d && (c = d);
            Ha = a;
            bb = c;
            Qa = !1;
            cb.css('left', Ha / d * Ma);
            lb.css('left', bb / d * Ma);
            Nb.html(HAPUtils.formatTime(a));
            Ob.html(HAPUtils.formatTime(c));
            d = parseInt(cb.css('left'), 10);
            var e = parseInt(lb.css('left'), 10);
            Rd.css({ left: d, right: Ma - e });
            Ga || q.toggleRange();
        };
        q.resizeRange = function() {
            var a = q.getDuration();
            if (
                'undefined' === typeof a ||
                'undefined' === typeof Ha ||
                'undefined' === typeof bb
            )
                return !1;
            Ma = Qd.width();
            cb.css('left', Ha / a * Ma);
            lb.css('left', bb / a * Ma);
            Nb.html(HAPUtils.formatTime(Ha));
            Ob.html(HAPUtils.formatTime(bb));
            a = parseInt(cb.css('left'), 10);
            var c = parseInt(lb.css('left'), 10);
            Rd.css({ left: a, right: Ma - c });
        };
        q.getRange = function() {
            return 'undefined' !== typeof Ha && 'undefined' !== typeof bb
                ? [Ha, bb]
                : null;
        };
        if (cb.length) {
            var mb = !0;
            var yc = new HAPRangeSlider({
                settings: b,
                range_handle_a: cb,
                range_handle_b: lb,
            });
            f(yc).on('HAPRangeSlider.RANGE_CHANGE', function(a, c) {
                var d = c.point.pageX - Qd.offset().left,
                    e = c.elem;
                0 > d ? (d = 0) : d > Ma && (d = Ma);
                e.hasClass('hap-range-handle-a')
                    ? (d > parseInt(lb.css('left'), 10) - 3 &&
                          (d = parseInt(lb.css('left'), 10) - 3),
                      (wc = d),
                      (Ha = D(wc)),
                      Nb.html(HAPUtils.formatTime(Ha)))
                    : (d < parseInt(cb.css('left'), 10) + 4 &&
                          (d = parseInt(cb.css('left'), 10) + 4),
                      (xc = d),
                      (bb = D(xc)),
                      Ob.html(HAPUtils.formatTime(bb)));
                Rd.css({ left: wc, right: Ma - xc });
                e.css('left', d);
            });
        }
        var Sd = w.find('.hap-playback-rate-seekbar');
        w.find('.hap-playback-rate-min').html(b.playbackRateMin);
        w.find('.hap-playback-rate-max').html(b.playbackRateMax);
        if (Sd.length) {
            var Td = new HAPPlaybackRateSlider({
                settings: b,
                wrapper: w,
                seekbar: Sd,
                sliderBg: w.find('.hap-playback-rate-bg'),
                sliderLevel: w.find('.hap-playback-rate-level'),
                isVertical: Sd.hasClass('hap-vertical'),
                tooltip: fa,
            });
            f(Td).on('HAPPlaybackRateSlider.RANGE_CHANGE', function(a, c) {
                q.setPlaybackRate(c.value);
            });
        }
        if (b.disableRightClickOverPlayer)
            w.on('contextmenu', function() {
                return !1;
            });
        b.useKeyboardNavigationForPlayback &&
            w.hover(
                function() {
                    Gb.on('keydown', function(a) {
                        if (!T) return !1;
                        var c = a.keyCode;
                        if (f(a.target).hasClass('hap-search-filter'))
                            return !0;
                        if (b.modifierKey) {
                            var d,
                                e = b.keyboardControls.length;
                            for (d = 0; d < e; d++) {
                                var k = b.keyboardControls[d];
                                if (a[b.modifierKey] && c == k.keycode) {
                                    'seekBackward' == k.action
                                        ? q.seekBackward(b.seekTime)
                                        : 'seekForward' == k.action
                                          ? q.seekForward(b.seekTime)
                                          : 'togglePlayback' == k.action
                                            ? q.togglePlayback()
                                            : 'volumeUp' == k.action
                                              ? ((b.volume += 0.1),
                                                1 < b.volume && (b.volume = 1),
                                                q.setVolume(b.volume))
                                              : 'volumeDown' == k.action
                                                ? ((b.volume -= 0.1),
                                                  0 > b.volume &&
                                                      (b.volume = 0),
                                                  q.setVolume(b.volume))
                                                : 'toggleMute' == k.action
                                                  ? q.toggleMute()
                                                  : 'nextMedia' == k.action
                                                    ? q.nextMedia()
                                                    : 'previousMedia' ==
                                                      k.action
                                                      ? q.previousMedia()
                                                      : 'rewind' == k.action &&
                                                        q.seek(0);
                                    break;
                                }
                            }
                        } else
                            for (
                                e = b.keyboardControls.length, d = 0;
                                d < e;
                                d++
                            )
                                if (
                                    ((k = b.keyboardControls[d]),
                                    c == k.keycode)
                                ) {
                                    if ('seekBackward' == k.action)
                                        q.seekBackward(b.seekTime);
                                    else if ('seekForward' == k.action)
                                        q.seekForward(b.seekTime);
                                    else if ('togglePlayback' == k.action)
                                        q.togglePlayback();
                                    else if ('volumeUp' == k.action)
                                        (b.volume += 0.1),
                                            1 < b.volume && (b.volume = 1),
                                            q.setVolume(b.volume);
                                    else if ('volumeDown' == k.action)
                                        (b.volume -= 0.1),
                                            0 > b.volume && (b.volume = 0),
                                            q.setVolume(b.volume);
                                    else if ('toggleMute' == k.action)
                                        q.toggleMute();
                                    else if ('nextMedia' == k.action)
                                        q.nextMedia();
                                    else if ('previousMedia' == k.action)
                                        q.previousMedia();
                                    else if ('rewind' == k.action) q.seek(0);
                                    else return !0;
                                    break;
                                }
                        return !1;
                    });
                },
                function() {
                    Gb.off('keydown');
                }
            );
        var ze = [
            w.find('.hap-next-toggle'),
            w.find('.hap-prev-toggle'),
            w.find('.hap-skip-forward'),
            w.find('.hap-skip-backward'),
            w.find('.hap-playlist-toggle'),
            w.find('.hap-playlist-close'),
            Me,
            w.find('.hap-share-close'),
            w.find('.hap-share-item'),
            w.find('.hap-playback-rate-close'),
            w.find('.hap-range-close'),
            w.find('.hap-lyrics-close'),
            w.find('.hap-video-close'),
            Le,
            Md,
            Ke,
            nb,
            Va,
            Ib,
            eb,
            Kd,
            Ld,
        ];
        vc = ze.length;
        for (Wa = 0; Wa < vc; Wa++)
            f(ze[Wa])
                .css('cursor', 'pointer')
                .on('click', l);
        window.onbeforeunload = function(a) {
            b.useStatistics &&
                La &&
                (zb('hap_play_count', La),
                60 > q.getCurrentTime() && zb('hap_skipped_first_minute', La));
        };
        if (b.addResizeEvent)
            ae.on('resize', function() {
                if (!T) return !1;
                Od && clearTimeout(Od);
                Od = setTimeout(Bd, 150);
            });
        this.getTitle = function(a, c) {
            if (
                a.artist &&
                !HAPUtils.isEmpty(a.artist) &&
                a.title &&
                !HAPUtils.isEmpty(a.title)
            )
                var d = c
                    ? a.artist + ' - ' + a.title
                    : a.artist + b.artistTitleSeparator + a.title;
            else
                a.title && !HAPUtils.isEmpty(a.title)
                    ? (d = a.title)
                    : a.artist && !HAPUtils.isEmpty(a.artist) && (d = a.artist);
            return d;
        };
        b.useStatistics &&
            (fetch('https://extreme-ip-lookup.com/json/')
                .then(function(a) {
                    return a.json();
                })
                .then(function(a) {
                    re = a;
                })
                ['catch'](function(a, c) {
                    console.log('country request failed');
                }),
            w.on('click', '.hap-like-count', function(a) {
                if (!T || !J) return !1;
                a = f(this).closest('.hap-playlist-item');
                zb('hap_like_count', a.attr('data-id'));
            }),
            w.on('click', '.hap-download-count:not(.hap-no-download)', function(
                a
            ) {
                if (!T || !J) return !1;
                a = f(this).closest('.hap-playlist-item');
                zb('hap_download_count', a.attr('data-id'));
            }));
        this.playMedia = function() {
            if (!T || !J || ab) return !1;
            if ('youtube' == J) X && Fa && X.playVideo();
            else if (O) {
                ('shoutcast' != J && 'icecast' != J && 'radiojar' != J) ||
                    O.load();
                var a = O.play();
                void 0 !== a && a.then(function() {})['catch'](function(c) {});
            }
        };
        this.pauseMedia = function() {
            if (!T || !J || !ab) return !1;
            'youtube' == J ? X && Fa && X.pauseVideo() : O && O.pause();
        };
        this.togglePlayback = function() {
            if (!T || !J) return !1;
            Z && Z.clearAdMidTimeout();
            if (Z && Z.isAdMidOn()) Z.toggleAdMidAudio();
            else if ('youtube' == J) {
                if (X && Fa) {
                    var a = X.getPlayerState();
                    1 == a
                        ? X.pauseVideo()
                        : 2 == a
                          ? X.playVideo()
                          : (-1 == a || 5 == a || 0 == a) && X.playVideo();
                }
            } else
                O &&
                    (O.paused
                        ? (('shoutcast' != J &&
                              'icecast' != J &&
                              'radiojar' != J) ||
                              O.load(),
                          (a = O.play()),
                          void 0 !== a &&
                              a
                                  .then(function() {
                                      Z &&
                                          Z.isAdPreOn() &&
                                          (Va.find('.hap-btn-play').hide(),
                                          Va.find('.hap-btn-pause').show());
                                  })
                                  ['catch'](function(c) {}))
                        : (O.pause(),
                          Z &&
                              Z.isAdPreOn() &&
                              (Va.find('.hap-btn-play').show(),
                              Va.find('.hap-btn-pause').hide())));
        };
        this.nextMedia = function() {
            if (!T) return !1;
            0 != S && (fc(), ha.advanceHandler(1, !0));
        };
        this.previousMedia = function() {
            if (!T) return !1;
            0 != S && (fc(), ha.advanceHandler(-1, !0));
        };
        this.loadMedia = function(a, c, d, e) {
            if (!T || oa) return !1;
            if (0 != S) {
                console.log(a, c, d, e);
                var k = -1;
                if ('title' == a) {
                    for (a = 0; a < S; a++)
                        if (c == ja[a].data.title) {
                            k = a;
                            var m = !0;
                            break;
                        }
                    if (!m)
                        return (
                            alert(
                                'No media with title "' +
                                    c +
                                    '" to load! LoadMedia failed.'
                            ),
                            !1
                        );
                } else if ('title-artist' == a) {
                    var v = P.find(
                        '.hap-playlist-item[data-title="' +
                            d +
                            '"][data-artist="' +
                            e +
                            '"]'
                    );
                    if (0 == v.length)
                        return (
                            alert(
                                'No media with title "' +
                                    d +
                                    '" and artist "' +
                                    e +
                                    '" to load! LoadMedia failed.'
                            ),
                            !1
                        );
                    k = v.attr('data-id');
                } else if ('counter' == a) {
                    if (0 > c || c > S - 1)
                        return (
                            alert(
                                'Invalid track number. Track number  "' +
                                    c +
                                    '" doesnt exist. LoadMedia failed.'
                            ),
                            !1
                        );
                    k = c;
                } else if ('id' == a) {
                    v = P.find('.hap-playlist-item[data-media-id=' + c + ']');
                    if (0 == v.length)
                        return (
                            alert(
                                'No media with media ID ' +
                                    c +
                                    ' to load! LoadMedia failed.'
                            ),
                            !1
                        );
                    k = v.attr('data-id');
                } else if ('id-title' == a) {
                    d && e
                        ? (v = P.find(
                              '.hap-playlist-item[data-media-id="' +
                                  c +
                                  '"][title="' +
                                  d +
                                  '"][data-artist="' +
                                  e +
                                  '"]'
                          ))
                        : d
                          ? (v = P.find(
                                '.hap-playlist-item[data-media-id="' +
                                    c +
                                    '"][title="' +
                                    d +
                                    '"]'
                            ))
                          : e &&
                            (v = P.find(
                                '.hap-playlist-item[data-media-id="' +
                                    c +
                                    '"][data-artist="' +
                                    e +
                                    '"]'
                            ));
                    if (0 == v.length)
                        return (
                            alert(
                                'No media with media ID ' +
                                    c +
                                    ' to load! LoadMedia failed.'
                            ),
                            !1
                        );
                    k = v.attr('data-id');
                } else
                    return (
                        console.log(
                            'loadMedia function requires format parameter!'
                        ),
                        !1
                    );
                fc();
                ya = !0;
                ha.processPlaylistRequest(k);
            }
        };
        this.loadMore = function() {
            console.log(ra);
            if (!T || !ra || !ma || oa) return !1;
            oa = !0;
            Ba.show();
            wa = !0;
            da = [];
            'soundcloud' == ra
                ? ud()
                : 'podcast' == ra
                  ? td()
                  : 'folder' == ra
                    ? ba()
                    : 'youtube' == ra &&
                      (hb || M('youtube'), hb.resumeLoad(ma));
        };
        this.setLoadMore = function(a) {
            Ca = a;
        };
        this.endLoadMore = function() {
            oa = !1;
            Ba.hide();
            wa = !1;
        };
        this.addMore = function() {
            if (!T || oa) return !1;
            fb && (wa || Vc());
        };
        this.setAddMore = function(a) {
            fb = a;
        };
        this.loadPlaylist = function(a, c) {
            if (!T || oa) return !1;
            if ('string' === typeof a) {
                b.mediaId = c;
                if (b.activePlaylist == a) return !1;
                L(a);
            } else return alert('Invalid value loadPlaylist!'), !1;
        };
        this.addTrack = function(a, c, d, e) {
            if (!T || oa) return !1;
            if ('undefined' === typeof a)
                return (
                    alert(
                        'addTrack method requires track parameter. AddTrack failed.'
                    ),
                    !1
                );
            Tc = !1;
            'undefined' !== typeof c && ((Tc = c), 0 == c && (Uc = !0));
            e ? ((Oc = !0), (Xc = !1)) : (Oc = !1);
            yb.hide();
            Za = d;
            Vb = !1;
            wb = !0;
            Kb
                ? 'undefined' !== typeof Za
                  ? 0 > Za ? (Za = 0) : ((Za = S), (Vb = !0))
                  : ((Vb = !0), (Za = S))
                : ((Za = 0), (Vb = !0));
            oa = !0;
            Ba.show();
            vb = -1;
            da = [];
            pa = [];
            Array.isArray(a) ? (pa = a) : pa.push(a);
            S = pa.length;
            Kb = P;
            Oc ? ((da = pa), Ya()) : h();
        };
        this.inputAudio = function(a) {
            if (!T || oa) return !1;
            if ('undefined' === typeof a)
                return (
                    alert(
                        'inputAudio method requires data parameter. inputAudio failed.'
                    ),
                    !1
                );
            va && u();
            0 < S && ha.reSetCounter();
            x = a;
            J = a.type;
            if (-1 == xe.indexOf(J))
                return (
                    alert(
                        'inputAudio method supports tracks that dont require processing: ' +
                            xe
                    ),
                    !1
                );
            'shoutcast' != J &&
                'icecast' != J &&
                'radiojar' != J &&
                (Ed(), Nd && K());
            ya = !0;
            rc();
        };
        this.removeTrack = function(a, c) {
            if (!T || oa) return !1;
            if (0 != S) {
                if ('title' == a) {
                    var d;
                    for (d = 0; d < S; d++)
                        if (c == ja[d].data.title) {
                            var e = P.children('.hap-playlist-item').eq(d);
                            var k = !0;
                            break;
                        }
                    if (!k)
                        return (
                            alert(
                                'Track with title "' +
                                    c +
                                    '" doesnt exist. RemoveTrack failed.'
                            ),
                            !1
                        );
                } else if ('counter' == a) {
                    c = parseInt(c, 10);
                    if (0 > c || c > S - 1)
                        return (
                            alert(
                                'Track number  "' +
                                    c +
                                    '" doesnt exist. RemoveTrack failed.'
                            ),
                            !1
                        );
                    e = P.find('.hap-playlist-item').eq(c);
                } else if ('id' == a) {
                    if (
                        ((e = P.find(
                            '.hap-playlist-item[data-media-id=' + c + ']'
                        )),
                        0 == e.length)
                    )
                        return (
                            alert(
                                'Track with media id "' +
                                    c +
                                    '" doesnt exist. RemoveTrack failed.'
                            ),
                            !1
                        );
                } else return alert('removeTrack method failed.'), !1;
                e.remove();
                ja.splice(parseInt(e.attr('data-id'), 10), 1);
                pc(!0);
                0 < S
                    ? ((e = ha.getCounter()),
                      c == e
                          ? ($b(), ha.setPlaylistItems(S))
                          : (ha.setPlaylistItems(S, !1),
                            c < e && ha.reSetCounter(ha.getCounter() - 1)))
                    : Cc();
            }
        };
        this.sort = function(a) {
            if (!T || 3 > S) return !1;
            if ('undefined' === typeof a)
                return (
                    console.log(
                        'Sort method requires order parameter. Sort method failed.'
                    ),
                    !1
                );
            if (Sa == d) return !1;
            var c = P.children('.hap-playlist-item'),
                d = a.toLowerCase();
            if ('title-asc' == d) {
                HAPUtils.keysrt2(ja, 'data', 'title');
                var e;
                a = [];
                for (e = 0; e < S; e++) a.push(ja[e].id);
                nb.find('.hap-btn-sort-alpha-up').hide();
                nb.find('.hap-btn-sort-alpha-down').show();
            } else if ('title-desc' == d) {
                HAPUtils.keysrt2(ja, 'data', 'title', !0);
                a = [];
                for (e = 0; e < S; e++) a.push(ja[e].id);
                nb.find('.hap-btn-sort-alpha-up').show();
                nb.find('.hap-btn-sort-alpha-down').hide();
            } else if ('random' == d)
                (a = HAPUtils.randomiseArray(S)),
                    (ja = HAPUtils.sortArray(ja, a));
            else {
                console.log('Unknown sort order. Sort method failed.');
                return;
            }
            Sa = d;
            d = La;
            P.append(
                f.map(a, function(k) {
                    return c[k];
                })
            );
            -1 != d &&
                ((d = P.children(
                    ".hap-playlist-item[data-id='" + d + "']"
                ).index()),
                ha.reSetCounter(d));
            pc(!0);
        };
        this.destroyInstance = function() {
            Cc();
            $b();
            b.usePlaylistScroll &&
                ('mcustomscrollbar' == b.playlistScrollType
                    ? 'undefined' !== typeof mCustomScrollbar &&
                      Na.mCustomScrollbar('destroy')
                    : 'perfect-scrollbar' == b.playlistScrollType &&
                      ib &&
                      (ib.destroy(), (ib = null)),
                (qc = !1));
        };
        this.destroyInstance2 = function() {
            $b();
            b.usePlaylistScroll &&
                ('mcustomscrollbar' == b.playlistScrollType
                    ? 'undefined' !== typeof mCustomScrollbar &&
                      Na.mCustomScrollbar('destroy')
                    : 'perfect-scrollbar' == b.playlistScrollType &&
                      ib &&
                      (ib.destroy(), (ib = null)),
                (qc = !1));
            b.sortableTracks &&
                b.sortableTracksSet &&
                (P.sortable('destroy'), (b.sortableTracksSet = !1));
        };
        this.destroyMedia = function() {
            if (!T) return !1;
            T && J && (va && u(), $b(), ha.reSetCounter());
        };
        this.destroyPlaylist = function() {
            if (!T) return !1;
            Cc();
        };
        this.setPlaybackRate = function(a) {
            if (!T || !J) return !1;
            b.playbackRate = a;
            Td && Td.setVisual(a);
            if ('youtube' == J) X.setPlaybackRate(Number(a));
            else if (O)
                try {
                    O.playbackRate = Number(a);
                } catch (c) {}
            if (na)
                try {
                    na.playbackRate = Number(a);
                } catch (c) {}
        };
        this.toggleRandom = function(a) {
            if (!T || 'undefined' === typeof ha) return !1;
            b.randomPlay = 'undefined' !== typeof a ? a : !b.randomPlay;
            ha.setRandom(b.randomPlay);
            eb.find('.hap-btn').hide();
            b.randomPlay
                ? eb.find('.hap-btn-random-on').show()
                : eb.find('.hap-btn-random-off').show();
        };
        this.setLoop = function(a) {
            if (!T || 'undefined' === typeof ha) return !1;
            Ib.find('.hap-btn').hide();
            b.loopState = a;
            Jb = mc.indexOf(b.loopState);
            Ib.find('.hap-btn-loop-' + b.loopState).show();
            ha.setLooping(b.loopState);
        };
        this.getVolume = function() {
            return b.volume;
        };
        this.setVolume = function(a) {
            if (!T) return !1;
            0 > a ? (a = 0) : 1 < a && (a = 1);
            b.volume = a;
            Z && Z.setVolume(b.volume);
            'youtube' == J
                ? X && Fa && X.setVolume(100 * b.volume)
                : O &&
                  ((O.volume = b.volume), (O.muted = 0 == b.volume ? !0 : !1));
            jd && jd.setVisual(b.volume);
        };
        this.toggleMute = function() {
            if (!T) return !1;
            0 < b.volume ? ((Pd = b.volume), (b.volume = 0)) : (b.volume = Pd);
            q.setVolume(b.volume);
        };
        this.setAutoPlay = function(a) {
            ya = a;
        };
        this.seek = function(a) {
            if (!T || !J) return !1;
            if ('youtube' == J) X && Fa && X.seekTo(a);
            else if ('audio' == J && O)
                try {
                    O.currentTime = a;
                } catch (c) {
                    console.log(c);
                }
        };
        this.seekBackward = function(a) {
            if (!T || !J) return !1;
            a = a || b.seekTime;
            a = parseInt(a, 10);
            if ('youtube' == J)
                X &&
                    Fa &&
                    ((a = Math.max(X.getCurrentTime() - a, 0)), X.seekTo(a));
            else if (O)
                try {
                    O.currentTime = Math.max(O.currentTime - a, 0);
                } catch (c) {
                    console.log(c);
                }
        };
        this.seekForward = function(a) {
            if (!T || !J || b.disableSeekbar) return !1;
            a = a || b.seekTime;
            a = parseInt(a, 10);
            if ('youtube' == J)
                X &&
                    Fa &&
                    ((a = Math.min(X.getCurrentTime() + a, X.getDuration())),
                    X.seekTo(a));
            else if (O)
                try {
                    O.currentTime = Math.min(O.currentTime + a, O.duration);
                } catch (c) {
                    console.log(c);
                }
        };
        this.getCurrentMediaUrl = function() {
            if (!T) return !1;
            if (!J) return '';
            var a = -1 == window.location.href.indexOf('?') ? '?' : '&';
            var c = 'hap-query-instance=' + encodeURIComponent(b.instanceName),
                d =
                    void 0 != x.mediaId
                        ? '&hap-media-id=' + x.mediaId
                        : '&hap-active-item=' + La,
                e = ec
                    ? '&hap-resume-time=' + Math.floor(q.getCurrentTime())
                    : '';
            a = a + c + '&hap-scroll-to-player=1' + d + e;
            void 0 != x.mediaId &&
                -1 == Oe.indexOf(x.origtype) &&
                x.safeTitle &&
                ((c = '&hap-media-title=' + encodeURIComponent(x.safeTitle)),
                (a += c));
            return a;
        };
        this.getCurrentTime = function() {
            return 'youtube' == J
                ? X && Fa ? X.getCurrentTime() : 0
                : O ? O.currentTime : 0;
        };
        this.getDuration = function() {
            if (!T || !J) return !1;
            if ('youtube' == J) {
                if (X && Fa) return X.getDuration();
            } else if (O) return O.duration;
        };
        this.destroyPlaylistScroll = function() {
            if (!T) return !1;
            b.usePlaylistScroll &&
                ('mcustomscrollbar' == b.playlistScrollType
                    ? 'undefined' !== typeof mCustomScrollbar &&
                      Na.mCustomScrollbar('destroy')
                    : 'perfect-scrollbar' == b.playlistScrollType &&
                      ib &&
                      (ib.destroy(), (ib = null)),
                (qc = !1));
        };
        this.getSetupDone = function() {
            return T;
        };
        this.getMediaPlaying = function() {
            return T ? ab : !1;
        };
        this.getPlaylistLoading = function() {
            return oa;
        };
        this.getCounter = function() {
            return T
                ? 'undefined' !== typeof ha ? ha.getCounter() : -1
                : null;
        };
        this.getPlaylistContent = function() {
            return P;
        };
        this.getPlaylistData = function() {
            return ja;
        };
        this.getLastPlaylistData = function() {
            return T ? vd : !1;
        };
        this.getPlaylistLength = function() {
            return T ? (HAPUtils.isNumber(S) ? S : 0) : !1;
        };
        this.getPlaylistList = function() {
            return pd;
        };
        this.getSettings = function() {
            return b;
        };
        this.getCurrMediaData = function() {
            return T ? x : !1;
        };
        this.getWrapper = function() {
            return w;
        };
        this.getPlaylistItems = function() {
            if (!T) return !1;
            var a = [];
            P.find('.hap-playlist-item').each(function() {
                a.push(f(this));
            });
            return a;
        };
        this.openPopup = function() {
            if (!T || b.isPopup) return !1;
            hapOpenPopup(b, q);
        };
        this.togglePlaylist = function() {
            if (
                -1 < sa.indexOf('hap-art-narrow-light') ||
                -1 < sa.indexOf('hap-art-narrow-dark')
            )
                b.playlistOpened
                    ? (fd.stop().animate({ left: '0px' }, { duration: 350 }),
                      Pa.stop().animate(
                          { left: -fd.width() + 'px' },
                          { duration: 350 }
                      ))
                    : (fd
                          .stop()
                          .animate(
                              { left: fd.width() + 'px' },
                              { duration: 350 }
                          ),
                      Pa.stop().animate({ left: '0px' }, { duration: 350 }));
            else if (
                -1 < sa.indexOf('hap-art-wide-light') ||
                -1 < sa.indexOf('hap-art-wide-dark') ||
                -1 < sa.indexOf('hap-brona-light') ||
                -1 < sa.indexOf('hap-brona-dark')
            )
                if (b.playlistOpened)
                    Pa.stop().animate({ height: '0px' }, { duration: 350 });
                else {
                    var a = Pa.css('height', 'auto').height();
                    Pa.height(0)
                        .stop()
                        .animate(
                            {
                                height: a + 'px',
                            },
                            {
                                duration: 350,
                                complete: function() {
                                    f(this).height('auto');
                                },
                            }
                        );
                }
            else
                -1 < sa.indexOf('hap-wall')
                    ? b.playlistOpened
                      ? Pa.css('left', '-20000px')
                      : Pa.css('left', 0)
                    : -1 < sa.indexOf('hap-classic')
                      ? b.playlistOpened ? Pa.slideUp() : Pa.slideDown()
                      : -1 < sa.indexOf('hap-fixed') &&
                        (b.playlistOpened
                            ? w
                                  .stop()
                                  .animate(
                                      { bottom: -Pa.height() + 'px' },
                                      { duration: 350 }
                                  )
                            : w
                                  .stop()
                                  .animate(
                                      { bottom: '0px' },
                                      { duration: 350 }
                                  ));
            b.playlistOpened = !b.playlistOpened;
        };
        if (we && b.continousKey)
            if (!cd) localStorage.removeItem(b.continousKey);
            else if (localStorage.getItem(b.continousKey)) {
                var cc = JSON.parse(localStorage.getItem(b.continousKey));
                b.activePlaylist = cc.activePlaylist;
                b.resumeTime = cc.resumeTime;
                b.volume = cc.volume;
                b.activeItem = cc.activeItem;
                ya = b.autoPlay = cc.autoPlay;
                b.lastPositionArr = cc.lastPositionArr;
                localStorage.removeItem(b.continousKey);
            }
        setTimeout(function() {
            if (b.isPopup && b.copyCurrentPlaylistToPopup) {
                ja = b.playlistDataArr;
                S = ja.length;
                ha.setPlaylistItems(S, !1);
                if (b.useStatistics) {
                    if (!b.usePlaylist) {
                        var a;
                        for (a = 0; a < S; a++) ja[a].data.hapStatsSet = !1;
                    }
                    Rc();
                }
                Kb = P;
                if (b.usePlaylist && b.addPlaylistEvents) {
                    var c;
                    P.find('.hap-playlist-item').each(function() {
                        c = f(this);
                        c.on(
                            'click',
                            '.hap-playlist-thumb, .hap-playlist-title-wrap',
                            p
                        );
                        oc ||
                            (c.on(
                                'mouseenter ',
                                '.hap-playlist-thumb, .hap-playlist-title-wrap',
                                t
                            ),
                            c.on(
                                'mouseleave',
                                '.hap-playlist-thumb, .hap-playlist-title-wrap',
                                C
                            ));
                    });
                }
                Sc();
            } else
                Hd.length
                    ? ((oa = !0),
                      Ba.show(),
                      f(q).trigger('playlistStartLoad', {
                          instance: q,
                          instanceName: b.instanceName,
                      }),
                      (pa = Hd),
                      (S = pa.length),
                      h())
                    : b.activePlaylist && !HAPUtils.isEmpty(b.activePlaylist)
                      ? L(b.activePlaylist)
                      : Sc();
        }, 50);
        return this;
    };
})(jQuery);
var hap_popup_window,
    hap_player_instance,
    hap_player_auto_instance,
    hasLocalStorage = HAPUtils.hasLocalStorage();
function hapOpenPopup(f, b) {
    if (!hasLocalStorage || !localStorage.getItem('hap_popup')) {
        hap_player_instance = b;
        var g =
                f.popupUrl ||
                f.sourcePath + 'popup.html?rand=' + 99999999 * Math.random(),
            A = f.popupWidth || hap_player_instance.width(),
            r = f.popupHeight || hap_player_instance.height(),
            B = (window.screen.width - parseInt(A, 10)) / 2,
            K = (window.screen.height - parseInt(r, 10)) / 2;
        if (!hap_popup_window || hap_popup_window.closed)
            if (
                ((hap_popup_window = window.open(
                    g,
                    'audio_player',
                    'menubar=no,toolbar=no,location=no,scrollbars=1,resizable,width=' +
                        A +
                        ',height=' +
                        r +
                        ',left=' +
                        B +
                        ',top=' +
                        K
                )),
                !hap_popup_window)
            )
                return (
                    alert(
                        'Player can not be opened in a popup window because your browser is blocking Pop-Ups. You need to allow Pop-Ups in browser for this site to use the Player.'
                    ),
                    !1
                );
    }
}
function hapNotifyParent() {
    if (hap_popup_window && void 0 != hap_popup_window.initPopup) {
        if (hap_player_instance) {
            var f = hap_player_instance.getSettings();
            f.volume = hap_player_instance.getVolume();
            f.activePlaylist = f.activePlaylist;
            f.activeItem = hap_player_instance.getCounter();
            f.resumeTime = hap_player_instance.getCurrentTime();
            f.copyCurrentPlaylistToPopup
                ? ((f.playlistDataArr = hap_player_instance.getPlaylistData()),
                  hap_player_instance.destroyInstance2())
                : hap_player_instance.destroyInstance();
            var b = hap_player_instance.getWrapper();
        } else
            hap_player_auto_instance &&
                ((f = hap_player_auto_instance.settings),
                (f.copyCurrentPlaylistToPopup = !1),
                (b = hap_player_auto_instance.wrapper));
        var g = b.attr('id'),
            A = hapjq('#hap-inline-css')
                .clone()
                .wrap('<p>')
                .parent()
                .html(),
            r = hapjq('#hap-playlist-list')
                .remove()
                .wrap('<p>')
                .parent()
                .html();
        b = b
            .remove()
            .wrap('<p>')
            .parent()
            .html();
        try {
            window[f.instanceName] = hap_popup_window.initPopup(b, g, f, A, r);
        } catch (B) {
            return alert('initPopup error: ' + B.message), !1;
        }
    }
}
