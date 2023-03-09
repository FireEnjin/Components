export interface ButtonProps {
    theme?: string;
    href?: string;
    type?: "submit" | "reset" | "button";
    title?: string;
    fill?: "outline" | "solid" | "none";
    radius?: "xs" | "sm" | "md" | "lg" | "xl" | "100" | "full" | "none";
    size?: "large" | "small";
    target?: string;
    children?: any;
}
export declare const Button: import("@builder.io/qwik").Component<ButtonProps>;
export default Button;
