import { useMetadata, useStore, Show } from "@builder.io/mitosis";
import Item from "../item/item.lite";

export default function List(props: {
  ordered?: boolean;
  listType?: string;
  children?: any;
}) {
  useMetadata({
    tagName: "fireenjin-list",
  });
  const state = useStore({});
  return (
    <span>
      <Show when={props.ordered}>
        <ol
          style={{
            "list-style-type": `${props.listType ? props.listType : "decimal"}`,
          }}
        >
          <Item>{props.children}</Item>
        </ol>
      </Show>
      <Show when={!props.ordered}>
        <ul
          style={{
            "list-style-type": `${props.listType ? props.listType : "none"}`,
          }}
        >
          <Item>{props.children}</Item>
        </ul>
      </Show>
    </span>
  );
}
