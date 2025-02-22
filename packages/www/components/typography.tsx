import { cn } from "@/lib/utils";
import { createElement } from "react";

type TypographyTypes =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "p"
  | "blockquote"
  | "list"
  | "code"
  | "muted";

function getClassNameForType(type: TypographyTypes) {
  switch (type) {
    case "h1":
      return "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl";
    case "h2":
      return "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0";
    case "h3":
      return "scroll-m-20 text-2xl font-semibold tracking-tight";
    case "h4":
      return "scroll-m-20 text-xl font-semibold tracking-tight";
    case "p":
      return "leading-7 [&:not(:first-child)]:mt-6";
    case "blockquote":
      return "mt-6 border-l-2 pl-6 italic";
    case "list":
      return "my-6 ml-6 list-disc [&>li]:mt-2";
    case "code":
      return "bg-black text-white font-mono py-1 px-2 rounded-lg overflow-x-auto";
  }
}

/**
 *
 * @param param0
 */
export function Typography({
  className,
  variant,
  component,
  children,
}: {
  className?: string;
  variant: TypographyTypes;
  component?: Exclude<TypographyTypes, "muted">;
  children: React.ReactNode;
}) {
  const generatedClassName = getClassNameForType(variant);

  if (!component) {
    switch (variant) {
      case "h1":
        return (
          <h1 className={cn(generatedClassName, className)}>{children}</h1>
        );
      case "h2":
        return (
          <h2 className={cn(generatedClassName, className)}>{children}</h2>
        );
      case "h3":
        return (
          <h3 className={cn(generatedClassName, className)}>{children}</h3>
        );
      case "h4":
        return (
          <h4 className={cn(generatedClassName, className)}>{children}</h4>
        );
      case "p":
        return <p className={cn(generatedClassName, className)}>{children}</p>;
      case "blockquote":
        return (
          <blockquote className={cn(generatedClassName, className)}>
            {children}
          </blockquote>
        );
      case "list":
        return (
          <ul className={cn(generatedClassName, className)}>{children}</ul>
        );
      case "code":
        return (
          <pre className={cn(generatedClassName, className)}>
            <code>{children}</code>
          </pre>
        );
      default:
        return;
    }
  }

  return createElement(
    component,
    {
      className: cn(generatedClassName, className),
    },
    children
  );
}

/**
 * @deprecated Use the `Typography` component instead.
 */
export function TypographyH1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {children}
    </h1>
  );
}

/**
 * @deprecated Use the `Typography` component instead.
 */
export function TypographyH2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  );
}

/**
 * @deprecated Use the `Typography` component instead.
 */
export function TypographyH3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  );
}

/**
 * @deprecated Use the `Typography` component instead.
 */
export function TypographyH4({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h4>
  );
}

/**
 * @deprecated Use the `Typography` component instead.
 */
export function TypographyP({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>
      {children}
    </p>
  );
}

/**
 * @deprecated Use the `Typography` component instead.
 */
export function TypographyBlockquote({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
  );
}

/**
 * @deprecated Use the `Typography` component instead.
 */
export function TypographyList({ children }: { children: React.ReactNode }) {
  return <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>;
}

/**
 * @deprecated Use the `Typography` component instead.
 */
export function TypographyInlineCode({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {children}
    </code>
  );
}

/**
 * @deprecated Use the `Typography` component instead.
 */
export function TypographyMuted({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-muted-foreground">{children}</p>;
}
