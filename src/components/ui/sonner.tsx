import { Toaster as Sonner } from "sonner";
import { useTheme } from "@/lib/hooks";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { dark } = useTheme();

  return (
    <Sonner
      theme={dark ? "dark" : "light"}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-border/80 group-[.toaster]:shadow-lg group-[.toaster]:rounded-xl group-[.toaster]:text-xs group-[.toaster]:font-medium group-[.toaster]:py-3 group-[.toaster]:px-4",
          description: "group-[.toast]:text-muted-foreground group-[.toast]:text-xs",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-lg group-[.toast]:text-xs group-[.toast]:font-semibold",
          cancelButton:
            "group-[.toast]:bg-secondary group-[.toast]:text-secondary-foreground group-[.toast]:rounded-lg group-[.toast]:text-xs",
          error:
            "group-[.toaster]:!border-destructive/30 group-[.toaster]:!bg-card group-[.toaster]:!text-foreground",
          success:
            "group-[.toaster]:!border-emerald-500/30 group-[.toaster]:!bg-card group-[.toaster]:!text-foreground",
          warning:
            "group-[.toaster]:!border-amber-500/30 group-[.toaster]:!bg-card group-[.toaster]:!text-foreground",
          info: "group-[.toaster]:!border-blue-500/30 group-[.toaster]:!bg-card group-[.toaster]:!text-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
