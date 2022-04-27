import type { LinkProps } from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type Common = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type ButtonVariant =
  | "outline"
  | "ghost"
  | "solid-blue"
  | "solid-red"
  | "solid-gray"
  | "solid-white"
  | "solid-black"
  | "primary"
  | "secondary"
  | "ternary";

type ButtonType = ButtonHTMLAttributes<HTMLButtonElement> & Common;

type AnchorType = LinkProps & Common;

/**
 * @package
 */
export type { AnchorType, ButtonType, ButtonVariant };
