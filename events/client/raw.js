//send raw audio data to the lavalink node
module.exports = (client, d) => {
  client.manager?.updateVoiceState(d);
}
