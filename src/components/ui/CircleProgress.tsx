import type { HTMLAttributes, PropsWithChildren } from "react";

export function CircleProgress({ size = 100, strokeWidth = 10, progress, color, bgColor = "transparent", innerColor, children, style, ...props }: {
  size?: number;
  strokeWidth?: number;
  progress: number;
  color: string;
  innerColor: string;
  bgColor?: string;
} & PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `conic-gradient(${color} ${progress * 3.6}deg, ${bgColor} 0deg)`,
        padding: strokeWidth,
        boxSizing: "border-box"
      }}
    >
      <div
        style={{
          background: innerColor,
          borderRadius: "50%",
          width: "100%",
          height: "100%",
          ...style
        }}
        { ...props }
      >{ children }</div>
    </div>
  );
}
