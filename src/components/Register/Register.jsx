import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { username, email, password } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const validateFields = () => {
        const usernameRegex = /^[a-zA-Z0-9]+$/;
        const passwordRegex = /^[a-zA-Z0-9]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setError('Invalid email format');
            return false;
        }
        if (!usernameRegex.test(username)) {
            setError('Username can only contain letters and numbers');
            return false;
        }
        if (!passwordRegex.test(password)) {
            setError('Password can only contain letters and numbers');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateFields()) {
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                const data = await response.json();
                setError(data.message || 'Error al registrarse');
                return;
            }
            navigate('/login');
        } catch (error) {
            setError('Error al conectar con el servidor. Por favor, intenta de nuevo más tarde.');
        }
    };

    return (
        <div className="register-container">
            <div className="register-image"></div>
            <div className="register-form-container">
                <form className="register-form" onSubmit={handleSubmit}>
                    <h2>Registro</h2>
                    {error && <div className="error-message">{error}</div>}
                    <label htmlFor="username">Usuario</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleChange}
                        placeholder="Ingresa tu usuario"
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleChange}
                        placeholder="Ingresa tu email"
                    />
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handleChange}
                        placeholder="Ingresa tu contraseña"
                    />
                    <button type="submit">Registrarse</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
