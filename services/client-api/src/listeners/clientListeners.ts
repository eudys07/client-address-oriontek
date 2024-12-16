import eventEmitter from "../util/eventEmitter";


eventEmitter.on('CLIENT_CREATED', (data) => {
  console.log(`Event: ${data.event}, Client ID: ${data.clientId}`);
});