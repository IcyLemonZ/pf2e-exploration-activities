// Macro for GM to request exploration activities from selected players
const tokens = canvas.tokens.controlled.filter((t) => ['character'].includes(t.actor.data.type));

if (tokens.length === 0) {
    ui.notifications.error(`You must select at least one pc token`);
} else {
    let chatData = { 
        content: "GM has requested Exploration Activities", 
    }; 
    ChatMessage.create(chatData, {}); 
    tokens.map((p) => p.actor).forEach((actor) => 
    game.socket.emit('module.pf2e-exploration-activities', {
      operation: 'playerExplorationActivity',
      actor
  }));
}
