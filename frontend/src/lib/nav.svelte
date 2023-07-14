<script lang="ts">
  import { Link, navigate } from "svelte-navigator";
  import { currentUserName } from "../lib/stores/user";
  import { isLoggedIn } from "../lib/stores/user";
  import Navelem from "./navelem.svelte";
  import Logout from "./logout.svelte";

  export let routes: Map<string, string>;

  let showDrawer = false;

  let name;

  currentUserName.subscribe((value) => {
    name = currentUserName;
  });

  export function changeRoute() {
    routes = routes;
  }
</script>

<nav
  class="dark:bg-gray-900 ml-4 flex items-center justify-between py-3 px-4 sm:px-8 w-full fixed z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-800"
>
  <a href="https://www.buet.ac.bd" class="flex items-center z-50">
    <img
      src="https://flowbite.com/docs/images/logo.svg"
      class="mr-3 h-6 sm:h-9"
      alt="VaxHub Logo"
    />
    <span
      class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
      >VaxHub</span
    >
  </a>

  <button
    type="button"
    class="md:hidden flex flex-col items-center justify-evenly z-50 text-xl"
    on:click={() => (showDrawer = !showDrawer)}
  />

  <div
    class="mr-10 flex-col z-40 bg-gray-900 h-screen items-center justify-center flex md:relative md:flex-row md:h-auto md:w-auto transition-all"
  >
    {#if $isLoggedIn}
      <Navelem name="Home" path="/home" />
      <Logout />
    {:else}
      <Navelem name="Login" path="/login" />
      <Navelem name="Register" path="/register" />
    {/if}
  </div>

  {#if $name !== ""}
    <div class="flex items-center space-x-4">
      <img
        class="w-10 h-10 rounded-full"
        src="https://unsplash.it/1920/1080?random"
        alt=""
      />
      <div class="font-medium dark:text-white">
        <div>{$name}</div>
      </div>
    </div>
  {:else}
    <div class="flex items-center space-x-4">
      <div class="font-medium dark:text-white">
        <div />
      </div>
    </div>
  {/if}
</nav>
