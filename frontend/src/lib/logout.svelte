<script lang="ts">
  import { navigate } from "svelte-navigator";
  import { currentUserName, isLoggedIn } from "./stores/user";
</script>

<div class={"m-3 hover:text-emerald-400"}>
  <button
    class="text-lg"
    on:click={() => {
      isLoggedIn.set(false);
      currentUserName.set("");
      navigate("/login");
    }}>Logout</button
  >
</div>
