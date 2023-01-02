import { c as create_ssr_component, v as validate_component } from "../../../chunks/index.js";
import { B as Banner } from "../../../chunks/Banner.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<title>About | Salesforce Trekken</title>

${validate_component(Banner, "Banner").$$render($$result, { title: "About" }, {}, {})}

<div class="${"bg-black relative z-20 pt-20 text-white before:top-full before:h-full before:absolute before:w-full md:before:bg-black before:z-10"}"><div class="${"w-full mx-auto max-w-5xl px-4"}"><div><p class="${"mb-2"}">The Salesforce CMS data migration experience is lacking. There is no bulk export, and there is no sorting/filtering of content and you are sent an email link instead of being able to directly download the zip file.
      </p>
      <p class="${"mb-8"}">Salesforce Trekken aims to rethink the Salesforce CMS migration experience. Using modern web technologies and thoughtful a user experience, migrating Salesforce CMS data has never been easier.
      </p>
      
      <h2 class="${"text-xl font-semibold mb-2"}">How does it work?</h2>
      <div><p class="${"mb-2"}">Salesforce Trekken allows users to authenticate using one of two methods:</p>
        <ul class="${"list-disc list-inside ml-1 mt-1 mb-2"}"><li class="${"mb-1"}">The <a href="${"https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_install_cli.htm"}" target="${"_blank"}" rel="${"noreferrer noopener"}" class="${"underline"}"><code>sfdx</code> cli</a></li>
          <li class="${"mb-1"}">Access Token (and Instance URL)
          </li></ul>

        <p>The <a href="${"https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_rest.htm"}" target="${"_blank"}" rel="${"noreferrer noopener"}" class="${"underline"}">Salesforce REST API</a> is used to fetch CMS Channels and the CMS Content after a specific channel has been selected.</p></div>

      <h2 class="${"text-xl font-semibold mb-2 mt-8"}">Your Privacy</h2>
      <p>Salesforce Trekken does not have DRM, show ads or sell your information. We track anonymized metrics to make sure everything is running smoothly.
      </p>

      <h2 class="${"text-xl font-semibold mb-2 mt-8"}">The Developer</h2>
      <p>Salesforce Trekken is independently designed and developed by Luke Secomb. You can find Luke on <a href="${"https://github.com/lukethacoder/"}" target="${"_blank"}" rel="${"noreferrer noopener"}" class="${"underline"}">Github</a>, <a href="${"https://twitter.com/lu_ke____"}" target="${"_blank"}" rel="${"noreferrer noopener"}" class="${"underline"}">Twitter</a> and <a href="${"https://linkedin.com/in/luke-secomb/"}" target="${"_blank"}" rel="${"noreferrer noopener"}" class="${"underline"}">LinkedIn</a>.
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
