# Contributing to Salesforce Trekken

Salesforce Trekken is written in TypeScript, React, and Rust; and is licensed under the GNU General Public License v3.

## A few rules

By contributing to Salesforce Trekken, you confirm that the work you are submitting is yours and it will be licensed under the GNU General Public License v3 of the project.

To ensure uniformity in Salesforce Trekken's repository, every contributor must follow these set of rules:

- Commits must best informative and describe the commit. (e.g. `add x feature to web view`
- Have ESLint and Prettier installed on your IDE for code formatting.
- Follow the general Rust conventions
- Use camelCasing on any function/method/property in code you've contributed.

Please also take a look at the [Code of Conduct](https://github.com/lukethacoder/salesforce-trekken/blob/main/CODE_OF_CONDUCT.md).

## Here’s the process for contributing to Salesforce Trekken

- Fork the Salesforce Trekken repository, and clone it locally on your development machine.
- Find help wanted tickets that are up for grabs in GitHub. Comment to let everyone know you’re working on it and let a core contributor assign the issue to you. If there’s no ticket for what you want to work on, you are free to continue with your changes.
- If in some case you need to use another dependency, create a new issue requesting for the package to be reviewed.
- After writing your code, make sure it has been formatted with prettier and eslint.
- When your changes are checked in to your fork, make sure to test your code extensively. Your commits should also follow the commit conventions.
- Submit your pull request for a code review and wait for a Salesforce Trekken core contributor to review it.
- Last but not least, make sure to have fun with the code!

## Development workspace

### Recommended IDE setup

- IDE: Visual Studio Code (w/ Prettier & ESLint)
- Node.js (LTS recommended) & NPM
- Yarn Package Manager
- [Tauri Development Environment](https://tauri.app/v1/guides/getting-started/prerequisites/)

### Building and testing your fork

While testing and making modifications to Salesforce Trekken, make sure to familiarise yourself with these three commands.

```bash
# Install dependencies
yarn install

# Start debug tauri build
yarn tauri dev

# Lint and cleanup code
yarn lint

# Build tauri for production
yarn tauri build
```
