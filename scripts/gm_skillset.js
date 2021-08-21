// Macro for the GM to run to set the DC and number of successes for the skill challenge
// Can pick from a set of published combos (based off Locks) or create a custom one

if (!token) {
  ui.notifications.error("Please select a token.")
  return;
}

if (canvas.tokens.controlled.length > 1) {
  ui.notifications.error("Please select only one token.")
  return;
}

game.socket.emit('module.pf2e-explorationActivity', {
  operation: 'playerExplorationActivity',
  actor
});