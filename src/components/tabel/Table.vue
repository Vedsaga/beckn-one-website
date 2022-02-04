<template>
	<table v-if="data.length > 0" class="table" :data="data">
		<thead>
			<tr>
				<th>Network Domain</th>
				<th>Role Type</th>
				<th>Subscriber ID</th>
				<th>URL</th>
				<th>Status</th>
			</tr>
		</thead>

		<tbody>
			<tr v-for="(item, index) in data" :key="index">
				<td v-for="(element, index) in item" :key="index">
					{{ element }}
				</td>
			</tr>
		</tbody>
	</table>
	<div id="empty" v-else>
		<h2>No Role have been defined yet!</h2>
		<p>Please create role by clicking on <strong>CREATE BUTTON</strong></p>
	</div>
</template>

<script>
export default {
	name: "Table",
	data() {
		return {
			headers: [],
			items: [],
			fields: [],
			sortKey: null,
			sortOrders: {},
			sortOrder: 1,
		};
	},
	props: {
		data: {
			type: Array,
			required: true,
		},
	},
	// methods: {
	// 	sortBy: function(key) {
	// 			this.sortKey = key;
	// 			this.sortOrders[key] = this.sortOrders[key] * -1;
	// 	}
	// },
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
				background: var(--light-blue);
				color: var(--white-bg);
				transform: scale(1.02);
			}
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
