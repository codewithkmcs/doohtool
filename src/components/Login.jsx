import React, { useState } from 'react';
import { usePersona, PERSONAS } from '../context/PersonaContext';
import { ShieldCheck, User, Lock, ArrowRight } from 'lucide-react';

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
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a' }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: '440px', padding: '40px', background: 'rgba(255,255,255,0.05)', color: 'white' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{ width: '64px', height: '64px', background: 'var(--primary)', borderRadius: '16px', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShieldCheck size={32} />
                    </div>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>DOOH Navigator</h1>
                    <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '8px' }}>Unified Platform for Malaysia</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: 'rgba(255,255,255,0.7)' }}>Email / Username</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'rgba(255,255,255,0.3)' }} />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your name"
                                required
                                style={{ width: '100%', padding: '12px 12px 12px 40px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', outline: 'none' }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: 'rgba(255,255,255,0.7)' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'rgba(255,255,255,0.3)' }} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                style={{ width: '100%', padding: '12px 12px 12px 40px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', outline: 'none' }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '32px' }}>
                        <label style={{ display: 'block', fontSize: '14px', marginBottom: '12px', color: 'rgba(255,255,255,0.7)' }}>Select Persona</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div
                                onClick={() => setSelectedPersona(PERSONAS.AGENCY)}
                                style={{
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: `2px solid ${selectedPersona === PERSONAS.AGENCY ? 'var(--primary)' : 'rgba(255,255,255,0.1)'}`,
                                    background: selectedPersona === PERSONAS.AGENCY ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    fontSize: '14px'
                                }}
                            >
                                Agency
                            </div>
                            <div
                                onClick={() => setSelectedPersona(PERSONAS.MEDIA_OWNER)}
                                style={{
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: `2px solid ${selectedPersona === PERSONAS.MEDIA_OWNER ? 'var(--primary)' : 'rgba(255,255,255,0.1)'}`,
                                    background: selectedPersona === PERSONAS.MEDIA_OWNER ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    fontSize: '14px'
                                }}
                            >
                                Media Owner
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                        style={{ width: '100%', padding: '14px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                    >
                        Sign In <ArrowRight size={18} />
                    </button>
                </form>

                <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
                    Environment: Malaysian Pilot v1.0
                </p>
            </div>
        </div>
    );
};

export default Login;
