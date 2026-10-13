import React, { useMemo, useState } from 'react';
import {
  LayoutDashboard, Users, Building2, BriefcaseBusiness, FileText, CalendarDays,
  ChartNoAxesCombined, Settings, Search, Bell, ChevronDown, Plus, ArrowUpRight,
  ArrowRight, MoreHorizontal, MapPin, Clock3, CheckCircle2, CircleDashed,
  X, GraduationCap, Menu, Download, Filter, Sparkles, Mail, Phone, Trash2,
  Eye, SlidersHorizontal
} from 'lucide-react';

const initialJobs = [
  { id: 1, company: 'Google', role: 'Software Engineer', type: 'Full-time', package: '₹24 LPA', location: 'Bengaluru', deadline: 'Oct 28, 2026', eligible: 'CSE, IT, ECE', minCgpa: 8.0, applicants: 48, status: 'Open', color: 'google' },
  { id: 2, company: 'Infosys', role: 'Systems Engineer', type: 'Full-time', package: '₹6.5 LPA', location: 'Chennai', deadline: 'Oct 30, 2026', eligible: 'All departments', minCgpa: 6.5, applicants: 126, status: 'Open', color: 'infosys' },
  { id: 3, company: 'Zoho', role: 'Frontend Developer', type: 'Full-time', package: '₹8 LPA', location: 'Chennai', deadline: 'Nov 02, 2026', eligible: 'CSE, IT, ECE', minCgpa: 7.0, applicants: 64, status: 'Open', color: 'zoho' },
  { id: 4, company: 'Accenture', role: 'Associate Software Engineer', type: 'Full-time', package: '₹4.6 LPA', location: 'Bengaluru', deadline: 'Nov 05, 2026', eligible: 'All departments', minCgpa: 6.0, applicants: 92, status: 'Open', color: 'accenture' },
  { id: 5, company: 'Freshworks', role: 'Product Design Intern', type: 'Internship', package: '₹35K / month', location: 'Chennai', deadline: 'Nov 08, 2026', eligible: 'CSE, IT, Design', minCgpa: 7.0, applicants: 31, status: 'Open', color: 'freshworks' },
  { id: 6, company: 'TCS', role: 'Digital Engineer', type: 'Full-time', package: '₹7 LPA', location: 'Chennai', deadline: 'Oct 18, 2026', eligible: 'All departments', minCgpa: 7.5, applicants: 83, status: 'Closing soon', color: 'tcs' }
];
const initialStudents = [
  { id: 1, name: 'Ananya Krishnan', roll: 'CSE2024001', dept: 'CSE', cgpa: 9.1, skills: 'React, JavaScript, SQL', status: 'Placed', company: 'Zoho', email: 'ananya.k@example.edu' },
  { id: 2, name: 'Rahul S', roll: 'CSE2024014', dept: 'CSE', cgpa: 8.4, skills: 'Java, Spring Boot, MySQL', status: 'Interview', company: 'Google', email: 'rahul.s@example.edu' },
  { id: 3, name: 'Priya Menon', roll: 'IT2024022', dept: 'IT', cgpa: 8.8, skills: 'Python, ML, Data Analysis', status: 'Placed', company: 'Infosys', email: 'priya.m@example.edu' },
  { id: 4, name: 'Arjun Kumar', roll: 'ECE2024031', dept: 'ECE', cgpa: 7.2, skills: 'C++, IoT, Python', status: 'Applied', company: 'Accenture', email: 'arjun.k@example.edu' },
  { id: 5, name: 'Meera R', roll: 'CSE2024050', dept: 'CSE', cgpa: 8.0, skills: 'Figma, HTML, CSS', status: 'Shortlisted', company: 'Freshworks', email: 'meera.r@example.edu' },
  { id: 6, name: 'Karthik V', roll: 'MECH2024018', dept: 'MECH', cgpa: 6.9, skills: 'AutoCAD, Python', status: 'Applied', company: 'TCS', email: 'karthik.v@example.edu' }
];
const initialCompanies = [
  { id: 1, name: 'Google', industry: 'Technology', roles: 2, package: '₹24 LPA', contact: 'campus@google.com', color: 'google' },
  { id: 2, name: 'Infosys', industry: 'IT Services', roles: 3, package: '₹6.5 LPA', contact: 'careers@infosys.com', color: 'infosys' },
  { id: 3, name: 'Zoho', industry: 'Software', roles: 2, package: '₹8 LPA', contact: 'recruitment@zoho.com', color: 'zoho' },
  { id: 4, name: 'Accenture', industry: 'Consulting & IT', roles: 2, package: '₹4.6 LPA', contact: 'campus@accenture.com', color: 'accenture' },
  { id: 5, name: 'Freshworks', industry: 'SaaS', roles: 1, package: '₹35K / month', contact: 'talent@freshworks.com', color: 'freshworks' }
];
const nav = [
  { group: 'WORKSPACE', items: [{ id: 'Overview', icon: LayoutDashboard }, { id: 'Students', icon: Users }, { id: 'Companies', icon: Building2 }, { id: 'Job openings', icon: BriefcaseBusiness }, { id: 'Applications', icon: FileText }] },
  { group: 'PLACEMENT TOOLS', items: [{ id: 'Schedule', icon: CalendarDays }, { id: 'Analytics', icon: ChartNoAxesCombined }] }
];
const initials = name => name.split(' ').map(x => x[0]).slice(0, 2).join('').toUpperCase();
const safeRead = (key, fallback) => { try { const val = localStorage.getItem(key); return val ? JSON.parse(val) : fallback; } catch { return fallback; } };

function App() {
  const [page, setPage] = useState('Overview');
  const [students, setStudents] = useState(() => safeRead('cc-students', initialStudents));
  const [jobs, setJobs] = useState(() => safeRead('cc-jobs', initialJobs));
  const [companies, setCompanies] = useState(() => safeRead('cc-companies', initialCompanies));
  const [applications, setApplications] = useState(() => safeRead('cc-applications', [
    { id: 1, student: 'Ananya Krishnan', roll: 'CSE2024001', company: 'Zoho', role: 'Frontend Developer', applied: 'Oct 09, 2026', status: 'Selected' },
    { id: 2, student: 'Rahul S', roll: 'CSE2024014', company: 'Google', role: 'Software Engineer', applied: 'Oct 08, 2026', status: 'Interview' },
    { id: 3, student: 'Priya Menon', roll: 'IT2024022', company: 'Infosys', role: 'Systems Engineer', applied: 'Oct 07, 2026', status: 'Selected' },
    { id: 4, student: 'Arjun Kumar', roll: 'ECE2024031', company: 'Accenture', role: 'Associate Software Engineer', applied: 'Oct 06, 2026', status: 'Applied' },
    { id: 5, student: 'Meera R', roll: 'CSE2024050', company: 'Freshworks', role: 'Product Design Intern', applied: 'Oct 05, 2026', status: 'Shortlisted' }
  ]));
  const [query, setQuery] = useState('');
  const [modal, setModal] = useState('');
  const [selected, setSelected] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [form, setForm] = useState({});
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const persist = (key, value, setter) => { setter(value); localStorage.setItem(key, JSON.stringify(value)); };
  const notify = message => { setToast(message); window.setTimeout(() => setToast(''), 2800); };
  const openModal = (type, item = null) => { setSelected(item); setForm(item ? { ...item } : {}); setModal(type); };
  const closeModal = () => { setModal(''); setSelected(null); setForm({}); };
  const filtered = list => list.filter(item => Object.values(item).join(' ').toLowerCase().includes(query.toLowerCase()));
  const placed = students.filter(s => s.status === 'Placed').length;
  const stats = [
    { label: 'Registered students', value: students.length.toLocaleString(), change: '+12.8%', detail: 'vs. last semester', icon: Users, color: 'blue', chart: [22, 35, 28, 44, 38, 58, 52, 72, 62, 84, 70, 96] },
    { label: 'Partner companies', value: companies.length.toString().padStart(2, '0'), change: '+3 new', detail: 'this recruitment season', icon: Building2, color: 'violet', chart: [28, 26, 40, 32, 50, 45, 62, 58, 74, 68, 83, 96] },
    { label: 'Students placed', value: placed.toString().padStart(2, '0'), change: `${Math.round(placed / Math.max(students.length, 1) * 100)}%`, detail: 'of registered students', icon: CheckCircle2, color: 'green', chart: [18, 24, 22, 40, 35, 48, 56, 52, 68, 74, 82, 96] },
    { label: 'Active openings', value: jobs.filter(j => j.status !== 'Closed').length.toString().padStart(2, '0'), change: '+5', detail: 'open for applications', icon: BriefcaseBusiness, color: 'orange', chart: [24, 30, 26, 44, 42, 58, 48, 65, 70, 78, 72, 96] }
  ];
  const saveStudent = e => {
    e.preventDefault();
    const item = { id: selected?.id || Date.now(), name: form.name || 'New Student', roll: form.roll || `STU${Date.now().toString().slice(-5)}`, dept: form.dept || 'CSE', cgpa: Number(form.cgpa || 0), skills: form.skills || 'Not added', status: form.status || 'Registered', company: form.company || '—', email: form.email || '' };
    const next = selected ? students.map(s => s.id === selected.id ? item : s) : [item, ...students];
    persist('cc-students', next, setStudents); closeModal(); notify(selected ? 'Student details updated' : 'Student registered successfully');
  };
  const saveJob = e => {
    e.preventDefault();
    const item = { id: selected?.id || Date.now(), company: form.company || 'New Company', role: form.role || 'New Role', type: form.type || 'Full-time', package: form.package || 'Not disclosed', location: form.location || 'India', deadline: form.deadline || 'Nov 30, 2026', eligible: form.eligible || 'All departments', minCgpa: Number(form.minCgpa || 6.0), applicants: Number(form.applicants || 0), status: form.status || 'Open', color: (form.company || 'company').toLowerCase().replace(/\s/g, '') };
    const next = selected ? jobs.map(j => j.id === selected.id ? item : j) : [item, ...jobs];
    persist('cc-jobs', next, setJobs); closeModal(); notify(selected ? 'Job opening updated' : 'Job opening published');
  };
  const saveCompany = e => {
    e.preventDefault();
    const item = { id: selected?.id || Date.now(), name: form.name || 'New Company', industry: form.industry || 'Technology', roles: Number(form.roles || 1), package: form.package || 'Not disclosed', contact: form.contact || '', color: (form.name || 'company').toLowerCase().replace(/\s/g, '') };
    const next = selected ? companies.map(c => c.id === selected.id ? item : c) : [item, ...companies];
    persist('cc-companies', next, setCompanies); closeModal(); notify(selected ? 'Company details updated' : 'Company added successfully');
  };
  const changeApplicationStatus = (id, status) => {
    const next = applications.map(a => a.id === id ? { ...a, status } : a);
    persist('cc-applications', next, setApplications); notify(`Application marked ${status.toLowerCase()}`);
  };
  const exportCsv = (name, rows) => {
    if (!rows.length) { notify('No records to export'); return; }
    const keys = Object.keys(rows[0]);
    const csv = [keys.join(','), ...rows.map(row => keys.map(k => `"${String(row[k] ?? '').replaceAll('"', '""')}"`).join(','))].join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const a = document.createElement('a'); a.href = url; a.download = `${name.toLowerCase().replaceAll(' ', '-')}.csv`; a.click(); URL.revokeObjectURL(url);
    notify(`${name} exported as CSV`);
  };

  return <div className="app-shell">
    <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <div className="brand"><div className="brand-mark"><GraduationCap size={23} /></div><div><div className="brand-name">campus<span>connect</span></div><div className="brand-caption">PLACEMENT PORTAL</div></div><button className="icon-btn mobile-close" onClick={() => setSidebarOpen(false)}><X size={18}/></button></div>
      <div className="campus-switch"><div className="campus-avatar">RC</div><div className="campus-text"><b>Riverside College</b><span>Placement office</span></div><ChevronDown size={15} className="muted"/></div>
      <nav className="side-nav">{nav.map(group => <div className="nav-group" key={group.group}><div className="nav-label">{group.group}</div>{group.items.map(item => <button key={item.id} className={`nav-item ${page === item.id ? 'active' : ''}`} onClick={() => { setPage(item.id); setSidebarOpen(false); setQuery(''); }}><item.icon size={18}/><span>{item.id}</span>{item.id === 'Applications' && <span className="nav-count">{applications.length}</span>}</button>)}</div>)}</nav>
      <div className="sidebar-bottom"><div className="help-card"><div className="help-icon"><Sparkles size={17}/></div><b>Need a hand?</b><p>Visit the quick guide to learn how to manage placements.</p><button onClick={() => { setModal('guide'); }}>Open quick guide <ArrowRight size={14}/></button></div><button className={`nav-item ${page === 'Settings' ? 'active' : ''}`} onClick={() => setPage('Settings')}><Settings size={18}/><span>Settings</span></button><div className="sidebar-user"><div className="user-avatar">AS</div><div className="user-meta"><b>Admin Staff</b><span>Placement coordinator</span></div><MoreHorizontal size={19} className="muted"/></div></div>
    </aside>
    {sidebarOpen && <div className="mobile-scrim" onClick={() => setSidebarOpen(false)} />}
    <main className="main-area">
      <header className="topbar"><div className="top-left"><button className="icon-btn menu-toggle" onClick={() => setSidebarOpen(true)}><Menu size={20}/></button><div className="breadcrumb">Workspace <span>/</span> <b>{page}</b></div></div><div className="top-actions"><div className="global-search"><Search size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search anything..." /><kbd>⌘ K</kbd></div><div className="top-divider"/><div className="notification-wrap"><button className="icon-btn notification-btn" onClick={() => setNotificationsOpen(!notificationsOpen)}><Bell size={19}/><i/></button>{notificationsOpen && <div className="notification-pop"><b>Notifications</b><p><span className="dot blue-dot"/> Google interview schedule updated.</p><p><span className="dot green-dot"/> 12 new student registrations this week.</p><p><span className="dot orange-dot"/> TCS applications close soon.</p><button onClick={() => setNotificationsOpen(false)}>Mark all as read</button></div>}</div><div className="top-divider"/><button className="profile-button" onClick={() => setPage('Settings')}><div className="user-avatar small">AS</div><div className="profile-meta"><b>Admin Staff</b><span>Administrator</span></div><ChevronDown size={15}/></button></div></header>
      <div className="page-content">
        {page === 'Overview' && <Overview stats={stats} students={students} jobs={jobs} applications={applications} companies={companies} setPage={setPage} openModal={openModal} changeApplicationStatus={changeApplicationStatus} exportCsv={exportCsv} query={query}/>}
        {page === 'Students' && <StudentsPage students={filtered(students)} allCount={students.length} query={query} statusFilter={statusFilter} setStatusFilter={setStatusFilter} openModal={openModal} exportCsv={exportCsv} onDelete={id => { const next = students.filter(s => s.id !== id); persist('cc-students', next, setStudents); notify('Student record deleted'); }}/>}
        {page === 'Companies' && <CompaniesPage companies={filtered(companies)} openModal={openModal} exportCsv={exportCsv} onDelete={id => { const next = companies.filter(c => c.id !== id); persist('cc-companies', next, setCompanies); notify('Company removed'); }}/>}
        {page === 'Job openings' && <JobsPage jobs={filtered(jobs)} openModal={openModal} exportCsv={exportCsv} onDelete={id => { const next = jobs.filter(j => j.id !== id); persist('cc-jobs', next, setJobs); notify('Job opening removed'); }}/>}
        {page === 'Applications' && <ApplicationsPage applications={filtered(applications)} changeStatus={changeApplicationStatus} exportCsv={exportCsv}/>}
        {page === 'Schedule' && <SchedulePage notify={notify} openModal={openModal}/>}
        {page === 'Analytics' && <AnalyticsPage students={students} jobs={jobs} companies={companies} applications={applications} stats={stats} exportCsv={exportCsv}/>}
        {page === 'Settings' && <SettingsPage notify={notify} onReset={() => { ['cc-students','cc-jobs','cc-companies','cc-applications'].forEach(k => localStorage.removeItem(k)); setStudents(initialStudents); setJobs(initialJobs); setCompanies(initialCompanies); setApplications([{ id: 1, student: 'Ananya Krishnan', roll: 'CSE2024001', company: 'Zoho', role: 'Frontend Developer', applied: 'Oct 09, 2026', status: 'Selected' }, { id: 2, student: 'Rahul S', roll: 'CSE2024014', company: 'Google', role: 'Software Engineer', applied: 'Oct 08, 2026', status: 'Interview' }]); notify('Demo data restored'); }}/>}
      </div>
      <footer className="footer"><span>© 2026 CampusConnect <span className="footer-dot">•</span> Placement Cell Management</span><span><span className="live-dot"/> All systems operational <span className="footer-dot">•</span> v1.0.0</span></footer>
    </main>
    {modal && <Modal type={modal} selected={selected} form={form} setForm={setForm} close={closeModal} onStudent={saveStudent} onJob={saveJob} onCompany={saveCompany}/>}
    {toast && <div className="toast"><CheckCircle2 size={18}/>{toast}</div>}
  </div>;
}

function PageHeading({ eyebrow, title, description, action, secondary }) {
  return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div><div className="heading-actions">{secondary}{action}</div></div>;
}
function Overview({ stats, students, jobs, applications, companies, setPage, openModal, changeApplicationStatus, exportCsv, query }) {
  const recent = applications.slice(0, 4);
  const timeline = [
    { date: '14', month: 'OCT', title: 'Google · Technical interview', sub: 'Software Engineer · 10:00 AM', tag: 'Tomorrow', color: 'blue' },
    { date: '16', month: 'OCT', title: 'Infosys · Pre-placement talk', sub: 'Main auditorium · 2:00 PM', tag: 'In 3 days', color: 'violet' },
    { date: '20', month: 'OCT', title: 'Zoho · Coding assessment', sub: 'Online · 11:30 AM', tag: 'In 7 days', color: 'green' }
  ];
  return <><PageHeading eyebrow="MONDAY, OCTOBER 12, 2026" title="Good morning, Admin 👋" description="Here's what's happening with your campus placements today." action={<button className="btn btn-primary" onClick={() => openModal('job')}><Plus size={17}/> Post a job opening</button>} secondary={<button className="btn btn-secondary" onClick={() => exportCsv('Placement overview', students)}><Download size={16}/> Export report</button>}/>
    <div className="welcome-strip"><div className="welcome-symbol"><Sparkles size={19}/></div><div><b>2026–27 placement season is in full swing</b><p>Keep your student profiles updated to improve eligibility matching and placement outcomes.</p></div><button onClick={() => setPage('Students')}>Review student profiles <ArrowRight size={16}/></button><button className="strip-close" onClick={e => e.currentTarget.parentElement.remove()}><X size={16}/></button></div>
    <div className="stats-grid">{stats.map(s => <div className="stat-card" key={s.label}><div className="stat-top"><div className={`stat-icon ${s.color}`}><s.icon size={19}/></div><button className="more-button" onClick={() => setPage(s.label.includes('student') ? 'Students' : s.label.includes('companies') ? 'Companies' : s.label.includes('placed') ? 'Analytics' : 'Job openings')}><MoreHorizontal size={19}/></button></div><div className="stat-label">{s.label}</div><div className="stat-bottom"><div><div className="stat-value">{s.value}</div><div className="stat-change"><span>{s.change}</span> {s.detail}</div></div><MiniChart values={s.chart} color={s.color}/></div></div>)}</div>
    <div className="section-title-row"><div><h2>Placement overview</h2><p>Track progress and stay on top of recruitment activity.</p></div><button className="text-link" onClick={() => setPage('Analytics')}>View analytics <ArrowUpRight size={16}/></button></div>
    <div className="overview-grid"><div className="panel placement-panel"><div className="panel-heading"><div><h3>Placement progress</h3><p>Current academic year · 2026–27</p></div><button className="select-like" onClick={() => setPage('Analytics')}>This season <ChevronDown size={14}/></button></div><div className="progress-content"><div className="donut-wrap"><div className="donut" style={{'--progress': `${Math.max(placedPercent(students), 2)}%`}}><div className="donut-inner"><b>{placedPercent(students)}%</b><span>placed</span></div></div></div><div className="progress-legend"><div className="legend-item"><span className="legend-dot green-bg"/><div><b>{students.filter(s => s.status === 'Placed').length} students placed</b><span>Successfully received offers</span></div></div><div className="legend-item"><span className="legend-dot blue-bg"/><div><b>{students.filter(s => ['Interview','Shortlisted'].includes(s.status)).length} in process</b><span>Interviewing or shortlisted</span></div></div><div className="legend-item"><span className="legend-dot gray-bg"/><div><b>{students.filter(s => !['Placed','Interview','Shortlisted'].includes(s.status)).length} yet to be placed</b><span>Ready for new opportunities</span></div></div></div></div><div className="panel-foot"><span><span className="live-dot"/> Updated just now</span><button onClick={() => setPage('Analytics')}>Full report <ArrowRight size={14}/></button></div></div>
      <div className="panel schedule-panel"><div className="panel-heading"><div><h3>Upcoming schedule</h3><p>Important placement activities</p></div><button className="icon-btn" onClick={() => setPage('Schedule')}><ArrowUpRight size={18}/></button></div><div className="timeline">{timeline.map(t => <div className="timeline-item" key={t.title}><div className={`date-tile ${t.color}`}><b>{t.date}</b><span>{t.month}</span></div><div className="timeline-copy"><b>{t.title}</b><span>{t.sub}</span></div><span className="timeline-tag">{t.tag}</span></div>)}</div><div className="panel-foot"><span>3 upcoming events</span><button onClick={() => setPage('Schedule')}>View calendar <ArrowRight size={14}/></button></div></div></div>
    <div className="section-title-row lower-title"><div><h2>Recent applications</h2><p>Latest updates from students applying to open roles.</p></div><button className="text-link" onClick={() => setPage('Applications')}>View all applications <ArrowRight size={16}/></button></div>
    <div className="panel table-panel"><div className="table-toolbar"><div className="table-note"><span className="table-live"/><b>Latest activity</b><span className="table-sub">Showing {recent.length} of {applications.length} applications</span></div><button className="btn btn-small btn-secondary" onClick={() => exportCsv('Applications', applications)}><Download size={14}/> Export</button></div><ApplicationsTable applications={recent} changeStatus={changeApplicationStatus}/></div>
    <div className="bottom-tip"><div className="tip-icon"><Sparkles size={17}/></div><div><b>Make your next placement drive smoother</b><span>Use eligibility verification to shortlist students who match each company's requirements.</span></div><button onClick={() => setPage('Job openings')}>Explore job openings <ArrowRight size={15}/></button></div>
  </>;
}
function placedPercent(students) { return Math.round(students.filter(s => s.status === 'Placed').length / Math.max(students.length, 1) * 100); }
function MiniChart({ values, color }) { return <div className={`mini-chart ${color}`}>{values.map((v,i) => <i key={i} style={{height: `${v}%`}}/>)}</div>; }

function StatusBadge({ status }) {
  const cls = status.toLowerCase().replaceAll(' ', '-');
  return <span className={`status-badge ${cls}`}><i/>{status}</span>;
}
function Avatar({ name, index = 0 }) { return <div className={`person-avatar avatar-${index % 6}`}>{initials(name)}</div>; }
function ApplicationsTable({ applications, changeStatus }) {
  if (!applications.length) return <div className="empty-state"><FileText size={28}/><b>No applications found</b><span>Try another search or check back later.</span></div>;
  return <div className="table-scroll"><table><thead><tr><th>STUDENT</th><th>COMPANY / ROLE</th><th>APPLIED ON</th><th>STATUS</th><th className="align-right">ACTIONS</th></tr></thead><tbody>{applications.map((a,i)=><tr key={a.id}><td><div className="student-cell"><Avatar name={a.student} index={i}/><div><b>{a.student}</b><span>{a.roll}</span></div></div></td><td><div className="company-role"><b>{a.company}</b><span>{a.role}</span></div></td><td className="date-cell">{a.applied}</td><td><StatusBadge status={a.status}/></td><td className="align-right"><select className="status-select" aria-label={`Update status for ${a.student}`} value={a.status} onChange={e => changeStatus(a.id,e.target.value)}><option>Applied</option><option>Shortlisted</option><option>Interview</option><option>Selected</option><option>Rejected</option></select></td></tr>)}</tbody></table></div>;
}
function StudentsPage({ students, allCount, query, statusFilter, setStatusFilter, openModal, exportCsv, onDelete }) {
  const list = students.filter(s => statusFilter === 'All' || s.status === statusFilter);
  return <><PageHeading eyebrow="PEOPLE DIRECTORY" title="Student management" description="Manage student profiles, academic records, skills, and placement readiness." action={<button className="btn btn-primary" onClick={() => openModal('student')}><Plus size={17}/> Add student</button>} secondary={<button className="btn btn-secondary" onClick={() => exportCsv('Students',list)}><Download size={16}/> Export CSV</button>}/>
    <div className="stats-mini-row"><div className="mini-stat"><span>Total registered</span><b>{allCount}</b><small>Across all departments</small></div><div className="mini-stat"><span>Placed students</span><b>{students.filter(s=>s.status==='Placed').length}</b><small className="good-text">Successfully placed</small></div><div className="mini-stat"><span>Average CGPA</span><b>{(students.reduce((a,s)=>a+Number(s.cgpa||0),0)/Math.max(students.length,1)).toFixed(2)}</b><small>Current records</small></div><div className="mini-stat"><span>Search results</span><b>{list.length}</b><small>Matching records</small></div></div>
    <div className="panel table-panel"><div className="table-toolbar"><div className="table-note"><b>All students</b><span className="table-sub">{list.length} records {query ? `matching “${query}”` : ''}</span></div><div className="toolbar-right"><SlidersHorizontal size={16}/><select className="filter-select" value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}><option>All</option><option>Placed</option><option>Interview</option><option>Shortlisted</option><option>Applied</option><option>Registered</option></select></div></div><div className="table-scroll"><table><thead><tr><th>STUDENT</th><th>DEPARTMENT</th><th>CGPA</th><th>SKILLS</th><th>STATUS</th><th>ACTIONS</th></tr></thead><tbody>{list.map((s,i)=><tr key={s.id}><td><div className="student-cell"><Avatar name={s.name} index={i}/><div><b>{s.name}</b><span>{s.roll}</span></div></div></td><td><span className="dept-chip">{s.dept}</span></td><td><b className="cgpa">{Number(s.cgpa).toFixed(1)}</b><span className="out-of"> / 10</span></td><td><span className="skills-text">{s.skills}</span></td><td><StatusBadge status={s.status}/></td><td><div className="row-actions"><button title="Edit student" onClick={()=>openModal('student',s)}><Eye size={15}/></button><button title="Delete student" onClick={()=>onDelete(s.id)}><Trash2 size={15}/></button></div></td></tr>)}</tbody></table>{!list.length&&<div className="empty-state"><Users size={28}/><b>No students found</b><span>Try changing your filters or search.</span></div>}</div><div className="table-pagination"><span>Showing <b>{list.length}</b> of <b>{allCount}</b> students</span><span className="pagination-note">Demo data is saved in this browser.</span></div></div>
  </>;
}
function CompanyMark({ name, color }) { return <div className={`company-mark ${color || 'company'}`}>{name?.slice(0,1).toUpperCase()}</div>; }
function CompaniesPage({ companies, openModal, exportCsv, onDelete }) {
  return <><PageHeading eyebrow="EMPLOYER NETWORK" title="Company partners" description="Build relationships with recruiters and manage campus hiring partners." action={<button className="btn btn-primary" onClick={()=>openModal('company')}><Plus size={17}/> Add company</button>} secondary={<button className="btn btn-secondary" onClick={()=>exportCsv('Companies',companies)}><Download size={16}/> Export CSV</button>}/>
    <div className="company-summary"><div><Building2 size={20}/><span>Active partner companies</span><b>{companies.length}</b></div><div><BriefcaseBusiness size={20}/><span>Roles listed</span><b>{companies.reduce((a,c)=>a+Number(c.roles||0),0)}</b></div><div><ChartNoAxesCombined size={20}/><span>Hiring season</span><b>2026–27</b></div></div>
    <div className="company-grid">{companies.map(c=><div className="company-card" key={c.id}><div className="company-card-top"><CompanyMark name={c.name} color={c.color}/><button className="more-button" onClick={()=>openModal('company',c)}><MoreHorizontal size={20}/></button></div><h3>{c.name}</h3><p>{c.industry}</p><div className="company-card-line"/><div className="company-data"><span>Open roles</span><b>{c.roles}</b></div><div className="company-data"><span>Package / stipend</span><b>{c.package}</b></div><div className="company-contact"><Mail size={14}/><span>{c.contact || 'Contact not added'}</span></div><div className="company-card-actions"><button className="btn btn-secondary btn-small" onClick={()=>openModal('company',c)}>Edit details</button><button className="icon-btn" title="Remove company" onClick={()=>onDelete(c.id)}><Trash2 size={16}/></button></div></div>)}{!companies.length&&<div className="empty-state"><Building2 size={28}/><b>No companies found</b><span>Add a company to get started.</span></div>}</div>
  </>;
}
function JobsPage({ jobs, openModal, exportCsv, onDelete }) {
  return <><PageHeading eyebrow="RECRUITMENT BOARD" title="Job openings" description="Publish opportunities and check eligibility requirements for campus recruitment." action={<button className="btn btn-primary" onClick={()=>openModal('job')}><Plus size={17}/> Post an opening</button>} secondary={<button className="btn btn-secondary" onClick={()=>exportCsv('Job openings',jobs)}><Download size={16}/> Export CSV</button>}/>
    <div className="job-summary"><div><span>Currently open</span><b>{jobs.filter(j=>j.status==='Open'||j.status==='Closing soon').length}</b></div><div><span>Total applicants</span><b>{jobs.reduce((a,j)=>a+Number(j.applicants||0),0)}</b></div><div><span>Closing soon</span><b>{jobs.filter(j=>j.status==='Closing soon').length}</b></div></div>
    <div className="job-list">{jobs.map(j=><div className="job-card" key={j.id}><CompanyMark name={j.company} color={j.color}/><div className="job-main"><div className="job-title-row"><h3>{j.role}</h3><StatusBadge status={j.status}/></div><div className="job-company">{j.company} <span>·</span> {j.type}</div><div className="job-meta"><span><MapPin size={14}/>{j.location}</span><span><Clock3 size={14}/>Deadline: {j.deadline}</span><span><Users size={14}/>{j.applicants} applicants</span></div><div className="eligibility-line"><span>Eligibility</span><b>{j.eligible}</b><span className="cgpa-requirement">Minimum CGPA: {j.minCgpa}</span></div></div><div className="job-right"><span>Package / stipend</span><b className="job-package">{j.package}</b><button className="btn btn-secondary btn-small" onClick={()=>openModal('job',j)}>Edit opening</button><button className="delete-link" onClick={()=>onDelete(j.id)}><Trash2 size={14}/> Remove</button></div></div>)}{!jobs.length&&<div className="empty-state"><BriefcaseBusiness size={28}/><b>No job openings found</b><span>Post a new role to begin.</span></div>}</div>
  </>;
}
function ApplicationsPage({ applications, changeStatus, exportCsv }) {
  const [filter,setFilter]=useState('All');
  const list=applications.filter(a=>filter==='All'||a.status===filter);
  return <><PageHeading eyebrow="APPLICATION TRACKER" title="Student applications" description="Review applications and update each candidate's recruitment progress." action={<button className="btn btn-secondary" onClick={()=>exportCsv('Applications',list)}><Download size={16}/> Export CSV</button>}/>
    <div className="application-filters">{['All','Applied','Shortlisted','Interview','Selected','Rejected'].map(s=><button key={s} className={filter===s?'filter-pill selected':'filter-pill'} onClick={()=>setFilter(s)}>{s}<span>{s==='All'?applications.length:applications.filter(a=>a.status===s).length}</span></button>)}</div>
    <div className="panel table-panel"><div className="table-toolbar"><div className="table-note"><b>Application records</b><span className="table-sub">Update status as candidates move through the process.</span></div><span className="record-count">{list.length} records</span></div><ApplicationsTable applications={list} changeStatus={changeStatus}/></div>
  </>;
}
function SchedulePage({ notify, openModal }) {
  const [view,setView]=useState('Upcoming');
  const events=[
    {day:'14',month:'OCT',weekday:'WEDNESDAY',title:'Google · Technical interview',type:'Interview',time:'10:00 AM – 1:00 PM',location:'Online · Google Meet',color:'blue'},
    {day:'16',month:'OCT',weekday:'FRIDAY',title:'Infosys · Pre-placement talk',type:'Pre-placement talk',time:'2:00 PM – 3:00 PM',location:'Main auditorium',color:'violet'},
    {day:'20',month:'OCT',weekday:'TUESDAY',title:'Zoho · Coding assessment',type:'Assessment',time:'11:30 AM – 1:00 PM',location:'Computer lab 2',color:'green'},
    {day:'22',month:'OCT',weekday:'THURSDAY',title:'Accenture · HR interview',type:'Interview',time:'9:30 AM – 12:00 PM',location:'Seminar hall',color:'orange'}
  ];
  return <><PageHeading eyebrow="CAMPUS CALENDAR" title="Placement schedule" description="Coordinate recruitment drives, interviews, assessments, and company visits." action={<button className="btn btn-primary" onClick={()=>openModal('event')}><Plus size={17}/> Add event</button>}/>
    <div className="calendar-toolbar"><div className="month-title"><CalendarDays size={19}/><b>October 2026</b></div><div className="segmented"><button className={view==='Upcoming'?'on':''} onClick={()=>setView('Upcoming')}>Upcoming</button><button className={view==='All events'?'on':''} onClick={()=>setView('All events')}>All events</button></div></div>
    <div className="schedule-layout"><div className="panel month-panel"><div className="panel-heading"><div><h3>October 2026</h3><p>Recruitment calendar</p></div><CalendarDays size={18} className="muted"/></div><div className="calendar-grid">{['M','T','W','T','F','S','S'].map((d,i)=><span className="calendar-weekday" key={i}>{d}</span>)}{Array.from({length:3},(_,i)=><span key={`e${i}`} className="calendar-day empty"/>)}{Array.from({length:31},(_,i)=>{const n=i+1; const has=[14,16,20,22].includes(n); return <button key={n} className={`calendar-day ${has?'has-event':''} ${n===12?'today':''}`} onClick={()=>has?notify(`Recruitment activity scheduled for October ${n}`):null}>{n}{has&&<i/>}</button>})}</div><div className="calendar-legend"><span><i className="legend-dot blue-bg"/>Recruitment event</span><span><i className="legend-dot orange-bg"/>Today</span></div></div>
      <div className="schedule-events"><div className="panel-heading"><div><h3>{view==='Upcoming'?'Upcoming events':'All scheduled events'}</h3><p>{events.length} recruitment activities this month</p></div><button className="btn btn-secondary btn-small" onClick={()=>notify('Calendar export is ready to configure') }><Download size={14}/> Export</button></div>{(view==='Upcoming'?events.filter(e=>Number(e.day)>=12):events).map(e=><div className="event-card" key={e.day}><div className={`event-date ${e.color}`}><b>{e.day}</b><span>{e.month}</span></div><div className="event-details"><span className="event-weekday">{e.weekday}</span><h3>{e.title}</h3><div className="event-meta"><span><Clock3 size={14}/>{e.time}</span><span><MapPin size={14}/>{e.location}</span></div></div><span className={`event-type ${e.color}`}>{e.type}</span></div>)}</div></div>
  </>;
}
function AnalyticsPage({ students, jobs, companies, applications, stats, exportCsv }) {
  const departments=['CSE','IT','ECE','MECH','EEE','CIVIL'];
  const deptCounts=departments.map(d=>({name:d,count:students.filter(s=>s.dept===d).length,placed:students.filter(s=>s.dept===d&&s.status==='Placed').length}));
  const maxDept=Math.max(...deptCounts.map(d=>d.count),1);
  const statusCounts=[{name:'Selected',color:'green',count:applications.filter(a=>a.status==='Selected').length},{name:'Interview',color:'blue',count:applications.filter(a=>a.status==='Interview').length},{name:'Shortlisted',color:'violet',count:applications.filter(a=>a.status==='Shortlisted').length},{name:'Applied',color:'orange',count:applications.filter(a=>a.status==='Applied').length},{name:'Rejected',color:'red',count:applications.filter(a=>a.status==='Rejected').length}];
  return <><PageHeading eyebrow="REPORTS & INSIGHTS" title="Placement analytics" description="Understand recruitment progress, student readiness, and hiring activity." action={<button className="btn btn-primary" onClick={()=>exportCsv('Placement analytics',students)}><Download size={16}/> Export report</button>}/>
    <div className="stats-grid analytics-stats">{stats.map(s=><div className="stat-card" key={s.label}><div className="stat-top"><div className={`stat-icon ${s.color}`}><s.icon size={19}/></div></div><div className="stat-label">{s.label}</div><div className="stat-value">{s.value}</div><div className="stat-change"><span>{s.change}</span> {s.detail}</div></div>)}</div>
    <div className="analytics-grid"><div className="panel chart-panel"><div className="panel-heading"><div><h3>Students by department</h3><p>Registered students and placement outcomes</p></div><Users size={18} className="muted"/></div><div className="bar-chart">{deptCounts.map(d=><div className="bar-group" key={d.name}><div className="bar-pair"><div className="bar total" style={{height:`${Math.max(d.count/maxDept*100,4)}%`}} title={`${d.count} students`}/><div className="bar placed" style={{height:`${Math.max(d.placed/maxDept*100,3)}%`}} title={`${d.placed} placed`}/></div><span>{d.name}</span><b>{d.count}</b></div>)}</div><div className="chart-legend"><span><i className="legend-dot blue-bg"/>Registered</span><span><i className="legend-dot green-bg"/>Placed</span></div></div>
      <div className="panel chart-panel"><div className="panel-heading"><div><h3>Application pipeline</h3><p>Current application status breakdown</p></div><FileText size={18} className="muted"/></div><div className="pipeline-list">{statusCounts.map(s=><div className="pipeline-row" key={s.name}><div className="pipeline-label"><span className={`legend-dot ${s.color}-bg`}/><span>{s.name}</span><b>{s.count}</b></div><div className="pipeline-track"><div className={`pipeline-fill ${s.color}`} style={{width:`${Math.max(s.count/Math.max(applications.length,1)*100,s.count?3:0)}%`}}/></div></div>)}</div><div className="pipeline-foot"><span>Total applications</span><b>{applications.length}</b></div></div></div>
    <div className="section-title-row lower-title"><div><h2>Department summary</h2><p>Use this snapshot to plan targeted placement preparation.</p></div><button className="text-link" onClick={()=>exportCsv('Department summary',deptCounts)}>Export data <ArrowUpRight size={15}/></button></div>
    <div className="panel table-panel"><div className="table-scroll"><table><thead><tr><th>DEPARTMENT</th><th>REGISTERED</th><th>PLACED</th><th>PLACEMENT RATE</th><th>PROGRESS</th></tr></thead><tbody>{deptCounts.map(d=><tr key={d.name}><td><span className="dept-chip">{d.name}</span></td><td><b>{d.count}</b></td><td><b>{d.placed}</b></td><td>{d.count?Math.round(d.placed/d.count*100):0}%</td><td><div className="tiny-progress"><i style={{width:`${d.count?d.placed/d.count*100:0}%`}}/></div></td></tr>)}</tbody></table></div></div>
  </>;
}
function SettingsPage({ notify, onReset }) {
  const [name,setName]=useState('Riverside College'); const [year,setYear]=useState('2026–27'); const [email,setEmail]=useState('placement@riverside.edu'); const [minCgpa,setMinCgpa]=useState('6.0');
  return <><PageHeading eyebrow="PREFERENCES" title="Settings" description="Configure the placement portal for your institution." action={<button className="btn btn-primary" onClick={()=>notify('Settings saved in this session')}><CheckCircle2 size={16}/> Save changes</button>}/>
    <div className="settings-layout"><div className="settings-nav panel"><b>General settings</b><span className="selected">Institution profile</span><span>Recruitment preferences</span><span>Data management</span></div><div className="settings-content panel"><div className="settings-section"><h3>Institution profile</h3><p>Basic information shown in your placement workspace.</p><label>Institution name<input value={name} onChange={e=>setName(e.target.value)}/></label><label>Academic year<input value={year} onChange={e=>setYear(e.target.value)}/></label><label>Placement office email<input type="email" value={email} onChange={e=>setEmail(e.target.value)}/></label></div><div className="settings-section"><h3>Recruitment preferences</h3><p>Set default rules for job eligibility.</p><label>Default minimum CGPA<input type="number" min="0" max="10" step=".1" value={minCgpa} onChange={e=>setMinCgpa(e.target.value)}/></label><div className="setting-note"><Sparkles size={16}/><span>These are demo settings. Connect a backend to enforce institution-wide rules and authentication.</span></div></div><div className="settings-section danger-zone"><h3>Demo data</h3><p>Restore the original sample students, companies, jobs, and applications.</p><button className="btn btn-danger" onClick={onReset}><Trash2 size={15}/> Restore demo data</button></div></div></div>
  </>;
}
function Modal({ type, selected, form, setForm, close, onStudent, onJob, onCompany }) {
  const change=(key,value)=>setForm(old=>({...old,[key]:value}));
  if(type==='guide') return <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&close()}><div className="modal"><div className="modal-header"><div><span className="eyebrow">QUICK START</span><h2>Welcome to CampusConnect</h2><p>Use this demo to explore the placement workflow.</p></div><button className="icon-btn" onClick={close}><X size={19}/></button></div><div className="guide-steps"><div><span>01</span><section><b>Add student profiles</b><p>Record department, CGPA, skills, and contact details.</p></section></div><div><span>02</span><section><b>Publish company openings</b><p>Add role requirements, package, deadline, and eligibility criteria.</p></section></div><div><span>03</span><section><b>Track applications</b><p>Update applicants through applied, shortlisted, interview, and selected stages.</p></section></div><div><span>04</span><section><b>Review analytics</b><p>Export CSV records and check department-wise placement progress.</p></section></div></div><div className="modal-footer"><button className="btn btn-primary" onClick={close}>Got it <ArrowRight size={15}/></button></div></div></div>;
  const isStudent=type==='student', isJob=type==='job', isCompany=type==='company';
  const title=isStudent?(selected?'Edit student':'Add student'):isJob?(selected?'Edit job opening':'Post a job opening'):isCompany?(selected?'Edit company':'Add company'):'Add schedule event';
  const submit=isStudent?onStudent:isJob?onJob:isCompany?onCompany:(e)=>{e.preventDefault();close();};
  const fields=isStudent?[['name','Student full name','text','e.g. Divya Sharma'],['roll','Roll number','text','e.g. CSE2024051'],['email','Email address','email','student@college.edu'],['dept','Department','select',['CSE','IT','ECE','EEE','MECH','CIVIL','Design']],['cgpa','CGPA (out of 10)','number','8.0'],['skills','Skills (comma separated)','text','React, Java, SQL'],['status','Placement status','select',['Registered','Applied','Shortlisted','Interview','Placed','Not placed']],['company','Company (if placed)','text','Company name']]:
    isJob?[['company','Company name','text','e.g. Zoho'],['role','Job role','text','e.g. Frontend Developer'],['type','Employment type','select',['Full-time','Internship','Part-time','Contract']],['package','Package / stipend','text','e.g. ₹8 LPA'],['location','Job location','text','e.g. Chennai'],['deadline','Application deadline','text','e.g. Nov 30, 2026'],['eligible','Eligible departments','text','CSE, IT, ECE or All departments'],['minCgpa','Minimum CGPA','number','6.0'],['status','Opening status','select',['Open','Closing soon','Closed']]]:
    isCompany?[['name','Company name','text','e.g. Freshworks'],['industry','Industry','text','e.g. Software / SaaS'],['roles','Number of open roles','number','2'],['package','Package / stipend','text','e.g. ₹8 LPA'],['contact','Recruiter email','email','recruiter@company.com']]:
    [['title','Event title','text','Company interview / assessment'],['date','Date','date',''],['time','Time','time',''],['location','Location','text','Main auditorium / Online']];
  return <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&close()}><form className="modal" onSubmit={submit}><div className="modal-header"><div><span className="eyebrow">{selected?'UPDATE RECORD':'NEW RECORD'}</span><h2>{title}</h2><p>{isStudent?'Add academic and placement information for a student.':isJob?'Provide role details and the eligibility criteria for applicants.':isCompany?'Keep recruiter and company information up to date.':'Add a recruitment activity to the schedule.'}</p></div><button type="button" className="icon-btn" onClick={close}><X size={19}/></button></div><div className="form-grid">{fields.map(([key,label,kind,placeholder])=><label key={key} className={['skills','eligible','contact'].includes(key)?'full-field':''}>{label}{kind==='select'?<select value={form[key]??placeholder[0]} onChange={e=>change(key,e.target.value)}>{placeholder.map(o=><option key={o}>{o}</option>)}</select>:<input type={kind} placeholder={placeholder} value={form[key]??''} onChange={e=>change(key,e.target.value)} min={kind==='number'?0:undefined} max={key==='cgpa'||key==='minCgpa'?10:undefined} step={kind==='number'?'0.1':undefined} required={['name','roll','email','company','role'].includes(key)}/>}</label>)}</div><div className="modal-footer"><button type="button" className="btn btn-secondary" onClick={close}>Cancel</button><button type="submit" className="btn btn-primary">{selected?'Save changes':isJob?'Publish opening':isStudent?'Add student':isCompany?'Add company':'Create event'} <ArrowRight size={15}/></button></div></form></div>;
}

export default App;
