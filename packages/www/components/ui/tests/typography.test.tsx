import "@testing-library/dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Typography,
  TypographyBlockquote,
  TypographyH1,
  TypographyInlineCode,
  TypographyList,
  TypographyMuted,
  TypographyP,
} from "../typography";

describe("Typography", () => {
  it("renders h1 variant correctly", () => {
    render(<Typography variant="h1">Heading 1</Typography>);
    const heading = screen.getByText("Heading 1");
    expect(heading.tagName).toBe("H1");
    expect(heading).toHaveClass(
      "scroll-m-20",
      "text-4xl",
      "font-extrabold",
      "tracking-tight",
      "lg:text-5xl"
    );
  });

  it("renders h2 variant correctly", () => {
    render(<Typography variant="h2">Heading 2</Typography>);
    const heading = screen.getByText("Heading 2");
    expect(heading.tagName).toBe("H2");
    expect(heading).toHaveClass(
      "scroll-m-20",
      "text-3xl",
      "font-semibold",
      "tracking-tight",
      "first:mt-0"
    );
  });

  it("renders with custom component prop", () => {
    render(
      <Typography variant="h1" component="h2">
        Custom Component
      </Typography>
    );
    const heading = screen.getByText("Custom Component");
    expect(heading.tagName).toBe("H2");
    expect(heading).toHaveClass(
      "scroll-m-20",
      "text-4xl",
      "font-extrabold",
      "tracking-tight",
      "lg:text-5xl"
    );
  });

  it("applies additional className when provided", () => {
    render(
      <Typography variant="p" className="custom-class">
        Paragraph
      </Typography>
    );
    const paragraph = screen.getByText("Paragraph");
    expect(paragraph).toHaveClass(
      "leading-7",
      "[&:not(:first-child)]:mt-6",
      "custom-class"
    );
  });

  it("renders p variant correctly", () => {
    render(<Typography variant="p">Paragraph</Typography>);
    const paragraph = screen.getByText("Paragraph");
    expect(paragraph).toHaveClass("leading-7", "[&:not(:first-child)]:mt-6");
  });

  it("renders blockquote variant correctly", () => {
    render(<Typography variant="blockquote">Quote</Typography>);
    const quote = screen.getByText("Quote");
    expect(quote).toHaveClass("mt-6", "border-l-2", "pl-6", "italic");
  });

  it("render h2 component with h1 styling", () => {
    render(
      <Typography variant="h1" component="h2">
        Heading 2
      </Typography>
    );
    const heading = screen.getByText("Heading 2");
    expect(heading.tagName).toBe("H2");
    expect(heading).toHaveClass(
      "scroll-m-20",
      "text-4xl",
      "font-extrabold",
      "tracking-tight",
      "lg:text-5xl"
    );
  });
});

describe("Deprecated Typography Components", () => {
  it("renders TypographyH1 correctly", () => {
    render(<TypographyH1>Heading 1</TypographyH1>);
    const heading = screen.getByText("Heading 1");
    expect(heading.tagName).toBe("H1");
    expect(heading).toHaveClass(
      "scroll-m-20",
      "text-4xl",
      "font-extrabold",
      "tracking-tight",
      "lg:text-5xl"
    );
  });

  it("renders TypographyP with custom className", () => {
    render(<TypographyP className="custom-class">Paragraph</TypographyP>);
    const paragraph = screen.getByText("Paragraph");
    expect(paragraph).toHaveClass(
      "leading-7",
      "[&:not(:first-child)]:mt-6",
      "custom-class"
    );
  });

  it("renders TypographyBlockquote correctly", () => {
    render(<TypographyBlockquote>Quote</TypographyBlockquote>);
    const quote = screen.getByText("Quote");
    expect(quote.tagName).toBe("BLOCKQUOTE");
    expect(quote).toHaveClass("mt-6", "border-l-2", "pl-6", "italic");
  });

  it("renders TypographyList correctly", () => {
    render(<TypographyList>List Item</TypographyList>);
    const list = screen.getByText("List Item");
    expect(list.tagName).toBe("UL");
    expect(list).toHaveClass("my-6", "ml-6", "list-disc", "[&>li]:mt-2");
  });

  it("renders TypographyInlineCode correctly", () => {
    render(<TypographyInlineCode>code</TypographyInlineCode>);
    const code = screen.getByText("code");
    expect(code.tagName).toBe("CODE");
    expect(code).toHaveClass(
      "relative",
      "rounded",
      "bg-muted",
      "px-[0.3rem]",
      "py-[0.2rem]",
      "font-mono",
      "text-sm",
      "font-semibold"
    );
  });

  it("renders TypographyMuted correctly", () => {
    render(<TypographyMuted>Muted text</TypographyMuted>);
    const text = screen.getByText("Muted text");
    expect(text.tagName).toBe("P");
    expect(text).toHaveClass("text-sm", "text-muted-foreground");
  });
});
