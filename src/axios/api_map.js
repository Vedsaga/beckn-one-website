const apiDict = {
    currentUser: "/users/current",
    login: "/login",
    logout: "/logout",
    networkParticipantsList: "/network_participants/search?q=CREATOR_USER_ID:",
    singleNetworkParticipant: "/network_participants/show/",
    removeNetworkParticipant: "/network_participants/destroy/",
    newNetworkParticipant: "/network_participants/save",
    networkDomainsList: "/network_domains",
    networkRolesCreatedList: "/network_roles",
    removeNetworkRole: "/network_roles/destroy/",
    newNetworkRole: "/network_roles/save",
    viewAllParticipantKeys: "/participant_keys",
    generateKeys: "/generateKeys/",
};

export default apiDict;
