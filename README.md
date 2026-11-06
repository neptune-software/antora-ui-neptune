# Antora UI Neptune

The UI (layouts, partials, CSS and JavaScript) of the Neptune Software
documentation site, [docs.neptune-software.com](https://docs.neptune-software.com),
which is generated with [Antora](https://antora.org).

This UI is derived from the [Antora Default UI](https://gitlab.com/antora/antora-ui-default)
and is distributed under the [Mozilla Public License 2.0](LICENSE), except the
third-party files listed in [THIRD-PARTY.md](THIRD-PARTY.md).
The upstream README is kept in [README.Default.adoc](README.Default.adoc).

Neptune additions to upstream partials are kept in separate `neptune-*` partials
(e.g. `src/partials/neptune-footer-scripts.hbs`, `src/partials/neptune-head-styles.hbs`),
included from the upstream files.

## Build

Requires Node.js (see `.nvmrc`).

```sh
npm ci
npx gulp bundle    # writes build/ui-bundle.zip
npx gulp preview   # serves a preview on http://localhost:5252
```

## Trademarks

The MPL does not grant rights to the Neptune Software name or logo.
