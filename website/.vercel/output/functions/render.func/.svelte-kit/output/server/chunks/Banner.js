import { c as create_ssr_component, e as escape } from "./index.js";
const Banner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  return `<header class="${"w-full text-center relative before:top-full before:h-24 before:absolute before:left-0 before:w-full md:before:bg-black before:z-10"}"><h1 class="${"text-5xl text-white font-semibold pt-32 pb-24 relative z-20"}">${escape(title)}</h1></header>`;
});
export {
  Banner as B
};
