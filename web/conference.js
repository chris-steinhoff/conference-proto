// Dependencies:
// - https://cdn.firebase.com/js/client/1.0.21/firebase.js
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
function SignalChannel() {}
/**
 * @param {!PeerListener} peerListener
 */
SignalChannel.prototype.setPeerListener = function(peerListener) {};
/*
 * @returns {!Peer[]}
 */
//SignalChannel.prototype.fetchPeers = function() { return []; };
/**
 * @returns {!Room[]}
 */
SignalChannel.prototype.fetchRooms = function() { return []; };
/**
 * @param {!string} roomName
 * @returns {!Room}
 */
SignalChannel.prototype.createRoom = function(roomName) { return {}; };
/**
 * @param {!string} roomId
 */
SignalChannel.prototype.destroyRoom = function(roomId) {};
/**
 * @param {!string} roomId
 */
SignalChannel.prototype.enterRoom = function(roomId) {};
/**
 * @param {!string} roomId
 */
SignalChannel.prototype.exitRoom = function(roomId) {};
/**
 * @param {!string} roomId
 * @param {!string} remotePeerId
 * @param {!string} selfPeerId
 * @param {!{type: string, sdp: Object}} rtcSessionDescription
 */
SignalChannel.prototype.sendOffer = function(roomId, remotePeerId, selfPeerId, rtcSessionDescription) {};
/**
 * @param {!string} roomId
 * @param {OccupantListener} occupantListener
 */
SignalChannel.prototype.setOccupantListener = function(roomId, occupantListener) {};
/**
 * @param {!string} roomId
 * @param {!string} selfPeerId
 * @param {RtcSessionDescriptionListener} offerListener
 */
SignalChannel.prototype.setOfferListener = function(roomId, selfPeerId, offerListener) {};
/**
 * @param {!string} roomId
 * @param {!string} selfPeerId
 * @param {RtcSessionDescriptionListener} answerListener
 */
SignalChannel.prototype.setAnswerListener = function(roomId, selfPeerId, answerListener) {};

/**
 * Receive events about a peer's presence.
 * This is a no-opt class that should be extended.
 * @class
 */
function PeerListener() {}
/**
 * @function
 * @param {Peer} peer
 */
PeerListener.prototype.onPeerAvailable = function(peer) {};
/**
 * @function
 * @param {Peer} peer
 */
PeerListener.prototype.onPeerUnavailable = function(peer) {};

/**
 * Receive events about a peer's presence in a room.
 * This is a no-opt class that should be extended.
 * @class
 */
function OccupantListener() {}
/**
 * @function
 * @param {!string} roomId The ID of the room the Peer entered.
 * @param {!string} remotePeerId The ID of the Peer who entered.
 */
OccupantListener.prototype.onOccupantEntered = function(roomId, remotePeerId) {};
/**
 * @function
 * @param {!string} roomId The ID of the room the Peer left.
 * @param {!string} remotePeerId The ID of the Peer who left.
 */
OccupantListener.prototype.onOccupantExited = function(roomId, remotePeerId) {};

var o = new OccupantListener();
o.onOccupantEntered("", "");
o.onOccupantExited("", "");

/**
 * Receive events for incoming RTCSessionDescription offers and answers.
 * This is a no-opt class that should be extended.
 * @class
 */
function RtcSessionDescriptionListener() {}
/**
 * @function
 * @param {!string} roomId
 * @param {!string} remotePeerId
 * @param {!string} selfPeerId
 * @param {!{type: string, sdp: Object}} rtcSessionDescription
 */
RtcSessionDescriptionListener.prototype.onRtcSessionDescription =
	function(roomId, remotePeerId, selfPeerId, rtcSessionDescription) {};

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
	/** @private */
	id: null,
	/** @private */
	name: null,
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
	get id() { return this.id_; }, set id(readonly) {},
	get name() { return this.name_; }, set name(readonly) {},
	get signalChannel() { return this.signalChannel_; }, set signalChannel(readonly) {}
};

var r = new Room("", "", new SignalChannel());
r.id = "";

/**
 * @class
 * @param {!SignalChannel} signalChannel
 */
function Conference(signalChannel) {
	this.signalChannel_ = signalChannel;
}
Conference.prototype = {
	/**
	 * @type {SignalChannel}
	 */
	signalChannel_: null,
	/**
	 * @type {boolean}
	 * @default true
	 */
	audio_: true,
	/**
	 * @type {boolean}
	 * @default false
	 */
	video_: false,

	/**
	 * @function
	 * @returns {Conference}
	 */
	enableAudioDefault: function() {
		this.audio_ = true;
		return this;
	},
	/**
	 * @function
	 * @returns {Conference}
	 */
	disableAudioDefault: function() {
		this.audio_ = false;
		return this;
	},
	/**
	 * @function
	 * @returns {Conference}
	 */
	enableVideoDefault: function() {
		this.video_ = true;
		return this;
	},
	/**
	 * @function
	 * @returns {Conference}
	 */
	disableVideoDefault: function() {
		this.video_ = false;
		return this;
	},
	/**
	 * @function
	 * @returns {Peer[]}
	 */
	fetchPeers: function() {
		return [];
	},
	/**
	 * @function
	 * @returns {Room[]}
	 */
	fetchRooms: function() {
		return [];
	},
	/**
	 * @function
	 * @param {string} roomName
	 * @throws {Error} A room already exists with the supplied name.
	 * @returns {Room}
	 */
	createRoom: function(roomName) {
		return null;
	}
};

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
