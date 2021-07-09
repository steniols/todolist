import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import env from 'react-dotenv';

const Register = ({ setAuth }) => {
  const apiUrl = env.API_URL ? `${env.API_URL}/auth` : '/api/auth';
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    name: '',
  });

  const { email, password, name } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password, name };
      const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const parseResponse = await response.json();
      if (parseResponse.token) {
        localStorage.setItem('token', parseResponse.token);
        setAuth(true);
        toast('Registro feito com sucesso!');
      } else {
        toast.error(parseResponse);
      }
    } catch (err) {
      console.log(err.messsage);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center my-5">Cadastro</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="email"
          name="email"
          placeholder="Email..."
          className="form-control my-3"
          value={email}
          onChange={(e) => onChange(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="Senha..."
          className="form-control my-3"
          value={password}
          onChange={(e) => onChange(e)}
        />
        <input
          type="text"
          name="name"
          placeholder="Nome..."
          className="form-control my-3"
          value={name}
          onChange={(e) => onChange(e)}
        />
        <button className="btn btn-success btn-block">Enviar</button>
      </form>
      Já possui uma conta? <Link to="/login">Login</Link>
    </Fragment>
  );
};

export default Register;
