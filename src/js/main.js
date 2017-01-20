'use strict';

/* variables define */
// eslint-disable-next-line no-unused-vars
var snid = '112'; // <!-- 重要：snid 在这里赋值，DOM 取值用原生不要使用 $ 符号 -->
var gameid = '222'; // <!-- 重要：gameid 在这里赋值，DOM 取值用原生不要使用 $ 符号 -->
// var digger = require('js/vendor/digger.min.js');

var _hmt;

/* client device & os detect */
function isAndroid() {
  return $.ua.os.name === 'Android';
}

function isiOS() {
  return $.ua.os.name === 'iOS';
}

function isWechat() {
  return $.ua.browser.name === 'WeChat';
}

function isWeibo() {
  return /weibo/i.test($.ua.ua);
}

/* parse params */
var searchParams = new URLSearchParams(window.location.search.slice(1));


/* get channel info */
axios.get('./data/test.json')
  .then(function(response) {
    return response.data;
  }).then(function(data) {
    var json = eval('(' + data + ')');
    // var json = JSON.parse(JSON.stringify(data))
    return json.channels;
  }).then(function(channels) {
    var downloadUrl;
    var channelId = searchParams.get('channel');
    var len = channels.length;
    for (var i = 0; i < len; i++) {
      if (channels[i].channelId == channelId) {
        var channel = channels[i];

        /*-------------这里取得是安卓下载地址，如果是ios 请取值为channel.content.download.iosUrl------------------*/
        downloadUrl = channel.content.download.androidUrl;

        // console.log('downloadurl: ')
        // console.log(channel.content.download.androidUrl)
      }
    }

    // eslint-disable-next-line no-unused-vars
    var app = new Vue({
      el: 'html',
      data: {
        channel: channel,
        show: false,
        iosUrl: 'javascript:;',
        androidUrl: 'javascript:;',
        bgObject: {}
      },
      created: function() {
        var that = this;
        //百度统计 start
        _hmt = _hmt || [];
        var hm = document.createElement('script');
        hm.src = 'https://hm.baidu.com/hm.js?' + channel.content.baiduAnalytic;
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(hm, s);
        //百度统计 end
        that.bgObject = {
          background: '#fff url(' + channel.content.bgImg + ') no-repeat'
        };
      },
      methods: {
        androidClick: function() {
          if (isWechat() || isWeibo()) {
            this.show = true;
          } else {
            // this.androidUrl = channel.content.download.androidUrl;
            window.location.replace(channel.content.download.androidUrl);
          }
          window._hmt.push(['_trackEvent', 'software', 'androidClick', 'ttplayer']);
        },
        iosClick: function() {
          if (isWechat() || isWeibo()) {
            this.show = true;
          } else {
            window.location.replace(channel.content.download.iosUrl);
            // this.iosUrl = channel.content.download.iosUrl;
          }
          window._hmt.push(['_trackEvent', 'software', 'iosClick', 'ttplayer']);
        },
        closeTip: function() {
          this.show = false;
        }
      }
    });

    return downloadUrl;
  })
  .then(function(downloadUrl) {
    var _digger_ = {
      disablePageViewTrack: false,
      trackerUrlMap: {
        pageView: ['//bicollect.hulai.com:8182/api'],
        click: ['//bicollect.hulai.com:8182/api']
      },
      cookieDomain: '',
      strictMode: {
        paramOrder: {
          '//bicollect.hulai.com:8182/api': ['cookie', 'url', 'referer', 'metric', 'snid', 'gameid', 'downloadUrl', 'act']
        },
        disableDefaultParams: true
      },
      extendParams: {
        metric: 'Landing',
        snid: snid,
        gameid: gameid,
        referer: document.referrer ? document.referrer : '',
        act: 'visit',
        downloadUrl: ''
      },
      trackCookieKeys: {
        cookie: 'cookie_id'
      },
      trackLocalStorageKeys: {
        latitude: 'location.latitude',
        longitude: 'location.longitude'
      },
      eventConfigArr: [{
        eventType: 'click',
        selectors: ["a[id='android']"],
        extendParams: {
          event_flag: 'downloadClick',
          act: 'click',
          downloadUrl: downloadUrl
        }
      }]
    };
    return _digger_;
  }).then(function(_digger_) {
    digger(_digger_);
  }).catch(function() {
    // var el = document.getElementsByClassName('message');
    // el.parentNode.replaceChild('<>')
    // var model = $('[data-remodal-id=modal]').remodal();
    // model.open();
  });
