# eslint-config-me

This is a shared configuration for all of my personal repositories. Contains overrides and enhancements on top of airbnb's and prettier's base configuration, with some additional plugins I believe in, as well. _A_ standard is always better than _no_ standard.

## Unit tests

This central configuration is a potential breaking point for _all_ of my code if I suddenly break the linting rules and no longer have half of my safety net in place, so I have tests implemented that verify that the configuration remains consistent between upgrades (primarily that I _know_ what changed), and that the extended cases that I care about are still caught. 

This is done by utilizing ava's snapshot ability against exported (and slightly modified) linting output and linting configuration. These files are not committed, as they are re-created on each test run, but the resulting snapshot and summary markdown file are part of version control, to make it easier to see changes.

> NOTE: jest is only a dependency because eslint-plugin-jest depends on it for its checks to run, and its checks are better than a number of other test linters out there.

**Process:**

1. Run `npm install`.
1. Run `npm test` (to determine if any significant rules have changed since the last release)
  - The tests will likely fail. Verify newly-consumed rules against the current [snapshot](/demo/test/snapshots/linting-config.test.js.md) file.
1. After verifying, run `npm run test:update`.
1. Make dependency/configuration updates.
1. Run `npm test` (to determine new changes in linting results or configuration).
  - The tests should likely fail. Verify your expectations against the current [snapshot](/demo/test/snapshots/linting-config.test.js.md) file.
1. After you have your results how you want them, run `npm run test:update`.
  - The tests should now pass.

<!--1. If you want see how your changes would impact a codebase, you can either `npm link` or copy+paste the contents of `local-linting-final-config.json` temporarily into the target `.eslintrc` file. LIES! npm link only works against a true npm module, and copying config without dependencies also does not work...
-->

Why extra rules? Because they have saved my life, and I fully believe in linting. I have become converted to the additional rules enforced by the following plugins:

 - [eslint-plugin-bestpractices](https://github.com/skye2k2/eslint-plugin-bestpractices)
 - [eslint-plugin-deprecate](https://github.com/AlexMost/eslint-plugin-deprecate)
 - [eslint-plugin-html](https://github.com/BenoitZugmeyer/eslint-plugin-html)
 - [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import)
 - [eslint-plugin-jest](https://github.com/jest-community/eslint-plugin-jest)
 - [eslint-plugin-jsdoc](https://github.com/gajus/eslint-plugin-jsdoc)
 - [eslint-plugin-json](https://github.com/azeemba/eslint-plugin-json)
 - [eslint-plugin-promise](https://github.com/xjamundx/eslint-plugin-promise)
 - [eslint-plugin-sonarjs](https://github.com/SonarSource/eslint-plugin-sonarjs)

![alt text](demo/example-eslint-results.png "Example linting infractions for things the Tree team cares about")

## Usage:

 1. Add this repository as a package devDependency:

    > "eslint-config-me": "github:fs-webdev/eslint-config-tree#semver:^1",

 1. Add an `eslintrc.js` file, with the following:
<pre><code>module.exports = {
  extends: [
    'eslint-config-me'
  ]
}</code></pre>

 1. Enjoy.

## HOWTOs:

### How to override linting rules for a directory and all of its contents:

Add an `eslintrc.js` file to that directory with the necessary overrides, like so:

<pre><code>
module.exports = {
  rules: {
    'bestpractices/no-console': 'off',
  }
}</code></pre>

### How to override linting rules for specific files:

Add an `overrides` section to your `eslintrc.js` file to target those files with the necessary overrides, like so:

<pre><code>
overrides: [
	{
	  files: ['*.test.js'],
	  rules: {
		// We do not need to enforce selector rules in test files
	    'test-selectors/button': 'off',
	    'test-selectors/onChange': 'off',
	  },
	},
],
</code></pre>

### How to disable a linting rule inline without triggering the `no-eslint-disable` rule:

Utilize a file linting config modifier like so:

```
/* eslint no-console: "off" -- node scripts use the console */

```

Note that `--` comments are permitted and a very good idea to include.

<!--
DOES NOT CURRENTLY WORK, AND bestpractices/no-eslint-disable SHOULD PROBABLY BE MODIFIED TO TAKE THIS INTO ACCOUNT.
Or disable BOTH the desired rule and the no-eslint-disable rule:

```
// eslint-disable-next-line bestpractices/no-eslint-disable, no-console
```
-->

### How to deal with `Definition for rule '{RULE}' was not found.` errors:

If you are seeing these warnings when linting locally, you may have `eslint` installed globally, but not the additional dependency. We do not recommend running `eslint` globally for this reason (see: https://github.com/eslint/eslint/issues/6732). All Tree repositories should include all dependencies required to be able to run `eslint` locally in their respective directories.

If you have recently updated dependencies and see this error locally, then there is a possibility that your editor's linting integration is out-of-sync that can be resolved by restarting your editor.

### How to not have tons of `jsdoc` warnings:

The `jsdoc` warnings are only triggered for functions that have an jsdoc extended comment block (`/** */`) directly above the function declaration. Omit this, add an extra space, or just use a short comment (`//`) or a standard extended comment (`/* */`) to keep from applying `jsdoc` rules to functions not requiring fastidious documentation. Or follow all of the rules.

<details>
<summary>Maintenance Notes</summary>

## Testing/Updating:

Occasionally, there may be an update which breaks a rule in particular or linting in general. To this end, when running `npm test`, we output the current linting results to a text file, clean it up a little, and employ ava to run a snapshot comparison unit test to determine if our linting output has changed from the previous run.

If there has been a change (say you added a new rule, or there is a new valid violation triggered), you can update the snapshot via `npm run test:update`.

## Notes

- As noted in the `Testing/Updating` section, the only validation we do is to run linting against a file with a set of known failures. So we make sure to run `npm test` via a pre-push hook, and releases are automatically performed by a GitHub webhook.
- Ava's coverage reporting ends up reporting on `lint-output.js`, instead of `index.js`, which is unhelpful, and so is also not used.

</details>

## Changelog:

<details>
<summary>Version 1 - ESLint 8</summary>

- Create initial configuration
- Add eslint-plugin-bestpractices, eslint-plugin-deprecate, eslint-plugin-html, eslint-plugin-jsdoc, eslint-plugin-json, eslint-plugin-promise, eslint-plugin-sonarjs

</details>
