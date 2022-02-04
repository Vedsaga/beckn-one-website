<template>
	<header class="header">
		<nav class="header-nav">
			<ul>
				<li>
					<router-link id="logo" class="header-link" to="/"> becknONE </router-link>
				</li>
				<li>
					<a class="header-link lighter" href="#"> Getting Started </a>
				</li>
				<li class="dropdown">
					<span class="header-link dropdown-title">
						Resources
						<img src="@/assets/svgs/dropdown.svg" alt="" />
					</span>
					<div class="dropdown-menu">
						<ul>
							<li>
								<a href="#"> API Reference </a>
							</li>
							<li>
								<a href="#"> Privacy Policy </a>
							</li>
							<li>
								<a href="#"> Terms Conditions</a>
							</li>
						</ul>
					</div>
				</li>
			</ul>
		</nav>
		<router-link to="/login">
			<div class="header-right">Log IN</div>
		</router-link>
	</header>
</template>

<script>
export default {
	name: "HeaderLogin",
};
</script>

<style lang="scss" scoped>
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: var(--white-bg-header);

	&-nav {
		width: 100%;

		& > ul {
			display: flex;
			align-items: center;
			padding-left: 0;
			justify-content: space-between;
			max-width: 33.75em;

			li {
				list-style: none;

				a {
					transition: all 0.3s ease;

					&:hover {
						color: var(--dark-blue);
					}
				}
			}
		}
	}

	&-link {
		padding: 5px 10px;
		white-space: pre;
	}

	&-right {
		background: var(--dark-bg-header);
		color: var(--white-bg-header);
		border-radius: var(--large-border-radius);
		padding: var(--small-padding) var(--large-padding);
		white-space: pre;
	}
}

#logo {
	font-size: 21px;
	line-height: 26px;
	font-family: Righteous, cursive;
	font-weight: 500;
}

.lighter {
	color: var(--info-text-color);
}

.dropdown {
	position: relative;

	&-title {
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: var(--gap);
	}

	&-menu {
		display: grid;
		box-shadow: -5px 5px 34px rgba(0, 0, 0, 0.13);
		border-radius: 8px;
		background: #fff;
		position: absolute;
		transform: scale(0);
		transform-origin: top;
		transition: all 0.3s ease-in-out;
		place-items: center;
		padding: var(--medium-padding);
		ul {
			display: flex;
			flex-direction: column;
			gap: var(--small-gap);
			padding-left: 0;

			li {
				width: max-content;
			}
		}
	}

	&:hover {
		.dropdown-menu {
			transform: scale(1);
		}

		img {
			transform: rotate(180deg);
		}
	}

	img {
		transition: all 0.3s ease-in-out;
	}
}
</style>
