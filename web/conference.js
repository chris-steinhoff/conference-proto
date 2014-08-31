// Dependencies:
// - https://cdn.firebase.com/js/client/1.0.21/firebase.js
"use strict";

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
