import axios from "@/axios";
import api_map from "@/axios/api_map";

export default {
    data() {
        return {
            networkDomain: {
                id: null,
                listOfMap: [],
                list: [],
            },
            networkRole: {
                listOfMap: [],
                listOfSubscriberId: [],
            },
        };
    },
    methods: {
        getNetworkDomainList: async function () {
            axios
                .get(api_map.networkDomainsList)
                .then((response) => {
                    // if response.status is 200 then route to the dashboard
                    if (response.status !== 200) {
                        console.log("Error: " + response.status);
                        return;
                    }
                    const rawData = response.data["network_domains"];
                    if (rawData.length === 0) return;
                    for (let index in rawData) {
                        this.networkDomain.listOfMap.push({
                            domain: rawData[index]["name"],
                            id: rawData[index]["id"],
                            description: rawData[index]["description"],
                        });
                        this.networkDomain.list.push(rawData[index]["name"]);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getNetworkRoleList: async function (id) {
            axios
                .get(api_map.singleNetworkParticipant + id + api_map.networkRolesCreatedList)
                .then((response) => {
                    // if response.status is 200 then route to the dashboard
                    if (response.status !== 200) {
                        console.log("Error: " + response.status);
                        return;
                    }
                    const rawData = response.data["network_roles"];
                    if (rawData.length === 0) return;
                    for (let index in rawData) {
                        this.networkRole.listOfSubscriberId.push(rawData[index]["subscriber_id"]);
                        this.networkRole.listOfMap.push({
                            subscriber: rawData[index]["subscriber_id"],
                            id: rawData[index]["id"],
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        returnDomainDetails: function (searchBy, value, askFor) {
            if (searchBy && value && askFor) {
                const listOfMap = this.networkDomain.listOfMap;
                for (let index in listOfMap) {
                    if (listOfMap[index][searchBy] === value) {
                        return listOfMap[index][askFor];
                    }
                }
            }
        },
    },
};
