import "pollen-css";
import "./global.css";
export { Button } from "./components/button/button";
export { Form } from "./components/form/form";
export { Input } from "./components/input/input";

document.addEventListener("fireenjinSubmit", function (event) {
  console.log(event);
});
