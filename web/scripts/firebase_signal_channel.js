// Dependencies:
// - https://cdn.firebase.com/js/client/1.0.21/firebase.js
"use strict";

function FirebaseSignalChannel(baseUrl) {
	if(!this) {
		return new FirebaseSignalChannel(baseUrl);
	}
	SignalChannel.call(this);
	this.rootRef = new Firebase(baseUrl);
}
FirebaseSignalChannel.prototype = Object.create(SignalChannel.prototype, {
	constructor: {
		value: FirebaseSignalChannel
	}
});

FirebaseSignalChannel.prototype.setPeerListener = function(peerListener) {
	this.rootRef.child("peers").on("child_added", function(snapshot) {
		var child = snapshot.val();
		var id = child.id;
		var name = child.name;
		var peer = new Peer(id, name);
		peerListener.onPeerAvailable(peer);
	});
};

/*
FirebaseSignalChannel.prototype.fetchRooms = function() { return []; };

FirebaseSignalChannel.prototype.createRoom = function(roomName) { return {}; };

FirebaseSignalChannel.prototype.destroyRoom = function(roomId) {};

FirebaseSignalChannel.prototype.enterRoom = function(roomId) {};

FirebaseSignalChannel.prototype.exitRoom = function(roomId) {};

FirebaseSignalChannel.prototype.sendOffer = function(roomId, remotePeerId, selfPeerId, rtcSessionDescription) {};

FirebaseSignalChannel.prototype.setOccupantListener = function(roomId, occupantListener) {};

FirebaseSignalChannel.prototype.setOfferListener = function(roomId, selfPeerId, offerListener) {};

FirebaseSignalChannel.prototype.setAnswerListener = function(roomId, selfPeerId, answerListener) {};
*/
