<script lang="ts">
  let date_allocated = true;
  let date = "2021-08-01";
  let vaccinated = true;
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
              class="text-sm font-semibold text-gray-900 truncate dark:text-white"
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
      </li>
      <li class="py-3 sm:py-4">
        <div class="flex items-center space-x-3">
          <div class="flex-shrink-0" />
          <div class="flex-1 min-w-0">
            <p
              class="text-sm font-semibold text-gray-900 truncate dark:text-white"
            >
              Vaccination Status
            </p>
          </div>
          {#if date_allocated}
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
      </li>
    </ul>
  </div>
</div>
