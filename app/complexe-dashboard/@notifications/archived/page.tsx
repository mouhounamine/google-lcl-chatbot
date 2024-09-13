import { Card } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

function ArchivedNotifications() {
  return (
    <Card>
      <p> Archived Notifications </p>
      <br />
      <Link href="/complexe-dashboard">Default</Link>
    </Card>
  );
}

export default ArchivedNotifications;
