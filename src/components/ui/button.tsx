import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default: "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-glow hover:shadow-elevated hover:scale-105",
                destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
                hero: "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-glow hover:shadow-elevated hover:scale-105 text-base font-semibold",
                music: "bg-gradient-to-r from-music to-music/80 text-music-foreground shadow-md hover:shadow-lg hover:scale-105",
                image: "bg-gradient-to-r from-image to-image/80 text-image-foreground shadow-md hover:shadow-lg hover:scale-105",
                code: "bg-gradient-to-r from-code to-code/80 text-code-foreground shadow-md hover:shadow-lg hover:scale-105",
                text: "bg-gradient-to-r from-text to-text/80 text-text-foreground shadow-md hover:shadow-lg hover:scale-105",
                glass: "bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-white/10 text-foreground hover:bg-white/10",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                xl: "h-14 rounded-lg px-10 text-lg",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }

