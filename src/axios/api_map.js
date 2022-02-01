const apiDict = {
    login: "/login",
    logout: "/logout",
    networkParticipantsList: "/ /network_participants/search?q=CREATOR_USER_ID:",
    singleNetworkParticipant: "/network_participants/show/",
    removeNetworkParticipant: "/network_participants/destroy/",
    newNetworkParticipant: "/network_participants/save",
    networkDomainsList: "/network_domains",
    newNetworkRole: "/network_roles/save",
    participantKeys: "/participant_keys",
};

export default apiDict;
