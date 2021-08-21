// This function is run on the player's end, by the owner(s) of the token selected by the
// GM when the gm_skillset macro was run.

export function explorationActivity(actor) {
    let results = "";
    let content = "";
    let selectedActivity;
    
    let activities = {
        "Avoid Notice": "<h1>Avoid Notice</h1> <p>You attempt a Stealth check to avoid notice while traveling at half speed.<br><br>If you have the Swift Sneak feat, you can move at full Speed rather than half, but you still can’t use another exploration activity while you do so. <br><br>If you have the Legendary Sneak feat, you can move at full Speed and use a second exploration activity. <br><br>If you’re Avoiding Notice at the start of an encounter, you usually roll a Stealth check instead of a Perception check both to determine your initiative and to see if the enemies notice you (based on their Perception DCs, as normal for Sneak, regardless of their initiative check results).</p>",
    	"Defend": "<h1>Defend</h1> You move at half your travel speed with your shield raised. If combat breaks out, you gain the benefits of Raising a Shield before your first turn begins.",
        "Detect Magic": "<h1>Detect Magic</h1> You cast detect magic at regular intervals. You move at half your travel speed or slower. You have no chance of accidentally overlooking a magic aura at a travel speed up to 300 feet per minute, but must be traveling no more than 150 feet per minute to detect magic auras before the party moves into them.",
        "Follow the Expert": "<h1>Follow the Expert</h1> Choose an ally attempting a recurring skill check while exploring, such as climbing, or performing a different exploration tactic that requires a skill check (like Avoiding Notice). The ally must be at least an expert in that skill and must be willing to provide assistance. While Following the Expert, you match their tactic or attempt similar skill checks. Thanks to your ally’s assistance, you can add your level as a proficiency bonus to the associated skill check, even if you’re untrained. Additionally, you gain a circumstance bonus to your skill check based on your ally’s proficiency (+2 for expert, +3 for master, and +4 for legendary).",
	"Hustle": "<h1>Hustle</h1> You strain yourself to move at double your travel speed. You can Hustle only for a number of minutes equal to your Constitution modifier × 10 (minimum 10 minutes). If you are in a group that is Hustling, use the lowest Constitution modifier among everyone to determine how fast the group can Hustle together.",
	"Investigate": "<h1>Investigate</h1> You seek out information about your surroundings while traveling at half speed. You use Recall Knowledge as a secret check to discover clues among the various things you can see and engage with as you journey along. You can use any skill that has a Recall Knowledge action while Investigating, but the GM determines whether the skill is relevant to the clues you could find.",
        "Repeat a Spell": "<h1>Repeat a Spell</h1> You repeatedly cast the same spell while moving at half speed. Typically, this spell is a cantrip that you want to have in effect in the event a combat breaks out, and it must be one you can cast in 2 actions or fewer. In order to prevent fatigue due to repeated casting, you’ll likely use this activity only when something out of the ordinary occurs. You can instead use this activity to continue Sustaining a Spell or Activation with a sustained duration. Most such spells or item effects can be sustained for 10 minutes, though some specify they can be sustained for a different duration.",
	"Scout": "<h1>Scout</h1> You scout ahead and behind the group to watch danger, moving at half speed. At the start of the next encounter, every creature in your party gains a +1 circumstance bonus to their initiative rolls.",
	"Search": "<h1>Search</h1> You Seek meticulously for hidden doors, concealed hazards, and so on. You can usually make an educated guess as to which locations are best to check and move at half speed, but if you want to be thorough and guarantee you checked everything, you need to travel at a Speed of no more than 300 feet per minute, or 150 feet per minute to ensure you check everything before you walk into it. You can always move more slowly while Searching to cover the area more thoroughly, and the Expeditious Search feat increases these maximum Speeds. If you come across a secret door, item, or hazard while Searching, the GM will attempt a free secret check to Seek to see if you notice the hidden object or hazard. In locations with many objects to search, you have to stop and spend significantly longer to search thoroughly."
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
              console.log(actor)
              selectedActivity = '<img style="display: block; margin-left: auto; margin-right: auto;" src="' + actor.token.img + '" alt="" width="128" height="128" />'
              selectedActivity += (html.find('#activity')[0].value)
              generateChat(actor, selectedActivity)
            }
          },
          cancel: {
            icon: "<i class='fas fa-lock-times'></i>",  
            label: "Cancel",
            callback: () => {
                results = "Cancel"
                generateChat(actor, results)
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

/*    function runDialog() {
        let d = new Dialog({
            title: "Exploration Activity",
            content: content,
            buttons: {
              select: {
                icon: "<i class='fas fa-dice-d20'></i>",
                label: "Select",
                callback: (html) => {

                  console.log(activity)
                  results = ("TEMP")
                  generateChat(actor, results)
                }
              },
              cancel: {
                icon: "<i class='fas fa-lock-times'></i>",  
                label: "Cancel",
                callback: () => {
                    results = "Cancel"
                    generateChat(actor, results)
                }
              }
            },
              
        })
        d.options.width = 250
        d.position.width = 250
        d.render(true);
    }*/
}
