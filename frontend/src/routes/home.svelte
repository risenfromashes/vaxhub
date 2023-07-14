<script lang="ts">
  import { userNID } from "../lib/stores/user";
  import { onMount } from "svelte";

  $: date_allocated = false;
  $: date = "";
  $: vaccinated = false;

  let nid: String = $userNID;
  console.log(nid, "from home.svelte");

  const getDate = async () => {
    const response = await fetch("/getdate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ nid }),
    });

    if (response.ok) {
      date_allocated = true;
      const result = await response.json();
      date = result.date.toString().slice(0, 10);
      console.log(date, "from home.svelte");
    } else {
      date_allocated = false;
      vaccinated = false;
    }
  };

  const isVaccinated = async () => {
    const response = await fetch("/vaccinated", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ nid }),
    });

    if (response.ok) {
      vaccinated = true;
      date_allocated = true;
    } else {
      vaccinated = false;
    }
  };

  const allocateDate = async () => {
    const response = await fetch("/allocatedate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ nid }),
    });

    if (response.ok) {
      date_allocated = true;
      vaccinated = false;
      getDate();
    } else {
      date_allocated = false;
    }
  };

  const getCert = async () => {
    const response = await fetch("/getcert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ nid }),
    });

    if (response.ok) {
      console.log("hear here");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "certificate.pdf");
      link.click();
    } else {
      date_allocated = false;
    }
  };

  onMount(async () => {
    await isVaccinated();
    await getDate();
  });
</script>

<div class="bg-slate-900">
  <div class="mx-auto w-2/3 pt-60 h-1/3">
    <h1
      class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"
    >
      <span
        class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400"
        >VaxHub Center</span
      >
    </h1>
    <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
      Welcome to VaxHub! We are here to help you get vaccinated. Be vaccinated
      and be safe!
    </p>

    <!-- svelte-ignore a11y-no-redundant-roles -->
    <ul
      role="list"
      class="max-w-sm divide-y divide-gray-200 dark:divide-gray-700"
    >
      <li class="py-3 sm:py-4">
        <div class="flex items-center space-x-3 mx-auto">
          <div class="flex-shrink-0">
            <!-- svelte-ignore a11y-img-redundant-alt -->
          </div>
          <div class="flex-1 min-w-0">
            <p
              class="text-xl font-semibold text-gray-900 truncate dark:text-white"
            >
              Date Allocation
            </p>
          </div>
          {#if date_allocated}
            <span
              class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
            >
              <span class="w-2 h-2 mr-1 bg-green-500 rounded-full" />
              Done
            </span>
          {:else}
            <span
              class="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
            >
              <span class="w-2 h-2 mr-1 bg-red-500 rounded-full" />
              Not done
            </span>
          {/if}
        </div>

        {#if date_allocated}
          <div class="flex-1 min-w-0">
            <p
              class="text-xl font-semibold text-gray-900 truncate dark:text-white ml-3"
            >
              Date: {date}
            </p>
          </div>
        {:else}
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-5"
            on:click={allocateDate}>Get Date</button
          >
        {/if}
      </li>
      <li class="py-3 sm:py-4">
        <div class="flex items-center space-x-3">
          <div class="flex-shrink-0" />
          <div class="flex-1 min-w-0">
            <p
              class="text-xl font-semibold text-gray-900 truncate dark:text-white"
            >
              Vaccination Status
            </p>
          </div>
          {#if vaccinated}
            <span
              class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
            >
              <span class="w-2 h-2 mr-1 bg-green-500 rounded-full" />
              Safe
            </span>
          {:else}
            <span
              class="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
            >
              <span class="w-2 h-2 mr-1 bg-red-500 rounded-full" />
              Unsafe
            </span>
          {/if}
        </div>
        {#if vaccinated}
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-5"
            on:click={getCert}>Download Certificate</button
          >
        {/if}
      </li>
    </ul>
  </div>
</div>
