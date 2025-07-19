Please create React (TSX) components for a server-side rendered application that uses the Datastar framework for all interactivity. The components will be rendered to HTML on the server and must not contain any client-side JavaScript logic.

#### **Key Principles to Follow:**

1.  **Server-First Rendering**: All components must be capable of being fully rendered to a static HTML string on the server using `renderToString`. They will receive all necessary data as props.

2.  **No Client-Side State or Effects**: Do **not** use React hooks like `useState`, `useEffect`, `useContext`, or any other client-side state management. The server is the single source of truth for all data.

3.  **Declarative Interactivity with Datastar**: All user interactivity must be handled using Datastar's `data-*` attributes directly in the TSX.
    * **Mutations (Create/Update/Delete)**: Use standard HTML `<form>` elements with the `data-on-submit` attribute to trigger `POST` requests.
    * **Simple Actions**: For actions like deleting an item or toggling a state, use a simple element like a `<button>` with a `data-on-click` attribute that triggers a `POST` or `GET` request.
    * **Conditional Rendering**: Do not use client-side conditional rendering. If parts of the UI need to change, the server will send back a new HTML fragment. For simple show/hide logic based on client-side signals (like a loading state), you can use `data-show`.

4.  **Styling with Shadcn/Tailwind**: Use Shadcn UI components and Tailwind CSS for styling. Since Shadcn components are often built on Radix UI primitives that can include their own client-side logic, we must use them in a "dumb" or "static" way. For example, use the Shadcn `Button` component, but apply the Datastar `data-on-click` attribute to it instead of a React `onClick` handler.


https://data-star.dev/
https://data-star.dev/bundler
https://data-star.dev/cdn-cgi/image/format=auto,width=32/static/images/rocket-animated-1d781383a0d7cbb1eb575806abeec107c8a915806fb55ee19e4e33e8632c75e5.gif
https://data-star.dev/errors/runtime/text_key_not_allowed?metadata=%7B%22plugin%22%3A%7B%22name%22%3A%22text%22%2C%22type%22%3A%22attribute%22%7D%2C%22element%22%3A%7B%22id%22%3A%22%22%2C%22tag%22%3A%22DIV%22%7D%2C%22expression%22%3A%7B%22rawKey%22%3A%22textFoo%22%2C%22key%22%3A%22foo%22%2C%22value%22%3A%22%22%2C%22fnContent%22%3A%22%22%7D%7D
https://data-star.dev/essays/event_streams_all_the_way_down
https://data-star.dev/examples
https://data-star.dev/examples/form_data
https://data-star.dev/examples/web_component
https://data-star.dev/guide/backend_requests
https://data-star.dev/guide/backend_requests#backend-actions
https://data-star.dev/guide/backend_requests#congratulations
https://data-star.dev/guide/backend_requests#data-indicator
https://data-star.dev/guide/backend_requests#nesting-signals
https://data-star.dev/guide/backend_requests#reading-signals
https://data-star.dev/guide/backend_requests#sending-signals
https://data-star.dev/guide/backend_requests#sse-events
https://data-star.dev/guide/datastar_expressions
https://data-star.dev/guide/datastar_expressions#datastar-expressions
https://data-star.dev/guide/datastar_expressions#executing-scripts
https://data-star.dev/guide/datastar_expressions#external-scripts
https://data-star.dev/guide/datastar_expressions#using-javascript
https://data-star.dev/guide/datastar_expressions#web-components
https://data-star.dev/guide/getting_started
https://data-star.dev/guide/getting_started#data-*
https://data-star.dev/guide/getting_started#installation
https://data-star.dev/guide/getting_started#patching-elements
https://data-star.dev/guide/reactive_signals
https://data-star.dev/guide/reactive_signals#data-attr
https://data-star.dev/guide/reactive_signals#data-attributes
https://data-star.dev/guide/reactive_signals#data-bind
https://data-star.dev/guide/reactive_signals#data-class
https://data-star.dev/guide/reactive_signals#data-computed
https://data-star.dev/guide/reactive_signals#data-on
https://data-star.dev/guide/reactive_signals#data-show
https://data-star.dev/guide/reactive_signals#data-signals
https://data-star.dev/guide/reactive_signals#data-text
https://data-star.dev/guide/reactive_signals#frontend-reactivity
https://data-star.dev/guide/reactive_signals#patching-signals
https://data-star.dev/reference
https://data-star.dev/reference/actions
https://data-star.dev/reference/actions#backend-actions
https://data-star.dev/reference/actions#clipboard
https://data-star.dev/reference/actions#delete
https://data-star.dev/reference/actions#events
https://data-star.dev/reference/actions#filterSignals
https://data-star.dev/reference/actions#fit
https://data-star.dev/reference/actions#get
https://data-star.dev/reference/actions#openWhenHidden
https://data-star.dev/reference/actions#options
https://data-star.dev/reference/actions#patch
https://data-star.dev/reference/actions#peek
https://data-star.dev/reference/actions#post
https://data-star.dev/reference/actions#pro-actions
https://data-star.dev/reference/actions#put
https://data-star.dev/reference/actions#request-cancellation
https://data-star.dev/reference/actions#requestCancellation
https://data-star.dev/reference/actions#response-handling
https://data-star.dev/reference/actions#setall
https://data-star.dev/reference/actions#toggleAll
https://data-star.dev/reference/actions#toggleall
https://data-star.dev/reference/actions#upload-progress
https://data-star.dev/reference/attributes
https://data-star.dev/reference/attributes#aliasing-attributes
https://data-star.dev/reference/attributes#attribute-casing
https://data-star.dev/reference/attributes#data-animate
https://data-star.dev/reference/attributes#data-attr
https://data-star.dev/reference/attributes#data-bind
https://data-star.dev/reference/attributes#data-class
https://data-star.dev/reference/attributes#data-computed
https://data-star.dev/reference/attributes#data-custom-validity
https://data-star.dev/reference/attributes#data-effect
https://data-star.dev/reference/attributes#data-ignore
https://data-star.dev/reference/attributes#data-ignore-morph
https://data-star.dev/reference/attributes#data-indicator
https://data-star.dev/reference/attributes#data-json-signals
https://data-star.dev/reference/attributes#data-on
https://data-star.dev/reference/attributes#data-on-intersect
https://data-star.dev/reference/attributes#data-on-interval
https://data-star.dev/reference/attributes#data-on-load
https://data-star.dev/reference/attributes#data-on-raf
https://data-star.dev/reference/attributes#data-on-resize
https://data-star.dev/reference/attributes#data-on-signal-patch
https://data-star.dev/reference/attributes#data-on-signal-patch-filter
https://data-star.dev/reference/attributes#data-persist
https://data-star.dev/reference/attributes#data-preserve-attr
https://data-star.dev/reference/attributes#data-query-string
https://data-star.dev/reference/attributes#data-ref
https://data-star.dev/reference/attributes#data-replace-url
https://data-star.dev/reference/attributes#data-scroll-into-view
https://data-star.dev/reference/attributes#data-show
https://data-star.dev/reference/attributes#data-signals
https://data-star.dev/reference/attributes#data-style
https://data-star.dev/reference/attributes#data-text
https://data-star.dev/reference/attributes#data-view-transition
https://data-star.dev/reference/attributes#datastar-expressions
https://data-star.dev/reference/attributes#error-handling
https://data-star.dev/reference/attributes#pro-attributes
https://data-star.dev/reference/datastar_pro
https://data-star.dev/reference/datastar_pro#datastar-inspector
https://data-star.dev/reference/datastar_pro#license
https://data-star.dev/reference/sdks
https://data-star.dev/reference/security#escape-user-input
https://data-star.dev/reference/sse_events
https://data-star.dev/reference/sse_events#datastar-patch-elements