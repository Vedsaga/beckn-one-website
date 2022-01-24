<template>
	<header class="header">
		<nav class="header-nav">
			<ul>
				<li>
					<a id="logo" class="header-link" href="#"> becknONE </a>
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
		<div class="header-right">continue login</div>
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
	align-items: center;
	justify-content: space-between;
	height: 110px;

	font-weight: 600;
	font-size: 15px;
	line-height: 18px;

	&-nav {
		& > ul {
			display: flex;
			align-items: center;
			padding-left: 0;
			gap: 69px;

			li {
				list-style: none;

				a {
					transition: all 0.3s ease;

					&:hover {
						color: #00a8ff;
					}
				}
			}
		}
	}

	&-link {
		padding: 5px 10px;
	}

	&-right {
		box-shadow: -5px 5px 34px rgba(0, 0, 0, 0.13);
		border-radius: 34px;
		padding: 13px 34px;
	}
}

#logo {
	font-size: 21px;
	line-height: 26px;
	font-family: Righteous, cursive;
	font-weight: 500;
	background: linear-gradient(90deg, #000000 0%, #9e9e9e 48.44%, #dadada 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	padding-left: 0;
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
		gap: 13px;
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
		padding: 20px;

		ul {
			display: flex;
			flex-direction: column;
			gap: 10px;
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
