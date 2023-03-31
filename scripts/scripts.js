// This function is run on the player's end, by the owner(s) of the token(s) selected by the
// GM when the gm_exploration activity macro was run.

export function explorationActivity(actor, tokenID) {
  let token = canvas.tokens.get(tokenID)
  let content = ''
  let selectedActivity
  let activities = {
    'Avoid Notice':
      '@Compendium[pf2e.actionspf2e.IE2nThCmoyhQA0Jn]{Avoid Notice}',
    'Cover Tracks':
      '@Compendium[pf2e.actionspf2e.SB7cMECVtE06kByk]{Cover Tracks}',
    Defend: '@Compendium[pf2e.actionspf2e.cYtYKa1gDEl7y2N0]{Defend}',
    'Detect Magic':
      '@Compendium[pf2e.actionspf2e.Yb0C1uLzeHrVLl7a]{Detect Magic}',
    'Follow the Expert':
      '@Compendium[pf2e.actionspf2e.tfa4Sh7wcxCEqL29]{Follow the Expert}',
    Hustle: '@Compendium[pf2e.actionspf2e.JuqmIAnkL9hVGai8]{Hustle}',
    Investigate: '@Compendium[pf2e.actionspf2e.EwgTZBWsc8qKaViP]{Investigate}',
    'Repeat a Spell':
      '@Compendium[pf2e.actionspf2e.OQaFzDtVEOMWizJJ]{Repeat a Spell}',
    Scout: '@Compendium[pf2e.actionspf2e.kV3XM0YJeS2KCSOb]{Scout}',
    Search: '@Compendium[pf2e.actionspf2e.TiNDYUGlMmxzxBYU]{Search}',
    Track: '@Compendium[pf2e.actionspf2e.EA5vuSgJfiHH7plD]{Track}',
  }

  let additionalActions = {
    'Borrow an Arcane Spell':
      '@Compendium[pf2e.actionspf2e.OizxuPb44g3eHPFh]{Borrow an Arcane Spell}',
    Coerce: '@Compendium[pf2e.actionspf2e.tHCqgwjtQtzNqVvd]{Coerce}',
    'Cover Tracks':
      '@Compendium[pf2e.actionspf2e.SB7cMECVtE06kByk]{Cover Tracks}',
    'Decipher Writing':
      '@Compendium[pf2e.actionspf2e.d9gbpiQjChYDYA2L]{Decypher Writing}',
    'Gather Information':
      '@Compendium[pf2e.actionspf2e.plBGdZhqq5JBl1D8]{Gather Information}',
    'Identify Alchemy':
      '@Compendium[pf2e.actionspf2e.Q4kdWVOf2ztIBFg1]{Identify Alchemy}',
    'Identify Magic':
      '@Compendium[pf2e.actionspf2e.eReSHVEPCsdkSL4G]{Identify Magic}',
    Impersonate: '@Compendium[pf2e.actionspf2e.AJstokjdG6iDjVjE]{Impersonate}',
    'Learn a Spell':
      '@Compendium[pf2e.actionspf2e.Q5iIYCFdqJFM31GW]{Learn a Spell}',
    'Make an Impression':
      '@Compendium[pf2e.actionspf2e.OX4fy22hQgUHDr0q]{Make an Impression}',
    'Sense Direction':
      '@Compendium[pf2e.actionspf2e.fJImDBQfqfjKJOhk]{Sense Direction}',
    Squeeze: '@Compendium[pf2e.actionspf2e.kMcV8e5EZUxa6evt]{Squeeze}',
    'Treat Wounds':
      '@Compendium[pf2e.actionspf2e.1kGNdIIhuglAjIp9]{Treat Wounds}',
  }

  //contentUpdate();
  const dialogStyle = `
  <style>
    .my-class {
      margin-bottom: 12px; 
    }
  </style>`
  content = dialogStyle
  content += `<div id="pf2e-explorationActivity-scripts-content"><label for="activity">Choose an activity: </label>
    <select class ="my-class"  name="activity" id="activity">`
  content += `<optgroup label="common">`
  for (let i = 0; i < Object.keys(activities).length; i++) {
    content += `<option value="${activities[Object.keys(activities)[i]]}">${
      Object.keys(activities)[i]
    }</option>`
  }
  content += `</optgroup>`
  content += `<optgroup label="additional">`
  for (let i = 0; i < Object.keys(additionalActions).length; i++) {
    content += `<option value="${
      additionalActions[Object.keys(additionalActions)[i]]
    }">${Object.keys(additionalActions)[i]}</option>`
  }
  content += `</optgroup>`
  content += `</select></div>`

  let d = new Dialog({
    title: 'Exploration Activity',
    content,
    buttons: {
      select: {
        icon: '',
        label: 'Select',
        callback: (html) => {
          selectedActivity =
            '<h3>I will <b>' + html.find('#activity')[0].value + '</b></h3>'
          generateChat(actor, selectedActivity)
          removeOtherEffects(actor)
          applyEffect(actor, html.find('#activity')[0].value)
        },
      },
      cancel: {
        icon: "<i class='fas fa-lock-times'></i>",
        label: 'Cancel',
        callback: () => {
          selectedActivity = '<h3>I will do nothing in particular.</h3>'
          generateChat(actor, selectedActivity)
        },
      },
    },
  })
  d.options.width = 250
  d.position.width = 250
  d.render(true)

  // used to create the chat messages
  async function generateChat(actor, output) {
    let chatData = {
      user: game.user._id,
      speaker: {
        alias: actor.name,
      },
      content: output,
    }
    await ChatMessage.create(chatData, {})
  }

  const explorationEffects = {
    'Avoid Notice':
      'Compendium.pf2e-exploration-effects.exploration-effects.N8vpuGy4TzU10y8E',
    'Cover Tracks':
      'Compendium.pf2e-exploration-effects.exploration-effects.F6vJYLZTWDpnrnCZ',
    Defend:
      'Compendium.pf2e-exploration-effects.exploration-effects.GYOyFj4ziZX060rZ',
    'Detect Magic':
      'Compendium.pf2e-exploration-effects.exploration-effects.OjRHL0B4WAUUQc13',
    'Follow the Expert':
      'ompendium.pf2e-exploration-effects.exploration-effects.V347nnVBGDrVWh7k',
    Hustle:
      'Compendium.pf2e-exploration-effects.exploration-effects.vNUrKvoOSvEnqzhM',
    Investigate:
      'Compendium.pf2e-exploration-effects.exploration-effects.tDsgl8YmhZbx2May',
    'Repeat a Spell':
      'Compendium.pf2e-exploration-effects.exploration-effects.kh1QdKkvbNZ0qBsQ',
    Scout:
      'Compendium.pf2e-exploration-effects.exploration-effects.mGFBHM1lvHNZ9BsH',
    Search:
      'Compendium.pf2e-exploration-effects.exploration-effects.XiVLHjg5lQVMX8Fj',
    Track:
      'Compendium.pf2e-exploration-effects.exploration-effects.OcCXjJab7rSR3mDf',
    Unspecified:
      'Compendium.pf2e-exploration-effects.exploration-effects.CcyA2CzeaTBWHNHP',
  }

  //used to apply effect
  async function applyEffect(actor, selectedEffect) {
    const re = /\{(.*)\}/i
    let effectName = selectedEffect.match(re)[1]
    let effect = explorationEffects[effectName]
    if (effect != undefined) {
      let item = (await fromUuid(effect)).toObject()
      await token.actor.createEmbeddedDocuments('Item', [item])
    }
  }

  //removes other exploration activities
  async function removeExplorationEffects(actor) {
    for (const effectName of Object.keys(explorationEffects)) {
      for (const fx of token.actor.itemTypes.effect) {
        if (fx.name == effectName) {
          console.log('removing ' + fx.name)
          await fx.delete()
        }
      }
    }
  }
}
