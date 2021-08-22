// This function is run on the player's end, by the owner(s) of the token(s) selected by the
// GM when the gm_exploration activity macro was run.

export function explorationActivity(actor) {
    let content = "";
    let selectedActivity;
    
    let activitiesFullDecription = {
        "Avoid Notice": "<h1>Avoid Notice</h1> <p>You attempt a Stealth check to avoid notice while traveling at half speed.<br><br>If you have the Swift Sneak feat, you can move at full Speed rather than half, but you still can’t use another exploration activity while you do so. <br><br>If you have the Legendary Sneak feat, you can move at full Speed and use a second exploration activity. <br><br>If you’re Avoiding Notice at the start of an encounter, you usually roll a Stealth check instead of a Perception check both to determine your initiative and to see if the enemies notice you (based on their Perception DCs, as normal for Sneak, regardless of their initiative check results).</p>",
        "Cover Tracks": "<h1>Cover Tracks</h1> <p>You cover your tracks, moving up to half your travel speed. <br><br>You don't need to attempt a Survival check to cover your tracks, but anyone tracking you must succeed at a Survival check against your Survival DC if it is higher than the normal DC to  Track. <br><br>In some cases, you might Cover Tracks in an encounter. In this case, Cover Tracks is a single action and doesn't have the exploration trait.</p>",
    	  "Defend": "<h1>Defend</h1> <p>You move at half your travel speed with your shield raised. <br><br>If combat breaks out, you gain the benefits of Raising a Shield before your first turn begins.</p>",
        "Detect Magic": "<h1>Detect Magic</h1> <p>You cast detect magic at regular intervals. You move at half your travel speed or slower. <br><br>You have no chance of accidentally overlooking a magic aura at a travel speed up to 300 feet per minute, but must be traveling no more than 150 feet per minute to detect magic auras before the party moves into them.</p>",
        "Follow the Expert": "<h1>Follow the Expert</h1> <p>Choose an ally attempting a recurring skill check while exploring, such as climbing, or performing a different exploration tactic that requires a skill check (like Avoiding Notice). The ally must be at least an expert in that skill and must be willing to provide assistance. <br><br>While Following the Expert, you match their tactic or attempt similar skill checks. Thanks to your ally’s assistance, you can add your level as a proficiency bonus to the associated skill check, even if you’re untrained. <br><br>Additionally, you gain a circumstance bonus to your skill check based on your ally’s proficiency (+2 for expert, +3 for master, and +4 for legendary).</p>",
	      "Hustle": "<h1>Hustle</h1> <p>You strain yourself to move at double your travel speed. <br><br>You can Hustle only for a number of minutes equal to your Constitution modifier × 10 (minimum 10 minutes). <br><br>If you are in a group that is Hustling, use the lowest Constitution modifier among everyone to determine how fast the group can Hustle together.</p>",
	      "Investigate": "<h1>Investigate</h1> <p>You seek out information about your surroundings while traveling at half speed. <br><br>You use Recall Knowledge as a secret check to discover clues among the various things you can see and engage with as you journey along. You can use any skill that has a Recall Knowledge action while Investigating, but the GM determines whether the skill is relevant to the clues you could find.</p>",
        "Repeat a Spell": "<h1>Repeat a Spell</h1> <p>You repeatedly cast the same spell while moving at half speed. <br><br>Typically, this spell is a cantrip that you want to have in effect in the event a combat breaks out, and it must be one you can cast in 2 actions or fewer. In order to prevent fatigue due to repeated casting, you’ll likely use this activity only when something out of the ordinary occurs. <br><br>You can instead use this activity to continue Sustaining a Spell or Activation with a sustained duration. Most such spells or item effects can be sustained for 10 minutes, though some specify they can be sustained for a different duration.</p>",
	      "Scout": "<h1>Scout</h1> <p>You scout ahead and behind the group to watch danger, moving at half speed. <br><br>At the start of the next encounter, every creature in your party gains a +1 circumstance bonus to their initiative rolls.</p>",
	      "Search": "<h1>Search</h1> <p>You Seek meticulously for hidden doors, concealed hazards, and so on. <br><br>You can usually make an educated guess as to which locations are best to check and move at half speed, but if you want to be thorough and guarantee you checked everything, you need to travel at a Speed of no more than 300 feet per minute, or 150 feet per minute to ensure you check everything before you walk into it. You can always move more slowly while Searching to cover the area more thoroughly, and the Expeditious Search feat increases these maximum Speeds. <br><br>If you come across a secret door, item, or hazard while Searching, the GM will attempt a free secret check to Seek to see if you notice the hidden object or hazard. <br><br>In locations with many objects to search, you have to stop and spend significantly longer to search thoroughly.</p>",
        "Track": "<h1>Track</h1> <p>You follow tracks, moving at up to half your travel speed. After a successful check to Track, you can continue following the tracks at half your Speed without attempting additional checks for up to 1 hour. In some cases, you might Track in an encounter. In this case, Track is a single action and doesn't have the exploration trait, but you might need to roll more often because you're in a tense situation. The GM determines how often you must attempt this check. <br><br>You attempt your Survival check when you start Tracking, once every hour you continue tracking, and any time something significant changes in the trail. The GM determines the DCs for such checks, depending on the freshness of the trail, the weather, and the type of ground.<br><br><b>Success</b> You find the trail or continue to follow the one you're already following.<br><b>Failure</b> You lose the trail but can try again after a 1-hour delay.<br><b>Critical Failure</b> You lose the trail and can't try again for 24 hours.</p>"
    }

    let activities = {
      "Avoid Notice": "@Compendium[pf2e.actionspf2e.IE2nThCmoyhQA0Jn]{Avoid Notice}",
      "Cover Tracks": "@Compendium[pf2e.actionspf2e.SB7cMECVtE06kByk]{Cover Tracks}",
      "Defend": "@Compendium[pf2e.actionspf2e.cYtYKa1gDEl7y2N0]{Defend}",
      "Detect Magic": "@Compendium[pf2e.actionspf2e.Yb0C1uLzeHrVLl7a]{Detect Magic}",
      "Follow the Expert": "@Compendium[pf2e.actionspf2e.tfa4Sh7wcxCEqL29]{Follow the Expert}",
      "Hustle": "@Compendium[pf2e.actionspf2e.JuqmIAnkL9hVGai8]{Hustle}",
      "Investigate": "@Compendium[pf2e.actionspf2e.EwgTZBWsc8qKaViP]{Investigate}",
      "Repeat a Spell": "@Compendium[pf2e.actionspf2e.OQaFzDtVEOMWizJJ]{Repeat a Spell}",
      "Scout": "@Compendium[pf2e.actionspf2e.kV3XM0YJeS2KCSOb]{Scout}",
      "Search": "@Compendium[pf2e.actionspf2e.TiNDYUGlMmxzxBYU]{Search}",
      "Track": "@Compendium[pf2e.actionspf2e.EA5vuSgJfiHH7plD]{Track}"
    }

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
              //TODO: Options menu to switch chat message format

              //TODO: Add custom activity option/prompt? ("I will <TEXTBOX>")

              // Long Format
              //selectedActivity = '<img style="display: block; margin-left: auto; margin-right: auto;" src="' + actor.token.img + '" alt="" width="128" height="128" />'
              //selectedActivity += (html.find('#activity')[0].value)

              // Short Format
              selectedActivity = "<h3>I will <b>" + (html.find('#activity')[0].value) + "</b></h3>"

              //TODO: Get additional info for Follow the Expert (what skill? which expert?) and Repeat a Spell (what spell?)
		    
              generateChat(actor, selectedActivity)
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
