const EventEmitter = require('eventemitter3');
const axios = require('axios');
/**
 * Manages http requests so only one unique url is requested at a time
 *
 * @returns Requests
 */
class GithubEvent extends EventEmitter {
  constructor() {
    super();
    //Access token
    this.accessToken = process.env.GITHUB_KEY;

    //Most recent event
    this.lastEvent = 0;

    //Interval time (once a second)
    this.intervalTime = 1 * 1000;
    this.interval = null;
  }

  /**
   * Start sending events
   *
   * @returns void
   */
  start() {
    //Stop if running already
    this.stop();

    //Start the polling interval
    this.interval = setInterval(
      function() {
        this.makeRequest();
      }.bind(this),
      this.intervalTime
    );
  }

  /**
   * Stop consuming sending events
   *
   * @returns void
   */
  stop() {
    //Clear any previous interval
    if (this.interval !== null) {
      clearInterval(this.interval);
    }
  }

  /**
   * Make a request to the Github event API
   *
   * @returns void
   */

  makeRequest() {
    //Request options
    const options = {
      url: 'https://api.github.com/events',
      method: 'get',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Accept: 'application/json',
        Authorization: 'token ' + this.accessToken
      }
    };

    //Response

    axios(options)
      .then(result => {
        const data = result.data;
        var lowestTime = 0;
        data.forEach(e => {
          var eventTime = Date.parse(e.created_at);
          //Process if the event is new
          if (eventTime > this.lastEvent) {
            this.emit('event', e);
          }

          //Get the lowest time from the request
          if (lowestTime < eventTime) {
            lowestTime = eventTime;
          }
        });

        this.lastEvent = lowestTime;
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = GithubEvent;
