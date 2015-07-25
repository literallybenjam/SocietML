# SocietML #

Markup for sociality.

##  Markup:  ##

There are currently two markup types supported by SocietML: FB and MSG.
To create a SocietML element, simply set the `data-societml-type` attribute to either `fb` or `msg` (case-insensitive) on a normal HTML element.
This element will henceforth be referred to as the "parent element"; we recommend using `<blockquote>`.

Each markup type has its own syntax:

###  type-FB  ###

(Coming soon!)

Type-FB represents a longform social-media post.

###  type-MSG  ###

Type-MSG represents messaging; for example in a text-message or chatroom setting.
The only permitted child elements of a Type-MSG parent are `<p>` elements with the `data-societml-name` attribute set.
The `data-societml-name` attribute represents the person talking; each person should be represented by exactly one `data-societml-name` attribute.

On the first `<p>` element with a given `data-societml-name` attribute, a few additional parameters may be set: `data-societml-bg` and `data-societml-text`.
These associate background and text colours with the name in question.
These can only be set the first time a name appears, and cannot be changed later.

##  Processing:  ##

The `societml.js` file contains a script to render SocietML elements.
Simply include this script in your file and run `SocietML.parse()`.
If you only want to process a single element or document, `SocietML.parse()` will take this as a parameter; otherwise, it will process `document.documentElement`.
