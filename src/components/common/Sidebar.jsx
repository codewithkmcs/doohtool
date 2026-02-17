import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Monitor, Map, BarChart3, Settings, HelpCircle, FileText, ShieldCheck } from 'lucide-react';
import { usePersona, PERSONAS } from '../../context/PersonaContext';

const Sidebar = () => {
    const { persona } = usePersona();

    const navItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
        { name: persona === PERSONAS.AGENCY ? 'Marketplace' : 'Inventory', icon: <Monitor size={20} />, path: '/inventory' },
        { name: persona === PERSONAS.AGENCY ? 'Campaigns' : 'All Campaigns', icon: <FileText size={20} />, path: '/campaigns' },
        { name: 'Planning', icon: <Map size={20} />, path: '/planning' },
        { name: 'Reports', icon: <BarChart3 size={20} />, path: '/measurement' },
        { name: 'Compliance', icon: <ShieldCheck size={20} />, path: '/compliance' },
    ].filter(item => !item.hidden);

    return (
        <div className="sidebar">
            <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '8px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '20px' }}>D</div>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>Platform</p>
                <p style={{ fontWeight: '600', fontSize: '14px' }}>{persona} Portal</p>
            </div>

            <nav style={{ flex: 1, padding: '20px 0' }}>
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        style={({ isActive }) => ({
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 24px',
                            textDecoration: 'none',
                            color: isActive ? 'white' : 'rgba(255,255,255,0.6)',
                            background: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                            borderLeft: isActive ? '4px solid var(--primary)' : '4px solid transparent',
                            transition: 'all 0.2s'
                        })}
                    >
                        {item.icon}
                        <span style={{ fontSize: '14px', fontWeight: '500' }}>{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255,255,255,0.6)', padding: '10px 4px', cursor: 'pointer' }}>
                    <Settings size={20} />
                    <span style={{ fontSize: '14px' }}>Settings</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255,255,255,0.6)', padding: '10px 4px', cursor: 'pointer' }}>
                    <HelpCircle size={20} />
                    <span style={{ fontSize: '14px' }}>Support</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
