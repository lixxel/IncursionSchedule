# Incursion Schedule
Sends a POST (In this case, Discord webhook) to announce WoW BfA incursions AKA assaults

This was created in Google Script. Create a new script and just paste it in. https://script.google.com/

Fill in the POST_URL https://support.discordapp.com/hc/en-us/articles/228383668-Intro-to-Webhooks

If you wish to mention a role in Discord when the webhook pops up, fill in the roleID and un-comment "content" : roleID
Role ID is found by typing \\@Role_Name in your discord channel. Will be in format <@&##################>

Run createTrigger() once to begin the hourly check. If you make any mistakes, run deleteTrigger() to clear out the triggers.


I plan to extend this to include Legion invasions as well.
