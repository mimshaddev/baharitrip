import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { Sheet, SheetContent } from "../ui/sheet";

export const DashboardLayout = ({
  role,
  navItems,
  title,
  breadcrumb,
  children,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#FAF8F5] text-[#0A1929]" data-testid={`layout-${role}`}>
      <Sidebar role={role} items={navItems} />

      {/* Mobile sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="bg-[#0B1D2E] text-white w-72 p-0 border-r-0">
          <div className="-m-6">
            <Sidebar
              role={role}
              items={navItems}
              onNavigate={() => setMobileOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar
          role={role}
          title={title}
          breadcrumb={breadcrumb}
          onMenuClick={() => setMobileOpen(true)}
        />
        <main className="flex-1 p-5 md:p-8 lg:p-10 max-w-[1400px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export const Card = ({ children, className = "", ...rest }) => (
  <div
    className={`rounded-2xl border border-[#E5DCC5] bg-white p-6 ${className}`}
    {...rest}
  >
    {children}
  </div>
);

export const KpiCard = ({ label, value, delta, trend = "up" }) => (
  <Card className="hover:shadow-md transition-shadow" data-testid={`kpi-${label.toLowerCase().replace(/\s/g, "-")}`}>
    <p className="text-xs uppercase tracking-[0.18em] text-[#64748B] font-medium">
      {label}
    </p>
    <p className="font-serif text-3xl sm:text-4xl tracking-tight text-[#0A1929] mt-3">
      {value}
    </p>
    <p
      className={`mt-2 text-xs font-medium ${
        trend === "up" ? "text-[#005F73]" : "text-[#E05D36]"
      }`}
    >
      {trend === "up" ? "↗" : "↘"} {delta} dari periode sebelumnya
    </p>
  </Card>
);

export const StatusBadge = ({ status, statuses }) => {
  const s = statuses[status];
  if (!s) return null;
  return (
    <span
      className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${s.className}`}
    >
      {s.label}
    </span>
  );
};

export const PageHeader = ({ title, description, actions }) => (
  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
    <div>
      <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-[#0A1929]">
        {title}
      </h2>
      {description ? (
        <p className="mt-2 text-sm text-[#64748B] max-w-xl leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
    {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
  </div>
);

export const EmptyState = ({ title, description, icon: Icon }) => (
  <div className="rounded-2xl border border-dashed border-[#E5DCC5] bg-[#FAF8F5] p-12 text-center">
    {Icon ? (
      <div className="w-14 h-14 rounded-full bg-white border border-[#E5DCC5] flex items-center justify-center mx-auto mb-4">
        <Icon size={22} className="text-[#005F73]" strokeWidth={1.6} />
      </div>
    ) : null}
    <p className="font-serif text-xl text-[#0A1929]">{title}</p>
    <p className="text-sm text-[#64748B] mt-2 max-w-md mx-auto">{description}</p>
  </div>
);
