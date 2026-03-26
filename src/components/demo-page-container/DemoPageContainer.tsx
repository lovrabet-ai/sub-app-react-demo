import type { CSSProperties, ReactNode } from "react";
import styles from "./DemoPageContainer.module.css";

type DemoPageContainerVariant = "standard" | "bleed";

interface DemoPageContainerProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  innerStyle?: CSSProperties;
  maxWidth?: number | string;
  style?: CSSProperties;
  variant?: DemoPageContainerVariant;
}

function joinClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export default function DemoPageContainer({
  children,
  className,
  innerClassName,
  innerStyle,
  maxWidth,
  style,
  variant = "standard",
}: DemoPageContainerProps) {
  const mergedInnerStyle = {
    ...innerStyle,
  } as CSSProperties & Record<string, string>;

  if (maxWidth !== undefined) {
    mergedInnerStyle["--demo-page-max-width"] =
      typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth;
  }

  return (
    <div
      className={joinClassNames(
        styles.root,
        variant === "bleed" ? styles.bleed : styles.standard,
        className,
      )}
      style={style}
    >
      <div
        className={joinClassNames(styles.inner, innerClassName)}
        style={mergedInnerStyle}
      >
        {children}
      </div>
    </div>
  );
}
