"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RegisterForm from "../components/RegisterForm";
import ConfirmModal from "../components/ConfirmModal";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export default function RegisterPage() {
    const router = useRouter();
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleRegister = async (name, email, password, role, confirmPassword, consentWellness, consentClockify) => {
        if (confirmPassword && password !== confirmPassword) {
            setMessage({ type: 'error', text: 'Las contraseñas no coinciden' });
            return;
        }
        setMessage(null);
        setLoading(true);
        try {
            const response = await fetch(`${BACKEND_URL}/api/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    role,
                    confirm_password: confirmPassword,
                    consent_wellness: consentWellness,
                    consent_clockify: consentClockify,
                }),
            });

            if (!response.ok) {
                let errorMsg = "Error al registrarse";
                try {
                    const err = await response.json();
                    if (err.detail) errorMsg = err.detail;
                } catch (e) {
                    errorMsg = `Error del servidor (${response.status})`;
                }
                setMessage({ type: 'error', text: errorMsg });
                setLoading(false);
                return;
            }

            setLoading(false);
            setShowSuccessModal(true);

        } catch (error) {
            console.error("Error al registrarse:", error);
            setMessage({ type: 'error', text: "No se pudo conectar con el servidor" });
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            padding: '24px',
            gap: '16px',
            backgroundColor: 'var(--bg-page)'
        }}>
            <h1 style={{ color: 'var(--text-primary)', marginBottom: '4px', fontSize: '26px', fontWeight: '700' }}>Crear cuenta</h1>
            <RegisterForm
                onRegister={handleRegister}
                message={message}
                loading={loading}
            />
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
                ¿Ya tienes cuenta?{' '}
                <a href="/login" style={{ color: 'var(--brand)', fontWeight: '600' }}>Inicia sesión</a>
            </p>

            <ConfirmModal
                isOpen={showSuccessModal}
                title="¡Cuenta creada con éxito!"
                description="Tu cuenta se ha registrado correctamente. Ya puedes iniciar sesión con tu email y contraseña para empezar a utilizar SABIO."
                confirmText="Iniciar sesión"
                cancelText={null}
                onConfirm={() => router.push("/login")}
                onClose={() => router.push("/login")}
            />
        </div>
    );
}
