<template>
	<div class="main-grid">
		<div id="button-collections" class="main-grid-buttons">
			<slot name="button"></slot>
		</div>
		<div id="message-collections" class="main-grid-message">
			<h3>
				<slot name="message"></slot>
			</h3>
			<p>
				<slot name="info"></slot>
			</p>
		</div>
	</div>
</template>

<script>
export default {
	name: "Button-Empty-Content",
};
</script>

<style lang="scss" scoped>
.main-grid {
	display: flex;
	justify-content: space-between;
	width: max-content;

	&-message {
		display: inline-block;
		margin-left: 15em;
		align-items: center;
		text-align: center;

		h3 {
			color: var(--text-color);
			font-size: 1.5rem;
		}

		p {
			color: var(--info-text);
			font-size: 1rem;
			font-weight: bold;
		}
	}

	&-buttons {
		display: grid;
		column-gap: 1rem;
	}
}
</style>
