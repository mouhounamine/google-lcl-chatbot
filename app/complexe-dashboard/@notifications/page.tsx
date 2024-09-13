import { Card } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

function Notifications() {
  return (
    <Card>
      <p>Notifications</p> <br />
      <Link href="/complexe-dashboard/archived">Archived</Link>
    </Card>
  );
}

export default Notifications;
