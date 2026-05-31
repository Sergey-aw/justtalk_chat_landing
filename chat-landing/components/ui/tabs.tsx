"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  const listRef = React.useRef<HTMLDivElement>(null)
  const [indicatorStyle, setIndicatorStyle] = React.useState({ left: 0, width: 0 })

  React.useEffect(() => {
    const updateIndicator = () => {
      if (listRef.current) {
        const activeButton = listRef.current.querySelector('[data-state="active"]') as HTMLElement
        if (activeButton) {
          const listRect = listRef.current.getBoundingClientRect()
          const buttonRect = activeButton.getBoundingClientRect()
          setIndicatorStyle({
            left: buttonRect.left - listRect.left,
            width: buttonRect.width,
          })
        }
      }
    }

    // Small delay to ensure DOM is ready
    const timer = setTimeout(updateIndicator, 0)
    
    // Use MutationObserver to watch for data-state changes
    const observer = new MutationObserver(updateIndicator)
    
    if (listRef.current) {
      // Observe all button children for attribute changes
      const buttons = listRef.current.querySelectorAll('[data-slot="tabs-trigger"]')
      buttons.forEach(button => {
        observer.observe(button, { attributes: true, attributeFilter: ['data-state'] })
      })
    }

    window.addEventListener('resize', updateIndicator)
    
    return () => {
      clearTimeout(timer)
      observer.disconnect()
      window.removeEventListener('resize', updateIndicator)
    }
  }, [])

  return (
    <TabsPrimitive.List
      ref={listRef}
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground relative inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      )}
      {...props}
    >
      <motion.div
        className="absolute bg-background rounded-md h-[calc(100%-6px)] shadow-sm"
        initial={false}
        animate={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
        }}
        transition={{
          type: "spring",
          bounce: 0.25,
          duration: 0.6,
        }}
        style={{ top: 3 }}
      />
      {props.children}
    </TabsPrimitive.List>
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "text-foreground dark:text-muted-foreground relative z-10 inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-ring/50 focus-visible:outline-ring focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
