
var videoMe = document.getElementById("videoMe");
var videoRemote = document.getElementById("videoRemote");

var pcConfig = {
	"iceServers": []
};
pcConfig = null;

pc1 = new RTCPeerConnection(pcConfig);
pc2 = new RTCPeerConnection(pcConfig);

pc1.onicecandidate = function (event) {
	//log(JSON.stringify({ "candidate": evt.candidate }));
	if(event.candidate) {
		pc2.addIceCandidate(new RTCIceCandidate(event.candidate));
		trace("Local ICE candidate: \n" + event.candidate.candidate);
	}
};
pc2.onicecandidate = function (event) {
	if(event.candidate) {
		pc1.addIceCandidate(new RTCIceCandidate(event.candidate));
		trace("Remote ICE candidate: \n" + event.candidate.candidate);
	}
};

pc2.onaddstream = function(event) {
	attachMediaStream(videoRemote, event.stream);
};

getUserMedia(
	{
		"audio": true,
		"video": true
	},
	function(stream) {
		attachMediaStream(videoMe, stream);
		pc1.addStream(stream);
		pc1.createOffer(function(desc) {
			trace("Offer:\n" + desc.sdp);
			pc1.setLocalDescription(desc);
			pc2.setRemoteDescription(desc);
			pc2.createAnswer(function(desc) {
				trace("Answer:\n" + desc.sdp);
				pc2.setLocalDescription(desc);
				pc1.setRemoteDescription(desc);
			}, error, {"mandatory":{"OfferToReceiveAudio":true,"OfferToReceiveVideo":true}});
		}, error)
	},
	error
);

function error(error) {
	log(error);
}


(function(window) {
}(window));

function log(l) {
	console.log(l);
}
