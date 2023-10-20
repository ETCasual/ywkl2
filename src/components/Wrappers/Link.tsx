import Link from "next/link";
import { type CSSProperties } from "react";

interface LinkWrapperProps {
  href: string;
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
  passHref?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const LinkWrapper = ({
  children,
  href,
  disabled,
  passHref,
  ...props
}: LinkWrapperProps) => {
  if (disabled)
    return (
      <button disabled={disabled} {...props}>
        {children}
      </button>
    );

  return (
    <Link href={href} passHref={passHref} {...props}>
      {children}
    </Link>
  );
};
