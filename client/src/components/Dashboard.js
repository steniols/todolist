import React, { Fragment, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PageTop from './PageTop';
import env from 'react-dotenv';

const Dashboard = (props) => {
  const apiUrl = env.API_URL ? `${env.API_URL}/tasks` : '/tasks';

  const [tasks, setTasks] = useState([]);

  async function getTasks() {
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      setTasks(parseRes);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function finish(id) {
    try {
      const body = {
        task_id: id,
      };
      console.log(body);
      const response = await fetch(`${apiUrl}/finish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.token,
        },
        body: JSON.stringify(body),
      });

      const parseResponse = await response.json();

      if (!response.ok) throw new Error(parseResponse);

      toast('Sucesso ao concluir a tarefa!');

      getTasks();
    } catch (err) {
      toast.error(err.message);
      console.log('error', err);
    }
  }

  async function remove(id) {
    try {
      const body = {
        task_id: id,
      };
      const response = await fetch(`${apiUrl}/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.token,
        },
        body: JSON.stringify(body),
      });

      const parseResponse = await response.json();

      if (!response.ok) throw new Error(parseResponse);

      toast('Sucesso ao excluir a tarefa!');

      getTasks();
    } catch (err) {
      toast.error(err.message);
      console.log('error', err);
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Fragment>
      <PageTop title={'Todo List'} desc={'Listagem de tarefas'}>
        <button
          className="btn btn-primary"
          onClick={() => props.history.push('/task-add')}
        >
          Adicionar
        </button>
      </PageTop>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Título</th>
            <th scope="col">Descrição</th>
            <th scope="col">Status</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((e) => {
            return (
              <tr
                key={e.task_id}
                className={e.task_status === 1 ? 'finished' : ''}
              >
                <td>{e.task_title}</td>
                <td>{e.task_description}</td>
                <td>{e.task_status === 1 ? 'Concluído' : 'Pendente'}</td>
                <td>
                  <button
                    className="btn btn-primary mr-2"
                    onClick={() => finish(e.task_id)}
                    disabled={e.task_status === 1 ? true : false}
                  >
                    Concluir
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => remove(e.task_id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Dashboard;