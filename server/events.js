const EventEmitter = require('eventemitter3');
const emitter = new EventEmitter();

function subscribe(req, res) {
  console.log('hit');
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  });

  // Heartbeat
  const nln = function() {
    res.write('\n');
  };
  const hbt = setInterval(nln, 15000);

  const onEvent = function(data) {
    res.write('retry: 500\n');
    res.write(`event: event\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  emitter.on('event', onEvent);

  // Clear heartbeat and listener
  req.on('close', function() {
    clearInterval(hbt);
    emitter.removeListener('event', onEvent);
  });
}

function publish(eventData) {
  emitter.emit('event', eventData);
}

module.exports = {
  subscribe,
  publish
};
