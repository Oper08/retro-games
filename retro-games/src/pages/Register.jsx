import React, { useState } from 'react';
import '../../styles/Register.css'; 

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Проверка на заполненность
    if (!formData.name || !formData.email || !formData.password) {
      alert('Пожалуйста, заполните все поля.');
      return;
    }

    // Сохраняем данные в localStorage
    localStorage.setItem('user', JSON.stringify(formData));

    // Очистка формы
    setFormData({ name: '', email: '', password: '' });

    // Уведомление
    alert('Вы успешно зарегистрировались!');
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Регистрация</h2>
        <input 
          type="text" 
          name="name" 
          placeholder="Имя" 
          value={formData.name} 
          onChange={handleChange} 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Пароль" 
          value={formData.password} 
          onChange={handleChange} 
        />
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
}