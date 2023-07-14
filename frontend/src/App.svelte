<script lang="ts">
  import { Router, Link, Route } from "svelte-navigator";
  import { currentRoute } from "./lib/stores/route";
  import Nav from "./lib/nav.svelte";
  import Login from "./routes/login.svelte";
  import Register from "./routes/register.svelte";
  import Home from "./routes/home.svelte";
  import { isLoggedIn } from "./lib/stores/user";

  const routes: Map<string, string> = new Map([
    ["Login", "/login"],
    ["Register", "/register"],
    ["Home", "/home"],
    ["Logout", "/logout"],
  ]);

  let curRoute;

  currentRoute.subscribe((value) => {
    console.log(curRoute);
    curRoute = currentRoute;
  });
</script>

<Router>
  <div class="w-full h-screen bg-slate-900 text-slate-100">
    <Nav {routes} />
    <div class="">
      {#if !$isLoggedIn}
        <Route path="/">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/home">
          <Login />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      {:else}
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      {/if}
    </div>
  </div>
</Router>
