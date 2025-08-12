import type { HTMLAttributes, PropsWithChildren } from "react";

export function CircleProgress({ size = 100, strokeWidth = 10, progress, color = "#4f46e5", bgColor = "#e5e7eb", children, style, ...props }: {
  size?: number;
  strokeWidth?: number;
  progress: number;
  color?: string;
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
          background: "white",
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
