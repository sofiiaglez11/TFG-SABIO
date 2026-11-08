"use client";

import { ShieldCheck, Database, Clock, Users, Mail } from "lucide-react";

export default function PrivacyPage() {
    return (
        <div style={{
            minHeight: "100vh",
            background: "var(--bg-page)",
            color: "var(--text-primary)",
            fontFamily: "inherit",
        }}>
            <div style={{
                maxWidth: 760,
                margin: "0 auto",
                padding: "40px 24px 80px",
            }}>

                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
                    <div style={{
                        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                        borderRadius: 12,
                        padding: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <ShieldCheck size={28} color="#fff" strokeWidth={2} />
                    </div>
                    <div>
                        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "var(--text-primary)" }}>
                            Política de privacidad
                        </h1>
                        <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: 14 }}>
                            SABIO · Última actualización: noviembre de 2026
                        </p>
                    </div>
                </div>

                <p style={{ color: "var(--text-secondary)", lineHeight: 1.75, marginTop: 20, marginBottom: 32, fontSize: 15 }}>
                    En SABIO nos tomamos muy en serio la privacidad de los datos de nuestros usuarios.
                    Esta página explica qué datos recogemos, para qué los usamos y cómo los protegemos.
                    SABIO es un proyecto académico (Trabajo de Fin de Grado) y los datos se usan
                    exclusivamente para ofrecer una mejor experiencia de usuario.
                </p>

                <hr style={{ border: "none", borderTop: "1px solid var(--border)", marginBottom: 36 }} />

                {/* Section: datos de bienestar */}
                <Section
                    icon={<Users size={20} color="var(--brand)" />}
                    title="Datos de bienestar"
                >
                    <p>
                        SABIO recopila, con tu consentimiento explícito, <strong>informes de bienestar</strong> que
                        incluyen información sobre tus horas de sueño, tu nivel de energía, tu estado de ánimo
                        y otros indicadores que tú mismo introduces en la aplicación a través del chat.
                    </p>
                    <ul>
                        <li>Los datos de bienestar se almacenan de forma segura en nuestra base de datos.</li>
                        <li>Se usan para personalizar las recomendaciones del asistente IA y mostrarte estadísticas en tu panel.</li>
                        <li>No se comparten con terceros ni se usan con fines comerciales.</li>
                    </ul>
                </Section>

                {/* Section: datos de Clockify */}
                <Section
                    icon={<Clock size={20} color="var(--brand)" />}
                    title="Datos de tiempo de estudio (Clockify)"
                >
                    <p>
                        SABIO se integra con <strong>Clockify</strong>, una plataforma de seguimiento de tiempo,
                        para registrar automáticamente tus sesiones de estudio. Para ello necesitas proporcionar
                        voluntariamente tu <em>API key</em> de Clockify en los ajustes de la aplicación.
                    </p>
                    <ul>
                        <li>Tu API key de Clockify se almacena cifrada y solo se usa para leer y crear entradas de tiempo en tu cuenta.</li>
                        <li>Los datos de tiempo de estudio (duración, asignatura, fecha) se usan para calcular estadísticas y personalizar el asistente.</li>
                        <li>SABIO nunca accede a proyectos de Clockify ajenos a tu cuenta ni comparte tu clave con terceros.</li>
                    </ul>
                </Section>

                {/* Section: datos de cuenta */}
                <Section
                    icon={<Database size={20} color="var(--brand)" />}
                    title="Datos de cuenta"
                >
                    <p>
                        Al registrarte, almacenamos tu <strong>nombre</strong>, <strong>correo electrónico</strong>
                        {" "}y tu <strong>contraseña cifrada</strong>
                    </p>
                    <ul>
                        <li>El email se usa únicamente para identificarte en la aplicación.</li>
                        <li>No enviamos correos de marketing ni compartimos tu email con terceros.</li>
                    </ul>
                </Section>

                {/* Section: contacto */}
                <Section
                    icon={<Mail size={20} color="var(--brand)" />}
                    title="Contacto y eliminación de datos"
                >
                    <p>
                        Tienes derecho a acceder, rectificar y suprimir tus datos en cualquier momento.
                        Para ejercer estos derechos o si tienes cualquier pregunta sobre la privacidad,
                        contacta con la responsable del proyecto:
                    </p>
                    <div style={{
                        background: "var(--bg-input)",
                        border: "1px solid var(--border)",
                        borderRadius: 10,
                        padding: "14px 18px",
                        marginTop: 12,
                        fontSize: 14,
                    }}>
                        <strong>Sofía</strong> — Proyecto SABIO (TFG)<br />
                        <a
                            href="mailto:sofia.g2co@gmail.com"
                            style={{ color: "var(--brand)", fontWeight: 600 }}
                        >
                            sofia.g2co@gmail.com
                        </a>
                    </div>
                </Section>

                <p style={{ color: "var(--text-secondary)", fontSize: 13, marginTop: 40, lineHeight: 1.6 }}>
                    Al marcar las casillas de consentimiento durante el registro, confirmas que has leído y
                    aceptas el tratamiento de tus datos tal y como se describe en esta política. Puedes retirar
                    tu consentimiento en cualquier momento contactando con nosotros.
                </p>
            </div>
        </div>
    );
}

function Section({ icon, title, children }) {
    return (
        <div style={{ marginBottom: 36 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{
                    background: "color-mix(in srgb, var(--brand) 12%, transparent)",
                    borderRadius: 8,
                    padding: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    {icon}
                </div>
                <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "var(--text-primary)" }}>{title}</h2>
            </div>
            <div style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: "18px 20px",
                lineHeight: 1.75,
                fontSize: 14.5,
                color: "var(--text-primary)",
            }}>
                {children}
            </div>
        </div>
    );
}