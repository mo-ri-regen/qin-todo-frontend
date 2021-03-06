import Link from "next/link";
import type { ForwardedRef } from "react";
import { forwardRef } from "react";

import type { AnchorType } from "./types";
import { useButtonClass } from "./useButtonClass";

/**
 * @package
 */
export const Anchor = forwardRef<HTMLAnchorElement, AnchorType>(
  (props, ref) => {
    const { children, className, variant, ...rest } = props;
    const classes = useButtonClass(className, variant);
    return (
      <Link {...rest}>
        <a ref={ref as ForwardedRef<HTMLAnchorElement>} className={classes}>
          {children}
        </a>
      </Link>
    );
  }
);

Anchor.displayName === "Button";
