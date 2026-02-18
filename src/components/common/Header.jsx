import React from 'react';
import { usePersona, PERSONAS } from '../../context/PersonaContext';
import { Bell, User, LogOut, RefreshCw } from 'lucide-react';

const Header = () => {
    const { persona, togglePersona, user, logout } = usePersona();

    return (
        <header className="header">
            <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-slate-800">
                    DOOH Navigator <span className="text-sm font-normal text-slate-400">| Nigeria</span>
                </h2>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <button
                    onClick={togglePersona}
                    className="btn-outline"
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}
                >
                    <RefreshCw size={14} />
                    Switch to {persona === PERSONAS.AGENCY ? PERSONAS.MEDIA_OWNER : PERSONAS.AGENCY}
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderLeft: '1px solid var(--border)', paddingLeft: '20px' }}>
                    <Bell size={20} className="text-slate-500 cursor-pointer" />

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ fontSize: '14px', fontWeight: '600' }}>{user?.username || 'Demo User'}</p>
                            <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{persona}</p>
                        </div>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
                            <User size={20} />
                        </div>
                    </div>

                    <LogOut size={20} className="text-slate-400 cursor-pointer hover:text-error" onClick={logout} title="Logout" />
                </div>
            </div>
        </header>
    );
};

export default Header;
