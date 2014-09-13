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
 * @param {!PeerListListener} peerListListener
 */
SignalChannel.prototype.setPeerListListener = function(peerListListener) {
	Log.enter("SignalChannel.setPeerListListener(peerListListener)", {"peerListListener":peerListListener});
};
/*
 * @returns {!Peer[]}
 */
//SignalChannel.prototype.fetchPeers = function() { return []; };
/**
 * @param {!RoomListListener} roomListListener
 */
SignalChannel.prototype.setRoomListListener = function(roomListListener) {
	Log.enter("SignalChannel.setRoomListListener(roomListListener)", {"roomListListener":roomListListener});
};
/*
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
 * @param {!RoomListener} roomListener
 */
SignalChannel.prototype.enterRoom = function(roomId, selfPeerId, roomListener) {
	Log.enter("SignalChannel.enterRoom(roomId, selfPeerId, roomListener)",
		{"roomId":roomId,"selfPeerId":selfPeerId,"roomListener":roomListener});
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
 * @param {!{type: string, sdp: Object}} sessionDescription
 * @param {!IceCandidateListener} iceCandidateListener
 */
SignalChannel.prototype.sendOffer = function(roomId, remotePeerId, selfPeerId,
                                             sessionDescription, iceCandidateListener) {
	Log.enter("SignalChannel.sendOffer(roomId, remotePeerId, selfPeerId," +
		" sessionDescription, iceCandidateListener)",
		{"roomId":roomId,"remotePeerId":remotePeerId,"selfPeerId":selfPeerId,
			"sessionDescription":sessionDescription,
			"iceCandidateListener":iceCandidateListener});
};
/**
 * @param {!string} roomId
 * @param {!string} remotePeerId
 * @param {!string} selfPeerId
 * @param {!{type: string, sdp: Object}} sessionDescription
 * @param {!IceCandidateListener} iceCandidateListener
 */
SignalChannel.prototype.sendAnswer = function(roomId, remotePeerId, selfPeerId,
                                              sessionDescription, iceCandidateListener) {
	Log.enter("SignalChannel.sendAnswer(roomId, remotePeerId, selfPeerId," +
		" sessionDescription, iceCandidateListener)",
		{"roomId":roomId,"remotePeerId":remotePeerId,"selfPeerId":selfPeerId,
			"sessionDescription":sessionDescription,
			"iceCandidateListener":iceCandidateListener});
};
/**
 * @param {!string} roomId
 * @param {!string} remotePeerId
 * @param {!string} selfPeerId
 * @param {!Object} iceCandidate
 */
SignalChannel.prototype.sendIceCandidate = function(roomId, remotePeerId, selfPeerId,
                                                    iceCandidate) {
	Log.enter("SignalChannel.sendAnswer(roomId, remotePeerId, selfPeerId," +
		" iceCandidate)",
		{"roomId":roomId,"remotePeerId":remotePeerId,"selfPeerId":selfPeerId,
			"iceCandidate":iceCandidate});
};
/*
 * @param {!string} roomId
 * @param {OccupantListener} occupantListener
 */
/*SignalChannel.prototype.setOccupantListener = function(roomId, occupantListener) {
	Log.enter("SignalChannel.setOccupantListener(roomId, occupantListener)",
		{"roomId":roomId,"occupantListener":occupantListener});
};*/
/*
 * @param {!string} roomId
 * @param {!string} selfPeerId
 * @param {RtcSessionDescriptionListener} offerListener
 */
/*SignalChannel.prototype.setOfferListener = function(roomId, selfPeerId, offerListener) {
	Log.enter("SignalChannel.setOfferListener(roomId, selfPeerId, offerListener)",
		{"roomId":roomId,"selfPeerId":selfPeerId,"offerListener":offerListener});
};*/
/*
 * @param {!string} roomId
 * @param {!string} selfPeerId
 * @param {RtcSessionDescriptionListener} answerListener
 */
/*SignalChannel.prototype.setAnswerListener = function(roomId, selfPeerId, answerListener) {
	Log.enter("SignalChannel.setAnswerListener(roomId, selfPeerId, answerListener)",
		{"roomId":roomId,"selfPeerId":selfPeerId,"answerListener":answerListener});
};*/

/**
 * @class
 */
function RoomListener() {
	Log.enter("RoomListener()");
}
RoomListener.prototype = {
	/**
	 * @function
	 * @param {!String} roomId
	 * @param {!String} remotePeerId
	 */
	onOccupantEntered: function(roomId, remotePeerId) {
		Log.enter("RoomListener.onOccupantEntered(roomId, remotePeerId)",
			{"roomId":roomId,"remotePeerId":remotePeerId})
	},
	/**
	 * @function
	 * @param {!String} roomId
	 * @param {!String} remotePeerId
	 */
	onOccupantExited: function(roomId, remotePeerId) {
		Log.enter("RoomListener.onOccupantExited(roomId, remotePeerId)",
			{"roomId":roomId,"remotePeerId":remotePeerId})
	},

	onOfferReceived: function(roomId, selfPeerId, remotePeerId, sessionDescription) {
		Log.enter("RoomListener.onOfferReceived(roomId, selfPeerId, remotePeerId, " +
			"sessionDescription)",
			{"roomId":roomId,"selfPeerId":selfPeerId,"remotePeerId":remotePeerId,
				"sessionDescription":sessionDescription});
	},

	onAnswerReceived: function(roomId, selfPeerId, remotePeerId, sessionDescription) {
		Log.enter("RoomListener.onAnswerReceived(roomId, selfPeerId, remotePeerId, " +
			"sessionDescription)",
			{"roomId":roomId,"selfPeerId":selfPeerId,"remotePeerId":remotePeerId,
				"sessionDescription":sessionDescription});
	}
};

/**
 * @class
 * @param {!Object} peerConnection
 */
function IceCandidateListener(peerConnection) {
	Log.enter("IceCandidateListener()");
	this.peerConnection = peerConnection;
}
IceCandidateListener.prototype = {
	/**
	 * @function
	 * @param {!String} roomId
	 * @param {!String} remotePeerId
	 * @param {!String} selfPeerId
	 * @param {!Object} iceCandidate
	 */
	onIceCandidateReceived: function(roomId, selfPeerId, remotePeerId, iceCandidate) {
		Log.enter("IceCandidateListener.onIceCandidateReceived(roomId, selfPeerId," +
			" remotePeerId, iceCandidate)",
			{"roomId":roomId,"selfPeerId":selfPeerId,"remotePeerId":remotePeerId,
				"iceCandidate":iceCandidate});

		this.peerConnection.addIceCandidate(iceCandidate);
	}
};

/**
 * Receive events about a peer's presence.
 * This is a no-opt class that should be extended.
 * @class
 */
function PeerListListener() {
	Log.enter("PeerListListener()");
}
/**
 * @function
 * @param {Peer} peer
 */
PeerListListener.prototype.onPeerAvailable = function(peer) {
	Log.enter("PeerListListener.onPeerAvailable(peer)", {"peer":peer});
};
/**
 * @function
 * @param {Peer} peer
 */
PeerListListener.prototype.onPeerUnavailable = function(peer) {
	Log.enter("PeerListListener.onPeerUnavailable(peer)", {"peer":peer});
};
/**
 * @function
 * @param {Peer} peer
 */
PeerListListener.prototype.onPeerChanged = function(peer) {
	Log.enter("PeerListListener.onPeerChanged(peer)", {"peer":peer});
};

/**
 * Receive events about a room's existence.
 * This is a no-opt class that should be extended.
 * @class
 */
function RoomListListener() {
	Log.enter("RoomListListener()");
}
/**
 * @function
 * @param {Room} room
 */
RoomListListener.prototype.onRoomCreated = function(room) {
	Log.enter("RoomListListener.onRoomCreated(room)", {"room":room});
};
/**
 * @function
 * @param {Room} room
 */
RoomListListener.prototype.onRoomDestroyed = function(room) {
	Log.enter("RoomListListener.onRoomDestroyed(room)", {"room":room});
};
/**
 * @function
 * @param {Room} room
 */
RoomListListener.prototype.onRoomChanged = function(room) {
	Log.enter("RoomListListener.onRoomChanged(room)", {"room":room});
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
 * @param {!{type: string, sdp: Object}} sessionDescription
 */
RtcSessionDescriptionListener.prototype.onRtcSessionDescription =
	function(roomId, selfPeerId, remotePeerId, iceCandidate, sessionDescription) {
		Log.enter("RtcSessionDescriptionListener.onRtcSessionDescription(roomId, selfPeerId," +
			" remotePeerId, iceCandidate, sessionDescription)",
			{"roomId":roomId,"selfPeerId":selfPeerId,"remotePeerId":remotePeerId,
				"iceCandidate":iceCandidate,"sessionDescription":sessionDescription});
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
	/** @type {String} */
	id: null,
	/** @type {String} */
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
 * @class
 * @param {!string} roomId
 * @param {!string} occupantId
 * @param {!string} peerId
 */
function Occupant(roomId, occupantId, peerId) {
	this.roomId = roomId;
	this.occupantId = occupantId;
	this.peerId = peerId;
}

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
	/** @type {String} */
	id_: null,
	/** @type {String} */
	name_: null,
	/** @type {!SignalChannel} */
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

function RoomListListenerImpl(gui) {
	if(!this) {
		return new RoomListListenerImpl(gui);
	}
	RoomListListener.call(this);
	this.gui_ = gui;
}
RoomListListenerImpl.prototype = Object.create(RoomListListener.prototype, {
	constructor: {
		value: RoomListListenerImpl
	}/*,
	gui_: {
		value: null
	}*/
});
RoomListListenerImpl.prototype.onRoomCreated = function(room) {

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
	var peerListListener = Object.create(PeerListListener.prototype, {
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
	signalChannel.setPeerListListener(peerListListener);

	var rooms = {};
	var roomListListener = Object.create(RoomListListener.prototype, {
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
	signalChannel.setRoomListListener(roomListListener);

	/*var answerListener = Object.create(RtcSessionDescriptionListener.prototype);

	var offerListener = Object.create(RtcSessionDescriptionListener.prototype);*/

	/*var occupantListener = Object.create(OccupantListener.prototype, {
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
	});*/

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

			var roomListener = Object.create(RoomListener.prototype, {
				onOccupantEntered: {
					value: function(roomId, remotePeerId) {
						Log.enter("roomListener.onOccupantEntered(roomId, remotePeerId)",
							{"roomId":roomId,"remotePeerId":remotePeerId});

						var pc = new RTCPeerConnection(null);
						this.peerConnection = pc;
						var room = rooms[roomId];
						for(var i = 0 ; i < room.localMediaStreams_.length ; i++) {
							pc.addStream(room.localMediaStreams_[i]);
						}
						pc.onicecandidate = function(event) {
							// Called after PC.setLocalDescription(desc) is called.
							Log.enter("pc.onicecandidate(event)",
								{"event.candidate":event.candidate});
							if(event.candidate) {
								var iceCandidate = event.candidate;
								signalChannel.sendIceCandidate(roomId, remotePeerId,
									selfPeerId, iceCandidate);
							}
						};
						pc.onaddstream = function(event) {
							Log.enter("pc.onaddstream(event)", {"event.stream":event.stream});
							var peer = peers[remotePeerId];
							gui.displayPeerMedia(peer, event.stream);
						};
						pc.createOffer(function(desc) {
							Log.enter("pc.createOffer(desc)", {"desc":desc});
							pc.setLocalDescription(desc);
							Log.info("Local Description set");
							signalChannel.sendOffer(roomId, remotePeerId, selfPeerId,
								desc, new IceCandidateListener(pc));
						}, onError, {
							mandatory: {
								OfferToReceiveAudio: true,
								OfferToReceiveVideo: true
							}
						});
					}
				}/*,
				onOccupantExited: {
					value: function(roomId, remotePeerId) {
						Log.enter("roomListener.onOccupantExited(roomId, remotePeerId)",
							{"roomId":roomId,"remotePeerId":remotePeerId});
					}
				}*/,
				onOfferReceived: {
					value: function(roomId, selfPeerId, remotePeerId, sessionDescription) {
						Log.enter("roomListener.onOfferReceived(roomId, selfPeerId, " +
							"remotePeerId, sessionDescription)",
							{"roomId":roomId,"selfPeerId":selfPeerId,"remotePeerId":remotePeerId,
								"sessionDescription":sessionDescription});

						var pc = new RTCPeerConnection(null);
						var room = rooms[roomId];
						for(var i = 0 ; i < room.localMediaStreams_.length ; i++) {
							pc.addStream(room.localMediaStreams_[i]);
						}
						pc.onicecandidate = function(event) {
							Log.enter("pc.onicecandidate(event)",
								{"event.candidate":event.candidate});
							if(event.candidate) {
								var iceCandidate = event.candidate;
								signalChannel.sendIceCandidate(roomId, remotePeerId,
									selfPeerId, iceCandidate);
							}
						};
						pc.onaddstream = function(event) {
							Log.enter("pc.onaddstream(event)", {"event.stream":event.stream});
							var peer = peers[remotePeerId];
							gui.displayPeerMedia(peer, event.stream);
						};
						pc.setRemoteDescription(sessionDescription);
						pc.createAnswer(function(desc) {
							Log.enter("pc.createAnswer(desc)", {"desc":desc});
							pc.setLocalDescription(desc);
							signalChannel.sendAnswer(roomId, remotePeerId, selfPeerId,
								desc, new IceCandidateListener(pc));
						}, onError, {
							mandatory: {
								OfferToReceiveAudio: true,
								OfferToReceiveVideo: true
							}
						})
					}
				},
				onAnswerReceived: {
					value: function(roomId, selfPeerId, remotePeerId, sessionDescription) {
						Log.enter("roomListener.onAnswerReceived(roomId, selfPeerId, " +
							"remotePeerId, sessionDescription)",
							{"roomId":roomId,"selfPeerId":selfPeerId,"remotePeerId":remotePeerId,
								"sessionDescription":sessionDescription});

					}
				}
			});

			signalChannel.enterRoom(roomId, selfPeerId, roomListener);

			var userMediaListener = Object.create(Gui.prototype.UserMediaListener.prototype, {
				onUserMedia: {
					value: function(media) {
						room.localMediaStreams_.push(media);
						gui.displayLocalMedia(media);
						/*signalChannel.setAnswerListener(roomId, selfPeerId, answerListener);
						signalChannel.setOfferListener(roomId, selfPeerId, offerListener);
						signalChannel.setOccupantListener(roomId, occupantListener);
						signalChannel.enterRoom(roomId, selfPeerId);*/
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
          sessionDescription : RTCSessionDescription)
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
                        sessionDescription : RTCSessionDescription)

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
