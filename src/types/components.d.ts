declare module "@/components/ui/skeleton" {
  export const Skeleton: React.FC<React.HTMLAttributes<HTMLDivElement>>;
}

declare module "@/components/ui/table" {
  export const Table: React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLTableElement>
  >;
  export const TableHeader: React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLTableSectionElement>
  >;
  export const TableBody: React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLTableSectionElement>
  >;
  export const TableRow: React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLTableRowElement>
  >;
  export const TableHead: React.ForwardRefExoticComponent<
    React.ThHTMLAttributes<HTMLTableCellElement>
  >;
  export const TableCell: React.ForwardRefExoticComponent<
    React.TdHTMLAttributes<HTMLTableCellElement>
  >;
}

declare module "@/components/ui/use-toast" {
  export interface Toast {
    id: string;
    title?: string;
    description?: string;
    variant?: "default" | "destructive";
  }

  export interface ToastContextType {
    toasts: Toast[];
    toast: (toast: Omit<Toast, "id">) => void;
    dismiss: (id: string) => void;
  }

  export function useToast(): ToastContextType;
  export function ToastProvider(props: {
    children: React.ReactNode;
  }): JSX.Element;
}
