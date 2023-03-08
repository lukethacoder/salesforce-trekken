<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/lukethacoder/salesforce-trekken">
    <img src="./docs/logo.png" alt="Logo" width="120" height="120">
  </a>

<h3 align="center">Salesforce Trekken</h3>
  <p align="center">
    Salesforce CMS Migration Tool
    <br />
    <br />
    <a href="https://trekken.lukesecomb.digital">View Site</a>
    ·
    <a href="https://github.com/lukethacoder/salesforce-trekken/issues">Report Bug</a>
    ·
    <a href="https://github.com/lukethacoder/salesforce-trekken/issues">Request Feature</a>
  </p>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#prerequisites">Prerequisites</a></li>
    <!-- <li><a href="#usage">Usage</a></li> -->
    <!-- <li><a href="#roadmap">Roadmap</a></li> -->
    <li><a href="#releases">Releases</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## What is Salesforce Trekken

[![Salesforce Trekken Screen Shot][product-screenshot]](https://trekken.lukesecomb.digital)

Salesforce Trekken aims to rethink the Salesforce CMS migration experience. Using modern web technologies and thoughtful a user experience, migrating Salesforce CMS data has never been easier.

Salesforce Trekken is a cross-platform web powered desktop application wrapped in [Tauri](https://tauri.app/). The Salesforce REST API is used under the hood in addition to the `sfdx` cli if installed.

<!-- The word "Trekken" comes from the Dutch word for "pull". Why Dutch? Because I'm currently in the Netherlands so it felt fitting to give this a Dutch name. -->

> **Note**: This is a fairly early and untested version, especially on non-windows platforms. Any and all feedback is greatly appreciated.
>
> Downloads can be found on the [Releases tab](https://github.com/lukethacoder/salesforce-trekken/releases)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Tauri][tauri]][tauri-url]
- [![React][react.js]][react-url]
- [![TailwindCSS][tailwindcss]][tailwindcss-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Prerequisites

Salesforce Trekken allows you to authenticate using two different methods:

- via the [`sfdx` cli](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_install_cli.htm)
- via an `ACCESS_TOKEN`

You must have the `sfdx` cli installed with your org already authenticated for the application to pickup the connection.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [ ] Named Credentials Authentication
- [ ] Multi-thread REST API requests for CMS data

See the [open issues](https://github.com/lukethacoder/salesforce-trekken/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Release -->

## Releases

Releases are auto created from a Github Action that is fired off when a new `git tag` is created on the `main` branch. Before creating the `git tag`, make sure you have manually set the new release version in both the Rust and JavaScript code.

After the Github Action has run, a draft Release will be created. Make sure to edit the release notes before publishing.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

To help make this tool as good as it can be, we welcome creating issues/feature requests using this repository.

See [CODE_OF_CONDUCT](https://github.com/lukethacoder/salesforce-trekken/blob/main/CODE_OF_CONDUCT) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Copyright (c) 2022-2023 Luke Secomb. Distributed under the GPL-3.0 license. See [LICENSE](https://github.com/lukethacoder/salesforce-trekken/blob/main/LICENSE) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/lukethacoder/salesforce-trekken.svg?style=for-the-badge
[contributors-url]: https://github.com/lukethacoder/salesforce-trekken/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/lukethacoder/salesforce-trekken.svg?style=for-the-badge
[forks-url]: https://github.com/lukethacoder/salesforce-trekken/network/members
[stars-shield]: https://img.shields.io/github/stars/lukethacoder/salesforce-trekken.svg?style=for-the-badge
[stars-url]: https://github.com/lukethacoder/salesforce-trekken/stargazers
[issues-shield]: https://img.shields.io/github/issues/lukethacoder/salesforce-trekken.svg?style=for-the-badge
[issues-url]: https://github.com/lukethacoder/salesforce-trekken/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=0A66C2
[linkedin-url]: https://linkedin.com/in/luke-secomb/
[product-screenshot]: docs/screenshot.png
[tauri-url]: https://tauri.app/
[tauri]: https://img.shields.io/badge/tauri-242526?style=for-the-badge&logo=tauri
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[tailwindcss]: https://img.shields.io/badge/TailwindCSS-0f172a?style=for-the-badge&logo=tailwindcss&logoColor=38bdf8
[tailwindcss-url]: https://tailwindcss.com/
