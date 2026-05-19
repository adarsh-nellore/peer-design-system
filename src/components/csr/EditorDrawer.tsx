'use client';

import { useRouter } from "next/navigation";
import { Drawer } from "@/components/layout/Drawer";
import { Cluster } from "@/components/layout/Cluster";
import { Heading } from "@/components/typography/Heading";
import { IconButton } from "@/components/ui/IconButton";
import { Glyph } from "@/components/ui/Glyph";

type EditorDrawerProps = {
  open: boolean;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onCloseHref: string;
};

export function EditorDrawer({ open, title, children, footer, onCloseHref }: EditorDrawerProps) {
  const router = useRouter();
  const handleClose = () => router.push(onCloseHref);

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      size="md"
      header={
        <Cluster justify="between" align="center" wrap={false}>
          <Heading size="h4">{title}</Heading>
          <IconButton variant="ghost" size="md" onClick={handleClose} aria-label="Close">
            <Glyph name="x" size={14} />
          </IconButton>
        </Cluster>
      }
      footer={footer}
    >
      {children}
    </Drawer>
  );
}
