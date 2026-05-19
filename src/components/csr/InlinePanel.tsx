import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

type InlinePanelProps = {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

export function InlinePanel({ title, children, footer, className }: InlinePanelProps) {
  return (
    <Card
      variant="paper"
      padding="none"
      className={cn("mt-2 anim-fade-in", className)}
      header={<span className="text-ink text-xs font-semibold">{title}</span>}
      footer={footer}
    >
      <div className="px-3 py-3 space-y-2 max-h-72 overflow-y-auto scroll-tame text-sm">
        {children}
      </div>
    </Card>
  );
}
