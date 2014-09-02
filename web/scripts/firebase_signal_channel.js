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

FirebaseSignalChannel.prototype.fetchPeer = function(peerId, callback) {
	this.rootRef.child("peers").child(peerId).once("value", function(snapshot) {
		var peer = snapshot.val();
		callback/*.onFetched*/(peer);
	});
};

FirebaseSignalChannel.prototype.setPeerListener = function(peerListener) {
	this.rootRef.child("peers").on("child_added", function(snapshot) {
		var child = snapshot.val();
		var id = child.id;
		var name = child.name;
		var peer = new Peer(id, name);
		peerListener.onPeerAvailable(peer);
	});
};

FirebaseSignalChannel.prototype.setRoomListener = function(roomListener) {
	var signalChannel = this;
	this.rootRef.child("rooms").on("child_added", function(snapshot) {
		var child = snapshot.val();
		var room = new Room(child.id, child.name, signalChannel);
		roomListener.onRoomCreated(room);
	});
};

 /*
FirebaseSignalChannel.prototype.createRoom = function(roomName) { return {}; };

FirebaseSignalChannel.prototype.destroyRoom = function(roomId) {};
*/

FirebaseSignalChannel.prototype.enterRoom = function(roomId, selfPeerId) {
	var occupant = {};
	occupant[selfPeerId] = selfPeerId;
	this.rootRef.child("occupants").child(roomId).update(occupant);
};

/*
FirebaseSignalChannel.prototype.exitRoom = function(roomId) {};
*/

FirebaseSignalChannel.prototype.sendOffer = function(roomId, remotePeerId, selfPeerId,
                                                     rtcSessionDescription) {
	var offer = {
		"id": selfPeerId,
		"rtcSessionDescription": JSON.stringify(rtcSessionDescription)
	};
	this.rootRef.child("offers").child(roomId).child(remotePeerId).child(selfPeerId).set(offer);
};

FirebaseSignalChannel.prototype.sendAnswer = function(roomId, remotePeerId, selfPeerId,
                                                      rtcSessionDescription) {
	var answer = {
		"id": selfPeerId,
		"rtcSessionDescription": JSON.stringify(rtcSessionDescription)
	};
	this.rootRef.child("answers").child(roomId).child(remotePeerId).child(selfPeerId).set(answer);
};

FirebaseSignalChannel.prototype.sendIceCandidate = function(roomId, selfPeerId, iceCandidate) {
	// TODO put in a transaction to append the iceCandidate to the array
	var ice = {
		"id": selfPeerId,
		"iceCandidates": [JSON.stringify(iceCandidate)]
	};
	//this.rootRef.child("ice_candidates").child(roomId).child(selfPeerId).set(ice);
};

FirebaseSignalChannel.prototype.setOccupantListener = function(roomId, occupantListener) {
	this.rootRef.child("occupants").child(roomId).on("child_added", function(snapshot) {
		var remotePeerId = snapshot.val();
		occupantListener.onOccupantEntered(roomId, remotePeerId);
	});
	this.rootRef.child("occupants").child(roomId).on("child_removed", function(snapshot) {
		var remotePeerId = snapshot.val();
		occupantListener.onOccupantExited(roomId, remotePeerId);
	});
};

// onRtcSessionDescription(roomId, selfPeerId, remotePeerId, iceCandidate, rtcSessionDescription)
FirebaseSignalChannel.prototype.setOfferListener = function(roomId, selfPeerId, offerListener) {
	this.rootRef.child("offers").child(roomId).child(selfPeerId).on("child_added", function(snapshot) {
		var remotePeer = snapshot.val();
		offerListener.onRtcSessionDescription(roomId, selfPeerId, remotePeer.id,
			remotePeer.iceCandidate, remotePeer.rtcSessionDescription);
	});
};

FirebaseSignalChannel.prototype.setAnswerListener = function(roomId, selfPeerId, answerListener) {
	this.rootRef.child("answers").child(roomId).child(selfPeerId).on("child_added", function(snapshot) {
		var remotePeer = snapshot.val();
		answerListener.onRtcSessionDescription(roomId, selfPeerId, remotePeer.id,
			remotePeer.iceCandidate, remotePeer.rtcSessionDescription);
	});
};
