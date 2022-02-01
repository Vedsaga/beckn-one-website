<template>
	<div @click="toggle" class="dropdown" v-on:clickaway="hideDropdown" v-on:click="getSelectedElement(selectedElement)">
		<label for="label"
			><strong>{{ labelName }}</strong>
		</label>
		<div id="label" class="dropdown-box">
			{{ selectedElement }}
			<img :class="[active ? 'dropdown-box-img' : '']" src="@/assets/svgs/dropdown.svg" alt="custom-dropdown icon" />
		</div>
		<div v-if="active" class="dropdown-list">
			<div
				class="dropdown-list-element"
				v-for="(element, index) in listOfElements"
				:key="index"
				@click="setSelectedElement(element)"
			>
				{{ element }}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Dropdown",
	props: {
		listOfElements: {
			type: Array,
			required: true,
		},
		getSelectedElement: {
			type: Function,
			required: true,
		},
		labelName: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			selectedElement: null,
			active: false,
		};
	},
	methods: {
		toggle() {
			this.active = !this.active;
		},
		setSelectedElement(element) {
			this.selectedElement = element;
		},
		hideDropdown() {
			this.active = false;
		},
	},
};
</script>

<style lang="scss" scoped>
.dropdown {
	display: flex;
	flex-direction: column;
	font-family: "Montserrat", sans-serif;
	gap: 0.8em;
	min-width: 10em;
	max-width: max-content;

	label {
		font-size: 0.9em;
		font-weight: 500;
		color: var(--text-color);
		cursor: pointer;
	}

	&-box {
		display: flex;
		gap: 1.25em;
		flex-direction: row;
		justify-content: space-between;
		padding: 0 2.1em;
		height: 3.3em;
		cursor: pointer;
		background: var(--bg-color-light);
		border-radius: var(--box-radius--normal);
		align-items: center;
		align-content: flex-end;
		font-size: 0.9rem;
		font-weight: 500;
		box-shadow: var(--box-shadow);

		img {
			margin-left: auto;
			transition: all 0.3s ease-in-out;
		}

		&-img {
			transform: rotate(180deg);
			transition: all 0.3s ease-in-out;
		}
	}

	&-list {
		display: grid;
		max-width: max-content;
		align-items: flex-start;
		margin-left: auto;
		background: var(--bg-color-light);
		box-shadow: var(--box-shadow);
		border-radius: var(--box-radius--medium);

		&-element {
			padding: 1.25em 2.1em;
			font-weight: 500;
			font-size: 0.8125rem;
			cursor: pointer;

			&:hover {
				background: var(--text-color);
				color: var(--bg-color-light);
				//	apply radius to the top right and top left corner for first element
				&:first-child {
					border-top-left-radius: var(--box-radius--medium);
					border-top-right-radius: var(--box-radius--medium);
				}

				// apply radius to the bottom right and bottom left corner for last element
				&:last-child {
					border-bottom-left-radius: var(--box-radius--medium);
					border-bottom-right-radius: var(--box-radius--medium);
				}
			}
		}
	}
}
</style>
