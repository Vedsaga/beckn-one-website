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
