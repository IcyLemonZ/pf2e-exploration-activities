// Set up socket listener to listen for exploration activities macro

Hooks.once('ready', () => {
  console.log('PF2e Exploration Activities | Hooked in')
  game.socket.on('module.pf2e-exploration-activities', (socketData) => {
    if (socketData.operation === 'playerExplorationActivity') {
      console.log('socketData ')
      console.log(JSON.parse(JSON.stringify(socketData)))
      console.log('socketData.tokenID: ' + socketData.tokenID)
      if (socketData.actor.ownership[game.user._id] >= 3) {
        explorationActivity(socketData.actor, socketData.tokenID)
      }
    }
  })
})
import { explorationActivity } from './scripts.js'
