<script lang="ts">
  import { Router, Link, Route } from "svelte-navigator";
  import { currentRoute } from "./lib/stores/route";
  import Nav from "./lib/nav.svelte";
  import Login from "./routes/login.svelte";
  import Register from "./routes/register.svelte";
  import Home from "./routes/home.svelte";

  const routes: Map<string, string> = new Map([
    ["Login", "/login"],
    ["Register", "/register"],
    ["Home", "/home"],
  ]);

  let curRoute;

  currentRoute.subscribe((value) => {
    curRoute = currentRoute;
  });
</script>

<Router>
  <div class="w-full h-screen bg-slate-900 text-slate-100">
    <Nav {routes} />
    <div class="">
      <Route path="/">
        <Login />
      </Route>
      {#if $curRoute !== "Home"}
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      {/if}
      <Route path="/home">
        <Home />
      </Route>
    </div>
  </div>
</Router>
