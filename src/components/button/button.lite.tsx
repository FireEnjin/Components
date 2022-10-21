export default function Button(props: {
  href?: string;
  color?: string;
  children: any;
}) {
  return (
    <a
      css={{
        textDecoration: "none",
        fontWeight: "bold",
        color: "white",
        padding: "15px",
      }}
      href={props?.href}
      type="button"
      style={{
        background: `var(--color-${props?.color})`,
      }}
    >
      {props.children}
    </a>
  );
}
