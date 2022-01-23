<template>
  <router-view />
</template>

<style lang="scss">
:root {
  --text-color: #333;
  --bg-color: #fff;
}

body {
  margin: 0;
  font-family: "Montserrat", sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
  font-size: 13px;
}

a {
  text-decoration: none;
  color: inherit;
}
</style>
