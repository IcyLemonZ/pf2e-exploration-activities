// Set up socket listener to listen for exploration activities macro

Hooks.once("ready", () => {
  console.log("PF2e Exploration Activities | Hooked in");
  game.socket.on("module.pf2e-exploration-activities", (data) => {
    if (data.operation === "playerExplorationActivity") {
      if (data.actor.permission[game.user.data._id] >= 3) {
        explorationActivity(data.actor, data.tokenID);
      }
    }
  });
});
import { explorationActivity } from "./scripts.js";
