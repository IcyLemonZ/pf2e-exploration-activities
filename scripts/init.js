// Set up socket listener to listen for exploration activities macro

Hooks.once("ready", () => {
    console.log('PF2e Exploration Activities | Hooked in');
    game.socket.on('module.pf2e-explorationActivities', (data) => {
        if (data.operation === 'playerExplorationActivity') {
            console.log('TEST');
            if (data.actor.permission[game.user._id] >= 3) {
                explorationActivity(data.actor);
            }
        }
    });
})
import { explorationActivity } from './scripts.js';
