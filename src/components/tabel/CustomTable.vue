<template>
	<table v-if="tableData.length > 0" class="table">
		<thead>
			<tr>
				<th v-for="(item, index) in headerList" :key="index">{{ item }}</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(item, index) in tableData" :key="index">
				<td v-for="(element, index) in item" :key="index">
					{{ element }}
				</td>
				<td>
					<div class="button">
						<SmallButton class="button-edit" @click="edit(item[position])">Edit</SmallButton>
						<SmallButton class="button-danger" @click="remove(item[position])"> Delete</SmallButton>
					</div>
				</td>
			</tr>
		</tbody>
	</table>
	<div id="empty" v-else>
		<h2>{{ headWarning }}</h2>
		<p>
			{{ warning }}<strong>{{ buttonMessage }}</strong>
		</p>
	</div>
</template>

<script>
import SmallButton from "@/components/buttons/SmallButton";
export default {
	name: "CustomTable",
	components: {
		SmallButton,
	},
	data() {
		return {
			tableData: [],
			position: parseInt(this.index),
		};
	},
	props: {
		index: {
			type: String,
			required: true,
		},
		dataArray: {
			type: Array,
		},
		remove: {
			type: Function,
			required: true,
		},
		edit: {
			type: Function,
			required: true,
		},
		headerList: {
			type: Array,
			required: true,
		},
		toBeShown: {
			type: Array,
			required: true,
		},
		headWarning: {
			type: String,
			required: true,
		},
		warning: {
			type: String,
			required: true,
		},
		buttonMessage: {
			type: String,
			required: true,
		},
	},
	created() {
		this.filterDataForTable();
	},
	methods: {
		filterDataForTable() {
			const toBeIncludes = this.toBeShown;
			const data = this.dataArray;
			if (data.length) {
				return data.map((item) => {
					const newItem = [];
					toBeIncludes.forEach((key) => {
						newItem.push(item[key]);
					});
					if (this.tableData.length === 0) {
						this.tableData.push(newItem);
					} else {
						const isExist = this.tableData.find((element) => {
							return element[this.position] === newItem[this.position];
						});
						if (!isExist) {
							this.tableData.push(newItem);
						}
						if (isExist) {
							this.tableData.splice(this.tableData.indexOf(isExist), 1);
							this.tableData.push(newItem);
						}
					}
				});
			}
		},
	},
	watch: {
		dataArray: {
			handler(newVal, oldVal) {
				if (newVal !== oldVal) {
					this.tableData = [];
					this.filterDataForTable();
				}
			},
			deep: true,
			immediate: true,
		},
	},
};
</script>
<style lang="scss" scoped>
.table {
	width: max-content;
	display: table;
	border-radius: var(--small-border-radius);
	border: var(--gray-complement) dashed 3px;

	thead {
		tr {
			height: 5.3rem;
			box-shadow: var(--dark-shadow);
			border-radius: var(--medium-border-radius);
			th {
				margin: 2px;
				padding: var(--small-padding);
				width: 9em;
				border-right: var(--gray-complement) dashed 3px;

				//	don't apply border to last child
				&:last-child {
					border-right: none;
				}

				&-hover {
					background: var(--dark-yellow);
					transition: background-color 0.5s ease-in-out;
				}
				&-active {
					background-color: var(--light-green);
					transition: background-color 0.5s ease-in-out;
					transform: scale(1.1);
				}
			}
		}
	}

	tbody {
		tr {
			border: #4caf50 solid 1px;
			height: 5.3rem;
			font-size: 0.8125rem;
			font-weight: 500;
			td {
				border-radius: var(--small-border-radius);
				margin: 0.2rem;
				overflow: hidden;
				text-overflow: ellipsis;
				text-align: center;
				padding: var(--small-padding);
				transition: all 0.3s ease-in-out;
			}

			//	apply gray background to even columns
			&:nth-child(even) {
				background-color: var(--white-bg-header);
			}

			&:hover {
				box-shadow: var(--dark-shadow);
				transition: all 0.3s ease-in-out;
				background: var(--dark-bg);
				color: var(--white-bg);
				transform: scale(1.02);
			}
		}
	}
}

.button {
	margin: 0 auto;
	display: grid;
	width: max-content;
	gap: 1rem;
	grid-template-columns: repeat(2, 1fr);
	&-edit {
		&:hover {
			background: var(--light-blue);
			transition: all 0.3s ease-in-out;
			transform: scale(1.2);
		}
	}
	&-danger {
		&:hover {
			background-color: var(--dark-red);
			transition: all 0.3s ease-in-out;
			transform: scale(1.2);
		}
	}
}

#empty {
	margin: 0 auto;
	text-align: center;
	h2 {
		color: var(--dark-bg-header);
	}
	p {
		color: var(--info-text);
	}
}
</style>
