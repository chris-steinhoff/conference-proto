// Dependencies:
// - https://cdn.firebase.com/js/client/1.0.21/firebase.js
"use strict";

/**
 * @class
 * @extends SignalChannel
 */
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

FirebaseSignalChannel.prototype.setPeerListListener = function(peerListListener) {
	this.rootRef.child("peers").on("child_added", function(snapshot) {
		var child = snapshot.val();
		var id = child.id;
		var name = child.name;
		var peer = new Peer(id, name);
		peerListListener.onPeerAvailable(peer);
	});
};

FirebaseSignalChannel.prototype.setRoomListListener = function(roomListListener) {
	var signalChannel = this;
	this.rootRef.child("rooms").on("child_added", function(snapshot) {
		var child = snapshot.val();
		var room = new Room(child.id, child.name, signalChannel);
		roomListListener.onRoomCreated(room);
	});
};

 /*
FirebaseSignalChannel.prototype.createRoom = function(roomName) { return {}; };

FirebaseSignalChannel.prototype.destroyRoom = function(roomId) {};
*/

FirebaseSignalChannel.prototype.enterRoom = function(roomId, selfPeerId, roomListener) {
	SignalChannel.prototype.enterRoom.call(this, roomId, selfPeerId, roomListener);

	var occupantsRef = this.rootRef.child("occupants").child(roomId);
	var offersRef = this.rootRef.child("offers").child(roomId).child(selfPeerId);
	var answersRef = this.rootRef.child("answers").child(roomId).child(selfPeerId);
	var iceCandidatesRef = this.rootRef.child("ice_candidates").child(roomId).child(selfPeerId);

	var occupant = {
		peer_id: selfPeerId
	};
	var selfOccupant = occupantsRef.push(occupant);
	//this.selfOccupantId = selfOccupant.name();
	selfOccupant.onDisconnect().remove();
	offersRef.onDisconnect().remove();
	answersRef.onDisconnect().remove();
	iceCandidatesRef.onDisconnect().remove();


	var occupantsQuery = occupantsRef.startAt(null, selfOccupant.name());
	occupantsQuery.on("child_added", function(snapshot) {
		var child = snapshot.val();
		if(child.peer_id !== selfPeerId) {
			roomListener.onOccupantEntered(roomId, child.peer_id);
		}
	});
	occupantsRef.on("child_removed", function(snapshot) {
		var child = snapshot.val();
		if(child.peer_id !== selfPeerId) {
			roomListener.onOccupantExited(roomId, child.peer_id);
		}
	});

	offersRef.on("child_added", function(snapshot) {
		var remotePeerId = snapshot.name();
		var child = snapshot.val();
		var sessionDescription = JSON.parse(child.session_description);
		roomListener.onOfferReceived(roomId, selfPeerId, remotePeerId,
			new RTCSessionDescription(sessionDescription));
	});

	answersRef.on("child_added", function(snapshot) {
		var remotePeerId = snapshot.name();
		var child = snapshot.val();
		var sessionDescription = JSON.parse(child.session_description);
		roomListener.onAnswerReceived(roomId, selfPeerId, remotePeerId,
			new RTCSessionDescription(sessionDescription));
	});

	/*
	 receive Occupant as bob
	   create PC
	   set Offer in PC
	   send Offer to /offers/roomId/remotePeerId/selfPeerId
	   send ICs to /ice_candidates/roomId/remotePeerId/selfPeerId/*
	   listen to /answers/roomId/selfPeerId/remotePeerId/*
	     set Answer in PC
	   listen to /ice_candidates/roomId/selfPeerId/remotePeerId/*
	     add ICs to PC

	 receive Offer as bob
	   create PC
	   set Offer in PC
	   set Answer in PC
	   send Answer to /answers/roomId/remotePeerId/selfPeerId
	   send ICs to /ice_candidates/roomId/remotePeerId/selfPeerId/*
	   listen to /ice_candidates/roomId/selfPeerId/remotePeerId/*
	     add ICs to PC
	 */
};

/*
FirebaseSignalChannel.prototype.exitRoom = function(roomId) {};
*/

FirebaseSignalChannel.prototype.sendOffer = function(roomId, remotePeerId, selfPeerId,
                                                     sessionDescription, iceCandidateListener) {
	SignalChannel.prototype.sendOffer.call(this, roomId, remotePeerId, selfPeerId,
		sessionDescription, iceCandidateListener);

	var offer = {
		"session_description": JSON.stringify(sessionDescription)
	};
	this.rootRef.child("offers").child(roomId).child(remotePeerId).child(selfPeerId).set(offer);

	this.rootRef.child("ice_candidates").child(roomId).child(selfPeerId).child(remotePeerId)
		.on("child_added", function(snapshot) {
			var child = snapshot.val();
			var iceCandidate = JSON.parse(child);
			iceCandidateListener.onIceCandidateReceived(roomId, selfPeerId, remotePeerId,
				new RTCIceCandidate(iceCandidate));
		});
};

FirebaseSignalChannel.prototype.sendAnswer = function(roomId, remotePeerId, selfPeerId,
                                                      sessionDescription, iceCandidateListener) {
	SignalChannel.prototype.sendAnswer.call(this, roomId, remotePeerId, selfPeerId,
		sessionDescription, iceCandidateListener);

	var answer = {
		"session_description": JSON.stringify(sessionDescription)
	};
	this.rootRef.child("answers").child(roomId).child(remotePeerId).child(selfPeerId).set(answer);

	this.rootRef.child("ice_candidates").child(roomId).child(selfPeerId).child(remotePeerId)
		.on("child_added", function(snapshot) {
			var child = snapshot.val();
			var iceCandidate = JSON.parse(child);
			iceCandidateListener.onIceCandidateReceived(roomId, selfPeerId, remotePeerId,
				new RTCIceCandidate(iceCandidate));
		});
};

FirebaseSignalChannel.prototype.sendIceCandidate = function(roomId, remotePeerId, selfPeerId,
                                                            iceCandidate) {
	SignalChannel.prototype.sendIceCandidate.call(this, roomId, remotePeerId, selfPeerId,
		iceCandidate);

	var ice = JSON.stringify(iceCandidate);
	this.rootRef.child("ice_candidates").child(roomId).child(remotePeerId).child(selfPeerId)
		.push(ice);
};

/*FirebaseSignalChannel.prototype.setOccupantListener = function(roomId, selfPeerId,
                                                               occupantListener) {
	var roomRef = this.rootRef.child("occupants").child(roomId);
	var roomQuery = roomRef.startAt(null, selfPeerId);
	roomQuery.on("child_added", function(snapshot) {
		var snapName = snapshot.name();
		var remotePeerId = snapshot.val();
		occupantListener.onOccupantEntered(roomId, remotePeerId);
	});
	roomQuery.on("child_removed", function(snapshot) {
		var remotePeerId = snapshot.val();
		occupantListener.onOccupantExited(roomId, remotePeerId);
	});
};*/

/*FirebaseSignalChannel.prototype.setOfferListener = function(roomId, selfPeerId, offerListener) {
	this.rootRef.child("offers").child(roomId).child(selfPeerId).on("child_added", function(snapshot) {
		var remotePeer = snapshot.val();
		offerListener.onRtcSessionDescription(roomId, selfPeerId, remotePeer.id,
			remotePeer.iceCandidate, remotePeer.sessionDescription);
	});
};*/

/*FirebaseSignalChannel.prototype.setAnswerListener = function(roomId, selfPeerId, answerListener) {
	this.rootRef.child("answers").child(roomId).child(selfPeerId).on("child_added", function(snapshot) {
		var remotePeer = snapshot.val();
		answerListener.onRtcSessionDescription(roomId, selfPeerId, remotePeer.id,
			remotePeer.iceCandidate, remotePeer.sessionDescription);
	});
};*/
