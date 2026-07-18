import { useEffect, useMemo, useState } from 'react'
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Bell,
  Bot,
  Box,
  Building2,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDot,
  Clock3,
  Database,
  FileCheck2,
  FileKey2,
  Fingerprint,
  Globe2,
  KeyRound,
  LayoutDashboard,
  Link2,
  LockKeyhole,
  Menu,
  Network,
  Plus,
  Radio,
  RotateCcw,
  Search,
  Send,
  ServerCog,
  Settings,
  Shield,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Unplug,
  Users,
  X,
  Zap,
} from 'lucide-react'
import {
  activity,
  agents,
  flattenWorlds,
  initialConnections,
  initialConsents,
  transactions,
  worlds,
} from './data'

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'worlds', label: 'Worlds', icon: Globe2 },
  { id: 'directory', label: 'Directory', icon: Users },
  { id: 'connections', label: 'Connections', icon: Link2, count: 2 },
  { id: 'consents', label: 'Consents', icon: FileKey2 },
  { id: 'transactions', label: 'Transactions', icon: Activity },
]

const pageCopy = {
  overview: ['Cross-border overview', 'Governed data movement, at a glance.'],
  worlds: ['World navigator', 'Explore trust domains, boundaries and gateways.'],
  directory: ['Agent & locker directory', 'Discover governed endpoints across every world.'],
  connections: ['Cross-world connections', 'Request, review and manage gateway crossings.'],
  consents: ['Consent control', 'Purpose-limited permissions you can see and revoke.'],
  transactions: ['Transaction ledger', 'A permanent record of governed data exchange.'],
}

const statusClasses = {
  Established: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  Requested: 'bg-blue-50 text-blue-700 border-blue-200',
  Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Revoked: 'bg-slate-100 text-slate-500 border-slate-200',
  Approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
}

function Logo({ compact = false }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl bg-lime text-ink shadow-[0_8px_24px_rgba(184,245,69,0.22)]">
        <Globe2 size={21} strokeWidth={2.3} />
        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-cyan ring-2 ring-ink" />
      </div>
      {!compact && (
        <div>
          <div className="font-display text-[17px] font-extrabold tracking-[-0.03em] text-white">P3DX</div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500">Trust infrastructure</div>
        </div>
      )}
    </div>
  )
}

function Sidebar({ activePage, setActivePage, open, setOpen }) {
  return (
    <>
      {open && <button aria-label="Close navigation" className="fixed inset-0 z-30 bg-ink/50 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[252px] flex-col bg-ink px-4 py-5 text-slate-300 transition-transform duration-300 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-8 flex items-center justify-between px-2">
          <Logo />
          <button className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white lg:hidden" onClick={() => setOpen(false)}><X size={19} /></button>
        </div>

        <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">Workspace</div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = activePage === item.id
            return (
              <button
                key={item.id}
                onClick={() => { setActivePage(item.id); setOpen(false) }}
                className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-semibold transition ${active ? 'bg-white/10 text-white shadow-[inset_3px_0_0_#b8f545]' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
              >
                <Icon size={18} className={active ? 'text-lime' : 'text-slate-500 group-hover:text-slate-300'} />
                <span className="flex-1">{item.label}</span>
                {item.count && <span className="rounded-full bg-amber-400/15 px-2 py-0.5 text-[10px] text-amber-300">{item.count}</span>}
              </button>
            )
          })}
        </nav>

        <div className="my-5 h-px bg-white/5" />
        <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">Network</div>
        <div className="space-y-2 px-2">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.035] p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-300">Gateway network</span>
              <span className="flex items-center gap-1 text-[10px] font-semibold text-lime"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />Live</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-500"><Radio size={13} /> 8 of 9 gateways ready</div>
          </div>
        </div>

        <div className="mt-auto">
          <button className="mb-3 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold text-slate-500 hover:bg-white/5 hover:text-white">
            <Settings size={18} /> Settings
          </button>
          <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.04] p-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-lime text-xs font-extrabold text-ink">AM</div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-xs font-bold text-white">Aarav Mehta</div>
              <div className="truncate text-[10px] text-slate-500">Citizen · India</div>
            </div>
            <ChevronRight size={15} className="text-slate-600" />
          </div>
        </div>
      </aside>
    </>
  )
}

function Topbar({ activePage, setSidebarOpen, onConnect }) {
  const [title, description] = pageCopy[activePage]
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-canvas/90 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <button aria-label="Open navigation" className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm lg:hidden" onClick={() => setSidebarOpen(true)}><Menu size={19} /></button>
          <div className="min-w-0">
            <h1 className="truncate font-display text-lg font-extrabold tracking-[-0.025em] text-ink sm:text-xl">{title}</h1>
            <p className="hidden text-[11px] text-slate-500 sm:block">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button aria-label="Notifications" className="relative rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:text-ink">
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>
          <button onClick={onConnect} className="inline-flex items-center gap-2 rounded-xl bg-ink px-3.5 py-2.5 text-xs font-bold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-slate-800 sm:px-4">
            <Plus size={16} className="text-lime" /> <span className="hidden sm:inline">New connection</span><span className="sm:hidden">Connect</span>
          </button>
        </div>
      </div>
    </header>
  )
}

function StatCard({ label, value, note, icon: Icon, tone }) {
  return (
    <div className="card flex items-start justify-between p-4 sm:p-5">
      <div>
        <p className="text-[11px] font-semibold text-slate-500">{label}</p>
        <div className="mt-2 font-display text-2xl font-extrabold tracking-[-0.04em] text-ink">{value}</div>
        <p className="mt-1 text-[10px] font-medium text-slate-400">{note}</p>
      </div>
      <div className={`grid h-10 w-10 place-items-center rounded-xl ${tone}`}><Icon size={18} /></div>
    </div>
  )
}

function SectionHeader({ eyebrow, title, detail, action }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="mb-1 text-[9px] font-extrabold uppercase tracking-[0.18em] text-slate-400">{eyebrow}</p>}
        <h2 className="font-display text-lg font-extrabold tracking-[-0.025em] text-ink">{title}</h2>
        {detail && <p className="mt-1 max-w-2xl text-[11px] leading-relaxed text-slate-500">{detail}</p>}
      </div>
      {action}
    </div>
  )
}

function GatewayPill({ name, maintenance = false }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2.5 py-1.5 shadow-sm">
      <span className={`relative grid h-5 w-5 place-items-center rounded-full ${maintenance ? 'bg-amber-100 text-amber-600' : 'bg-ink text-lime'}`}>
        <Radio size={11} />
        {!maintenance && <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 animate-pulse rounded-full bg-lime ring-1 ring-white" />}
      </span>
      <span className="max-w-[120px] truncate text-[9px] font-bold text-slate-600">{name}</span>
    </div>
  )
}

function MiniWorld({ world, onSelect, nested = false }) {
  const tone = {
    violet: 'border-violet-200 bg-violet-50/70 hover:border-violet-400',
    rose: 'border-rose-200 bg-rose-50/70 hover:border-rose-400',
    blue: 'border-blue-200 bg-blue-50/70 hover:border-blue-400',
    cyan: 'border-cyan-200 bg-cyan-50/70 hover:border-cyan-400',
    emerald: 'border-emerald-200 bg-emerald-50/70 hover:border-emerald-400',
  }[world.color] || 'border-slate-200 bg-slate-50 hover:border-slate-400'
  return (
    <button onClick={() => onSelect(world)} className={`group relative w-full rounded-2xl border p-3 text-left transition hover:-translate-y-0.5 hover:shadow-card ${tone} ${nested ? 'min-h-[92px]' : 'min-h-[115px]'}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="grid h-8 w-8 place-items-center rounded-xl bg-white text-[10px] font-extrabold text-slate-700 shadow-sm">{world.short}</div>
        <GatewayPill name={world.gateway} maintenance={world.gatewayStatus === 'Maintenance'} />
      </div>
      <div className="mt-3 pr-4 text-[11px] font-extrabold text-ink">{world.name}</div>
      <div className="mt-1 text-[9px] font-medium text-slate-500">{world.region}</div>
      <ChevronRight size={14} className="absolute bottom-3 right-3 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-ink" />
    </button>
  )
}

function JurisdictionCard({ world, onSelect }) {
  return (
    <div className={`world-boundary relative rounded-[26px] border-2 border-dashed bg-white/70 p-3 sm:p-4 ${world.id === 'india' ? 'border-amber-300/70' : 'border-blue-300/70'}`}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <button onClick={() => onSelect(world)} className="flex min-w-0 items-center gap-2 text-left group">
          <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-[10px] font-extrabold ${world.id === 'india' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>{world.short}</span>
          <span className="min-w-0">
            <span className="block truncate text-xs font-extrabold text-ink group-hover:underline">{world.name}</span>
            <span className="block text-[9px] text-slate-400">{world.law}</span>
          </span>
        </button>
        <GatewayPill name={world.gateway} />
      </div>
      <div className={`grid gap-2 ${world.children?.length > 1 ? 'sm:grid-cols-2' : ''}`}>
        {world.children?.map((child) => (
          <div key={child.id} className={child.children?.length ? 'sm:col-span-2' : ''}>
            <MiniWorld world={child} onSelect={onSelect} />
            {child.children?.length > 0 && (
              <div className="mt-2 grid gap-2 pl-4 sm:grid-cols-2">
                {child.children.map((nested) => <MiniWorld key={nested.id} world={nested} onSelect={onSelect} nested />)}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute -bottom-2 left-5 rounded-full bg-white px-2 text-[8px] font-bold uppercase tracking-[0.15em] text-slate-400">Governed boundary</div>
    </div>
  )
}

function WorldMap({ onSelect, full = false }) {
  return (
    <div className={`relative overflow-hidden rounded-[26px] border border-slate-200 bg-[#f8fafb] ${full ? 'p-4 sm:p-6' : 'p-3 sm:p-4'}`}>
      <div className="map-grid absolute inset-0 opacity-40" />
      <div className="relative grid gap-10 lg:grid-cols-[1fr_72px_1fr] lg:gap-3">
        <JurisdictionCard world={worlds[0]} onSelect={onSelect} />
        <div className="relative flex min-h-[48px] items-center justify-center lg:min-h-0">
          <div className="absolute h-px w-full border-t-2 border-dashed border-slate-300 lg:h-full lg:w-px lg:border-l-2 lg:border-t-0" />
          <div className="relative z-10 grid h-12 w-12 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-card">
            <ArrowRight size={19} className="hidden lg:block" />
            <ChevronDown size={19} className="lg:hidden" />
            <span className="absolute -bottom-5 whitespace-nowrap text-[8px] font-extrabold uppercase tracking-[0.13em] text-slate-400">Cross-border</span>
          </div>
        </div>
        <JurisdictionCard world={worlds[1]} onSelect={onSelect} />
      </div>
      <div className="relative mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-200 pt-3 text-[9px] font-semibold text-slate-400">
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full border-2 border-dashed border-amber-400" /> World boundary</span>
        <span className="flex items-center gap-1.5"><Radio size={11} className="text-slate-700" /> Gateway</span>
        <span className="flex items-center gap-1.5"><Box size={11} className="text-violet-500" /> Locker domain</span>
        <span className="ml-auto flex items-center gap-1.5 text-amber-600"><span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> 1 gateway in maintenance</span>
      </div>
    </div>
  )
}

function RecentActivity() {
  return (
    <div className="card h-full p-5">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-sm font-extrabold text-ink">Live activity</h3>
        <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-emerald-600"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> Live</span>
      </div>
      <div className="space-y-1">
        {activity.map((item, index) => (
          <div key={item.title} className="group relative flex gap-3 rounded-xl p-2.5 hover:bg-slate-50">
            <div className="relative mt-1.5">
              <span className={`block h-2 w-2 rounded-full ${item.tone}`} />
              {index < activity.length - 1 && <span className="absolute left-[3px] top-3 h-[44px] w-px bg-slate-200" />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-bold text-slate-700">{item.title}</div>
              <div className="mt-0.5 truncate text-[9px] text-slate-400">{item.detail}</div>
            </div>
            <span className="text-[9px] font-medium text-slate-400">{item.time}</span>
          </div>
        ))}
      </div>
      <button className="mt-3 flex w-full items-center justify-center gap-1 rounded-xl border border-slate-200 py-2 text-[10px] font-bold text-slate-500 hover:border-slate-300 hover:text-ink">Open audit log <ArrowRight size={12} /></button>
    </div>
  )
}

function Overview({ onWorldSelect, setActivePage }) {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-[28px] bg-ink px-5 py-6 text-white shadow-soft sm:px-7 sm:py-7">
        <div className="hero-orbit absolute -right-16 -top-28 h-72 w-72 rounded-full border border-lime/20" />
        <div className="hero-orbit absolute -right-4 -top-16 h-48 w-48 rounded-full border border-cyan/20" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.13em] text-lime"><ShieldCheck size={12} /> Governed exchange active</div>
            <h2 className="max-w-xl font-display text-2xl font-extrabold leading-[1.12] tracking-[-0.04em] sm:text-3xl">Your data moves.<br /><span className="text-slate-400">Your rules move with it.</span></h2>
            <p className="mt-3 max-w-lg text-[11px] leading-relaxed text-slate-400">Navigate trusted worlds, approve precise access and watch every cross-border exchange pass through its governed gateway.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setActivePage('worlds')} className="rounded-xl bg-lime px-4 py-2.5 text-[11px] font-extrabold text-ink transition hover:-translate-y-0.5">Explore worlds</button>
            <button onClick={() => setActivePage('transactions')} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-[11px] font-bold text-white transition hover:bg-white/10">View activity</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard label="Connected worlds" value="8" note="Across 2 jurisdictions" icon={Globe2} tone="bg-blue-50 text-blue-600" />
        <StatCard label="Active connections" value="12" note="2 awaiting approval" icon={Link2} tone="bg-violet-50 text-violet-600" />
        <StatCard label="Live consents" value="7" note="All purpose-limited" icon={FileCheck2} tone="bg-emerald-50 text-emerald-600" />
        <StatCard label="Exchanges this month" value="284" note="100% gateway mediated" icon={Zap} tone="bg-amber-50 text-amber-600" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="card p-4 sm:p-5">
          <SectionHeader eyebrow="Trust topology" title="Your connected worlds" detail="Select any world to inspect its agents, lockers, policy and gateway." action={<button onClick={() => setActivePage('worlds')} className="hidden items-center gap-1 text-[10px] font-bold text-slate-500 hover:text-ink sm:flex">Full map <ArrowRight size={13} /></button>} />
          <WorldMap onSelect={onWorldSelect} />
        </div>
        <RecentActivity />
      </div>
    </div>
  )
}

function WorldDetails({ world, onClose, onEnter }) {
  if (!world) return null
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-ink/35 backdrop-blur-sm" onMouseDown={onClose}>
      <div className="h-full w-full max-w-[430px] overflow-y-auto bg-white p-5 shadow-2xl sm:p-7" onMouseDown={(event) => event.stopPropagation()}>
        <div className="mb-8 flex items-center justify-between">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-slate-400">World details</span>
          <button aria-label="Close world details" onClick={onClose} className="rounded-xl bg-slate-100 p-2 text-slate-500 hover:text-ink"><X size={18} /></button>
        </div>
        <div className="flex items-start gap-4">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-ink text-sm font-extrabold text-lime">{world.short}</div>
          <div>
            <h2 className="font-display text-2xl font-extrabold tracking-[-0.04em] text-ink">{world.name}</h2>
            <p className="mt-1 text-[11px] font-semibold text-slate-400">{world.region}</p>
          </div>
        </div>
        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500">Boundary health</span>
            <span className={`flex items-center gap-1.5 text-[10px] font-bold ${world.gatewayStatus === 'Maintenance' ? 'text-amber-600' : 'text-emerald-600'}`}><span className={`h-1.5 w-1.5 rounded-full ${world.gatewayStatus === 'Maintenance' ? 'bg-amber-500' : 'bg-emerald-500'}`} /> {world.gatewayStatus === 'Maintenance' ? 'Maintenance' : 'Enforced'}</span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200"><div className="h-full w-full rounded-full bg-gradient-to-r from-cyan to-lime" /></div>
        </div>
        <div className="mt-6 space-y-3">
          {[
            [Building2, 'Location', world.location],
            [Shield, 'Governance', world.law],
            [Radio, 'Single gateway', world.gateway],
            [Users, 'Resident agents', world.agents],
            [Box, 'Governed lockers', world.lockers],
          ].map(([Icon, label, value]) => (
            <div key={label} className="flex items-center gap-3 rounded-xl border border-slate-100 px-3 py-3">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-slate-500"><Icon size={15} /></div>
              <div className="flex-1"><div className="text-[9px] font-semibold text-slate-400">{label}</div><div className="mt-0.5 text-[11px] font-bold text-slate-700">{value}</div></div>
            </div>
          ))}
        </div>
        <div className="mt-7">
          <div className="mb-3 text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">Gateway policy</div>
          <div className="rounded-2xl bg-ink p-4 text-white">
            <div className="flex items-start gap-3"><ShieldCheck size={19} className="mt-0.5 text-lime" /><div><div className="text-xs font-bold">All crossings inspected</div><p className="mt-1 text-[10px] leading-relaxed text-slate-400">Identity, consent scope, purpose and destination policy are evaluated before entry.</p></div></div>
          </div>
        </div>
        <button onClick={() => onEnter(world)} disabled={world.gatewayStatus === 'Maintenance'} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-ink py-3 text-[11px] font-extrabold text-white disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500">{world.gatewayStatus === 'Maintenance' ? 'Gateway temporarily unavailable' : 'Enter through gateway'} {world.gatewayStatus !== 'Maintenance' && <ArrowRight size={15} className="text-lime" />}</button>
      </div>
    </div>
  )
}

function AgentProfile({ agent, onClose, onConnect }) {
  if (!agent) return null
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-ink/35 backdrop-blur-sm" onMouseDown={onClose}>
      <div className="h-full w-full max-w-[430px] overflow-y-auto bg-white p-5 shadow-2xl sm:p-7" onMouseDown={(event) => event.stopPropagation()}>
        <div className="mb-8 flex items-center justify-between">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-slate-400">Published agent profile</span>
          <button aria-label="Close agent profile" onClick={onClose} className="rounded-xl bg-slate-100 p-2 text-slate-500 hover:text-ink"><X size={18} /></button>
        </div>
        <div className="flex items-start gap-4">
          <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-sm font-extrabold ${agent.color}`}>{agent.type === 'AI agent' ? <Bot size={23} /> : agent.initials}</div>
          <div className="min-w-0">
            <div className="flex items-center gap-2"><h2 className="truncate font-display text-xl font-extrabold tracking-[-0.035em] text-ink">{agent.name}</h2><BadgeCheck size={16} className="shrink-0 text-emerald-500" /></div>
            <p className="mt-1 text-[11px] font-semibold text-slate-400">{agent.role}</p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <div><div className="text-[10px] font-extrabold text-emerald-800">Published endpoint</div><div className="mt-1 text-[9px] text-emerald-600">Available for governed requests</div></div>
          <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-emerald-600 text-white"><Link2 size={16} /><span className="absolute -right-1 -top-1 h-2.5 w-2.5 animate-pulse rounded-full bg-lime ring-2 ring-white" /></span>
        </div>
        <div className="mt-6 space-y-3">
          {[
            [Globe2, 'Resident world', agent.world],
            [Users, 'Agent type', agent.type],
            [Box, 'Published locker', agent.locker],
            [ShieldCheck, 'Trust status', agent.status],
          ].map(([Icon, label, value]) => (
            <div key={label} className="flex items-center gap-3 rounded-xl border border-slate-100 px-3 py-3">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-slate-500"><Icon size={15} /></div>
              <div><div className="text-[9px] font-semibold text-slate-400">{label}</div><div className="mt-0.5 text-[11px] font-bold text-slate-700">{value}</div></div>
            </div>
          ))}
        </div>
        <div className="mt-7">
          <div className="mb-3 text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">Data available in Locker</div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex flex-wrap gap-2">{(agent.records || [agent.locker]).map((record) => <span key={record} className="rounded-lg bg-white px-2.5 py-1.5 text-[9px] font-bold text-slate-600 shadow-sm">{record}</span>)}</div>
            <p className="mt-3 flex items-start gap-2 text-[9px] leading-relaxed text-slate-400"><LockKeyhole size={12} className="mt-0.5 shrink-0" />Only field names are public. Actual values require an Established connection and Active consent.</p>
          </div>
        </div>
        <div className="mt-7 rounded-2xl bg-ink p-4 text-white">
          <div className="flex items-start gap-3"><LockKeyhole size={18} className="mt-0.5 text-lime" /><div><div className="text-xs font-bold">Locker remains protected</div><p className="mt-1 text-[10px] leading-relaxed text-slate-400">A connection only opens a governed route. Data still requires a purpose-matched consent.</p></div></div>
        </div>
        <button onClick={() => onConnect(agent)} disabled={!agent.endpoint} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-ink py-3 text-[11px] font-extrabold text-white disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500">{agent.endpoint ? 'Request connection' : 'No public connection endpoint'} {agent.endpoint && <ArrowRight size={15} className="text-lime" />}</button>
      </div>
    </div>
  )
}

function WorldsPage({ onWorldSelect }) {
  const flat = flattenWorlds()
  return (
    <div className="space-y-6">
      <div className="card p-4 sm:p-6">
        <SectionHeader eyebrow="Interactive topology" title="A map of governed trust" detail="Worlds are nested domains. Every crossing is inspected by exactly one gateway at each boundary." />
        <WorldMap onSelect={onWorldSelect} full />
      </div>
      <div className="card overflow-hidden">
        <div className="border-b border-slate-200 p-5"><h3 className="text-sm font-extrabold text-ink">World registry</h3><p className="mt-1 text-[10px] text-slate-400">{flat.length} domains · {flat.length} gateways · 2 jurisdictions</p></div>
        <div className="divide-y divide-slate-100">
          {flat.map((world) => (
            <button key={world.id} onClick={() => onWorldSelect(world)} className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 sm:px-5">
              <div style={{ marginLeft: `${Math.min(world.depth * 18, 36)}px` }} className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[9px] font-extrabold ${world.depth === 0 ? 'bg-ink text-lime' : 'bg-slate-100 text-slate-600'}`}>{world.short}</div>
              <div className="min-w-0 flex-1"><div className="truncate text-[11px] font-bold text-slate-700">{world.name}</div><div className="text-[9px] text-slate-400">{world.region}</div></div>
              <div className="hidden items-center gap-2 sm:flex"><Radio size={13} className="text-slate-400" /><span className="text-[10px] font-semibold text-slate-500">{world.gateway}</span></div>
              <span className={`hidden rounded-full px-2 py-1 text-[9px] font-bold md:block ${world.gatewayStatus === 'Maintenance' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>{world.gatewayStatus}</span>
              <ChevronRight size={14} className="text-slate-300" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function DirectoryPage({ initialQuery = '', onAgentSelect, onConnect }) {
  const [query, setQuery] = useState(initialQuery)
  const [filter, setFilter] = useState('All')
  useEffect(() => setQuery(initialQuery), [initialQuery])
  const filters = ['All', 'Individual', 'Institution', 'AI agent']
  const filtered = agents.filter((agent) => {
    const matchesQuery = `${agent.name} ${agent.role} ${agent.world} ${agent.locker}`.toLowerCase().includes(query.toLowerCase())
    return matchesQuery && (filter === 'All' || agent.type === filter)
  })
  return (
    <div className="space-y-5">
      <div className="card p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div><h2 className="text-base font-extrabold text-ink">Discover governed participants</h2><p className="mt-1 text-[10px] text-slate-500">Only verified agents and published locker endpoints appear here.</p></div>
          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-[10px] font-bold text-emerald-700"><BadgeCheck size={14} /> {agents.filter((agent) => agent.endpoint).length} published endpoints</div>
        </div>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <label className="relative flex-1"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name, role, world or locker…" className="input px-10" />{query && <button type="button" aria-label="Clear directory search" onClick={() => setQuery('')} className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-ink"><X size={14} /></button>}</label>
          <div className="flex gap-1 overflow-x-auto rounded-xl bg-slate-100 p-1">
            {filters.map((item) => <button key={item} onClick={() => setFilter(item)} className={`whitespace-nowrap rounded-lg px-3 py-2 text-[10px] font-bold transition ${filter === item ? 'bg-white text-ink shadow-sm' : 'text-slate-500'}`}>{item}</button>)}
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
        {filtered.map((agent) => (
          <div key={agent.id} className="card group p-5 transition hover:-translate-y-1 hover:border-slate-300">
            <div className="flex items-start justify-between">
              <div className={`grid h-11 w-11 place-items-center rounded-2xl text-[11px] font-extrabold ${agent.color}`}>{agent.type === 'AI agent' ? <Bot size={19} /> : agent.initials}</div>
              <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-[8px] font-bold uppercase tracking-[0.1em] text-slate-500">{agent.status === 'Verified' ? <BadgeCheck size={10} /> : <ShieldCheck size={10} />}{agent.status}</span>
            </div>
            <h3 className="mt-4 text-sm font-extrabold text-ink">{agent.name}</h3>
            <p className="mt-1 text-[10px] font-semibold text-slate-400">{agent.role}</p>
            <div className="my-4 h-px bg-slate-100" />
            <div className="space-y-2 text-[10px]">
              <div className="flex items-center gap-2 text-slate-500"><Globe2 size={13} className="text-slate-400" /><span className="truncate">{agent.world}</span></div>
              <div className="flex items-center gap-2 text-slate-500"><Box size={13} className="text-slate-400" /><span className="truncate">{agent.locker}</span>{agent.endpoint && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-500" />}</div>
              {agent.records && <div className="flex items-center gap-2 text-slate-500"><Database size={13} className="text-slate-400" /><span>{agent.records.length} data fields available</span></div>}
            </div>
            <div className="mt-5 flex gap-2">
              <button onClick={() => onAgentSelect(agent)} className="flex-1 rounded-xl border border-slate-200 py-2.5 text-[10px] font-bold text-slate-600 hover:border-slate-300 hover:text-ink">View profile</button>
              <button aria-label={`Request connection to ${agent.name}`} title={`Request connection to ${agent.name}`} onClick={() => onConnect(agent)} disabled={!agent.endpoint} className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-lime disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-300"><Link2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && <div className="card grid min-h-[240px] place-items-center text-center"><div><Search size={28} className="mx-auto text-slate-300" /><p className="mt-3 text-sm font-bold text-slate-600">No endpoints found</p><p className="mt-1 text-[10px] text-slate-400">Try another search or participant type.</p></div></div>}
    </div>
  )
}

function ConnectionPath({ item }) {
  return (
    <div className="flex min-w-0 items-center gap-2 sm:gap-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-slate-100 text-[9px] font-extrabold text-slate-600">{item.sourceShort}</div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center justify-between text-[8px] font-bold text-slate-400"><span className="truncate">{item.source}</span><span className="hidden truncate text-right sm:block">{item.target}</span></div>
        <div className="relative flex items-center"><div className="h-px w-full border-t-2 border-dashed border-slate-300" /><div className={`absolute left-1/2 grid h-5 w-5 -translate-x-1/2 place-items-center rounded-full ring-4 ring-white ${item.state === 'Established' ? 'bg-ink text-lime' : 'bg-slate-200 text-slate-500'}`}><Radio size={10} /></div></div>
        <div className="mt-1 truncate text-center text-[8px] font-semibold text-slate-400">{item.gateway}</div>
      </div>
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-blue-50 text-[9px] font-extrabold text-blue-600">{item.targetShort}</div>
    </div>
  )
}

function ConnectionsPage({ connections, setConnections, onEstablished, onNew, onNotify }) {
  const [filter, setFilter] = useState('All')
  const shown = filter === 'All' ? connections : connections.filter((item) => item.state === filter)
  const advance = (id) => {
    const connection = connections.find((item) => item.id === id)
    if (!connection) return
    const nextState = connection.state === 'Requested' ? 'Pending' : 'Established'
    const updatedConnection = { ...connection, state: nextState, updated: 'Just now' }
    setConnections((current) => current.map((item) => item.id === id ? updatedConnection : item))
    if (nextState === 'Established') {
      onEstablished(updatedConnection)
    } else {
      onNotify('The destination Gateway is reviewing the request.')
    }
  }
  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Established" value={connections.filter((x) => x.state === 'Established').length} note="Ready for consented exchange" icon={Link2} tone="bg-emerald-50 text-emerald-600" />
        <StatCard label="Pending approval" value={connections.filter((x) => x.state === 'Pending').length} note="Gateway policy review" icon={Clock3} tone="bg-amber-50 text-amber-600" />
        <StatCard label="New requests" value={connections.filter((x) => x.state === 'Requested').length} note="Awaiting destination" icon={Send} tone="bg-blue-50 text-blue-600" />
      </div>
      <div className="card overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div><h2 className="text-sm font-extrabold text-ink">Connection registry</h2><p className="mt-1 text-[10px] text-slate-400">Every connection enters through the destination gateway.</p></div>
          <div className="flex items-center gap-2 overflow-x-auto">
            {['All', 'Established', 'Pending', 'Requested'].map((item) => <button key={item} onClick={() => setFilter(item)} className={`rounded-lg px-3 py-1.5 text-[9px] font-bold ${filter === item ? 'bg-ink text-white' : 'bg-slate-100 text-slate-500'}`}>{item}</button>)}
            <button onClick={onNew} className="ml-1 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-lime text-ink"><Plus size={15} /></button>
          </div>
        </div>
        <div className="divide-y divide-slate-100">
          {shown.map((item) => (
            <div key={item.id} className="grid gap-4 p-4 hover:bg-slate-50/70 sm:p-5 lg:grid-cols-[120px_minmax(280px,1fr)_190px_100px] lg:items-center">
              <div><div className="text-[10px] font-extrabold text-slate-700">{item.id}</div><div className="mt-1 text-[9px] text-slate-400">{item.updated}</div></div>
              <ConnectionPath item={item} />
              <div><div className="text-[9px] font-semibold text-slate-400">Purpose</div><div className="mt-1 truncate text-[10px] font-bold text-slate-600">{item.purpose}</div></div>
              <div className="flex items-center justify-between gap-2 lg:justify-end">
                <span className={`rounded-full border px-2.5 py-1 text-[9px] font-bold ${statusClasses[item.state]}`}>{item.state}</span>
                {item.state !== 'Established' && <button title="Advance demo state" onClick={() => advance(item.id)} className="grid h-7 w-7 place-items-center rounded-lg bg-slate-100 text-slate-500 hover:bg-ink hover:text-lime"><ChevronRight size={13} /></button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ConsentCard({ consent, onApprove, onRevoke, onRestore }) {
  const revoked = consent.status === 'Revoked'
  const pending = consent.status === 'Pending'
  return (
    <div className={`card overflow-hidden p-5 ${revoked ? 'opacity-70' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <div className={`grid h-10 w-10 place-items-center rounded-xl ${revoked ? 'bg-slate-100 text-slate-400' : pending ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}><FileKey2 size={18} /></div>
        <span className={`rounded-full border px-2.5 py-1 text-[9px] font-bold ${statusClasses[consent.status]}`}>{consent.status}</span>
      </div>
      <h3 className="mt-4 text-sm font-extrabold text-ink">{consent.title}</h3>
      <p className="mt-1 text-[10px] text-slate-400">{consent.id} · {pending ? 'Awaiting approval from' : 'Granted by'} {consent.owner}</p>
      <div className="mt-4 rounded-xl bg-slate-50 p-3">
        <div className="text-[8px] font-extrabold uppercase tracking-[0.13em] text-slate-400">Data in scope</div>
        <div className="mt-2 flex flex-wrap gap-1.5">{consent.data.map((item) => <span key={item} className="rounded-md bg-white px-2 py-1 text-[9px] font-semibold text-slate-600 shadow-sm">{item}</span>)}</div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 text-[10px]">
        <div><div className="text-[8px] font-bold uppercase tracking-[0.1em] text-slate-400">Recipient</div><div className="mt-1 truncate font-bold text-slate-600">{consent.recipient}</div></div>
        <div><div className="text-[8px] font-bold uppercase tracking-[0.1em] text-slate-400">Valid until</div><div className="mt-1 font-bold text-slate-600">{consent.validUntil}</div></div>
      </div>
      <div className="mt-4">
        <div className="mb-1.5 flex justify-between text-[8px] font-bold text-slate-400"><span>Usage</span><span>{consent.uses} of {consent.limit} accesses</span></div>
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${revoked ? 'bg-slate-300' : 'bg-emerald-500'}`} style={{ width: `${Math.min((consent.uses / consent.limit) * 100, 100)}%` }} /></div>
      </div>
      <div className="mt-4 flex items-start gap-2 text-[9px] leading-relaxed text-slate-400"><ShieldCheck size={12} className="mt-0.5 shrink-0" />{consent.conditions}</div>
      {pending ? (
        <div className="mt-5 grid grid-cols-2 gap-2">
          <button onClick={() => onRevoke(consent.id)} className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-[10px] font-bold text-slate-500 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"><X size={13} /> Reject as too broad</button>
          <button onClick={() => onApprove(consent.id)} className="flex items-center justify-center gap-2 rounded-xl bg-ink py-2.5 text-[10px] font-bold text-white"><Check size={13} className="text-lime" /> Grant consent</button>
        </div>
      ) : (
        <button onClick={() => revoked ? onRestore(consent.id) : onRevoke(consent.id)} className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl border py-2.5 text-[10px] font-bold ${revoked ? 'border-slate-200 text-slate-500 hover:text-ink' : 'border-rose-200 text-rose-600 hover:bg-rose-50'}`}>{revoked ? <RotateCcw size={13} /> : <Unplug size={13} />}{revoked ? 'Restore for demo' : 'Revoke consent'}</button>
      )}
    </div>
  )
}

function ConsentsPage({ consents, setConsents, onNotify }) {
  const [tab, setTab] = useState('All')
  const shown = tab === 'All' ? consents : consents.filter((item) => item.status === tab)
  const update = (id, status) => {
    const expiry = new Date()
    expiry.setDate(expiry.getDate() + 30)
    const activeUntil = expiry.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    setConsents((current) => current.map((item) => item.id === id ? { ...item, status, validUntil: status === 'Revoked' ? 'Revoked just now' : activeUntil } : item))
    onNotify(status === 'Revoked' ? 'Request rejected or revoked. Ask the requester to send a smaller data scope.' : 'Consent granted for the complete requested scope.')
  }
  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-[26px] bg-ink p-5 text-white sm:p-6">
        <div className="absolute right-5 top-1/2 hidden -translate-y-1/2 sm:block"><Fingerprint size={96} strokeWidth={0.7} className="text-lime/20" /></div>
        <div className="relative max-w-xl"><span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-lime"><KeyRound size={12} /> You remain in control</span><h2 className="mt-3 text-xl font-extrabold tracking-[-0.03em]">Permission is precise, visible and reversible.</h2><p className="mt-2 text-[10px] leading-relaxed text-slate-400">Every grant names the data, purpose, recipient, duration and conditions. Revoke once and every gateway enforces it.</p></div>
      </div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex overflow-x-auto rounded-xl bg-slate-200/60 p-1">{['All', 'Pending', 'Active', 'Revoked'].map((item) => <button key={item} onClick={() => setTab(item)} className={`rounded-lg px-4 py-2 text-[10px] font-bold ${tab === item ? 'bg-white text-ink shadow-sm' : 'text-slate-500'}`}>{item}</button>)}</div>
        <span className="text-[10px] font-semibold text-slate-400">{shown.length} consents</span>
      </div>
      <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">{shown.map((consent) => <ConsentCard key={consent.id} consent={consent} onApprove={(id) => update(id, 'Active')} onRevoke={(id) => update(id, 'Revoked')} onRestore={(id) => update(id, 'Active')} />)}</div>
    </div>
  )
}

function TransactionsPage() {
  const [query, setQuery] = useState('')
  const [onlyAI, setOnlyAI] = useState(false)
  const shown = transactions.filter((item) => `${item.id} ${item.actor} ${item.data} ${item.source} ${item.target} ${item.consent}`.toLowerCase().includes(query.toLowerCase()) && (!onlyAI || item.automated))
  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Successful exchanges" value="99.7%" note="Across all gateways" icon={ShieldCheck} tone="bg-emerald-50 text-emerald-600" />
        <StatCard label="AI initiated" value="62%" note="Purpose verified each time" icon={Bot} tone="bg-violet-50 text-violet-600" />
        <StatCard label="Median decision time" value="184ms" note="Policy + consent evaluation" icon={Zap} tone="bg-amber-50 text-amber-600" />
      </div>
      <div className="card overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div><h2 className="text-sm font-extrabold text-ink">Immutable exchange ledger</h2><p className="mt-1 text-[10px] text-slate-400">Who shared what, with whom, why, and through which gateways.</p></div>
          <div className="flex gap-2"><label className="relative"><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search ledger" className="input w-full py-2 pl-9 text-[10px] sm:w-48" /></label><button onClick={() => setOnlyAI(!onlyAI)} className={`grid h-9 w-9 place-items-center rounded-xl border ${onlyAI ? 'border-violet-300 bg-violet-50 text-violet-600' : 'border-slate-200 bg-white text-slate-500'}`} title="Show AI activity only"><Bot size={15} /></button></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-left">
            <thead><tr className="border-b border-slate-100 bg-slate-50 text-[8px] font-extrabold uppercase tracking-[0.12em] text-slate-400"><th className="px-5 py-3">Event</th><th className="px-4 py-3">Actor</th><th className="px-4 py-3">Exchange</th><th className="px-4 py-3">Consent</th><th className="px-4 py-3">Gateway route</th><th className="px-4 py-3">Outcome</th></tr></thead>
            <tbody className="divide-y divide-slate-100">{shown.map((item) => (
              <tr key={item.id} className="text-[10px] hover:bg-slate-50/70">
                <td className="px-5 py-4"><div className="font-bold text-slate-700">{item.id}</div><div className="mt-1 text-[8px] text-slate-400">{item.time}</div></td>
                <td className="px-4 py-4"><div className="flex items-center gap-2"><div className={`grid h-7 w-7 place-items-center rounded-lg ${item.automated ? 'bg-violet-50 text-violet-600' : 'bg-slate-100 text-slate-600'}`}>{item.automated ? <Bot size={13} /> : <Users size={13} />}</div><div><div className="font-bold text-slate-600">{item.actor}</div><div className="mt-0.5 text-[8px] text-slate-400">{item.action} data</div></div></div></td>
                <td className="px-4 py-4"><div className="font-bold text-slate-600">{item.data}</div><div className="mt-1 max-w-[190px] truncate text-[8px] text-slate-400">{item.source} → {item.target}</div></td>
                <td className="px-4 py-4"><span className={item.consent.startsWith('CS') ? 'font-bold text-blue-600' : 'text-amber-600'}>{item.consent}</span></td>
                <td className="px-4 py-4"><div className="flex items-center gap-1.5 text-[9px] font-semibold text-slate-500"><Radio size={12} /> <span className="max-w-[170px] truncate">{item.gateway}</span></div></td>
                <td className="px-4 py-4"><span className={`rounded-full border px-2 py-1 text-[8px] font-bold ${statusClasses[item.outcome]}`}>{item.outcome}</span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

const requestedDataOptions = {
  'Bengaluru University': ['Degree title', 'Graduation year', 'Final grade', 'Attendance percentage', 'Student ID'],
  'Kaveri Health Network': ['Insurance eligibility', 'Medical summary', 'Blood group', 'Treatment history'],
  'Tax Identity Office': ['Tax identity', 'Residency status', 'Income certificate'],
  'MIT': ['Employment status', 'Job title', 'Employment dates'],
  'MIT HR & Records': ['Employment eligibility', 'Offer status', 'Background check result'],
  'Aarav Mehta': ['Identity proof', 'Degree title', 'Graduation year', 'Final grade'],
}

function getRequestedDataOptions(target) {
  return requestedDataOptions[target] || ['Verified record', 'Credential status']
}

function getDefaultRequestedData(target) {
  return getRequestedDataOptions(target).slice(0, target === 'Bengaluru University' ? 3 : 2)
}

function NewConnectionModal({ open, initialTarget = 'MIT', onClose, onSubmit }) {
  const [step, setStep] = useState(1)
  const [source, setSource] = useState(initialTarget === 'MIT' ? 'Aarav Mehta' : 'MIT')
  const [target, setTarget] = useState(initialTarget)
  const [purpose, setPurpose] = useState('')
  const [requestedData, setRequestedData] = useState(() => getDefaultRequestedData(initialTarget))
  const targetOptions = [...new Set([initialTarget, 'MIT', 'MIT HR & Records', 'Bengaluru University', 'Kaveri Health Network'])].filter(Boolean)
  if (!open) return null
  const toggleRequestedData = (field) => {
    setRequestedData((current) => current.includes(field) ? current.filter((item) => item !== field) : [...current, field])
  }
  const changeTarget = (nextTarget) => {
    setTarget(nextTarget)
    setRequestedData(getDefaultRequestedData(nextTarget))
  }
  const submit = () => {
    onSubmit({
      id: `CN-${2050 + Math.floor(Math.random() * 40)}`,
      source,
      sourceShort: source.split(' ').map((x) => x[0]).join('').slice(0, 2).toUpperCase(),
      target,
      targetShort: target.split(' ').map((x) => x[0]).join('').slice(0, 2).toUpperCase(),
      purpose: purpose || 'Governed data exchange',
      requestedData,
      state: 'Requested',
      updated: 'Just now',
      gateway: 'Source → Destination',
      owner: 'Aarav Mehta',
    })
    setStep(1); setPurpose(''); onClose()
  }
  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-ink/50 p-4 backdrop-blur-sm" onMouseDown={onClose}>
      <div className="w-full max-w-[560px] rounded-[26px] bg-white shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between border-b border-slate-100 p-5 sm:p-6">
          <div><span className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-slate-400">Gateway request</span><h2 className="mt-1 text-lg font-extrabold text-ink">Create a cross-world connection</h2></div>
          <button aria-label="Close connection request" onClick={onClose} className="rounded-xl bg-slate-100 p-2 text-slate-500"><X size={17} /></button>
        </div>
        <div className="px-5 pt-5 sm:px-6">
          <div className="flex items-center">{['Route', 'Scope', 'Review'].map((item, index) => <div key={item} className="flex flex-1 items-center last:flex-none"><div className="flex flex-col items-center gap-1"><div className={`grid h-7 w-7 place-items-center rounded-full text-[9px] font-extrabold ${step >= index + 1 ? 'bg-ink text-lime' : 'bg-slate-100 text-slate-400'}`}>{step > index + 1 ? <Check size={12} /> : index + 1}</div><span className="text-[8px] font-bold text-slate-400">{item}</span></div>{index < 2 && <div className={`mx-2 h-px flex-1 ${step > index + 1 ? 'bg-ink' : 'bg-slate-200'}`} />}</div>)}</div>
        </div>
        <div className="min-h-[260px] p-5 sm:p-6">
          {step === 1 && <div className="space-y-4"><div><label className="label">Requester (who needs the data)</label><select className="input" value={source} onChange={(e) => setSource(e.target.value)}><option>MIT</option><option>MIT HR & Records</option><option>Bengaluru University</option><option>Kaveri Health Network</option><option>Tax Identity Office</option><option>Aarav Mehta</option></select></div><div className="flex items-center gap-3 px-2"><div className="h-px flex-1 bg-slate-200" /><span className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-[0.12em] text-slate-400"><Radio size={11} /> Gateway crossing</span><div className="h-px flex-1 bg-slate-200" /></div><div><label className="label">Record holder (who has the data)</label><select className="input" value={target} onChange={(e) => changeTarget(e.target.value)}>{targetOptions.map((option) => <option key={option}>{option}</option>)}</select></div></div>}
          {step === 2 && <div><label className="label">Purpose of access</label><textarea value={purpose} onChange={(e) => setPurpose(e.target.value)} autoFocus rows={3} placeholder="e.g. Verify my degree for pre-employment screening" className="input resize-none" /><div className="mt-4"><div className="flex items-center justify-between"><label className="label mb-0">Minimum data required</label><span className="text-[9px] font-bold text-slate-400">{requestedData.length} selected</span></div><p className="mt-1 text-[9px] leading-relaxed text-slate-400">Request only what is necessary. The owner will grant or reject this complete scope.</p><div className="mt-3 grid grid-cols-2 gap-2">{getRequestedDataOptions(target).map((field) => { const selected = requestedData.includes(field); return <button type="button" aria-pressed={selected} key={field} onClick={() => toggleRequestedData(field)} className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-[9px] font-bold transition ${selected ? 'border-ink bg-ink text-white' : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'}`}><span className={`grid h-4 w-4 shrink-0 place-items-center rounded ${selected ? 'bg-lime text-ink' : 'bg-slate-100 text-slate-400'}`}>{selected && <Check size={10} />}</span>{field}</button> })}</div></div><div className="mt-3 flex gap-2 rounded-xl bg-blue-50 p-3 text-[9px] leading-relaxed text-blue-700"><ShieldCheck size={14} className="shrink-0" /> A broad request can be rejected. Send a new request with a smaller scope if needed.</div></div>}
          {step === 3 && <div className="space-y-3"><div className="rounded-xl border border-slate-200 p-3"><div className="text-[8px] font-bold uppercase tracking-[0.1em] text-slate-400">Route</div><div className="mt-2 flex items-center gap-2 text-[10px] font-bold text-slate-700"><span className="truncate">{source}</span><ArrowRight size={13} className="shrink-0 text-slate-400" /><span className="truncate">{target}</span></div></div><div className="rounded-xl border border-slate-200 p-3"><div className="text-[8px] font-bold uppercase tracking-[0.1em] text-slate-400">Declared purpose</div><p className="mt-2 text-[10px] font-semibold leading-relaxed text-slate-600">{purpose || 'Governed data exchange'}</p></div><div className="rounded-xl border border-slate-200 p-3"><div className="text-[8px] font-bold uppercase tracking-[0.1em] text-slate-400">Data requested</div><div className="mt-2 flex flex-wrap gap-1.5">{requestedData.map((field) => <span key={field} className="rounded-md bg-slate-100 px-2 py-1 text-[9px] font-semibold text-slate-600">{field}</span>)}</div></div><div className="flex gap-2 rounded-xl bg-emerald-50 p-3 text-[9px] font-semibold text-emerald-700"><ShieldCheck size={14} /> No data moves until the complete scope receives consent.</div></div>}
        </div>
        <div className="flex items-center justify-between border-t border-slate-100 p-5 sm:px-6">
          <button onClick={() => step === 1 ? onClose() : setStep(step - 1)} className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500"><ArrowLeft size={13} /> {step === 1 ? 'Cancel' : 'Back'}</button>
          <button disabled={step === 2 && (!purpose.trim() || requestedData.length === 0)} onClick={() => step === 3 ? submit() : setStep(step + 1)} className="flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-[10px] font-extrabold text-white disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400">{step === 3 ? 'Send request' : 'Continue'} {step === 3 ? <Send size={13} className="text-lime" /> : <ArrowRight size={13} className="text-lime" />}</button>
        </div>
      </div>
    </div>
  )
}

function Toast({ message }) {
  if (!message) return null
  return <div className="fixed bottom-5 right-5 z-[60] flex max-w-[360px] items-center gap-3 rounded-2xl bg-ink px-4 py-3 text-[11px] font-semibold text-white shadow-2xl"><span className="grid h-6 w-6 place-items-center rounded-full bg-lime text-ink"><Check size={13} /></span>{message}</div>
}

export default function App() {
  const [activePage, setActivePage] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedWorld, setSelectedWorld] = useState(null)
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [directoryQuery, setDirectoryQuery] = useState('')
  const [connections, setConnections] = useState(initialConnections)
  const [consents, setConsents] = useState(initialConsents)
  const [connectionModal, setConnectionModal] = useState(false)
  const [connectionTarget, setConnectionTarget] = useState('Bengaluru University')
  const [toast, setToast] = useState('')

  const notify = (message) => {
    setToast(message)
    window.clearTimeout(window.__p3dxToast)
    window.__p3dxToast = window.setTimeout(() => setToast(''), 3200)
  }

  const openConnection = (target = 'Bengaluru University') => {
    setConnectionTarget(target)
    setConnectionModal(true)
  }

  const createConsentRequest = (connection) => {
    const lowerPurpose = connection.purpose.toLowerCase()
    const requestedData = connection.requestedData?.length
      ? connection.requestedData
      : lowerPurpose.includes('degree') || lowerPurpose.includes('grade')
        ? ['Degree title', 'Graduation year', 'Final grade']
        : ['Requested record']
    const consentRequest = {
      id: `CS-${connection.id.replace('CN-', '')}`,
      connectionId: connection.id,
      title: connection.purpose === 'Governed data exchange' ? 'New data access request' : connection.purpose,
      data: requestedData,
      purpose: connection.purpose,
      recipient: connection.source,
      owner: 'Aarav Mehta',
      validUntil: 'Not active yet',
      status: 'Pending',
      uses: 0,
      limit: 5,
      conditions: 'Purpose-limited · No onward sharing',
    }
    setConsents((current) => current.some((item) => item.connectionId === connection.id) ? current : [consentRequest, ...current])
    notify('Connection established. A new consent request is waiting for Aarav.')
  }

  const navigate = (page) => {
    if (page === 'directory') setDirectoryQuery('')
    setActivePage(page)
  }

  const page = useMemo(() => {
    if (activePage === 'worlds') return <WorldsPage onWorldSelect={setSelectedWorld} />
    if (activePage === 'directory') return <DirectoryPage initialQuery={directoryQuery} onAgentSelect={setSelectedAgent} onConnect={(agent) => openConnection(agent.name)} />
    if (activePage === 'connections') return <ConnectionsPage connections={connections} setConnections={setConnections} onEstablished={createConsentRequest} onNew={() => openConnection()} onNotify={notify} />
    if (activePage === 'consents') return <ConsentsPage consents={consents} setConsents={setConsents} onNotify={notify} />
    if (activePage === 'transactions') return <TransactionsPage />
    return <Overview onWorldSelect={setSelectedWorld} setActivePage={setActivePage} />
  }, [activePage, connections, consents, directoryQuery])

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Sidebar activePage={activePage} setActivePage={navigate} open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="min-h-screen lg:pl-[252px]">
        <Topbar activePage={activePage} setSidebarOpen={setSidebarOpen} onConnect={() => openConnection()} />
        <main className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8"><div className="mx-auto max-w-[1500px]">{page}</div></main>
      </div>
      <WorldDetails world={selectedWorld} onClose={() => setSelectedWorld(null)} onEnter={(world) => { setDirectoryQuery(world.name); setActivePage('directory'); setSelectedWorld(null); notify(`Entered ${world.name} through ${world.gateway}`) }} />
      <AgentProfile agent={selectedAgent} onClose={() => setSelectedAgent(null)} onConnect={(agent) => { setSelectedAgent(null); openConnection(agent.name) }} />
      <NewConnectionModal key={`${connectionModal}-${connectionTarget}`} open={connectionModal} initialTarget={connectionTarget} onClose={() => setConnectionModal(false)} onSubmit={(item) => { setConnections((current) => [item, ...current]); notify('Connection request sent to the destination gateway.') }} />
      <Toast message={toast} />
    </div>
  )
}
