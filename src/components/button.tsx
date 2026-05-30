import { cva, type VariantProps } from "class-variance-authority"
import Link from "next/link"
import * as React from "react"
import { cn } from "@/lib/cn"

const btnVariants = cva(
  "inline-flex items-center gap-2 rounded-md font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-fd-ring)] focus-visible:outline-none",
  {
    defaultVariants: {
      size: "md",
      variant: "secondary",
    },
    variants: {
      size: {
        lg: "px-[22px] py-3 text-[15px]",
        md: "px-[18px] py-2.5 text-sm",
      },
      variant: {
        ghost: "text-fd-muted-foreground hover:text-fd-foreground border border-transparent",
        primary:
          "bg-fd-primary text-fd-primary-foreground border border-transparent hover:bg-[var(--leaf-hover)]",
        secondary:
          "border-fd-border bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-accent border",
      },
    },
  }
)
type BtnVariants = VariantProps<typeof btnVariants>

type BtnAsButton = {
  as?: "button"
  href?: never
} & React.ButtonHTMLAttributes<HTMLButtonElement>

type BtnAsAnchor = {
  as?: "a"
  href?: string
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

type BtnProps = BtnVariants &
  (BtnAsButton | BtnAsAnchor) & {
    children: React.ReactNode
  }

const Btn = ({ variant, size, as = "a", className, children, ...rest }: BtnProps) => {
  const cls = cn(btnVariants({ size, variant }), className)

  if (as === "a") {
    const { href, ...anchorRest } = rest as BtnAsAnchor
    return (
      <Link
        href={href ?? "#"}
        className={cls}
        {...(anchorRest as Omit<React.ComponentPropsWithoutRef<typeof Link>, "href">)}
      >
        {children}
      </Link>
    )
  }

  return (
    <button className={cls} {...(rest as BtnAsButton)}>
      {children}
    </button>
  )
}

export default Btn
