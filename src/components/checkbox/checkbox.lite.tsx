import { useMetadata, useStore, onMount } from "@builder.io/mitosis";
import Item from "../item/item.lite";

export default function Checkbox(props: { label?: string; children?: any }) {
  useMetadata({
    tagName: "fireenjin-checkbox",
  });

  const state = useStore({});

  onMount(() => {});

  return (
    <Item>
      <input type="checkbox"></input>
      <label>{props.label}</label>
      {props.children}
    </Item>
  );
}
