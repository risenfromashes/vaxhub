<script lang="ts">
  import { Link, navigate, useLocation } from "svelte-navigator";
  export let path = "";
  export let name = "";
  let location = useLocation();
</script>

<div
  class={"m-3 hover:text-emerald-400" +
    (path === $location.pathname ? " font-bold" : "")}
>
  <Link class="text-lg" to={path}>{name}</Link>
</div>
