<template>
	<header class="header">
		<nav class="header-nav">
			<ul>
				<li>
					<a id="logo" class="header-link" href="#">
						becknONE
					</a>
				</li>
				<li>
					<a class="header-link" href="#">
						Getting Started
					</a>
				</li>
				<li class="dropdown">
				  <span class="header-link dropdown-title">
					  Resources
					  <img src="@/assets/svgs/dropdown.svg" alt="">
				  </span>
					<div class="dropdown-menu">
						<ul>
						<li>
							<a href="#">
								API Reference
							</a>
						</li>
						<li>
							<a href="#"> Privacy Policy
							</a>
						</li>
						<li>
							<a href="#">
								Terms Conditions</a>
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
	name: "Home",
};
</script>
<style lang="scss">
body {
	padding: 0 89px;
}

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

				&:nth-child(2) {
					color: var(--info-text-color);
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
	background: linear-gradient(90deg, #000000 0%, #9E9E9E 48.44%, #DADADA 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	padding-left: 0;
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

		position: absolute;
		transform: scale(0);
		transform-origin: top;
		transition: all 0.5s ease-in-out;
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
		transition: all 0.5s ease-in-out;
	}
}

</style>
