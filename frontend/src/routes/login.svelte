<script lang="ts">
  let nid = "";
  import { navigate } from "svelte-navigator";
  import { currentUserName } from "../lib/stores/user";
  import { currentRoute } from "../lib/stores/route";

  let warning = false;

  const submit = async () => {
    nid = nid.trim();

    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ nid }),
    });

    if (response.ok) {
      const username = await response.json();
      console.log(username);
      currentUserName.set(username);
      currentRoute.set("Home");
      navigate("/home");
    } else {
      warning = true;
    }
  };
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<div class="bg-slate-900 h-screen">
  <div
    class="mx-auto w-11/12 sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-4/12 2xl:w-1/4 px-5 h-5/6 grid place-content-center sm:py-10 lg:py-20"
  >
    <form class="w-full">
      <div>
        <label
          for="username"
          class="block mb-2 font-OpenSans text-sm font-medium text-gray-900 dark:text-gray-300"
          >National ID Card Number</label
        >
        <input
          type="text"
          bind:value={nid}
          placeholder="NID Number"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-5 font-OpenSans"
        />
      </div>
      <div class="pt-8 flex justify-between px-20 sm:px-10 lg:px-20">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          on:click={submit}
          class="text-white font-OpenSans bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mr-5 py-2.5 px-4 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:cursor-pointer align-middle"
        >
          Log in
          <svg
            aria-hidden="true"
            class="ml-3 -mr-3 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            ><path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            /></svg
          >
        </div>
      </div>
    </form>
    {#if warning}
      <div
        class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
        role="alert"
      >
        <span class="font-medium">Login Unsuccessful!</span>
        Please try again.
      </div>
    {/if}
  </div>
</div>
