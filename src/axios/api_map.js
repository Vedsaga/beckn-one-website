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
    getNetworkRoleDetails: "/network_roles/show/",
    removeNetworkRole: "/network_roles/destroy/",
    newNetworkRole: "/network_roles/save",
    getParticipantKeys: "/participant_keys",
    generateKeys: "/network_participants/generateKeys/",
    removeParticipantKey: "/participant_keys/destroy/",
    newOperatingRegion: "/operating_regions/save",
};

export default apiDict;
