# Web component stub using svelte

## Svelte

https://svelte.dev/

### Scaffolding

- package.json<br>
  The package name is used as the central naming part throughout
  build and runtime processes.
- public/<br>
  Contains a static html page (for development) and the CSS asset
  needed for publishing.
  - build/<br>
  Contains build results:
    - picnic.min.css - The CSS framework
    - `${packageName}`.js - Web component bundle
- src/
  - lib/<br>
    Contains modules needed during build or runtime.
    - runTimeConfig.js<br>
      Makes build constants available during runtime.
      Is recreated with each build.
  - components/<br>
    - private/<br>
      Svelte components that **aren't published** as web components.
      - styleImport.svelte<br>
        Implements browser loading of picnic.css per component.
        Must be appended to any web component that needs the picnic
        CSS.
    - public/<br>
      **Published** Svelte web components.<br>
      All `*.svelte` files in this directory will be loaded as build
      starting points.

## Development

Start with renaming the package in `package.json`.
Make sure to use a safe namespace that allows mixing with any other
custom element sources.

Then run `npm install`.

`npm run dev` starts a local web server with the html page from the
`public` folder. Live reload is enabled.

In development mode the bundled web component JS is not compressed.

To embed dev results into another local application, use the URL
`http://localhost:8080/build/${packageName}.js`.

---

`npm run build` will create the bundled and compressed web component
JS lib (IIFE encapsulated).

### Exporting web components (custom elements)

Each published svelte component begins with a configuration tag,
e.g.:<br>
`<svelte:options tag="webc-stub-button" immutable={true} />`

The attribute `tag` defines the name of the custom element. In this
example it would be:<br>
`<webc-stub-button></webc-stub-button>`

Don't use existing html tag names without a namespace prefix.

Recommendation: Use the package name as name prefix.

## Production usage

1. Copy the bundled JS and `picnic.min.css` to a web served
production location. Make sure they are both stored inside the same
folder / location.

2. In your web application, load the JS bundle as shown in the
`index.html` example. Deferred loading will result in layout shift.

3. Use the new custom elements in your web application.
