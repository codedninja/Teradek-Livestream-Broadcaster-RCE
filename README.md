# Livestream Broadcaster - Privilege Remote Command Execution Proof-of-Concept
There isn't any authentication for upgrading a Livestream Broadcaster. The way the Livestream mobile application upgrades the devices is by file uploading a firmware upgrade, there is a second option to provide a url and the device will curl/wget the firmware via a bash script. Modifiying a request to upgrade the devices with a payload to post back a command response. You are able to get remote command execution as root.

## Root shell persistence
Once you run the proof of concept you can append your own ssh key to `/root/.ssh/authorized_keys` file.

# Install
First you would need to install the node packages the proof of concept uses.

`$ npm install`

# Running proof of concept
The proof of concept preps the device so it's possible to run commands remotely by setting the device in preupgrade mode. Afterwards a prompt will be given to run commands.
`node poc.js`
