<script lang="ts">
  import { navigate } from "svelte-navigator";

  let name = "";
  let address = "";
  let nid = "";

  let warning = false;
  const submit = async () => {
    name = name.trim();
    address = address.trim();
    nid = nid.trim();

    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        address: address,
        nid: nid,
      }),
    });

    const message = await response;
    if (message.ok) {
      navigate("/login");
    } else {
      warning = true;
    }
  };
</script>

<svelte:head>
  <title>Register</title>
</svelte:head>

<div class="bg-slate-900">
  <form class="w-1/3 mx-auto pt-40" on:submit|preventDefault={submit}>
    <div class="grid gap-6 mb-6">
      <div>
        <label
          for="name"
          class="block mb-2 font-OpenSans text-sm font-medium text-gray-900 dark:text-gray-300"
          >Name</label
        >
        <input
          type="text"
          id="name"
          class="bg-gray-50 font-OpenSans border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Name"
          bind:value={name}
          required
        />
      </div>
      <div>
        <label
          for="address"
          class="block mb-2 font-OpenSans text-sm font-medium text-gray-900 dark:text-gray-300"
          >Address</label
        >
        <input
          type="text"
          id="address"
          class="bg-gray-50 font-OpenSans border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Address"
          bind:value={address}
          required
        />
      </div>
      <div>
        <label
          for="nid"
          class="block mb-2 font-OpenSans text-sm font-medium text-gray-900 dark:text-gray-300"
          >NID Number</label
        >
        <input
          type="text"
          id="nid"
          class="bg-gray-50 font-OpenSans border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="National ID Card Number"
          bind:value={nid}
          required
        />
      </div>
    </div>
    <button
      type="submit"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium font-OpenSans rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >Register</button
    >
    {#if warning}
      <div
        class="p-4 mb-4 mx-auto text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
        role="alert"
      >
        <span class="font-medium">Register Unsuccessful!</span>
        Please try again.
      </div>
    {/if}
  </form>
</div>
