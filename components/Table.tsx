import * as React from "react"
import { cn } from "../lib/utils"

export function Table({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <table className={cn("w-full border-collapse text-sm", className)} {...props} />
  )
}

export function TableHeader({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn("bg-gray-100 text-left", className)} {...props} />
}

export function TableBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn("divide-y divide-gray-200", className)} {...props} />
}

export function TableRow({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cn("hover:bg-gray-50", className)} {...props} />
}

export function TableHead({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn("px-4 py-2 font-medium text-gray-600", className)}
      {...props}
    />
  )
}

export function TableCell({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn("px-4 py-2 text-gray-800", className)}
      {...props}
    />
  )
}
