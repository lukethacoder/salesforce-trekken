import { c as create_ssr_component, v as validate_component } from "../../../chunks/index.js";
import { B as Banner } from "../../../chunks/Banner.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<title>License | Salesforce Trekken</title>

${validate_component(Banner, "Banner").$$render($$result, { title: "License" }, {}, {})}

<div class="${"bg-black relative z-20 pt-20 text-white before:top-full before:h-full before:absolute before:w-full md:before:bg-black before:z-10"}"><div class="${"w-full mx-auto max-w-5xl px-4"}"><div><h2 class="${"text-xl font-semibold mb-2"}">Personal use</h2>
      <p>Salesforce Trekken is free for personal use, non-profit organizations and businesses with 5
        employees or less.
      </p>

      <h2 class="${"text-xl font-semibold mb-2 mt-8"}">Commercial use</h2>
      <p>If you do not qualify for personal use as described above, you may use Salesforce Trekken
        for 30 days for free. If you want to keep using it, reach out to salesforcetrekken@lukesecomb.digital for a
        commercial license.
      </p>

      <h2 class="${"text-xl font-semibold mb-2 mt-8"}">Distribution</h2>
      <p>You may distribute copies of Salesforce Trekken privately. It is not permitted to modify
        and/or re-distribute Salesforce Trekken publicly.
      </p>

      <h2 class="${"text-xl font-semibold mb-2 mt-8"}">Warranty Disclaimer</h2>
      <p>All work product by Luke Secomb is provided &quot;as is&quot;. Luke Secomb makes no warranties,
        express or implied, and hereby disclaims all implied warranties, including any warranty of
        merchantability and warranty of fitness for a particular purpose.
      </p></div></div></div>`;
});
export {
  Page as default
};
