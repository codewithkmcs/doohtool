import React, { useState } from 'react';
import { usePersona, PERSONAS } from '../context/PersonaContext';
import { ShieldCheck, User, Lock, ArrowRight, Globe, Building2, MapPin } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [selectedPersona, setSelectedPersona] = useState(PERSONAS.AGENCY);
    const { login, setPersona } = usePersona();

    const handleSubmit = (e) => {
        e.preventDefault();
        setPersona(selectedPersona);
        login({ username, persona: selectedPersona });
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

            {/* --- LEFT PANEL: BRANDING (Corporate Slate) --- */}
            <div style={{
                flex: 1,
                backgroundColor: '#0f172a', // Matches your dashboard sidebar
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '48px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Subtle structural background pattern */}
                <div style={{
                    position: 'absolute', inset: 0, opacity: 0.05,
                    backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }}></div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '64px' }}>
                        <div style={{ width: '40px', height: '40px', background: '#2563eb', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Globe size={24} color="white" />
                        </div>
                        <span style={{ fontSize: '20px', fontWeight: 'bold', letterSpacing: '-0.5px' }}>ICL</span>
                    </div>

                    <h1 style={{ fontSize: '48px', fontWeight: '800', lineHeight: '1.1', marginBottom: '24px', letterSpacing: '-1px' }}>
                        DOOH Marketplace
                    </h1>
                    <p style={{ fontSize: '18px', color: '#94a3b8', lineHeight: '1.5', maxWidth: '480px', marginBottom: '40px' }}>
                        The enterprise platform for programmatic out-of-home media orchestration. Connecting agencies and media owners across Nigeria.
                    </p>

                    <div style={{ display: 'flex', gap: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1', fontSize: '14px' }}>
                            <MapPin size={18} color="#3b82f6" /> Nigeria Region
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1', fontSize: '14px' }}>
                            <ShieldCheck size={18} color="#10b981" /> Enterprise Secure
                        </div>
                    </div>
                </div>

                <div style={{ position: 'relative', zIndex: 1, color: '#64748b', fontSize: '13px' }}>
                    &copy; 2026 ICL DOOH. Platform v2.1.0
                </div>
            </div>

            {/* --- RIGHT PANEL: FUNCTIONAL FORM (Clean White) --- */}
            <div style={{
                flex: 1,
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '48px'
            }}>
                <div style={{ width: '100%', maxWidth: '400px' }}>
                    <div style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}>Sign in to your account</h2>
                        <p style={{ color: '#64748b', fontSize: '15px' }}>Enter your credentials to access the marketplace.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Persona Selector (SaaS Segmented Control Style) */}
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>Account Type</label>
                            <div style={{ display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: '8px' }}>
                                <button
                                    type="button"
                                    onClick={() => setSelectedPersona(PERSONAS.AGENCY)}
                                    style={{
                                        flex: 1, padding: '10px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                                        background: selectedPersona === PERSONAS.AGENCY ? '#ffffff' : 'transparent',
                                        color: selectedPersona === PERSONAS.AGENCY ? '#0f172a' : '#64748b',
                                        boxShadow: selectedPersona === PERSONAS.AGENCY ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                                    }}
                                >
                                    <Building2 size={16} /> Agency
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSelectedPersona(PERSONAS.MEDIA_OWNER)}
                                    style={{
                                        flex: 1, padding: '10px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                                        background: selectedPersona === PERSONAS.MEDIA_OWNER ? '#ffffff' : 'transparent',
                                        color: selectedPersona === PERSONAS.MEDIA_OWNER ? '#0f172a' : '#64748b',
                                        boxShadow: selectedPersona === PERSONAS.MEDIA_OWNER ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                                    }}
                                >
                                    <Globe size={16} /> Media Owner
                                </button>
                            </div>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>Work Email / Username</label>
                            <div style={{ position: 'relative' }}>
                                <User size={18} style={{ position: 'absolute', left: '14px', top: '13px', color: '#94a3b8' }} />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="name@company.com"
                                    required
                                    style={{ width: '100%', padding: '12px 12px 12px 42px', border: '1px solid #cbd5e1', borderRadius: '8px', color: '#0f172a', fontSize: '14px', outline: 'none', transition: 'border-color 0.2s' }}
                                    onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                                    onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '32px' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={{ position: 'absolute', left: '14px', top: '13px', color: '#94a3b8' }} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    style={{ width: '100%', padding: '12px 12px 12px 42px', border: '1px solid #cbd5e1', borderRadius: '8px', color: '#0f172a', fontSize: '14px', outline: 'none', transition: 'border-color 0.2s' }}
                                    onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                                    onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            style={{ width: '100%', padding: '14px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background-color 0.2s' }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                        >
                            Sign In <ArrowRight size={18} />
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default Login;