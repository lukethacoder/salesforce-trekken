import { c as create_ssr_component, v as validate_component, d as each, e as escape } from "../../../chunks/index.js";
import { B as Banner } from "../../../chunks/Banner.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Australia/Sydney"
      }
    ).format(date);
  };
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<title>Changelog | Salesforce Trekken</title>

${validate_component(Banner, "Banner").$$render($$result, { title: "Changelog" }, {}, {})}

<div class="${"bg-black relative z-20 pt-20 min-h-[60vh]"}"><div class="${"w-full mx-auto max-w-5xl px-4"}"><div class="${"text-white"}">${each(data.changelog, (release) => {
    return `<section class="${"md:flex"}"><h2 class="${"pl-7 text-sm leading-6 text-gray-500 md:w-1/4 md:pl-0 md:pr-12 md:text-right"}">${escape(formatDate(release.date))}</h2>
          <div class="${"relative pt-2 pl-7 pb-16 md:w-3/4 md:pt-0 md:pl-12"}"><span class="${"absolute bottom-0 left-0 -top-6 w-px bg-gray-200 md:top-0"}"></span>
            <span class="${"absolute -top-[1.0625rem] -left-1 h-[0.5625rem] w-[0.5625rem] rounded-full border-2 border-gray-300 bg-gray-900 md:top-[0.4375rem]"}"></span>

            <h2 class="${"text-2xl font-semibold mb-4"}">${escape(release.version)}: ${escape(release.title)}</h2>
            ${each(Object.keys(release.items), (item) => {
      return `<p class="${"mb-3 font-semibold"}">${escape(item)}</p>
              <ul class="${"mb-6 ml-2"}">${each(release.items[item], (dot) => {
        return `<li class="${"list-disc list-inside text-sm mb-1"}">${escape(dot)}</li>`;
      })}
              </ul>`;
    })}</div>
        </section>`;
  })}</div></div></div>`;
});
export {
  Page as default
};
