Hooks.once("ready", () => {
    console.log('hooked in');
    game.socket.on('module.pf2e-explorationActivity', (data) => {
        console.log(actor);
        if (data.operation === 'playerExplorationActivity') {
            if (data.actor.permission[game.user._id] >= 3) {
                explorationActivity(data.actor);
            }
        }
    });
})
import { explorationActivity } from './scripts.js';