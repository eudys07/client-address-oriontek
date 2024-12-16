import eventEmitter from "../util/eventEmitter";


eventEmitter.on('ADDRESS_CREATED', (data) => {
  console.log(`Event: ${data.event}, Client ID: ${data.clientId}, Address ID: ${data._id}`);
});