export interface CardProps {
    theme?: string;
    fill?: "outline" | "solid" | "none";
    radius?: "xs" | "sm" | "md" | "lg" | "xl" | "100" | "full" | "none";
    size?: "large" | "small";
    children?: any;
}
export declare const Card: import("@builder.io/qwik").Component<CardProps>;
export default Card;
