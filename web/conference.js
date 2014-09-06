"use strict";

/**
 * @typedef {string} PeerId
 */

/**
 * @typedef {string} RoomId
 */

/**
 * @typedef {Object} RtcSessionDescription
 * @property {string} type
 * @property {Object} sdp
 */

/**
 * Communicates with a server to manage Peers' connectivity and media capability information.
 * This is a no-opt class that should be extended.
 * @class
 */
function SignalChannel() {
	Log.enter("SignalChannel()");
}
/**
 * @param {!PeerListener} peerListener
 */
SignalChannel.prototype.setPeerListener = function(peerListener) {
	Log.enter("SignalChannel.setPeerListener(peerListener)", {"peerListener":peerListener});
};
/*
 * @returns {!Peer[]}
 */
//SignalChannel.prototype.fetchPeers = function() { return []; };
/**
 * @param {!RoomListener} roomListener
 */
SignalChannel.prototype.setRoomListener = function(roomListener) {
	Log.enter("SignalChannel.setRoomListener(roomListener)", {"roomListener":roomListener});
};
/**
 * @returns {!Room[]}
 */
//SignalChannel.prototype.fetchRooms = function() { return []; };
/**
 * @param {!string} roomName
 * @returns {!Room}
 */
SignalChannel.prototype.createRoom = function(roomName) {
	Log.enter("SignalChannel.createRoom(roomName)", {"roomName":roomName});
	return {};
};
/**
 * @param {!string} roomId
 */
SignalChannel.prototype.destroyRoom = function(roomId) {
	Log.enter("SignalChannel.destroyRoom(roomId)", {"roomId":roomId});
};
/**
 * @param {!string} roomId
 * @param {!string} selfPeerId
 */
SignalChannel.prototype.enterRoom = function(roomId, selfPeerId) {
	Log.enter("SignalChannel.enterRoom(roomId, selfPeerId)",
		{"roomId":roomId,"selfPeerId":selfPeerId});
};
/**
 * @param {!string} roomId
 */
SignalChannel.prototype.exitRoom = function(roomId) {
	Log.enter("SignalChannel.exitRoom(roomId)", {"roomId":roomId});
};
/**
 * @param {!string} roomId
 * @param {!string} remotePeerId
 * @param {!string} selfPeerId
 * @param {!{type: string, sdp: Object}} rtcSessionDescription
 */
SignalChannel.prototype.sendOffer = function(roomId, remotePeerId, selfPeerId,
                                             rtcSessionDescription) {
	Log.enter("SignalChannel.sendOffer(roomId, remotePeerId, selfPeerId, rtcSessionDescription)",
		{"roomId":roomId,"remotePeerId":remotePeerId,"selfPeerId":selfPeerId,
			"rtcSessionDescription":rtcSessionDescription});
};
/**
 * @param {!string} roomId
 * @param {!string} remotePeerId
 * @param {!string} selfPeerId
 * @param {!{type: string, sdp: Object}} rtcSessionDescription
 */
SignalChannel.prototype.sendAnswer = function(roomId, remotePeerId, selfPeerId,
                                              rtcSessionDescription) {
	Log.enter("SignalChannel.sendAnswer(roomId, remotePeerId, selfPeerId, rtcSessionDescription)",
		{"roomId":roomId,"remotePeerId":remotePeerId,"selfPeerId":selfPeerId,
			"rtcSessionDescription":rtcSessionDescription});
};
/**
 * @param {!string} roomId
 * @param {!string} selfPeerId
 * @param {!Object} iceCandidate
 */
SignalChannel.prototype.sendIceCandidate = function(roomId, selfPeerId, iceCandidate) {

};
/**
 * @param {!string} roomId
 * @param {OccupantListener} occupantListener
 */
SignalChannel.prototype.setOccupantListener = function(roomId, occupantListener) {
	Log.enter("SignalChannel.setOccupantListener(roomId, occupantListener)",
		{"roomId":roomId,"occupantListener":occupantListener});
};
/**
 * @param {!string} roomId
 * @param {!string} selfPeerId
 * @param {RtcSessionDescriptionListener} offerListener
 */
SignalChannel.prototype.setOfferListener = function(roomId, selfPeerId, offerListener) {
	Log.enter("SignalChannel.setOfferListener(roomId, selfPeerId, offerListener)",
		{"roomId":roomId,"selfPeerId":selfPeerId,"offerListener":offerListener});
};
/**
 * @param {!string} roomId
 * @param {!string} selfPeerId
 * @param {RtcSessionDescriptionListener} answerListener
 */
SignalChannel.prototype.setAnswerListener = function(roomId, selfPeerId, answerListener) {
	Log.enter("SignalChannel.setAnswerListener(roomId, selfPeerId, answerListener)",
		{"roomId":roomId,"selfPeerId":selfPeerId,"answerListener":answerListener});
};

/**
 * Receive events about a peer's presence.
 * This is a no-opt class that should be extended.
 * @class
 */
function PeerListener() {
	Log.enter("PeerListener()");
}
/**
 * @function
 * @param {Peer} peer
 */
PeerListener.prototype.onPeerAvailable = function(peer) {
	Log.enter("PeerListener.onPeerAvailable(peer)", {"peer":peer});
};
/**
 * @function
 * @param {Peer} peer
 */
PeerListener.prototype.onPeerUnavailable = function(peer) {
	Log.enter("PeerListener.onPeerUnavailable(peer)", {"peer":peer});
};
/**
 * @function
 * @param {Peer} peer
 */
PeerListener.prototype.onPeerChanged = function(peer) {
	Log.enter("PeerListener.onPeerChanged(peer)", {"peer":peer});
};

/**
 * Receive events about a room's existence.
 * This is a no-opt class that should be extended.
 * @class
 */
function RoomListener() {
	Log.enter("RoomListener()");
}
/**
 * @function
 * @param {Room} room
 */
RoomListener.prototype.onRoomCreated = function(room) {
	Log.enter("RoomListener.onRoomCreated(room)", {"room":room});
};
/**
 * @function
 * @param {Room} room
 */
RoomListener.prototype.onRoomDestroyed = function(room) {
	Log.enter("RoomListener.onRoomDestroyed(room)", {"room":room});
};
/**
 * @function
 * @param {Room} room
 */
RoomListener.prototype.onRoomChanged = function(room) {
	Log.enter("RoomListener.onRoomChanged(room)", {"room":room});
};

/**
 * Receive events about a peer's presence in a room.
 * This is a no-opt class that should be extended.
 * @class
 */
function OccupantListener() {
	Log.enter("OccupantListener()");
}
/**
 * @function
 * @param {!string} roomId The ID of the room the Peer entered.
 * @param {!string} remotePeerId The ID of the Peer who entered.
 */
OccupantListener.prototype.onOccupantEntered = function(roomId, remotePeerId) {
	Log.enter("OccupantListener.onOccupantEntered(roomId, remotePeerId)",
		{"roomId":roomId,"remotePeerId":remotePeerId});
};
/**
 * @function
 * @param {!string} roomId The ID of the room the Peer left.
 * @param {!string} remotePeerId The ID of the Peer who left.
 */
OccupantListener.prototype.onOccupantExited = function(roomId, remotePeerId) {
	Log.enter("OccupantListener.onOccupantExited(roomId, remotePeerId)",
		{"roomId":roomId,"remotePeerId":remotePeerId});
};

/**
 * Receive events for incoming RTCSessionDescription offers and answers.
 * This is a no-opt class that should be extended.
 * @class
 */
function RtcSessionDescriptionListener() {
	Log.enter("RtcSessionDescriptionListener()");
}
/**
 * @function
 * @param {!string} roomId
 * @param {!string} remotePeerId
 * @param {!string} selfPeerId
 * @param {!Object} iceCandidate
 * @param {!{type: string, sdp: Object}} rtcSessionDescription
 */
RtcSessionDescriptionListener.prototype.onRtcSessionDescription =
	function(roomId, selfPeerId, remotePeerId, iceCandidate, rtcSessionDescription) {
		Log.enter("RtcSessionDescriptionListener.onRtcSessionDescription(roomId, selfPeerId," +
			" remotePeerId, iceCandidate, rtcSessionDescription)",
			{"roomId":roomId,"selfPeerId":selfPeerId,"remotePeerId":remotePeerId,
				"iceCandidate":iceCandidate,"rtcSessionDescription":rtcSessionDescription});
	};

/**
 * Something that can make RTC connections to share media streams.
 * @class
 * @param {!string} id
 * @param {!string} name
 */
function Peer(id, name) {
	this.id = id;
	this.name = name;
}
Peer.prototype = {
	id: null,
	name: null,
	iceCandidate: null,
	/** @returns {string} */
	getId: function() {
		return this.id;
	},
	/** @returns {string} */
	getName: function() {
		return this.name;
	}
};

/**
 * A group of Peers, all sharing media streams with each other.
 * @class
 * @param {!string} id
 * @param {!string} name
 * @param {!SignalChannel} signalChannel
 */
function Room(id, name, signalChannel) {
	this.id_ = id;
	this.name_ = name;
	this.signalChannel_ = signalChannel;
}
Room.prototype = {
	id_: null,
	name_: null,
	signalChannel_: null,
	localMediaStreams_: [],
	get id() { return this.id_; }, set id(readonly) {},
	get name() { return this.name_; }, set name(readonly) {},
	get signalChannel() { return this.signalChannel_; }, set signalChannel(readonly) {}
};
Room.prototype.enter = function() {

};

var r = new Room("", "", new SignalChannel());
r.id = "";

function RoomListenerImpl(gui) {
	if(!this) {
		return new RoomListenerImpl(gui);
	}
	RoomListener.call(this);
	this.gui_ = gui;
}
RoomListenerImpl.prototype = Object.create(RoomListener.prototype, {
	constructor: {
		value: RoomListenerImpl
	}/*,
	gui_: {
		value: null
	}*/
});
RoomListenerImpl.prototype.onRoomCreated = function(room) {

};

/**
 * @class
 */
function Gui() {}
Gui.prototype = {};
Gui.prototype.addRoomToList = function(room) {};
Gui.prototype.addPeerToList = function(peer) {};
Gui.prototype.getLocalMedia = function(listener) {};
Gui.prototype.displayLocalMedia = function(media) {};
Gui.prototype.displayPeerMedia = function(peer, media) {};
Gui.prototype.UserMediaListener = function() {
	return {
		onUserMedia: function(media) {
		},
		onError: function(error) {
		}
	}
};

/**
 * @class
 * @param {!SignalChannel} signalChannel
 * @param {!Gui} gui
 * @param {!Peer} selfPeer
 */
function Conference(signalChannel, gui, selfPeer) {
	var selfPeerId = selfPeer.id;//"2fc1c0beb992cd7096975cfebf9d5c3b";
//	var selfPeerName = "Bob";
	var selfPeerIceCandidate = null;
//	var signalChannel = signalChannel;
//	var gui = gui;

	var audio = true;
	var video = false;

	var peers = {};
	var peerListener = Object.create(PeerListener.prototype, {
		constructor: {
			value: function() {}
		},
		onPeerAvailable: {
			value: function(peer) {
				peers[peer.id] = peer;
				gui.addPeerToList(peer);
			}
		},
		onPeerUnavailable: {
			value: function(peer) {
			}
		},
		onPeerChanged: {
			value: function(peer) {
			}
		}
	});
	signalChannel.setPeerListener(peerListener);

	var rooms = {};
	var roomListener = Object.create(RoomListener.prototype, {
		constructor: {
			value: function() {}
		},
		onRoomCreated: {
			value: function(room) {
				rooms[room.id] = room;
				gui.addRoomToList(room);
			}
		},
		onRoomDestroyed: {
			value: function(room) {
			}
		},
		onRoomChanged: {
			value: function(room) {
			}
		}
	});
	signalChannel.setRoomListener(roomListener);

	var answerListener = Object.create(RtcSessionDescriptionListener.prototype);

	var offerListener = Object.create(RtcSessionDescriptionListener.prototype);

	var occupantListener = Object.create(OccupantListener.prototype, {
		/*constructor: {
			value: function() {}
		},*/
		peerConnection: {
			value: null,
			writable: true
		},
		onOccupantEntered: {
			value: function(roomId, remotePeerId) {
				Log.enter("occupantListener.onOccupantEntered(roomId, remotePeerId)",
					{"roomId":roomId,"remotePeerId":remotePeerId});
				if(remotePeerId === selfPeerId) {
					return;
				}

				var pc = new RTCPeerConnection(null);
				this.peerConnection = pc;
				var room = rooms[roomId];
				for(var i = 0 ; i < room.localMediaStreams_.length ; i++) {
					pc.addStream(room.localMediaStreams_[i]);
				}
				pc.onicecandidate = function(event) {
					// Called after PC.setLocalDescription(desc) is called.
					Log.enter("pc.onicecandidate(event)", {"event":event});
					if(event.candidate) {
						selfPeerIceCandidate = event.candidate;
						//pc.addIceCandidate(new RTCIceCandidate(event.candidate));
					}
				};
				pc.onaddstream = function(event) {
					Log.enter("pc.onaddstream(event)", {"event":event});
					var peer = peers[remotePeerId];
					gui.displayPeerMedia(peer, event.stream);
				};
				pc.createOffer(function(desc) {
					Log.enter("pc.createOffer(desc)", {"desc":desc});
					pc.setLocalDescription(desc);
					Log.info("Local Description set");
					signalChannel.sendOffer(roomId, remotePeerId, selfPeerId, desc);
				}, onError, {
					mandatory: {
						OfferToReceiveAudio: true,
						OfferToReceiveVideo: true
					}
				});
			}
		},
		onOccupantExited: {
			value: function(roomId, remotePeerId) {
				Log.enter("occupantListener.onOccupantExited(roomId, remotePeerId)",
					{"roomId":roomId,"remotePeerId":remotePeerId});
			}
		}
	});

	return {
		/**
		 * @function
		 * @returns {Conference}
		 */
		enableAudioDefault: function() {
			audio = true;
			return this;
		},
		/**
		 * @function
		 * @returns {Conference}
		 */
		disableAudioDefault: function() {
			audio = false;
			return this;
		},
		/**
		 * @function
		 * @returns {Conference}
		 */
		enableVideoDefault: function() {
			video = true;
			return this;
		},
		/**
		 * @function
		 * @returns {Conference}
		 */
		disableVideoDefault: function() {
			video = false;
			return this;
		},
		enterRoom: function(roomId) {
			var room = rooms[roomId];
			if(!room) {
				throw new Error("A room does not exist with the supplied id");
			}

			var userMediaListener = Object.create(Gui.prototype.UserMediaListener.prototype, {
				onUserMedia: {
					value: function(media) {
						room.localMediaStreams_.push(media);
						gui.displayLocalMedia(media);
						signalChannel.setAnswerListener(roomId, selfPeerId, answerListener);
						signalChannel.setOfferListener(roomId, selfPeerId, offerListener);
						signalChannel.setOccupantListener(roomId, occupantListener);
						signalChannel.enterRoom(roomId, selfPeerId);
					}
				},
				onError: {
					value: function(error) {
						console.error(error);
					}
				}
			});
			gui.getLocalMedia(userMediaListener);
		}
	};
}

function onError(error) {
	console.error(error);
}

/*

SignalChannel
-------------
SignalChannel(userName : String) : SignalChannel
fetchPeers() : Peer[]
fetchRooms() : Room[]
createRoom(name : String) : Room
destroyRoom(name : String)
enterRoom(roomId : String, selfPeerId : String)
exitRoom(roomId : String, selfPeerId : String)
sendOffer(roomId : String, remotePeerId : String, selfPeerId : String,
          rtcSessionDescription : RTCSessionDescription)
setOccupantListener(roomId : String, listener : OccupantListener)
setOfferListener(roomId : String, selfPeerId : String,
                 offerListener : RtcSessionDescriptionListener)
setAnswerListener(roomId : String, selfPeerId : String,
                  answerListener : RtcSessionDescriptionListener)

----------------
OccupantListener
----------------
onOccupantEntered(roomId : String, remotePeerId : String)
onOccupantExited(roomId : String, remotePeerId : String)

----------------
RtcSessionDescriptionListener
----------------
onRtcSessionDescription(roomId : String, remotePeerId : String, selfPeerId : String,
                        rtcSessionDescription : RTCSessionDescription)

----
Peer
----
Peer(name : String) : Peer
getId() : String
getName() : String

----
Room
----
Room(name : String, signalChannel : SignalChannel) : Room
getId() : String
getName() : String
getSecured() : boolean
fetchOccupants() : Peer[]
enter() : Room
exit() : Room
destroy()
enableAudio() : Room
disableAudio() : Room
enableVideo() : Room
disableVideo() : Room

----------
Conference
----------
Conference(signalChannel : SignalChannel) : Conference
enableAudioDefault() : Conference
disableAudioDefault() : Conference
enableVideoDefault() : Conference
disableVideoDefault() : Conference

fetchPeers() : Peer[]

fetchRooms() : Room[]
createRoom(roomName : String) throws AlreadyExistsException : Room
enterRoom(roomName : String) throws DoesNotExistException : Room

*/

(function(widow) {

}(window));
