import { c as create_ssr_component, b as subscribe } from "../../chunks/index.js";
import { p as page } from "../../chunks/stores.js";
const app = "";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-llapq1_START --><link href="${"https://fonts.googleapis.com/css?family=Source+Sans+Pro"}" rel="${"stylesheet"}"><!-- HEAD_svelte-llapq1_END -->`, ""}

<header class="${"w-full mx-auto flex max-w-5xl items-center py-4 px-6 text-base sm:justify-between"}"><a href="${"/"}" class="${"sm:w-32 py-2 flex items-center"}"><img src="${"/logo.png"}" alt="${"Salesforce Trekken logo"}" class="${"w-8 flex"}">
    <h1 class="${"whitespace-nowrap text-white font-medium ml-2"}">Salesforce Trekken</h1></a>
  <nav class="${"mx-2"}"><a href="${"/"}" class="${[
    "ease-md mx-2 py-2 text-sm transition-colors duration-200 text-gray-500 hover:text-white font-medium sm:text-base",
    $page.url.pathname == "/" ? "active" : ""
  ].join(" ").trim()}">Home
    </a>
    <a href="${"/changelog"}" class="${[
    "ease-md mx-2 py-2 text-sm transition-colors duration-200 text-gray-500 hover:text-white font-medium sm:text-base",
    $page.url.pathname == "/changelog" ? "active" : ""
  ].join(" ").trim()}">Changelog
    </a></nav>
  <div class="${"ml-auto flex justify-end sm:ml-0 sm:w-32"}"><a href="${"https://github.com/lukethacoder/salesforce-trekken"}" target="${"_blank"}" rel="${"noreferrer"}"><svg height="${"24"}" width="${"24"}" viewBox="${"-2 -2 28 28"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"}" fill="${"none"}" stroke="${"#ffffff"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}"></path></svg></a></div></header>

<main class="${"overflow-hidden"}">${slots.default ? slots.default({}) : ``}
  
  <div class="${"w-full flex justify-center z-0 opacity-90 absolute left-0 top-20"}"><span style="${"filter: blur(240px);"}" class="${"flex w-[720px] h-[720px] bg-gradient-to-b from-black to-primary rounded-full"}"></span></div></main>

<footer class="${"bg-black relative z-50 py-8 flex items-center justify-center"}"><a href="${"/about"}" class="${[
    "ease-md mx-4 py-2 text-sm transition-colors duration-200 text-gray-500 hover:text-white font-medium sm:text-base",
    $page.url.pathname == "/about" ? "active" : ""
  ].join(" ").trim()}">About
  </a>
  <a href="${"/license"}" class="${[
    "ease-md mx-4 py-2 text-sm transition-colors duration-200 text-gray-500 hover:text-white font-medium sm:text-base",
    $page.url.pathname == "/license" ? "active" : ""
  ].join(" ").trim()}">License
  </a></footer>`;
});
export {
  Layout as default
};
