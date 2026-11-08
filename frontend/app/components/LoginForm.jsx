"use client";

import { useState } from 'react';
import { Eye, EyeOff, LogIn } from "lucide-react";
import styles from "./AuthForm.module.css";

export default function LoginForm({ onLogin, message, loading }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onLogin(email, password);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <label htmlFor="email" className={`${styles.label} ${styles.labelFirst}`}>
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
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={`${styles.input} ${styles.passwordInput}`}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={styles.togglePasswordBtn}
                    title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                    {showPassword ? (
                        <EyeOff size={18} strokeWidth={2} />
                    ) : (
                        <Eye size={18} strokeWidth={2} />
                    )}
                </button>
            </div>

            {message && (
                <div className={`${styles.messageBox} ${message.type === 'error' ? styles.messageError : styles.messageSuccess}`}>
                    {message.text}
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className={styles.submitBtn}
            >
                {loading ? (
                    <>
                        <span className={styles.spinner} />
                        <span>Iniciando sesión...</span>
                    </>
                ) : (
                    <>
                        <LogIn size={18} />
                        <span>Iniciar sesión</span>
                    </>
                )}
            </button>
        </form>
    );
}
