"use client";

/**
 * Template · settings
 * Source: Paper sheet · page · settings (node 7GM-0).
 * Composed onto the contract (docs/COMPOSITION.md):
 *   - AppShell + TopNav (PeerBrand + "Settings" MetaText breadcrumb + Avatar trailing)
 *   - LeftNav with two sections (account, organization)
 *   - Prose variant="narrow" centers the form column (max-w 640)
 *   - PageHeader kicker + title="Account" (h3) + Body description
 *   - Hairline dividers separate Profile / Preferences / footer
 *   - Stack rhythm for field rows; MetaLabel + Input/Select for each
 *   - Cluster justify="end" for Cancel + Save changes footer
 */

import { AppShell } from "@/components/layout/AppShell";
import { LeftNav } from "@/components/layout/LeftNav";
import { TopNav } from "@/components/layout/TopNav";
import { Stack } from "@/components/layout/Stack";
import { Cluster } from "@/components/layout/Cluster";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Hairline } from "@/components/ui/Hairline";
import { Input } from "@/components/ui/Input";
import { MetaLabel } from "@/components/ui/MetaLabel";
import { MetaText } from "@/components/ui/MetaText";
import { PeerBrand } from "@/components/ui/PeerBrand";
import { Select } from "@/components/ui/Select";
import { Body } from "@/components/typography/Body";
import { PageHeader } from "@/components/patterns/PageHeader";
import { Prose } from "@/components/patterns/Prose";

export default function SettingsTemplate() {
  return (
    <AppShell
      leftNavWidth={220}
      topBar={
        <TopNav
          brand={<PeerBrand size="md" />}
          breadcrumb={
            <MetaText size="md" tone="ink">Settings</MetaText>
          }
          trailing={<Avatar initials="AN" />}
        />
      }
      leftNav={
        <LeftNav
          sections={[
            {
              header: "account",
              items: [
                { label: "Profile",       icon: "dot", active: true },
                { label: "Security",      icon: "dot" },
                { label: "Notifications", icon: "dot" },
              ],
            },
            {
              header: "organization",
              items: [
                { label: "Members",   icon: "dot" },
                { label: "Workspace", icon: "dot" },
                { label: "Billing",   icon: "dot" },
              ],
            },
          ]}
        />
      }
    >
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="py-12 px-10">
          <Prose variant="narrow">

            <PageHeader
              kicker="PROFILE"
              title="Account"
              titleSize="h3"
            />
            <Body size="small" tone="muted">
              Update how Peer addresses you and the cadence of weekly digests.
            </Body>

            <Hairline />

            <Stack gap="block">
              <Stack gap="tight">
                <MetaLabel>DISPLAY NAME</MetaLabel>
                <Input defaultValue="Adarsh Nellore" />
              </Stack>

              <Stack gap="tight">
                <MetaLabel>EMAIL</MetaLabel>
                <Input type="email" defaultValue="adarsh@example.com" />
              </Stack>

              <Stack gap="tight">
                <MetaLabel>NOTIFICATION CADENCE</MetaLabel>
                <Select
                  value="daily"
                  options={[
                    { value: "realtime", label: "Real-time" },
                    { value: "daily",    label: "Daily digest" },
                    { value: "weekly",   label: "Weekly digest" },
                    { value: "off",      label: "Off" },
                  ]}
                />
              </Stack>
            </Stack>

            <Hairline />

            <Stack gap="comfortable">
              <MetaLabel>PREFERENCES</MetaLabel>

              <Cluster gap="cozy" align="start" wrap={false}>
                <Checkbox defaultChecked />
                <Stack gap="tight">
                  <Body size="small">Auto-cite referenced tables</Body>
                  <Body size="small" tone="muted">
                    Peer inserts a footnote whenever a Table is mentioned.
                  </Body>
                </Stack>
              </Cluster>

              <Cluster gap="cozy" align="start" wrap={false}>
                <Checkbox />
                <Stack gap="tight">
                  <Body size="small">Show hallucination flags inline</Body>
                  <Body size="small" tone="muted">
                    Highlight low-confidence claims as you draft, not just in review.
                  </Body>
                </Stack>
              </Cluster>
            </Stack>

            <Cluster gap="cozy" justify="end">
              <Button variant="ghost"   size="md">Cancel</Button>
              <Button variant="primary" size="md">Save changes</Button>
            </Cluster>

          </Prose>
        </div>
      </div>
    </AppShell>
  );
}
