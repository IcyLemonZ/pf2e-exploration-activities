// Macro for GM to request exploration activities from selected players
const tokens = canvas.tokens.controlled.filter((t) =>
  ["character"].includes(t.actor.data.type)
);

if (tokens.length === 0) {
  ui.notifications.error(`You must select at least one pc token`);
} else {
  let chatData = {
    content: "GM has requested Exploration Activities",
  };
  ChatMessage.create(chatData, {});

  tokens.forEach((token) => {
    console.log(token);
    let actor = token.actor;
    let tokenID = token.id;
    game.socket.emit("module.pf2e-exploration-activities", {
      operation: "playerExplorationActivity",
      actor,
      tokenID,
    });
  });
}
