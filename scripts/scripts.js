// This function is run on the player's end, by the owner(s) of the token(s) selected by the
// GM when the gm_exploration activity macro was run.

export function explorationActivity(actor, tokenID) {
  console.log("tokenID " + tokenID);
  let token = canvas.tokens.get(tokenID);
  console.log("token " + token);
  let content = "";
  let selectedActivity;
  let activities = {
    "Avoid Notice":
      "@Compendium[pf2e.actionspf2e.IE2nThCmoyhQA0Jn]{Avoid Notice}",
    "Cover Tracks":
      "@Compendium[pf2e.actionspf2e.SB7cMECVtE06kByk]{Cover Tracks}",
    Defend: "@Compendium[pf2e.actionspf2e.cYtYKa1gDEl7y2N0]{Defend}",
    "Detect Magic":
      "@Compendium[pf2e.actionspf2e.Yb0C1uLzeHrVLl7a]{Detect Magic}",
    "Follow the Expert":
      "@Compendium[pf2e.actionspf2e.tfa4Sh7wcxCEqL29]{Follow the Expert}",
    Hustle: "@Compendium[pf2e.actionspf2e.JuqmIAnkL9hVGai8]{Hustle}",
    Investigate: "@Compendium[pf2e.actionspf2e.EwgTZBWsc8qKaViP]{Investigate}",
    "Repeat a Spell":
      "@Compendium[pf2e.actionspf2e.OQaFzDtVEOMWizJJ]{Repeat a Spell}",
    Scout: "@Compendium[pf2e.actionspf2e.kV3XM0YJeS2KCSOb]{Scout}",
    Search: "@Compendium[pf2e.actionspf2e.TiNDYUGlMmxzxBYU]{Search}",
    Track: "@Compendium[pf2e.actionspf2e.EA5vuSgJfiHH7plD]{Track}",
  };

  //contentUpdate();
  content = `<div id="pf2e-explorationActivity-scripts-content"><label for="activity">Choose an activity: </label>
    <select name="activity" id="activity">`;
  for (let i = 0; i < Object.keys(activities).length; i++) {
    content += `<option value="${activities[Object.keys(activities)[i]]}">${
      Object.keys(activities)[i]
    }</option>`;
  }
  content += `</select></div>`;

  let d = new Dialog({
    title: "Exploration Activity",
    content,
    buttons: {
      select: {
        icon: "<i class='fas fa-dice-d20'></i>",
        label: "Select",
        callback: (html) => {
          selectedActivity =
            "<h3>I will <b>" + html.find("#activity")[0].value + "</b></h3>";
          generateChat(actor, selectedActivity);
          applyEffect(actor, html.find("#activity")[0].value);
        },
      },
      cancel: {
        icon: "<i class='fas fa-lock-times'></i>",
        label: "Cancel",
        callback: () => {
          selectedActivity = "<h3>I will do nothing in particular.</h3>";
          generateChat(actor, selectedActivity);
          applyEffect(actor, "Unspecified");
        },
      },
    },
  });
  d.options.width = 250;
  d.position.width = 250;
  d.render(true);

  // used to create the chat messages
  async function generateChat(actor, output) {
    let chatData = {
      user: game.user._id,
      speaker: {
        alias: actor.name,
      },
      content: output,
    };
    await ChatMessage.create(chatData, {});
  }

  //used to apply effect
  async function applyEffect(actor, selectedEffect) {
    const re = /\{(.*)\}/i;
    let effectName = selectedEffect.match(re)[1];
    const explorationEffects = {
      "Avoid Notice":
        "Compendium.pf2e-exploration-effects.exploration-effects.N8vpuGy4TzU10y8E",
      "Cover Tracks":
        "Compendium.pf2e-exploration-effects.exploration-effects.F6vJYLZTWDpnrnCZ",
      Defend:
        "Compendium.pf2e-exploration-effects.exploration-effects.GYOyFj4ziZX060rZ",
      "Detect Magic":
        "Compendium.pf2e-exploration-effects.exploration-effects.OjRHL0B4WAUUQc13",
      "Follow the Expert":
        "ompendium.pf2e-exploration-effects.exploration-effects.V347nnVBGDrVWh7k",
      Hustle:
        "Compendium.pf2e-exploration-effects.exploration-effects.vNUrKvoOSvEnqzhM",
      Investigate:
        "Compendium.pf2e-exploration-effects.exploration-effects.tDsgl8YmhZbx2May",
      "Repeat a Spell":
        "Compendium.pf2e-exploration-effects.exploration-effects.kh1QdKkvbNZ0qBsQ",
      Scout:
        "Compendium.pf2e-exploration-effects.exploration-effects.mGFBHM1lvHNZ9BsH",
      Search:
        "Compendium.pf2e-exploration-effects.exploration-effects.XiVLHjg5lQVMX8Fj",
      Track:
        "Compendium.pf2e-exploration-effects.exploration-effects.OcCXjJab7rSR3mDf",
      Unspecified:
        "Compendium.pf2e-exploration-effects.exploration-effects.CcyA2CzeaTBWHNHP",
    };
    let effect = explorationEffects[effectName];
    let item = (await fromUuid(effect)).toObject();
    await token.actor.createEmbeddedDocuments("Item", [item]);
  }
}
