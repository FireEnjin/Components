import { useMetadata, useStore, onMount } from "@builder.io/mitosis";

export default function Item(props: { children?: any }) {
  useMetadata({
    tagName: "fireenjin-item",
    isAttachedToShadowDom: true,
  });
  const state = useStore({});

  onMount(() => {});

  return <li class="item-wrapper">{props.children}</li>;
}
