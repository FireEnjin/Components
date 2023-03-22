import { useMetadata, useStore, onMount, Show } from "@builder.io/mitosis";
import Checkbox from "../checkbox/checkbox.lite";

export default function Checklist(props: {
  theme?: string;
  label?: string;
  data: [];
}) {
  useMetadata({
    tagName: "fireenjin-checklist",
  });

  const state = useStore({
    theme: `blue`,
  });

  onMount(() => {
    state.theme = props.theme || `blue`;
  });
  return <Checkbox label={props.label}></Checkbox>;
}
