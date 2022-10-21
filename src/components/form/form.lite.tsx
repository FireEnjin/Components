export default function Form(props: {
  action?: string;
  method?: "post" | "get" | "dialog";
  children?: any;
}) {
  return (
    <form action={props?.action} method={props?.method}>
      {props.children}
    </form>
  );
}
