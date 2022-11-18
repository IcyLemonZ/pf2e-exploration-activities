// This function is run on the player's end, by the owner(s) of the token(s) selected by the
// GM when the gm_exploration activity macro was run.

export function explorationActivity(actor, more) {
    let content = "";
    let selectedActivity;
    let activities;
    
    if ( !more ) {
      activities = {
        "Avoid Notice": "@Compendium[pf2e.actionspf2e.IE2nThCmoyhQA0Jn]{Avoid Notice}",
        "Defend": "@Compendium[pf2e.actionspf2e.cYtYKa1gDEl7y2N0]{Defend}",
        "Detect Magic": "@Compendium[pf2e.actionspf2e.Yb0C1uLzeHrVLl7a]{Detect Magic}",
        "Follow the Expert": "@Compendium[pf2e.actionspf2e.tfa4Sh7wcxCEqL29]{Follow the Expert}",
        "Hustle": "@Compendium[pf2e.actionspf2e.JuqmIAnkL9hVGai8]{Hustle}",
        "Investigate": "@Compendium[pf2e.actionspf2e.EwgTZBWsc8qKaViP]{Investigate}",
        "Repair": "@Compendium[pf2e.actionspf2e.bT3skovyLUtP22ME]{Repair}",
        "Refocus": "@Compendium[pf2e.actionspf2e.OSefkMgojBLqmRDh]{Refocus}",
        "Repeat a Spell": "@Compendium[pf2e.actionspf2e.OQaFzDtVEOMWizJJ]{Repeat a Spell}",
        "Scout": "@Compendium[pf2e.actionspf2e.kV3XM0YJeS2KCSOb]{Scout}",
        "Search": "@Compendium[pf2e.actionspf2e.TiNDYUGlMmxzxBYU]{Search}"
      }
    } else {
      activities = {
        "Borrow an Arcane Spell": "@Compendium[pf2e.actionspf2e.OizxuPb44g3eHPFh]{Borrow and Arcane Spell}",
        "Coerce": "@Compendium[pf2e.actionspf2e.tHCqgwjtQtzNqVvd]{Coerce}",
        "Cover Tracks": "@Compendium[pf2e.actionspf2e.SB7cMECVtE06kByk]{Cover Tracks}",
        "Decipher Writing": "@Compendium[pf2e.actionspf2e.d9gbpiQjChYDYA2L]{Decypher Writing}",
        "Gather Information": "@Compendium[pf2e.actionspf2e.plBGdZhqq5JBl1D8]{Gather Information}",
        "Identify Alchemy": "@Compendium[pf2e.actionspf2e.Q4kdWVOf2ztIBFg1]{Identify Alchemy}",
        "Identify Magic": "@Compendium[pf2e.actionspf2e.eReSHVEPCsdkSL4G]{Identify Magic}",
        "Impersonate": "@Compendium[pf2e.actionspf2e.AJstokjdG6iDjVjE]{Impersonate}",
        "Learn a Spell": "@Compendium[pf2e.actionspf2e.Q5iIYCFdqJFM31GW]{Learn a Spell}",
        "Make an Impression": "@Compendium[pf2e.actionspf2e.OX4fy22hQgUHDr0q]{Make an Impression}",
        "Sense Direction": "@Compendium[pf2e.actionspf2e.fJImDBQfqfjKJOhk]{Sense Direction}",
        "Squeeze": "@Compendium[pf2e.actionspf2e.kMcV8e5EZUxa6evt]{Squeeze}",
        "Track": "@Compendium[pf2e.actionspf2e.EA5vuSgJfiHH7plD]{Track}",
        "Treat Wounds": "@Compendium[pf2e.actionspf2e.1kGNdIIhuglAjIp9]{Treat Wounds}"
      }
    }

    // TODO: Custom Textbox option

    //contentUpdate();
    content = `<div id="pf2e-explorationActivity-scripts-content"><label for="activity">Choose an activity: </label>
    <select name="activity" id="activity">`
      for (let i = 0; i < Object.keys(activities).length; i++) {
        content += `<option value="${activities[Object.keys(activities)[i]]}">${Object.keys(activities)[i]}</option>`
      }
    content += `</select></div>`

      let d = new Dialog({
        title: "Exploration Activity",
        content,
        buttons: {
          select: {
            icon: "<i class='fas fa-dice-d20'></i>",
            label: "Select",
            callback: (html) => {
              selectedActivity = "<h3>I will <b>" + (html.find('#activity')[0].value) + "</b></h3>"
              generateChat(actor, selectedActivity)
            }
          },
          more: {
            icon: "<i class='fas fa-dice-d20'></i>",
            label: "More",
            callback: (html) => {
              explorationActivity(actor, !more)
            }
          },
          cancel: {
            icon: "<i class='fas fa-lock-times'></i>",  
            label: "Cancel",
            callback: () => {
              selectedActivity = "<h3>I will do nothing in particular.</h3>"
                generateChat(actor, selectedActivity)
            }
          }
        },
          
    })
    d.options.width = 250
    d.position.width = 250
    d.render(true);

    // used to create the chat messages
    async function generateChat(actor, output) {
        let chatData = { 
            user: game.user._id, 
            speaker: {
                alias: actor.name
            },
            content: output, 
        }; 
        await ChatMessage.create(chatData, {}); 
    } 
}
