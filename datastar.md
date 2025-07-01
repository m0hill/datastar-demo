Title: Overview

URL Source: https://data-star.dev/reference/overview

Markdown Content:
*   [Attribute Plugins](https://data-star.dev/reference/overview#attribute-plugins)
*   [Action Plugins](https://data-star.dev/reference/overview#action-plugins)
*   [Server-Sent Events](https://data-star.dev/reference/overview#server-sent-events)
*   [SDKs](https://data-star.dev/reference/overview#sdks)
*   [Security](https://data-star.dev/reference/overview#security)
*   [Custom Builds](https://data-star.dev/reference/overview#custom-builds)

Attribute Plugins[#](https://data-star.dev/reference/overview#attribute-plugins)
--------------------------------------------------------------------------------

Attribute plugins are `data-*` attributes that add reactive behavior to HTML elements.

### Core Attributes[#](https://data-star.dev/reference/overview#core-attributes)

| Attribute | Description |
| --- | --- |
| [`data-signals`](https://data-star.dev/reference/attribute_plugins#data-signals) | Merges one or more signals into the existing signals. |
| [`data-computed`](https://data-star.dev/reference/attribute_plugins#data-computed) | Creates a read-only signal computed from an expression. |
| [`data-star-ignore`](https://data-star.dev/reference/attribute_plugins#data-star-ignore) | Ignores an element and its descendants when processing. |

### DOM Attributes[#](https://data-star.dev/reference/overview#dom-attributes)

| Attribute | Description |
| --- | --- |
| [`data-attr`](https://data-star.dev/reference/attribute_plugins#data-attr) | Sets any HTML attribute value using expressions. |
| [`data-bind`](https://data-star.dev/reference/attribute_plugins#data-bind) | Creates two-way data binding between a signal and an element’s value. |
| [`data-class`](https://data-star.dev/reference/attribute_plugins#data-class) | Adds or removes CSS classes based on expressions. |
| [`data-on`](https://data-star.dev/reference/attribute_plugins#data-on) | Attaches event listeners that execute expressions. |
| [`data-persist`](https://data-star.dev/reference/attribute_plugins#data-persist) | Persists signals in Local Storage or Session Storage. |
| [`data-ref`](https://data-star.dev/reference/attribute_plugins#data-ref) | Creates a signal reference to the DOM element. |
| [`data-replace-url`](https://data-star.dev/reference/attribute_plugins#data-replace-url) | Replaces the URL in the browser without page reload. |
| [`data-show`](https://data-star.dev/reference/attribute_plugins#data-show) | Shows or hides elements based on expressions. |
| [`data-text`](https://data-star.dev/reference/attribute_plugins#data-text) | Binds text content of an element to an expression. |

### Backend Attributes[#](https://data-star.dev/reference/overview#backend-attributes)

| Attribute | Description |
| --- | --- |
| [`data-indicator`](https://data-star.dev/reference/attribute_plugins#data-indicator) | Creates signals that indicate when SSE requests are in flight. |

### Browser Attributes[#](https://data-star.dev/reference/overview#browser-attributes)

| Attribute | Description |
| --- | --- |
| [`data-custom-validity`](https://data-star.dev/reference/attribute_plugins#data-custom-validity) | Adds custom validation to elements. |
| [`data-on-intersect`](https://data-star.dev/reference/attribute_plugins#data-on-intersect) | Runs expressions when elements intersect the viewport. |
| [`data-on-interval`](https://data-star.dev/reference/attribute_plugins#data-on-interval) | Runs expressions at regular intervals. |
| [`data-on-load`](https://data-star.dev/reference/attribute_plugins#data-on-load) | Runs expressions when elements are loaded into the DOM. |
| [`data-on-raf`](https://data-star.dev/reference/attribute_plugins#data-on-raf) | Runs expressions on `requestAnimationFrame` events. |
| [`data-on-signal-change`](https://data-star.dev/reference/attribute_plugins#data-on-signal-change) | Runs expressions when signals change. |
| [`data-scroll-into-view`](https://data-star.dev/reference/attribute_plugins#data-scroll-into-view) | Scrolls elements into view with various options. |
| [`data-view-transition`](https://data-star.dev/reference/attribute_plugins#data-view-transition) | Sets `view-transition-name` for View Transitions API. |

View the [attribute plugins reference](https://data-star.dev/reference/attribute_plugins)

Action Plugins[#](https://data-star.dev/reference/overview#action-plugins)
--------------------------------------------------------------------------

Action plugins are used in Datastar expressions to perform specific actions.

| Action | Description |
| --- | --- |
| [`@get()`](https://data-star.dev/reference/action_plugins#get) | Sends a GET request to the backend and merges the response. |
| [`@post()`](https://data-star.dev/reference/action_plugins#post) | Sends a POST request to the backend and merges the response. |
| [`@put()`](https://data-star.dev/reference/action_plugins#put) | Sends a PUT request to the backend and merges the response. |
| [`@patch()`](https://data-star.dev/reference/action_plugins#patch) | Sends a PATCH request to the backend and merges the response. |
| [`@delete()`](https://data-star.dev/reference/action_plugins#delete) | Sends a DELETE request to the backend and merges the response. |

### Browser Actions[#](https://data-star.dev/reference/overview#browser-actions)

| Action | Description |
| --- | --- |
| [`@clipboard()`](https://data-star.dev/reference/action_plugins#clipboard) | Copies the provided evaluated expression to the clipboard. |

### Utility Actions[#](https://data-star.dev/reference/overview#utility-actions)

| Action | Description |
| --- | --- |
| [`@setAll()`](https://data-star.dev/reference/action_plugins#setall) | Sets all matching signals to a provided value. |
| [`@toggleAll()`](https://data-star.dev/reference/action_plugins#toggleall) | Toggles all matching signal values. |
| [`@fit()`](https://data-star.dev/reference/action_plugins#fit) | Makes a value linearly interpolate. |

View the [action plugins reference](https://data-star.dev/reference/action_plugins)

Server-Sent Events[#](https://data-star.dev/reference/overview#server-sent-events)
----------------------------------------------------------------------------------

Datastar uses Server-Sent Events (SSE) to communicate from the server to the client.

| Event Type | Description |
| --- | --- |
| [`datastar-merge-fragments`](https://data-star.dev/reference/sse_events#datastar-merge-fragments) | Merges HTML fragments into the DOM. |
| [`datastar-merge-signals`](https://data-star.dev/reference/sse_events#datastar-merge-signals) | Updates signals with new values. |
| [`datastar-remove-fragments`](https://data-star.dev/reference/sse_events#datastar-remove-fragments) | Removes HTML fragments matching selectors. |
| [`datastar-remove-signals`](https://data-star.dev/reference/sse_events#datastar-remove-signals) | Removes signals matching specific paths. |
| [`datastar-execute-script`](https://data-star.dev/reference/sse_events#datastar-execute-script) | Executes JavaScript in the browser. |

View the [SSE events reference](https://data-star.dev/reference/sse_events)

SDKs[#](https://data-star.dev/reference/overview#sdks)
------------------------------------------------------

Officially supported SDKs for generating Datastar-specific SSE events:

*   [Clojure](https://data-star.dev/reference/sdks#clojure)
*   [C# (.NET)](https://data-star.dev/reference/sdks#c-net)
*   [Go](https://data-star.dev/reference/sdks#go)
*   [Haskell](https://data-star.dev/reference/sdks#haskell)
*   [Java](https://data-star.dev/reference/sdks#java)
*   [PHP](https://data-star.dev/reference/sdks#php) (with Laravel and Craft CMS packages)
*   [Python](https://data-star.dev/reference/sdks#python)
*   [Rust](https://data-star.dev/reference/sdks#rust)
*   [Ruby](https://data-star.dev/reference/sdks#ruby)
*   [TypeScript](https://data-star.dev/reference/sdks#typescript)
*   [Zig](https://data-star.dev/reference/sdks#zig)

View the [SDK reference](https://data-star.dev/reference/sdks)

Security[#](https://data-star.dev/reference/overview#security)
--------------------------------------------------------------

Security guidelines for using Datastar expressions safely:

| Consideration | Description |
| --- | --- |
| Escape User Input | Always escape user input to prevent XSS attacks when using Datastar expressions. |
| Avoid Sensitive Data | Signal values are visible in source code and can be modified, avoid leaking sensitive data. |
| Ignore Unsafe Input | Use `data-star-ignore` to ignore unsafe content that cannot be escaped. |
| Content Security Policy | Requires ‘unsafe-eval’ for script sources since Datastar evaluates expressions using IIFE. |

View the [security reference](https://data-star.dev/reference/security)

Custom Builds[#](https://data-star.dev/reference/overview#custom-builds)
------------------------------------------------------------------------

Datastar is built using a modular architecture that allows you to create custom builds with only the plugins you need, useful for reducing the framework’s footprint.

View the [custom builds reference](https://data-star.dev/reference/custom_builds)

Title: Attribute Plugins

URL Source: https://data-star.dev/reference/attribute_plugins

Markdown Content:
Datastar provides the following [`data-*`](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes) attributes.

### Core Attributes[#](https://data-star.dev/reference/attribute_plugins#core-attributes)

*   [`data-signals`](https://data-star.dev/reference/attribute_plugins#data-signals)
*   [`data-computed`](https://data-star.dev/reference/attribute_plugins#data-computed)
*   [`data-star-ignore`](https://data-star.dev/reference/attribute_plugins#data-star-ignore)

### DOM Attributes[#](https://data-star.dev/reference/attribute_plugins#dom-attributes)

*   [`data-attr`](https://data-star.dev/reference/attribute_plugins#data-attr)
*   [`data-bind`](https://data-star.dev/reference/attribute_plugins#data-bind)
*   [`data-class`](https://data-star.dev/reference/attribute_plugins#data-class)
*   [`data-on`](https://data-star.dev/reference/attribute_plugins#data-on)
*   [`data-ref`](https://data-star.dev/reference/attribute_plugins#data-ref)
*   [`data-show`](https://data-star.dev/reference/attribute_plugins#data-show)
*   [`data-text`](https://data-star.dev/reference/attribute_plugins#data-text)

### Backend Attributes[#](https://data-star.dev/reference/attribute_plugins#backend-attributes)

*   [`data-indicator`](https://data-star.dev/reference/attribute_plugins#data-indicator)

### Browser Attributes[#](https://data-star.dev/reference/attribute_plugins#browser-attributes)

*   [`data-custom-validity`](https://data-star.dev/reference/attribute_plugins#data-custom-validity)
*   [`data-on-intersect`](https://data-star.dev/reference/attribute_plugins#data-on-intersect)
*   [`data-on-interval`](https://data-star.dev/reference/attribute_plugins#data-on-interval)
*   [`data-on-load`](https://data-star.dev/reference/attribute_plugins#data-on-load)
*   [`data-on-raf`](https://data-star.dev/reference/attribute_plugins#data-on-raf)
*   [`data-on-signal-change`](https://data-star.dev/reference/attribute_plugins#data-on-signal-change)
*   [`data-persist`](https://data-star.dev/reference/attribute_plugins#data-persist)
*   [`data-replace-url`](https://data-star.dev/reference/attribute_plugins#data-replace-url)
*   [`data-scroll-into-view`](https://data-star.dev/reference/attribute_plugins#data-scroll-into-view)
*   [`data-view-transition`](https://data-star.dev/reference/attribute_plugins#data-view-transition)

### Attribute Order[#](https://data-star.dev/reference/attribute_plugins#attribute-order)

_`data-*` attributes are evaluated in the order they appear in the DOM._

Elements are evaluated by walking the DOM in a depth-first manner, and attributes are processed in the order they appear in the element. This means that if you use a signal in a [Datastar expression](https://data-star.dev/guide/datastar_expressions), it must be defined _before_ it is used.

```
<!-- This works: -->
<div data-signals-foo="1" data-text="$foo"></div>

<!-- This works: -->
<div data-signals-foo="1"></div>
<div data-text="$foo"></div>

<!-- This works: -->
<div data-signals-foo="1">
  <div data-text="$foo"></div>
</div>

<!-- This does NOT work: -->
<div data-text="$foo" data-signals-foo="1"></div>

<!-- This does NOT work: -->
<div data-text="$foo"></div>
<div data-signals-foo="1"></div>
```

### Attribute Casing[#](https://data-star.dev/reference/attribute_plugins#attribute-casing)

_`data-*` attributes have special casing rules._

[According to the HTML specification](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*), all `data-*` atttributes (not Datastar the framework, but any time a data attribute appears in the DOM) are case in-sensitive, but are converted to [camelCase](https://developer.mozilla.org/en-US/docs/Glossary/Camel_case) when accessed from JavaScript by Datastar.

Datastar handles casing of data attributes in two ways:

1.   **Signal names**: the keys used in attribute plugins that define signals (`data-signals-*`, `data-computed-*`, `data-ref-*`, etc), are, by default, converted to camelCase. For example, `data-signals-my-signal` defines a signal named `mySignal`. You would use the signal in a [Datastar expression](https://data-star.dev/guide/datastar_expressions) as `$mySignal`.

2.   **All other attribute plugins**: the keys used by all other attribute plugins are, by default, converted to [kebab-case](https://developer.mozilla.org/en-US/docs/Glossary/Kebab_case). For example, `data-class-text-blue-700` adds or removes the class `text-blue-700`, and `data-on-rocket-launched` would react to the event named `rocket-launched`.

You can use the [`__case` modifier](https://data-star.dev/reference/attribute_plugins#modifiers) to convert between camelCase, kebab-case, snake_case, and PascalCase, or alternatively use object syntax when available.

For example, if a web component exposes an event `widgetLoaded`, you would use `data-on-widget-loaded__case.camel` to react to it. Whereas, if you wanted to use a signal named `my-signal` then you would use the kebab modfier: `data-signals-my-signal__case.kebab`.

Core Attributes[#](https://data-star.dev/reference/attribute_plugins#core-attributes-1)
---------------------------------------------------------------------------------------

The core attribute plugins are included in every bundle, and contain the core functionality in Datastar.

### `data-signals`[#](https://data-star.dev/reference/attribute_plugins#data-signals)

Merges one or more signals into the existing signals. Values defined later in the DOM tree override those defined earlier.

```
<div data-signals-foo="1"></div>
```

Signals can be namespaced using dot-notation.

```
<div data-signals-foo.bar="1"></div>
```

Note when working with namespaced signals that only the leaf nodes are actually signals. So in the example above, only `bar` is a signal, meaning that while using `$foo.bar` in an expression is possible, using `$foo` (the namespace) is not.

The `data-signals` attribute can also be used to merge multiple signals using a set of key-value pairs, where the keys represent signal names and the values represent expressions.

```
<div data-signals="{foo: {bar: 1, baz: 2}}"></div>
```

The value above is written in JavaScript object notation, but JSON, which is a subset and which most templating languages have built-in support for, is also allowed.

Keys used in `data-signals-*` are converted to camel case, so the signal name `mySignal` must be written as `data-signals-my-signal` or `data-signals="{mySignal: 1}"`.

Signals beginning with an underscore are considered _local signals_ and are not included in requests to the backend by default. You can include them by setting the [`includeLocal`](https://data-star.dev/reference/action_plugins#options) option to `true`.

Signal names cannot begin or contain double underscores (`__`), due to its use as a modifer delimiter.

#### Modifiers[#](https://data-star.dev/reference/attribute_plugins#modifiers)

Modifiers allow you to modify behavior when merging signals.

*   `__case` - Converts the casing of the signal name.
*   `.camel` - Camel case: `mySignal` (default)
*   `.kebab` - Kebab case: `my-signal`
*   `.snake` - Snake case: `my_signal`
*   `.pascal` - Pascal case: `MySignal`
*   `__ifmissing` - Only merges signals if their keys do not already exist. This is useful for setting defaults without overwriting existing values.

```
<div data-signals-my-signal__case.kebab="1" data-signals-foo__ifmissing="1"></div>
```

When supplying signals in bulk with object notation, modifiers can also be used:

```
<!-- Merges the signal `mySignal` -->
<div data-signals="{mySignal: 'value'}"></div>

<!-- Merges the signal `mySignal` only if it doesn't already exist -->
<div data-signals__ifmissing="{mySignal: 'init-value'}"></div>

<!-- Defines a kebab cased signal `my-signal` using object notation -->
<div data-signals="{'my-signal': 'value'}"></div>

<!-- It is possible to set both `data-signals__ifmissing` and `data-signals` on the same element -->
<div data-signals="{'my-signal': 'value'}" data-signals__ifmissing="{widgetStatus: 'initial'}">
</div>
```

### `data-computed`[#](https://data-star.dev/reference/attribute_plugins#data-computed)

Creates a signal that is computed based on an expression. The computed signal is read-only, and its value is automatically updated when any signals in the expression are updated.

```
<div data-computed-foo="$bar + $baz"></div>
```

Computed signals are useful for memoizing expressions containing other signals. Their values can be used in other expressions.

```
<div data-computed-foo="$bar + $baz"></div>
<div data-text="$foo"></div>
```

`data-computed` is a pure reactive function, this has several implications:

1.   If a computed signal is not consumed, then the computation will not execute.
2.   Computed signals must not be used for performing actions (changing other signals, actions, JavaScript functions, etc.).

```
<!-- This computation will never execute because $foo is not used anywhere -->
<div data-computed-foo="$bar + $baz"></div> <!-- WRONG -->

<!-- Computed signals must *not* be used for side effects -->
<div data-computed-qux="@post('/qux'); 'quxed'"></div> <!-- WRONG -->
<div data-computed-foo="$bar++"></div> <!-- WRONG -->
```

If you find yourself wanting to perform some action in reaction to a signal change, refer to the [`data-on-signal-change`](https://data-star.dev/reference/attribute_plugins#data-on-signal-change) attribute.

#### Modifiers[#](https://data-star.dev/reference/attribute_plugins#modifiers-1)

Modifiers allow you to modify behavior when defining computed signals.

*   `__case` - Converts the casing of the signal name.
*   `.camel` - Camel case: `mySignal` (default)
*   `.kebab` - Kebab case: `my-signal`
*   `.snake` - Snake case: `my_signal`
*   `.pascal` - Pascal case: `MySignal`

```
<div data-computed-my-signal__case.kebab="$bar + $baz"></div>
```

### `data-star-ignore`[#](https://data-star.dev/reference/attribute_plugins#data-star-ignore)

Datastar walks the entire DOM and applies plugins to each element it encounters. It’s possible to tell Datastar to ignore an element and its descendants by placing a `data-star-ignore` attribute on it. This can be useful for preventing naming conflicts with third-party libraries, or when you are unable to [escape user input](https://data-star.dev/reference/security#escape-user-input).

```
<div data-star-ignore data-show-thirdpartylib>
  <div data-show-thirdpartylib>
    These element will not be processed by Datastar.
  </div>
</div>
```

#### Modifiers[#](https://data-star.dev/reference/attribute_plugins#modifiers-2)

*   `__self` - Only ignore the element itself, not its descendants.

DOM Attributes[#](https://data-star.dev/reference/attribute_plugins#dom-attributes-1)
-------------------------------------------------------------------------------------

Allow the usage of signals and expressions to affect the DOM.

### `data-attr`[#](https://data-star.dev/reference/attribute_plugins#data-attr)

Sets the value of any HTML attribute to an expression, and keeps it in sync.

```
<div data-attr-title="$foo"></div>
```

The `data-attr` attribute can also be used to set the values of multiple attributes on an element using a set of key-value pairs, where the keys represent attribute names and the values represent expressions.

```
<div data-attr="{title: $foo, disabled: $bar}"></div>
```

### `data-bind`[#](https://data-star.dev/reference/attribute_plugins#data-bind)

Creates a signal (if one doesn’t already exist) and sets up two-way data binding between it and an element’s value. This means that the value of the element is updated when the signal changes, and the signal is updated when the value of the element changes.

The `data-bind` attribute be placed on any HTML element on which data can be input or choices selected from (`input`, `select`,`textarea` elements, and web components). Event listeners are added for `change`, `input` and `keydown` events.

```
<input data-bind-foo />
```

The signal name can be specified in the key (as above), or in the value (as below). This can be useful depending on the templating language you are using.

```
<input data-bind="foo" />
```

The initial value of the signal is set to the value of the element, unless a signal has already been defined. So in the example below, `$foo` is set to `bar`.

```
<input data-bind-foo value="bar" />
```

Whereas in the example below, `$foo` inherits the value `baz` of the predefined signal.

```
<div data-signals-foo="baz">
  <input data-bind-foo value="bar" />
</div>
```

Multiple input values can be assigned to a single signal by predefining the signal as an array. So in the example below, `$foo` is set to `['bar', 'baz']` when both checkboxes are checked.

```
<div data-signals-foo="[]">
  <input data-bind-foo type="checkbox" value="bar" />
  <input data-bind-foo type="checkbox" value="baz" />
</div>
```

#### Modifiers[#](https://data-star.dev/reference/attribute_plugins#modifiers-3)

Modifiers allow you to modify behavior when binding signals.

*   `__case` - Converts the casing of the signal name.
*   `.camel` - Camel case: `mySignal` (default)
*   `.kebab` - Kebab case: `my-signal`
*   `.snake` - Snake case: `my_signal`
*   `.pascal` - Pascal case: `MySignal`

```
<input data-bind-my-signal__case.kebab />
```

### `data-class`[#](https://data-star.dev/reference/attribute_plugins#data-class)

Adds or removes a class to or from an element based on an expression.

```
<div data-class-hidden="$foo"></div>
```

If the expression evaluates to `true`, the `hidden` class is added to the element; otherwise, it is removed.

The `data-class` attribute can also be used to add or remove multiple classes from an element using a set of key-value pairs, where the keys represent class names and the values represent expressions.

```
<div data-class="{hidden: $foo, 'font-bold': $bar}"></div>
```

#### Modifiers[#](https://data-star.dev/reference/attribute_plugins#modifiers-4)

Modifiers allow you to modify behavior defining a class name.

*   `__case` - Converts the casing of the class.
*   `.camel` - Camel case: `myClass`
*   `.kebab` - Kebab case: `my-class` (default)
*   `.snake` - Snake case: `my_class`
*   `.pascal` - Pascal case: `MyClass`

```
<div data-class-my-class__case.camel="$foo"></div>
```

### `data-on`[#](https://data-star.dev/reference/attribute_plugins#data-on)

Attaches an event listener to an element, executing an expression whenever the event is triggered.

```
<button data-on-click="$foo = ''">Reset</button>
```

An `evt` variable that represents the event object is available in the expression.

```
<div data-on-myevent="$foo = evt.detail"></div>
```

The `data-on` attribute works with [built-in events](https://developer.mozilla.org/en-US/docs/Web/Events) and [custom events](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events). Note that the `data-on-submit` event listener prevents the default submission behavior of forms.

#### Modifiers[#](https://data-star.dev/reference/attribute_plugins#modifiers-5)

Modifiers allow you to modify behavior when events are triggered. Some modifiers have tags to further modify the behavior.

*   `__once` * - Only trigger the event listener once.
*   `__passive` * - Do not call `preventDefault` on the event listener.
*   `__capture` * - Use a capture event listener.
*   `__case` - Converts the casing of the event.
*   `.camel` - Camel case: `myEvent`
*   `.kebab` - Kebab case: `my-event` (default)
*   `.snake` - Snake case: `my_event`
*   `.pascal` - Pascal case: `MyEvent`
*   `__debounce` - Debounce the event listener.
*   `.500ms` - Debounce for 500 milliseconds.
*   `.1s` - Debounce for 1 second.
*   `.leading` - Debounce with leading edge.
*   `.notrail` - Debounce without trailing edge.
*   `__throttle` - Throttle the event listener.
*   `.500ms` - Throttle for 500 milliseconds.
*   `.1s` - Throttle for 1 second.
*   `.noleading` - Throttle without leading edge.
*   `.trail` - Throttle with trailing edge.
*   `__viewtransition` - Wraps the expression in `document.startViewTransition()` when the View Transition API is available.
*   `__window` - Attaches the event listener to the `window` element.
*   `__outside` - Triggers when the event is outside the element.
*   `__prevent` - Calls `preventDefault` on the event listener.
*   `__stop` - Calls `stopPropagation` on the event listener.

* Only works on built-in events.

```
<div data-on-click__window__debounce.500ms.leading="$foo = ''" data-on-my-event__case.camel="$foo = ''"></div>
```

### `data-ref`[#](https://data-star.dev/reference/attribute_plugins#data-ref)

Creates a new signal that is a reference to the element on which the data attribute is placed.

```
<div data-ref-foo></div>
```

The signal name can be specified in the key (as above), or in the value (as below). This can be useful depending on the templating language you are using.

```
<div data-ref="foo"></div>
```

The signal value can then be used to reference the element.

```
`$foo` holds a <span data-text="$foo.tagName"></span> element.
```

#### Modifiers[#](https://data-star.dev/reference/attribute_plugins#modifiers-6)

Modifiers allow you to modify behavior when defining references.

*   `__case` - Converts the casing of the signal name.
*   `.camel` - Camel case: `mySignal` (default)
*   `.kebab` - Kebab case: `my-signal`
*   `.snake` - Snake case: `my_signal`
*   `.pascal` - Pascal case: `MySignal`

```
<div data-ref-my-signal__case.kebab></div>
```

### `data-show`[#](https://data-star.dev/reference/attribute_plugins#data-show)

Show or hides an element based on whether an expression evaluates to `true` or `false`. For anything with custom requirements, use [`data-class`](https://data-star.dev/reference/attribute_plugins#data-class) instead.

```
<div data-show="$foo"></div>
```

To prevent flickering of the element before Datastar has processed the DOM, you can add a `display: none` style to the element to hide it initially.

```
<div data-show="$foo" style="display: none"></div>
```

### `data-text`[#](https://data-star.dev/reference/attribute_plugins#data-text)

Binds the text content of an element to an expression.

```
<div data-text="$foo"></div>
```

Backend Attributes[#](https://data-star.dev/reference/attribute_plugins#backend-attributes-1)
---------------------------------------------------------------------------------------------

Add integrations with [backend plugin actions](https://data-star.dev/reference/action_plugins#backend-plugins).

### `data-indicator`[#](https://data-star.dev/reference/attribute_plugins#data-indicator)

Creates a signal and sets its value to `true` while an SSE request request is in flight, otherwise `false`. The signal can be used to show a loading indicator.

```
<button data-on-click="@get('/endpoint')" data-indicator-fetching></button>
```

This can be useful for show a loading spinner, disabling a button, etc.

```
<button data-on-click="@get('/endpoint')" data-indicator-fetching data-attr-disabled="$fetching"></button>
<div data-show="$fetching">Loading...</div>
```

The signal name can be specified in the key (as above), or in the value (as below). This can be useful depending on the templating language you are using.

```
<button data-indicator="fetching"></button>
```

#### Modifiers[#](https://data-star.dev/reference/attribute_plugins#modifiers-7)

Modifiers allow you to modify behavior when defining indicator signals.

*   `__case` - Converts the casing of the signal name.
*   `.camel` - Camel case: `mySignal` (default)
*   `.kebab` - Kebab case: `my-signal`
*   `.snake` - Snake case: `my_signal`
*   `.pascal` - Pascal case: `MySignal`

Browser Attributes[#](https://data-star.dev/reference/attribute_plugins#browser-attributes-1)
---------------------------------------------------------------------------------------------

### `data-custom-validity`[#](https://data-star.dev/reference/attribute_plugins#data-custom-validity)

Allows you to add custom validity to an element using an expression. The expression must evaluate to a string that will be set as the custom validity message. If the string is empty, the input is considered valid. If the string is non-empty, the input is considered invalid and the string is used as the reported message.

```
<form>
  <input data-bind-foo name="foo" />
  <input data-bind-bar name="bar" data-custom-validity="$foo === $bar ? '' : 'Field values must be the same.'" />
  <button>Submit form</button>
</form>
```

### `data-on-intersect`[#](https://data-star.dev/reference/attribute_plugins#data-on-intersect)

Runs an expression when the element intersects with the viewport.

```
<div data-on-intersect="$intersected = true"></div>
```

#### Modifiers[#](https://data-star.dev/reference/attribute_plugins#modifiers-8)

Modifiers allow you to modify the element intersection behavior and the timing of the event listener.

*   `__once` - Only triggers the event once.
*   `__half` - Triggers when half of the element is visible.
*   `__full` - Triggers when the full element is visible.
*   `__debounce` - Debounce the event listener.
    *   `.500ms` - Debounce for 500 milliseconds.
    *   `.1s` - Debounce for 1 second.
    *   `.leading` - Debounce with leading edge.
    *   `.notrail` - Debounce without trailing edge.

*   `__throttle` - Throttle the event listener.
    *   `.500ms` - Throttle for 500 milliseconds.
    *   `.1s` - Throttle for 1 second.
    *   `.noleading` - Throttle without leading edge.
    *   `.trail` - Throttle with trailing edge.

*   `__viewtransition` - Wraps the expression in `document.startViewTransition()` when the View Transition API is available.

```
<div data-on-intersect__once__full="$fullyIntersected = true"></div>
```

### `data-on-interval`[#](https://data-star.dev/reference/attribute_plugins#data-on-interval)

Runs an expression at a regular interval. The interval duration defaults to 1 second and can be modified using the `__duration` modifier.

```
<div data-on-interval="$count++"></div>
```

#### Modifiers[#](https://data-star.dev/reference/attribute_plugins#modifiers-9)

Modifiers allow you to modify the interval duration.

*   `__duration` - Sets the interval duration.
    *   `.500ms` - Interval duration of 500 milliseconds.
    *   `.1s` - Interval duration of 1 second (default).
    *   `.leading` - Execute the first interval immediately.

*   `__viewtransition` - Wraps the expression in `document.startViewTransition()` when the View Transition API is available.

```
<div data-on-interval__duration.500ms="$count++"></div>
```

### `data-on-load`[#](https://data-star.dev/reference/attribute_plugins#data-on-load)

Runs an expression when the element is loaded into the DOM.

```
<div data-on-load="$count = 1"></div>
```

#### Modifiers[#](https://data-star.dev/reference/attribute_plugins#modifiers-10)

Modifiers allow you to add a delay to the event listener.

*   `__delay` - Delay the event listener.
    *   `.500ms` - Delay for 500 milliseconds.
    *   `.1s` - Delay for 1 second.

*   `__viewtransition` - Wraps the expression in `document.startViewTransition()` when the View Transition API is available.

```
<div data-on-load__delay.500ms="$count = 1"></div>
```

### `data-on-raf`[#](https://data-star.dev/reference/attribute_plugins#data-on-raf)

Runs an expression on every [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame) event.

```
<div data-on-raf="$count++"></div>
```

#### Modifiers[#](https://data-star.dev/reference/attribute_plugins#modifiers-11)

Modifiers allow you to modify the timing of the event listener.

*   `__debounce` - Debounce the event listener.
    *   `.500ms` - Debounce for 500 milliseconds.
    *   `.1s` - Debounce for 1 second.
    *   `.leading` - Debounce with leading edge.
    *   `.notrail` - Debounce without trailing edge.

*   `__throttle` - Throttle the event listener.
    *   `.500ms` - Throttle for 500 milliseconds.
    *   `.1s` - Throttle for 1 second.
    *   `.noleading` - Throttle without leading edge.
    *   `.trail` - Throttle with trailing edge.

*   `__viewtransition` - Wraps the expression in `document.startViewTransition()` when the View Transition API is available.

```
<div data-on-raf__debounce.10ms="$count++"></div>
```

### `data-on-signal-change`[#](https://data-star.dev/reference/attribute_plugins#data-on-signal-change)

Runs an expression whenever a signal changes.

```
<div data-on-signal-change="$count++"></div>
```

A key can be provided to only trigger the event when a specific signal changes.

```
<div data-on-signal-change-foo="$fooCount++"></div>
```

You can use `*` to match a single path segment and `**` to match multiple path segments.

```
<!-- Listen for changes to `$foo.bar.baz` -->
<div data-signals-foo.bar.baz="1"
     data-on-signal-change-foo.*.baz="$fooCount++"
     data-on-signal-change-foo.**="$fooCount++"
></div>
```

#### Modifiers[#](https://data-star.dev/reference/attribute_plugins#modifiers-12)

Modifiers allow you to modify the timing of the event listener.

*   `__debounce` - Debounce the event listener.
    *   `.500ms` - Debounce for 500 milliseconds.
    *   `.1s` - Debounce for 1 second.
    *   `.leading` - Debounce with leading edge.
    *   `.notrail` - Debounce without trailing edge.

*   `__throttle` - Throttle the event listener.
    *   `.500ms` - Throttle for 500 milliseconds.
    *   `.1s` - Throttle for 1 second.
    *   `.noleading` - Throttle without leading edge.
    *   `.trail` - Throttle with trailing edge.

*   `__viewtransition` - Wraps the expression in `document.startViewTransition()` when the View Transition API is available.

```
<div data-on-signal-change__debounce.100ms="$count++"></div>
```

### `data-persist`[#](https://data-star.dev/reference/attribute_plugins#data-persist)

Persists signals in [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). This is useful for storing values between page loads.

```
<div data-persist></div>
```

If one or more space-separated values are provided as a string, only those signals are persisted.

```
<div data-persist="foo bar"></div>
```

You can use `*` to match a single path segment and `**` to match multiple path segments.

```
<!-- Persists `$foo.bar.baz` -->
<div data-signals-foo.bar.baz="1"
     data-persist="foo.*.baz"
></div>

<!-- Persists `$foo.bar.baz` -->
<div data-signals-foo.bar.baz="1"
     data-persist="foo.**"
></div>
```

#### Modifiers[#](https://data-star.dev/reference/attribute_plugins#modifiers-13)

Modifiers allow you to modify the storage target.

*   `__session` - Persists signals in [session storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage).

```
<div data-persist__session="foo bar"></div>
```

### `data-replace-url`[#](https://data-star.dev/reference/attribute_plugins#data-replace-url)

Replaces the URL in the browser without reloading the page. The value can be a relative or absolute URL, and is an evaluated expression.

```
<div data-replace-url="`/page${page}`"></div>
```

### `data-scroll-into-view`[#](https://data-star.dev/reference/attribute_plugins#data-scroll-into-view)

Scrolls the element into view. Useful when updating the DOM from the backend, and you want to scroll to the new content.

```
<div data-scroll-into-view></div>
```

#### Modifiers[#](https://data-star.dev/reference/attribute_plugins#modifiers-14)

Modifiers allow you to modify scrolling behavior.

*   `__smooth` - Scrolling is animate smoothly.
*   `__instant` - Scrolling is instant.
*   `__auto` - Scrolling is determined by the computed `scroll-behavior` CSS property.
*   `__hstart` - Scrolls to the left of the element.
*   `__hcenter` - Scrolls to the horizontal center of the element.
*   `__hend` - Scrolls to the right of the element.
*   `__hnearest` - Scrolls to the nearest horizontal edge of the element.
*   `__vstart` - Scrolls to the top of the element.
*   `__vcenter` - Scrolls to the vertical center of the element.
*   `__vend` - Scrolls to the bottom of the element.
*   `__vnearest` - Scrolls to the nearest vertical edge of the element.
*   `__focus` - Focuses the element after scrolling.

```
<div data-scroll-into-view__smooth></div>
```

### `data-view-transition`[#](https://data-star.dev/reference/attribute_plugins#data-view-transition)

Sets the `view-transition-name` style attribute explicitly.

```
<div data-view-transition="$foo"></div>
```

Page level transitions are automatically handled by an injected meta tag. Inter-page elements are automatically transitioned if the [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API) is available in the browser and `useViewTransitions` is `true`.

Aliasing Data Attributes[#](https://data-star.dev/reference/attribute_plugins#aliasing-data-attributes)
-------------------------------------------------------------------------------------------------------

It is possible to alias `data-*` attributes to a custom alias (`data-foo-*`, for example) using the [bundler](https://data-star.dev/bundler). A custom alias should _only_ be used if you have a conflict with a legacy library and [`data-star-ignore`](https://data-star.dev/reference/attribute_plugins#data-star-ignore) cannot be used.

We maintain a `data-star-*` aliased version that can be included as follows.

```
<script type="module"
  src="https://cdn.jsdelivr.net/gh/starfederation/datastar@v1.0.0-beta.11/bundles/datastar-aliased.js"></script>
```

Title: Action Plugins

URL Source: https://data-star.dev/reference/action_plugins

Markdown Content:
Datastar provides the following actions, that can be used in Datastar expressions.

### Backend Actions[#](https://data-star.dev/reference/action_plugins#backend-actions)

*   [`@get()`](https://data-star.dev/reference/action_plugins#get)
*   [`@post()`](https://data-star.dev/reference/action_plugins#post)
*   [`@put()`](https://data-star.dev/reference/action_plugins#put)
*   [`@patch()`](https://data-star.dev/reference/action_plugins#patch)
*   [`@delete()`](https://data-star.dev/reference/action_plugins#delete)

### Browser Actions[#](https://data-star.dev/reference/action_plugins#browser-actions)

*   [`@clipboard()`](https://data-star.dev/reference/action_plugins#clipboard)

### Utility Actions[#](https://data-star.dev/reference/action_plugins#utility-actions)

*   [`@setAll()`](https://data-star.dev/reference/action_plugins#setall)
*   [`@toggleAll()`](https://data-star.dev/reference/action_plugins#toggleall)
*   [`@fit()`](https://data-star.dev/reference/action_plugins#fit)

Backend Actions[#](https://data-star.dev/reference/action_plugins#backend-actions-1)
------------------------------------------------------------------------------------

Allow for the integration of any backend service that supports SSE.

### `@get()`[#](https://data-star.dev/reference/action_plugins#get)

Arguments: `@get(url: string, options={})`

Sends a `GET` request to the backend using `fetch`, and merges the response with the current DOM and signals. The URL can be any valid URL and the response must contain zero or more [Datastar SSE events](https://data-star.dev/reference/sse_events).

```
<button data-on-click="@get('/endpoint')"></button>
```

By default, all requests are sent with a `{datastar: *}` object containing the current signals (except for local signals whose keys begin with an underscore). When using a `get` request, the signals are sent as a query parameter, otherwise they are send as a JSON body.

It is possible to send form encoded requests by setting the `contentType` option to `form`. This sends GET requests using `application/x-www-form-urlencoded` encoding and non-GET requests using `multipart/form-data` encoding. See the [form data example](https://data-star.dev/examples/form_data).

Note that when a page is hidden (in a background tab, for example), the default behavior is for the SSE connection to be closed, and reopened when the page becomes visible again. To keep the connection open when the page is hidden, set the [`openWhenHidden`](https://data-star.dev/reference/action_plugins#options) option to `true`.

### `@post()`[#](https://data-star.dev/reference/action_plugins#post)

Arguments: `@post(url: string, options={})`

Works the same as `@get()` but sends a `POST` request to the backend.

```
<button data-on-click="@post('/endpoint')"></button>
```

### `@put()`[#](https://data-star.dev/reference/action_plugins#put)

Arguments: `@put(url: string, options={})`

Works the same as `@get()` but sends a `PUT` request to the backend.

```
<button data-on-click="@put('/endpoint')"></button>
```

### `@patch()`[#](https://data-star.dev/reference/action_plugins#patch)

Arguments: `@patch(url: string, options={})`

Works the same as `@get()` but sends a `PATCH` request to the backend.

```
<button data-on-click="@patch('/endpoint')"></button>
```

### `@delete()`[#](https://data-star.dev/reference/action_plugins#delete)

Arguments: `@delete(url: string, options={})`

Works the same as `@get()` but sends a `DELETE` request to the backend.

```
<button data-on-click="@delete('/endpoint')"></button>
```

### Options[#](https://data-star.dev/reference/action_plugins#options)

All of the actions above take a second argument of options.

*   `contentType` - The type of content to send. A value of `json` sends all signals in a JSON request. A value of `form` tells the action to look for the closest form to the element on which it is placed (unless a `selector` option is provided), perform validation on the form elements, and send them to the backend using a form request (no signals are sent). Defaults to `json`.
*   `includeLocal` - Whether to include local signals (those beggining with an underscore) in the request. Defaults to `false`.
*   `selector` - Optionally specifies a form to send when the `contentType` option is set to `form`. If the value is `null`, the closest form is used. Defaults to `null`.
*   `headers` - An object containing headers to send with the request.
*   `openWhenHidden` - Whether to keep the connection open when the page is hidden. Useful for dashboards but can cause a drain on battery life and other resources when enabled. Defaults to `false`.
*   `retryInterval` - The retry interval in milliseconds. Defaults to `1000` (1 second).
*   `retryScaler` - A numeric multiplier applied to scale retry wait times. Defaults to `2`.
*   `retryMaxWaitMs` - The maximum allowable wait time in milliseconds between retries. Defaults to `30000` (30 seconds).
*   `retryMaxCount` - The maximum number of retry attempts. Defaults to `10`.
*   `abort` - An [AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) object that can be used to cancel the request.

```
<div data-on-click="@get('/endpoint', {
  includeLocal: true,
  headers: {
    'X-Csrf-Token': 'JImikTbsoCYQ9oGOcvugov0Awc5LbqFsZW6ObRCxuqFHDdPbuFyc4ksPVVa9+EB4Ag+VU6rpc680edNFswIRwg==',
  },
  openWhenHidden: true,
})"></div>
```

### Events[#](https://data-star.dev/reference/action_plugins#events)

All of the actions above trigger `datastar-sse` events during the SSE request lifecycle. The event type determines the stage of the request.

*   `started` - Triggered when the SSE request is started.
*   `finished` - Triggered when the SSE request is finished.
*   `error` - Triggered when the SSE request encounters an error.
*   `retrying` - Triggered when the SSE request is retrying.
*   `retries-failed` - Triggered when the SSE request fails after retrying.

```
<div data-on-datastar-sse="evt.detail.type == 'error' && console.log('SSE error encountered')"></div>
```

Browser Actions[#](https://data-star.dev/reference/action_plugins#browser-actions-1)
------------------------------------------------------------------------------------

Actions for performing browser operations.

### `@clipboard()`[#](https://data-star.dev/reference/action_plugins#clipboard)

Arguments: `@clipboard(expression: string)`

Copies the provided evaluated expression to the clipboard.

```
<div data-on-click="@clipboard('Hello, world!')"></div>
```

Utility Actions[#](https://data-star.dev/reference/action_plugins#utility-actions-1)
------------------------------------------------------------------------------------

### `@setAll()`[#](https://data-star.dev/reference/action_plugins#setall)

Arguments: `@setAll(paths: string, value: any)`

Sets the value of all matching signals to the expression provided in the second argument. The first argument accepts one or more space-separated signal paths. You can use `*` to match a single path segment and `**` to match multiple path segments.

```
<!-- Sets the value of `$foo` -->
<div data-signals-foo="false">
  <button data-on-click="@setAll('foo', $bar)"></button>
</div>

<!-- Sets the value of `$foo.bar.baz` -->
<div data-signals-foo.bar.baz="false">
  <button data-on-click="@setAll('foo.*.baz', true)"></button>
</div>

<!-- Sets the value of `$foo.bar.baz` -->
<div data-signals-foo.bar.baz="false">
  <button data-on-click="@setAll('foo.**', true)"></button>
</div>
```

### `@toggleAll()`[#](https://data-star.dev/reference/action_plugins#toggleall)

Arguments: `@toggleAll(paths: string)`

Toggles the value of all matching signals. The first argument accepts one or more space-separated signal paths. You can use `*` to match a single path segment and `**` to match multiple path segments.

```
<!-- Toggles the value of `$foo` -->
<div data-signals-foo="false">
  <button data-on-change="@toggleAll('foo')"></button>
</div>

<!-- Toggles the value of `$foo.bar.baz` -->
<div data-signals-foo.bar.baz="false">
  <button data-on-click="@toggleAll('foo.*.baz')"></button>
</div>

<!-- Toggles the value of `$foo.bar.baz` -->
<div data-signals-foo.bar.baz="false">
  <button data-on-click="@toggleAll('foo.**')"></button>
</div>
```

### `@fit()`[#](https://data-star.dev/reference/action_plugins#fit)

Arguments: `@fit(v: number, oldMin: number, oldMax: number, newMin: number, newMax: number, shouldClamp=false, shouldRound=false)`

Make a value linear interpolate from an original range to new one.

Title: SSE Events

URL Source: https://data-star.dev/reference/sse_events

Markdown Content:
Responses to [backend plugin actions](https://data-star.dev/reference/action_plugins#backend-plugins) must contain zero or more Datastar [SSE](https://en.wikipedia.org/wiki/Server-sent_events) events.

The backend [SDKs](https://data-star.dev/reference/sdks) can handle the formatting of SSE events for you.

Event Types[#](https://data-star.dev/reference/sse_events#event-types)
----------------------------------------------------------------------

### `datastar-merge-fragments`[#](https://data-star.dev/reference/sse_events#datastar-merge-fragments)

Merges one or more fragments into the DOM. By default, Datastar merges fragments using [Idiomorph](https://github.com/bigskysoftware/idiomorph), which matches top level elements based on their ID.

```
event: datastar-merge-fragments
data: fragments <div id="foo">Hello, world!</div>
```

Additional `data` lines can be added to the response to override the default behavior.

| Key | Description |
| --- | --- |
| `data: selector #foo` | Selects the target element of the `merge` process using a CSS selector. |
| `data: mergeMode morph` | Merges the fragment using [Idiomorph](https://github.com/bigskysoftware/idiomorph). This is the default merge strategy. |
| `data: mergeMode inner` | Replaces the target’s innerHTML with the fragment. |
| `data: mergeMode outer` | Replaces the target’s outerHTML with the fragment. |
| `data: mergeMode prepend` | Prepends the fragment to the target’s children. |
| `data: mergeMode append` | Appends the fragment to the target’s children. |
| `data: mergeMode before` | Inserts the fragment before the target as a sibling. |
| `data: mergeMode after` | Inserts the fragment after the target as a sibling. |
| `data: mergeMode upsertAttributes` | Merges attributes from the fragment into the target – useful for updating a signals. |
| `data: useViewTransition true` | Whether to use view transitions when merging into the DOM. Defaults to `false`. |
| `data: fragments` | The HTML fragments to merge into the DOM. |

Sample output showing all options:

```
event: datastar-merge-fragments
data: selector #foo
data: mergeMode append
data: useViewTransition true
data: fragments <div>
data: fragments Hello, world!
data: fragments </div>
```

### `datastar-merge-signals`[#](https://data-star.dev/reference/sse_events#datastar-merge-signals)

Updates the signals with new values. The `onlyIfMissing` line determines whether to update the signals with new values only if the key does not exist. The `signals` line should be a valid `data-signals` attribute. This will get merged into the signals.

Sample output showing all options:

```
event: datastar-merge-signals
data: onlyIfMissing false
data: signals {foo: 1}
```

### `datastar-remove-fragments`[#](https://data-star.dev/reference/sse_events#datastar-remove-fragments)

Removes one or more HTML fragments that match the provided selector from the DOM.

Sample output:

```
event: datastar-remove-fragments
data: selector #foo
```

### `datastar-remove-signals`[#](https://data-star.dev/reference/sse_events#datastar-remove-signals)

Removes signals that match one or more provided paths.

Sample output:

```
event: datastar-remove-signals
data: paths foo.bar
data: paths baz
```

### `datastar-execute-script`[#](https://data-star.dev/reference/sse_events#datastar-execute-script)

Executes JavaScript in the browser. The `autoRemove` line determines whether to remove the script after execution. Each `attributes` line adds an attribute (in the format `name value`) to the `script` element. Each `script` line contains JavaScript to be executed by the browser.

Sample output showing all options:

```
event: datastar-execute-script
data: autoRemove true
data: attributes type module
data: attributes defer true
data: script console.log('Hello, world!')
data: script console.log('A second greeting')
```

Title: Security

URL Source: https://data-star.dev/reference/security

Markdown Content:
[Datastar expressions](https://data-star.dev/guide/datastar_expressions) are strings that are evaluated in a sandboxed context, in which `ctx` represents the Datastar context. This means that JavaScript can be used in Datastar expressions.

Escape User Input[#](https://data-star.dev/reference/security#escape-user-input)
--------------------------------------------------------------------------------

The golden rule of security is to never trust user input. This is especially true when using Datastar expressions, which can execute arbitrary JavaScript. When using Datastar expressions, you should always escape user input. This is to prevent, among other issues, Cross Site Scripting (XSS) attacks.

Avoid Sensitive Data[#](https://data-star.dev/reference/security#avoid-sensitive-data)
--------------------------------------------------------------------------------------

Keep in mind that signal values are visible in the source code in plain text, and can be modified by the user before being sent in requests. For that reason, you should avoid leaking sensitive data in signals and always implement backend validation.

Ignore Unsafe Input[#](https://data-star.dev/reference/security#ignore-unsafe-input)
------------------------------------------------------------------------------------

If, for some reason, you cannot escape unsafe user input, you should ignore it using the [`data-star-ignore`](https://data-star.dev/reference/attribute_plugins#data-star-ignore) attribute. This tells Datastar to ignore an element and its descendants when processing DOM nodes.

Content Security Policy[#](https://data-star.dev/reference/security#content-security-policy)
--------------------------------------------------------------------------------------------

When using a [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) (CSP), `unsafe-eval` must be allowed for scripts, since Datastar evaluates expressions using an [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) (Immediately Invoked Function Expression).

```
<meta http-equiv="Content-Security-Policy"
      content="script-src 'self' 'unsafe-eval';"
>
```

Title: How to bind keydown events to specific keys

URL Source: https://data-star.dev/how_tos/how_to_bind_keydown_events_to_specific_keys

Markdown Content:
Intro[#](https://data-star.dev/how_tos/how_to_bind_keydown_events_to_specific_keys#intro)
-----------------------------------------------------------------------------------------

The [`data-on`](https://data-star.dev/reference/attribute_plugins#data-on) attribute allows us to attach an event listener to any element, and execute an expression whenever the event is triggered. We can use this to listen for keydown events and execute an expression only when a specific key or key combination is pressed.

Goal[#](https://data-star.dev/how_tos/how_to_bind_keydown_events_to_specific_keys#goal)
---------------------------------------------------------------------------------------

Our goal is to show an alert whenever the user presses the `Enter` key, or a combination of the `Ctrl` and `L` keys.

Demo[#](https://data-star.dev/how_tos/how_to_bind_keydown_events_to_specific_keys#demo)
---------------------------------------------------------------------------------------

Press Enter or Ctrl + L

Steps[#](https://data-star.dev/how_tos/how_to_bind_keydown_events_to_specific_keys#steps)
-----------------------------------------------------------------------------------------

The `data-on-keydown` attribute will listen for keydown events only on the element on which it is placed, by default. We can listen for events on the `window` element to capture keydown events globally, by adding the `__window` modifier.

```
<div data-on-keydown__window="alert('Key pressed')"></div>
```

This will show an alert whenever the user presses _any_ key.

To limit the alert to only the `Enter` key, we can use the `evt.key` property to check the key that was pressed. The `evt` variable represents the event object and is always available in the expression.

```
<div data-on-keydown__window="evt.key === 'Enter' && alert('Key pressed')"></div>
```

We can add the `Ctrl` and `L` key combination by checking the `evt.ctrlKey` and `evt.key` properties.

```
<div data-on-keydown__window="evt.ctrlKey && evt.key === 'l' && alert('Key pressed')"></div>
```

Finally, we can combine the two expressions to show an alert whenever the user presses the `Enter` key, or the `Ctrl` and `L` keys.

```
<div data-on-keydown__window="(evt.key === 'Enter' || (evt.ctrlKey && evt.key === 'l')) && alert('Key pressed')"></div>
```

Sometimes, we may want to prevent the default behavior of the keydown event, such as submitting a form when the `Enter` key is pressed. We can do this by calling `evt.preventDefault()`.

```
<div data-on-keydown__window="evt.key === 'Enter' && (evt.preventDefault(), alert('Key pressed'))"></div>
```

Conclusion[#](https://data-star.dev/how_tos/how_to_bind_keydown_events_to_specific_keys#conclusion)
---------------------------------------------------------------------------------------------------

The `evt` variable is always available in `data-on` expressions. In the case of the [`keydown`](https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event) event, which is a [`KeyboardEvent`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent), we can perform actions conditionally, based on any of the event’s properties.

Title: How to load more list items

URL Source: https://data-star.dev/how_tos/how_to_load_more_list_items

Markdown Content:
Intro[#](https://data-star.dev/how_tos/how_to_load_more_list_items#intro)
-------------------------------------------------------------------------

Loading more list items into the DOM from the backend is a common alternative to pagination. What makes it different is that we need to append the new items to the existing list, rather than replace them.

Goal[#](https://data-star.dev/how_tos/how_to_load_more_list_items#goal)
-----------------------------------------------------------------------

Our goal is to incrementally append list items into a specific part of the DOM, each time a button is clicked. Once five items are visible, the button should be removed.

Demo[#](https://data-star.dev/how_tos/how_to_load_more_list_items#demo)
-----------------------------------------------------------------------

Item 1

Steps[#](https://data-star.dev/how_tos/how_to_load_more_list_items#steps)
-------------------------------------------------------------------------

We’ll give the list item container and the button unique IDs, so that we can target them individually.

We’ll use a `data-signals-*` attribute to set the initial `offset` to `1`, and a `data-on-click` button that will send a `GET` request to the backend.

```
<div id="list">
    <div>Item 1</div>
</div>
<button id="load-more"
        data-signals-offset="1"
        data-on-click="@get('/how_tos/load_more/data')">
    Click to load another item
</button>
```

The backend will receive the `offset` signal and, if not above the max number of allowed items, will return the next item to be appended to the list.

We’ll set up our backend to send a [`datastar-merge-fragments`](https://data-star.dev/reference/sse_events#datastar-merge-fragments) event with the `selector` option set to `#list` and the `mergeMode` option set to `append`. This tells Datastar to _append_ the fragments _into_ the `#list` container (rather than the default behaviour of replacing it).

```
event: datastar-merge-fragments
data: selector #list
data: mergeMode append
data: fragments <div>Item 2</div>
```

In addition, we’ll send a [`datastar-merge-signals`](https://data-star.dev/reference/sse_events#datastar-merge-signals) event to update the `offset`.

```
event: datastar-merge-signals
data: signals {offset: 2}
```

In the case when all five list items have been shown, we’ll remove the button from the DOM entirely.

```
event: datastar-remove-fragments
data: selector #load-more
```

Here’s how it might look using the SDKs.

```
(require
  '[starfederation.datastar.clojure.api :as d*]
  '[starfederation.datastar.clojure.adapter.http-kit :refer [->sse-response on-open]]
  '[some.hiccup.library :refer [html]]
  '[some.json.library :refer [read-json-str write-json-str]]))

(def max-offset 5)

(defn handler [ring-request]
  (->sse-response ring-request
    {on-open
     (fn [sse]
       (let [d*-signals (-> ring-request d*/get-signals read-json-str)
             offset (get d*-signals "offset")
             limit 1
             new-offset (+ offset limit)]

         (d*/merge-fragment! sse
                             (html [:div "Item " new-offset])
                             {d*/selector   "#list"
                              d*/merge-mode d*/mm-append})

         (if (< new-offset max-offset)
           (d*/merge-signals! sse (write-json-str {"offset" new-offset}))
           (d*/remove-fragment! sse "#load-more"))

         (d*/close-sse! sse)))}))
```

```
using System.Text.Json;
using StarFederation.Datastar;
using StarFederation.Datastar.DependencyInjection;

public class Program
{
    public record OffsetSignals(int offset);

    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        builder.Services.AddDatastar();
        var app = builder.Build();

        app.MapGet("/more", async (IDatastarServerSentEventService sse, IDatastarSignalsReaderService signalsReader) =>
        {
            var max = 5;
            var limit = 1;
            var signals = await signalsReader.ReadSignalsAsync<OffsetSignals>();
            var offset = signals.offset;
            if (offset < max)
            {
                var newOffset = offset + limit;
                await sse.MergeFragmentsAsync($"<div>Item {newOffset}</div>", new()
                {
                    Selector = "#list",
                    MergeMode = FragmentMergeMode.Append,
                });
                if (newOffset < max)
                    await sse.MergeSignalsAsync(JsonSerializer.Serialize(new OffsetSignals(newOffset)));
                else
                    await sse.RemoveFragmentsAsync("#load-more");
            }
        });

        app.Run();
    }
}
```

```
import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	datastar "github.com/starfederation/datastar/sdk/go"
)

type OffsetSignals struct {
	Offset int `json:"offset"`
}

signals := &OffsetSignals{}
if err := datastar.ReadSignals(r, signals); err != nil {
    http.Error(w, err.Error(), http.StatusBadRequest)
}

max := 5
limit := 1
offset := signals.Offset

sse := datastar.NewSSE(w, r)

if offset < max {
    newOffset := offset + limit
    sse.MergeFragments(fmt.Sprintf(`<div>Item %d</div>`, newOffset),
        datastar.WithSelectorID("list"),
        datastar.WithMergeMode(datastar.FragmentMergeModeAppend),
    )
    if newOffset < max {
        sse.MergeSignals([]byte(fmt.Sprintf(`{offset: %d}`, newOffset)))
    } else {
        sse.RemoveFragments(`#load-more`)
    }
}
```

```
use starfederation\datastar\enums\FragmentMergeMode;
use starfederation\datastar\ServerSentEventGenerator;

$signals = ServerSentEventGenerator::readSignals();

$max = 5;
$limit = 1;
$offset = $signals['offset'] ?? 1;

$sse = new ServerSentEventGenerator();

if ($offset < $max) {
    $newOffset = $offset + $limit;
    $sse->mergeFragments(`<div>Item $newOffset</div>`, [
        'selector' => '#list',
        'mergeMode' => FragmentMergeMode::Append,
    ]);
    if (newOffset < $max) {
        $sse->mergeSignals(['offset' => $newOffset]);
    } else {
        $sse->removeFragments('#load-more');
    }
}
```

Conclusion[#](https://data-star.dev/how_tos/how_to_load_more_list_items#conclusion)
-----------------------------------------------------------------------------------

While using the default merge mode of `morph` is generally recommended, appending to a list is a good example of when to use an alternative merge mode.

Title: How to poll the backend at regular intervals

URL Source: https://data-star.dev/how_tos/how_to_poll_the_backend_at_regular_intervals

Markdown Content:
Intro[#](https://data-star.dev/how_tos/how_to_poll_the_backend_at_regular_intervals#intro)
------------------------------------------------------------------------------------------

Polling is a pull-based mechanism for fetching data from the server at regular intervals. It is useful when you want to refresh the UI on the frontend, based on real-time data from the backend.

This in contrast to a push-based mechanism, in which a long-lived SSE connection is kept open between the client and the server, and the server pushes updates to the client whenever necessary. Push-based mechanisms are more efficient than polling, and can be achieved using Datastar, but may be less desirable for some backends.

In PHP, for example, keeping long-lived SSE connections is fine for a dashboard in which users are authenticated, as the number of connections are limited. For a public-facing website, however, it is not recommended to open many long-lived connections, due to the architecture of most PHP servers.

Goal[#](https://data-star.dev/how_tos/how_to_poll_the_backend_at_regular_intervals#goal)
----------------------------------------------------------------------------------------

Our goal is to poll the backend at regular intervals (starting at 5 second intervals) and update the UI accordingly. The backend will determine changes to the DOM and be able to control the rate at which the frontend polls based on some criteria. For this example, we will simply output the server time, increasing the polling frequency to 1 second during the last 10 seconds of every minute. The criteria could of course be anything such as the number of times previously polled, the user’s role, load on the server, etc.

Demo[#](https://data-star.dev/how_tos/how_to_poll_the_backend_at_regular_intervals#demo)
----------------------------------------------------------------------------------------

Steps[#](https://data-star.dev/how_tos/how_to_poll_the_backend_at_regular_intervals#steps)
------------------------------------------------------------------------------------------

The `data-on-interval` attribute allows us to execute an expression at a regular interval. We’ll use it to send a `GET` request to the backend, and use the `__duration` modifier to set the interval duration.

```
<div id="time" data-on-interval__duration.5s="@get('/endpoint')"></div>
```

In addition to the interval, we could also execute the expression immediately by adding `.leading` to the modifier.

```
<div id="time" data-on-interval__duration.5s.leading="@get('/endpoint')"></div>
```

Most of the time, however, we’d just render the current time on page load using a backend templating language.

```
<div id="time" data-on-interval__duration.5s="@get('/endpoint')">
     {{ now }}
</div>
```

Now our backend can respond to each request with a [`datastar-merge-fragments`](https://data-star.dev/reference/sse_events#datastar-merge-fragments) event with an updated version of the element.

```
event: datastar-merge-fragments
data: fragments <div id="time" data-on-interval__duration.5s="@get('/endpoint')">
     data: fragments {{ now }}
     data: fragments </div>
```

Be careful not to add `.leading` to the modifier in the response, as it will cause the frontend to immediately send another request.

Here’s how it might look using the SDKs.

```
(require
  '[starfederation.datastar.clojure.api :as d*]
  '[starfederation.datastar.clojure.adapter.http-kit :refer [->sse-response on-open]])
  '[some.hiccup.library :refer [html]])

(import
  'java.time.format.DateTimeFormatter
  'java.time.LocalDateTime)

(def formatter (DateTimeFormatter/ofPattern "YYYY-MM-DD HH:mm:ss"))

(defn handle [ring-request]
   (->sse-response ring-request
     {on-open
      (fn [sse]
        (d*/merge-fragment! sse
          (html [:div#time {:data-on-interval__duration.5s (d*/sse-get "/endpoint")}
                  (LocalDateTime/.format (LocalDateTime/now) formatter)])))}))

        (d*/close-sse! sse))}))
```

```
using StarFederation.Datastar.DependencyInjection;

app.MapGet("/endpoint", async (IDatastarServerSentEventService sse) =>
{
    var currentTime = DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss");
    var fragment = $"""
                    <div id="time" data-on-interval__duration.5s="@get('/endpoint')">
                        {currentTime}
                    </div>
                    """;
    await sse.MergeFragmentsAsync(fragment);
});
```

```
import (
    "time"
    datastar "github.com/starfederation/datastar/sdk/go"
)

currentTime := time.Now().Format("2006-01-02 15:04:05")

sse := datastar.NewSSE(w, r)
sse.MergeFragments(fmt.Sprintf(`
    <div id="time" data-on-interval__duration.5s="@get('/endpoint')">
        %s
    </div>
`, currentTime))
```

```
import ServerSentEventGenerator
import ServerSentEventGenerator.Server.Snap -- or whatever is appropriate
import Data.Time ( getCurrentTime )
import Data.Text ( pack )

now <- getCurrentTime
let
  txt = mconcat [
    "<div id=\"time\" data-on-interval__duration.5s=\"@get('/endpoint')\">"
    , (pack . show) now
    , "</div>" ]
send $ mergeFragments txt def def def def
```

```
use starfederation\datastar\ServerSentEventGenerator;

$currentTime = date('Y-m-d H:i:s');

$sse = new ServerSentEventGenerator();
$sse->mergeFragments(`
    <div id="time"
         data-on-interval__duration.5s="@get('/endpoint')"
    >
        $currentTime
    </div>
`);
```

```
datastar = Datastar.new(request:, response:)

current_time = Time.now.strftime('%Y-%m-%d %H:%M:%S')

datastar.merge_fragments <<~FRAGMENT
    <div id="time"
         data-on-interval__duration.5s="@get('/endpoint')"
    >
        #{current_time}
    </div>
FRAGMENT
```

```
use datastar::prelude::*;
use chrono::Local;
use async_stream::stream;

let current_time = Local::now().format("%Y-%m-%d %H:%M:%S").to_string();

Sse(stream! {
    yield MergeFragments::new(
        format!(
            "<div id='time' data-on-interval__duration.5s='@get(\"/endpoint\")'>{}</div>",
            current_time
        )
    ).into();
})
```

```
import { createServer } from "node:http";
import { ServerSentEventGenerator } from "../npm/esm/node/serverSentEventGenerator.js";

const server = createServer(async (req, res) => {

  const currentTime = new Date().toISOString();
  ServerSentEventGenerator.stream(req, res, (sse) => {
    sse.mergeFragments(`
       <div id="time"
          data-on-interval__duration.5s="@get('/endpoint')"
       >
         ${currentTime}
       </div>
    `);
  });
});
```

```
const datastar = @import("datastar").httpz;
const zdt = @import("zdt");
const std = @import("std");

var tz_chicago = try zdt.Timezone.fromTzdata("America/Chicago", res.arena);
const datetime = try zdt.Datetime.fromISO8601("2006-01-02 15:04:05");
const current_time = try a_datetime.tzLocalize(.{ .tz = &tz_chicago });

var sse = try datastar.ServerSentEventGenerator.init(res);

sse.mergeFragments(
    std.fmt.allocPrint(
        res.arena,
        "<div id='time' data-on-interval__duration.5s='@get(\"/endpoint\")'>{s}</div>",
        .{current_time},
    ),
    .{},
);
```

Our second requirement was that the polling frequency should increase to 1 second during the last 10 seconds of every minute. To make this possible, we’ll calculate and output the interval duration based on the current seconds of the minute.

```
(require
  '[starfederation.datastar.clojure.api :as d*]
  '[starfederation.datastar.clojure.adapter.http-kit :refer [->sse-response on-open]])
  '[some.hiccup.library :refer [html]])

(import
  'java.time.format.DateTimeFormatter
  'java.time.LocalDateTime)

(def date-time-formatter (DateTimeFormatter/ofPattern "YYYY-MM-DD HH:mm:ss"))
(def seconds-formatter (DateTimeFormatter/ofPattern "ss"))

(defn handle [ring-request]
  (->sse-response ring-request
    {on-open
     (fn [sse]
       (let [now (LocalDateTime/now)
             current-time (LocalDateTime/.format now date-time-formatter)
             seconds (LocalDateTime/.format now seconds-formatter)
             duration (if (neg? (compare seconds "50"))
                         "5"
                         "1")]
         (d*/merge-fragment! sse
           (html [:div#time {(str "data-on-interval__duration." duration "s")
                             (d*/sse-get "/endpoint")}
                   current-time]))))}))

         (d*/close-sse! sse))}))
```

```
using StarFederation.Datastar.DependencyInjection;

app.MapGet("/endpoint", async (IDatastarServerSentEventService sse) =>
{
    var currentTime = DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss");
    var currentSeconds = DateTime.Now.Second;
    var duration = currentSeconds < 50 ? 5 : 1;
    var fragment = $"""
                    <div id="time" data-on-interval__duration.{duration}s="@get('/endpoint')">
                        {currentTime}
                    </div>
                    """;
    await sse.MergeFragmentsAsync(fragment);
});
```

```
import (
    "time"
    datastar "github.com/starfederation/datastar/sdk/go"
)

currentTime := time.Now().Format("2006-01-02 15:04:05")
currentSeconds := time.Now().Format("05")
duration := 1
if currentSeconds < "50" {
    duration = 5
}

sse := datastar.NewSSE(w, r)
sse.MergeFragments(fmt.Sprintf(`
    <div id="time" data-on-interval__duration.%ds="@get('/endpoint')">
        %s
    </div>
`, duration, currentTime))
```

```
{-# LANGUAGE QuasiQuotes #-}
import ServerSentEventGenerator
import ServerSentEventGenerator.Server.Snap -- or whatever is appropriate
import Data.Time ( getCurrentTime )
import Data.Time.Format
import Data.Text ( pack, unpack )
import NeatInterpolation

now <- getCurrentTime
let
  formatted = pack $ formatTime defaultTimeLocale "%Y-%m-%d %H:%M:%S" now
  seconds   = formatTime defaultTimeLocale "%S" now
  duration  = pack $ if seconds < "50" then "5" else "1"
  message x y   =
    [trimming|
      <div id="time" data-on-interval__duration.${x}s="@get('/endpoint')">
        ${y}
       </div>
    |]
send $ mergeFragments (message duration formatted) def def def def
```

```
use starfederation\datastar\ServerSentEventGenerator;

$currentTime = date('Y-m-d H:i:s');
$currentSeconds = date('s');
$duration = $currentSeconds < 50 ? 5 : 1;

$sse = new ServerSentEventGenerator();
$sse->mergeFragments(`
    <div id="time"
         data-on-interval__duration.${duration}s="@get('/endpoint')"
    >
        $currentTime
    </div>
`);
```

```
datastar = Datastar.new(request:, response:)

now = Time.now
current_time = now.strftime('%Y-%m-%d %H:%M:%S')
current_seconds = now.strftime('%S').to_i
duration = current_seconds < 50 ? 5 : 1

datastar.merge_fragments <<~FRAGMENT
    <div id="time"
         data-on-interval__duration.#{duration}s="@get('/endpoint')"
    >
        #{current_time}
    </div>
FRAGMENT
```

```
use datastar::prelude::*;
use chrono::Local;
use async_stream::stream;

let current_time = Local::now().format("%Y-%m-%d %H:%M:%S").to_string();
let current_seconds = Local::now().second();
let duration = if current_seconds < 50 {
    5
} else {
    1
};

Sse(stream! {
    yield MergeFragments::new(
        format!(
            "<div id='time' data-on-interval__duration.{}s='@get(\"/endpoint\")'>{}</div>",
            duration,
            current_time,
        )
    ).into();
})
```

```
import { createServer } from "node:http";
import { ServerSentEventGenerator } from "../npm/esm/node/serverSentEventGenerator.js";

const server = createServer(async (req, res) => {
  const currentTime = new Date();
  const duration = currentTime.getSeconds > 50 ? 5 : 1;

  ServerSentEventGenerator.stream(req, res, (sse) => {
    sse.mergeFragments(`
       <div id="time"
          data-on-interval__duration.${duration}s="@get('/endpoint')"
       >
         ${currentTime.toISOString()}
       </div>
    `);
  });
});
```

```
const datastar = @import("datastar").httpz;
const zdt = @import("zdt");
const std = @import("std");

var tz_chicago = try zdt.Timezone.fromTzdata("America/Chicago", res.arena);
const datetime = try zdt.Datetime.fromISO8601("2006-01-02 15:04:05");
const current_time = try a_datetime.tzLocalize(.{ .tz = &tz_chicago });
const current_seconds = std.time.timestamp() % 60;
const duration = if (current_seconds < 50) 5 else 1;

var sse = try datastar.ServerSentEventGenerator.init(res);

sse.mergeFragments(
    std.fmt.allocPrint(
        res.arena,
        "<div id='time' data-on-interval__duration.{d}s='@get(\"/endpoint\")'>{s}</div>",
        .{ duration, current_time },
    ),
    .{},
);
```

Conclusion[#](https://data-star.dev/how_tos/how_to_poll_the_backend_at_regular_intervals#conclusion)
----------------------------------------------------------------------------------------------------

Using this approach, we not only end up with a way to poll the backend at regular intervals, but we can also control the rate at which the frontend polls based on whatever criteria our backend requires.

Title: How to redirect the page from the backend

URL Source: https://data-star.dev/how_tos/how_to_redirect_the_page_from_the_backend

Markdown Content:
Intro[#](https://data-star.dev/how_tos/how_to_redirect_the_page_from_the_backend#intro)
---------------------------------------------------------------------------------------

Redirecting to another page is a common task that can be done from the backend using the [`datastar-execute-script`](https://data-star.dev/reference/sse_events#datastar-execute-script) SSE event.

Goal[#](https://data-star.dev/how_tos/how_to_redirect_the_page_from_the_backend#goal)
-------------------------------------------------------------------------------------

Our goal is to indicate to the user that they will be redirected, wait 3 seconds, and then redirect them to `/guide`, all from the backend.

Demo[#](https://data-star.dev/how_tos/how_to_redirect_the_page_from_the_backend#demo)
-------------------------------------------------------------------------------------

Steps[#](https://data-star.dev/how_tos/how_to_redirect_the_page_from_the_backend#steps)
---------------------------------------------------------------------------------------

We’ll place a `data-on-click` attribute on a button and use the `@get` action to send a `GET` request to the backend. We’ll include an empty indicator `div` to show the user that they will be redirected.

```
<button data-on-click="@get('/endpoint')">
    Click to be redirected from the backend
</button>
<div id="indicator"></div>
```

We’ll set up our backend to first send a [`datastar-merge-fragments`](https://data-star.dev/reference/sse_events#datastar-merge-fragments) event with a populated indicator fragment, then wait 3 seconds, and finally send a [`datastar-execute-script`](https://data-star.dev/reference/sse_events#datastar-execute-script) SSE event to execute the JavaScript required to redirect the page.

```
event: datastar-execute-script
data: script window.location.href = "/guide"
```

Here’s how it might look using the SDKs.

```
(require
  '[starfederation.datastar.clojure.api :as d*]
  '[starfederation.datastar.clojure.adapter.http-kit :refer [->sse-response on-open]]
  '[some.hiccup.library :refer [html]])

(defn handle [ring-request]
  (->sse-response ring-request
    {on-open
      (fn [sse]
        (d*/merge-fragment! sse
          (html [:div#indicator "Redirecting in 3 seconds..."]))
        (Thread/sleep 3000)
        (d*/execute-script! sse "window.location = \"/guide\"")
        (d*/close-sse! sse)}))
```

```
using StarFederation.Datastar.DependencyInjection;

app.MapGet("/redirect", async (IDatastarServerSentEventService sse) =>
{
    await sse.MergeFragmentsAsync("""<div id="indicator">Redirecting in 3 seconds...</div>""");
    await Task.Delay(TimeSpan.FromSeconds(3));
    await sse.ExecuteScriptAsync("""window.location = "/guide";""");
});
```

```
import (
	"time"
    datastar "github.com/starfederation/datastar/sdk/go"
)

sse := datastar.NewSSE(w, r)
sse.MergeFragments(`
    <div id="indicator">Redirecting in 3 seconds...</div>
`)
time.Sleep(3 * time.Second)
sse.ExecuteScript(`
    window.location = "/guide"
`)
```

```
import ServerSentEventGenerator
import ServerSentEventGenerator.Server.Snap -- or whatever is appropriate

send (withDefaults mergeFragments "<div id=\"indicator\">Redirecting in 3 seconds...</div>")
threadDelay (3 * 1000 * 1000)
send (withDefaults executeScript "window.location = \"/guide\"")
```

```
use starfederation\datastar\ServerSentEventGenerator;

$sse = new ServerSentEventGenerator();
$sse->mergeFragments(`
    <div id="indicator">Redirecting in 3 seconds...</div>
`);
sleep(3);
$sse->executeScript(`
    window.location = "/guide"
`);
```

```
datastar = Datastar.new(request:, response:)

datastar.stream do |sse|
  sse.merge_fragments '<div id="indicator">Redirecting in 3 seconds...</div>'
  sleep 3
  sse.execute_script 'window.location = "/guide"'
end
```

```
use datastar::prelude::*;
use async_stream::stream;
use core::time::Duration;

Sse(stream! {
    yield MergeFragments::new("<div id='indicator'>Redirecting in 3 seconds...</div>").into();
    tokio::time::sleep(core::time::Duration::from_secs(3)).await;
    yield ExecuteScript::new("window.location = '/guide'").into();
});
```

```
import { createServer } from "node:http";
import { ServerSentEventGenerator } from "../npm/esm/node/serverSentEventGenerator.js";

function delay(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

const server = createServer(async (req, res) => {

  ServerSentEventGenerator.stream(req, res, async (sse) => {
    sse.mergeFragments(`
      <div id="indicator">Redirecting in 3 seconds...</div>
    `);

    await delay(3000);

    sse.executeScript(`
      window.location = "/guide"
    `);
  });
});
```

```
const datastar = @import("datastar").httpz;
const std = @import("std");

var sse = try datastar.ServerSentEventGenerator.init(res);

sse.mergeFragments("<div id='indicator'>Redirecting in 3 seconds...</div>", .{});
std.Thread.sleep(std.time.ns_per_s * 3);
sse.executeScript("window.location = '/guide'", .{});
```

Note that in Firefox, if a redirect happens within a `script` tag then the URL is _replaced_, rather than _pushed_, meaning that the previous URL won’t show up in the back history (or back/forward navigation).

To work around this, you can wrap the redirect in a `setTimeout` function call. See [issue #529](https://github.com/starfederation/datastar/issues/529) for reference.

```
(require
  '[starfederation.datastar.clojure.api :as d*]
  '[starfederation.datastar.clojure.adapter.http-kit :refer [->sse-response on-open]]
  '[some.hiccup.library :refer [html]])

(defn handle [ring-request]
  (->sse-response ring-request
    {on-open
      (fn [sse]
        (d*/merge-fragment! sse
          (html [:div#indicator "Redirecting in 3 seconds..."]))
        (Thread/sleep 3000)
        (d*/execute-script! sse
                            "setTimeout(() => window.location = \"/guide\"")
        (d*/close-sse! sse))}))
```

```
using StarFederation.Datastar.DependencyInjection;

app.MapGet("/redirect", async (IDatastarServerSentEventService sse) =>
{
    await sse.MergeFragmentsAsync("""<div id="indicator">Redirecting in 3 seconds...</div>""");
    await Task.Delay(TimeSpan.FromSeconds(3));
    await sse.ExecuteScriptAsync("""setTimeout(() => window.location = "/guide");""");
});
```

```
import (
	"time"
    datastar "github.com/starfederation/datastar/sdk/go"
)

sse := datastar.NewSSE(w, r)
sse.MergeFragments(`
    <div id="indicator">Redirecting in 3 seconds...</div>
`)
time.Sleep(3 * time.Second)
sse.ExecuteScript(`
    setTimeout(() => window.location = "/guide")
`)
```

```
import ServerSentEventGenerator
import ServerSentEventGenerator.Server.Snap -- or whatever is appropriate

send (withDefaults mergeFragments "<div id=\"indicator\">Redirecting in 3 seconds...</div>")
threadDelay (3 * 1000 * 1000)
send (withDefaults executeScript "window.location = \"/guide\"")
```

```
use starfederation\datastar\ServerSentEventGenerator;

$sse = new ServerSentEventGenerator();
$sse->mergeFragments(`
    <div id="indicator">Redirecting in 3 seconds...</div>
`);
sleep(3);
$sse->executeScript(`
    setTimeout(() => window.location = "/guide")
`);
```

```
datastar = Datastar.new(request:, response:)

datastar.stream do |sse|
  sse.merge_fragments '<div id="indicator">Redirecting in 3 seconds...</div>'

  sleep 3

  sse.execute_script <<~JS
    setTimeout(() => {
      window.location = '/guide'
    })
  JS
end
```

```
use datastar::prelude::*;
use async_stream::stream;
use core::time::Duration;

Sse(stream! {
    yield MergeFragments::new("<div id='indicator'>Redirecting in 3 seconds...</div>").into();
    tokio::time::sleep(core::time::Duration::from_secs(3)).await;
    yield ExecuteScript::new("setTimeout(() => window.location = '/guide')").into();
});
```

```
import { createServer } from "node:http";
import { ServerSentEventGenerator } from "../npm/esm/node/serverSentEventGenerator.js";

function delay(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

const server = createServer(async (req, res) => {

  ServerSentEventGenerator.stream(req, res, async (sse) => {
    sse.mergeFragments(`
      <div id="indicator">Redirecting in 3 seconds...</div>
    `);

    await delay(3000);

    sse.executeScript(`
      setTimeout(() => window.location = "/guide")
    `);
  });
});
```

```
const datastar = @import("datastar").httpz;
const std = @import("std");

var sse = try datastar.ServerSentEventGenerator.init(res);

sse.mergeFragments("<div id='indicator'>Redirecting in 3 seconds...</div>", .{});
std.Thread.sleep(std.time.ns_per_s * 3);
sse.executeScript("setTimeout(() => window.location = '/guide')", .{});
```

Some SDKs provide a helper method that automatically wraps the statement in a `setTimeout` function call, so you don’t have to worry about doing so (you’re welcome!).

```
(require
  '[starfederation.datastar.clojure.api :as d*]
  '[starfederation.datastar.clojure.adapter.http-kit :refer [->sse-response on-open]]
  '[some.hiccup.library :refer [html]])

(defn handler [ring-request]
  (->sse-response ring-request
    {on-open
      (fn [sse]
        (d*/merge-fragment! sse
          (html [:div#indicator "Redirecting in 3 seconds..."]))
        (Thread/sleep 3000)
        (d*/redirect! sse "/guide")
        (d*/close-sse! sse))}))
```

```
using StarFederation.Datastar.DependencyInjection;
using StarFederation.Datastar.Scripts;

app.MapGet("/redirect", async (IDatastarServerSentEventService sse) =>
{
    await sse.MergeFragmentsAsync("""<div id="indicator">Redirecting in 3 seconds...</div>""");
    await Task.Delay(TimeSpan.FromSeconds(3));
    await sse.Redirect("/guide");
});
```

```
import (
	"time"
    datastar "github.com/starfederation/datastar/sdk/go"
)

sse := datastar.NewSSE(w, r)
sse.MergeFragments(`
    <div id="indicator">Redirecting in 3 seconds...</div>
`)
time.Sleep(3 * time.Second)
sse.Redirect("/guide")
```

```
use starfederation\datastar\ServerSentEventGenerator;

$sse = new ServerSentEventGenerator();
$sse->mergeFragments(`
    <div id="indicator">Redirecting in 3 seconds...</div>
`);
sleep(3);
$sse->location('/guide');
```

```
datastar = Datastar.new(request:, response:)

datastar.stream do |sse|
  sse.merge_fragments '<div id="indicator">Redirecting in 3 seconds...</div>'

  sleep 3

  sse.redirect '/guide'
end
```

```
const datastar = @import("datastar").httpz;
const std = @import("std");

var sse = try datastar.ServerSentEventGenerator.init(res);

sse.mergeFragments("<div id='indicator'>Redirecting in 3 seconds...</div>", .{});
std.Thread.sleep(std.time.ns_per_s * 3);
sse.redirect("/guide", .{});
```

Conclusion[#](https://data-star.dev/how_tos/how_to_redirect_the_page_from_the_backend#conclusion)
-------------------------------------------------------------------------------------------------

Redirecting to another page can be done from the backend thanks to the ability to execute JavaScript on the frontend using the [`datastar-execute-script`](https://data-star.dev/reference/sse_events#datastar-execute-script) SSE event.

### Reactive Examples (Contains various attributes for reactivity)

[PLUGIN ORDER](https://data-star.dev/examples/plugin_order)
[POLLING](https://data-star.dev/examples/polling)
[IGNORE ATTRIBUTES](https://data-star.dev/examples/ignore_attributes)
[BIND KEYS](https://data-star.dev/examples/bind_keys)
[CLASSES](https://data-star.dev/examples/classes)
[SCROLL INTO VIEW](https://data-star.dev/examples/scroll_into_view)
[ON LOAD](https://data-star.dev/examples/on_load)
[MODEL BINDING](https://data-star.dev/examples/model_binding)
[DISABLE BUTTON](https://data-star.dev/examples/disable_button)
[MERGE OPTIONS](https://data-star.dev/examples/merge_options)
[REDIRECTS](https://data-star.dev/examples/redirects)
[VIEW TRANSITION API](https://data-star.dev/examples/view_transition_api)
[VIEW TRANSITION ON CLICK](https://data-star.dev/examples/view_transition_on_click)
[TITLE UPDATE BACKEND](https://data-star.dev/examples/title_update_backend)
[SIGNALS CHANGE](https://data-star.dev/examples/signals_change)
[CSRF](https://data-star.dev/examples/csrf)
[MULTILINE SIGNALS](https://data-star.dev/examples/multiline_signals)
[MULTI SELECT](https://data-star.dev/examples/multi_select)
[RAF UPDATE](https://data-star.dev/examples/raf_update)
[UPDATE SIGNALS](https://data-star.dev/examples/update_signals)
[SIGNALS IFMISSING](https://data-star.dev/examples/signals_ifmissing)
[INVALID SIGNALS](https://data-star.dev/examples/invalid_signals)
[OFFLINE SYNC](https://data-star.dev/examples/offline_sync)
[SESSION STORAGE](https://data-star.dev/examples/session_storage)
[REFS](https://data-star.dev/examples/refs)
[MULTILINE EXPRESSIONS](https://data-star.dev/examples/multiline_expressions)
[CUSTOM EVENTS](https://data-star.dev/examples/custom_events)
[TOGGLE VISIBILITY](https://data-star.dev/examples/toggle_visibility)
[CLOAK](https://data-star.dev/examples/cloak)
[IMG SRC BIND](https://data-star.dev/examples/img_src_bind)
[DBMON](https://data-star.dev/examples/dbmon)
[BAD APPLE](https://data-star.dev/examples/bad_apple)
[WEB COMPONENT](https://data-star.dev/examples/web_component)
[PERSIST](https://data-star.dev/examples/persist)
[EXECUTE SCRIPT](https://data-star.dev/examples/execute_script)
[DISPATCH CUSTOM EVENT](https://data-star.dev/examples/dispatch_custom_event)
[REPLACE URL FROM BACKEND](https://data-star.dev/examples/replace_url_from_backend)
[REPLACE URL FROM SIGNALS](https://data-star.dev/examples/replace_url_from_signals)
[PREFETCH](https://data-star.dev/examples/prefetch)
[DEBOUNCE AND THROTTLE](https://data-star.dev/examples/debounce_and_throttle)
[KEY CASING](https://data-star.dev/examples/key_casing)
