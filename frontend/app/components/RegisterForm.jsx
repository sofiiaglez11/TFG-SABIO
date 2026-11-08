"use client";

import { useState } from 'react';
import { GraduationCap, Users, Eye, EyeOff, UserPlus, X } from 'lucide-react';
import styles from "./AuthForm.module.css";

const ROLE_OPTIONS = [
    {
        value: 'student',
        Icon: GraduationCap,
        label: 'Estudiante',
        desc: 'Accede al chat, estadísticas y cursos en los que estás matriculado',
        color: 'var(--brand, #6366f1)',
    },
    {
        value: 'teacher',
        Icon: Users,
        label: 'Profesor',
        desc: 'Crea y gestiona los cursos que impartes',
        color: '#6366f1',
    },
];

export default function RegisterForm({ onRegister, message, loading }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [consentWellness, setConsentWellness] = useState(false);
    const [consentClockify, setConsentClockify] = useState(false);
    const [localError, setLocalError] = useState('');
    const [showRoleModal, setShowRoleModal] = useState(false);

    // Paso 1: validar datos y abrir la elección de rol
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setLocalError("Las contraseñas no coinciden");
            return;
        }
        if (!consentWellness || !consentClockify) {
            setLocalError("Debes aceptar los consentimientos de privacidad para continuar");
            return;
        }
        setLocalError("");
        setShowRoleModal(true);
    };

    // Paso 2: el usuario elige rol y se envía el registro
    const handleRoleSelect = async (role) => {
        setShowRoleModal(false);
        await onRegister(name, email, password, role, confirmPassword, consentWellness, consentClockify);
    };

    const displayMessage = localError
        ? { type: 'error', text: localError }
        : message;

    return (
        <>
            <form onSubmit={handleSubmit} className={styles.form} style={{ gap: '4px' }}>
                <label htmlFor="name" className={`${styles.label} ${styles.labelFirst}`}>
                    Nombre completo:
                </label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className={styles.input}
                />

                <label htmlFor="email" className={styles.label}>
                    Email:
                </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={styles.input}
                />

                <label htmlFor="password" className={styles.label}>
                    Contraseña:
                </label>
                <div className={styles.passwordWrapper}>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            if (localError) setLocalError("");
                        }}
                        required
                        className={`${styles.input} ${styles.passwordInput}`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={styles.togglePasswordBtn}
                        title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                        {showPassword ? <EyeOff size={18} strokeWidth={2} /> : <Eye size={18} strokeWidth={2} />}
                    </button>
                </div>

                <label htmlFor="confirmPassword" className={styles.label}>
                    Repetir contraseña:
                </label>
                <div className={styles.passwordWrapper}>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            if (localError) setLocalError("");
                        }}
                        required
                        className={`${styles.input} ${styles.passwordInput}`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className={styles.togglePasswordBtn}
                        title={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                        {showConfirmPassword ? <EyeOff size={18} strokeWidth={2} /> : <Eye size={18} strokeWidth={2} />}
                    </button>
                </div>

                {/* Consentimientos de privacidad */}
                <div style={{ marginTop: '16px' }}>
                    <p className={styles.consentLabel}>Privacidad y consentimiento</p>
                    <div className={styles.consentBlock}>
                        <label className={styles.consentItem}>
                            <input
                                type="checkbox"
                                className={styles.consentCheckbox}
                                checked={consentWellness}
                                onChange={(e) => setConsentWellness(e.target.checked)}
                                required
                            />
                            <span className={styles.consentText}>
                                <strong>Consiento el registro de mis datos de bienestar</strong>{' '}
                                (horas de sueño, calidad del descanso, estado de ánimo y nivel de energía, que son datos de salud),
                                para recibir recomendaciones personalizadas y estadísticas en mi panel.{' '}
                                <a href="/privacy" target="_blank" rel="noopener noreferrer">Más info</a>
                            </span>
                        </label>

                        <label className={styles.consentItem}>
                            <input
                                type="checkbox"
                                className={styles.consentCheckbox}
                                checked={consentClockify}
                                onChange={(e) => setConsentClockify(e.target.checked)}
                                required
                            />
                            <span className={styles.consentText}>
                                <strong>Consiento el acceso a mis datos de Clockify</strong>{' '}
                                para registrar y analizar mis sesiones de estudio.{' '}
                                <a href="/privacy" target="_blank" rel="noopener noreferrer">Más info</a>
                            </span>
                        </label>
                    </div>
                </div>

                {displayMessage && (
                    <div className={`${styles.messageBox} ${displayMessage.type === 'error' ? styles.messageError : styles.messageSuccess}`}>
                        {displayMessage.text}
                    </div>
                )}

                <button
                    type="submit"
                    // disabled={loading || !consentWellness || !consentClockify}
                    disabled={loading || !consentWellness || !consentClockify}
                    className={styles.submitBtn}
                    style={{ marginTop: '18px' }}
                >
                    {loading ? (
                        <>
                            <span className={styles.spinner} />
                            <span>Registrando...</span>
                        </>
                    ) : (
                        <>
                            <UserPlus size={18} />
                            <span>Registrarse</span>
                        </>
                    )}
                </button>
            </form>

            {/* Modal de selección de rol */}
            {showRoleModal && (
                <div
                    style={{
                        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        zIndex: 1000, padding: '20px'
                    }}
                    onClick={() => setShowRoleModal(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: 'var(--bg-surface)', border: '1px solid var(--border)',
                            borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '420px'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>
                                ¿Cómo vas a usar la aplicación?
                            </h3>
                            <button
                                type="button"
                                onClick={() => setShowRoleModal(false)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
                            >
                                <X size={18} />
                            </button>
                        </div>
                        <p style={{ margin: '0 0 16px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                            Elige el tipo de cuenta. Lo usaremos para mostrarte las funciones adecuadas.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {ROLE_OPTIONS.map(({ value, Icon, label, desc, color }) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => handleRoleSelect(value)}
                                    disabled={loading}
                                    style={{
                                        padding: '14px', borderRadius: '10px',
                                        border: '1px solid var(--border)',
                                        background: 'var(--bg-input)', cursor: 'pointer',
                                        textAlign: 'left', display: 'flex', alignItems: 'center', gap: '12px'
                                    }}
                                >
                                    <Icon size={22} color={color} strokeWidth={2} />
                                    <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                        <span style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text-primary)' }}>{label}</span>
                                        <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{desc}</span>
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}