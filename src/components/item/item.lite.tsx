import { useMetadata, useStore, onMount } from "@builder.io/mitosis";

export default function Item(props: { children?: any }) {
  useMetadata({
    tagName: "fireenjin-item",
  });

  const state = useStore({});

  onMount(() => {
    // On Load
  });

  return <span>{props.children}</span>;
}
