import { useMetadata, useStore, Show } from "@builder.io/mitosis";

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
          {props.children}
        </ol>
      </Show>
      <Show when={!props.ordered}>
        <ul
          style={{
            "list-style-type": `${props.listType ? props.listType : "none"}`,
          }}
        >
          {props.children}
        </ul>
      </Show>
    </span>
  );
}
