<!--
	Only one single <script> tag works within a component.
	This adds the necessary @import rule for CSS files shared
	throughout multiple components.
	Such imported CSS files MUST NOT be built into the component
	but loaded at run time to allow browser caching.
-->
<svelte:options tag={null} />

<script>
  import { get_current_component } from "svelte/internal";
  import { basePath } from "../../lib/serviceLocation";
  import { onMount } from "svelte";

  const root = get_current_component().$$.root;

  onMount(() => {
    setTimeout(() => {
      let styleSheet = root.styleSheets[0];
      if (!styleSheet) {
        root.appendChild(document.createElement("style"));
        styleSheet = root.styleSheets[0];
      }
      styleSheet.insertRule(`@import "${basePath}/picnic.min.css";`);
    }, 0);
  });
</script>
