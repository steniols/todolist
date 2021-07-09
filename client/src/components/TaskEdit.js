import React from 'react';
import { Redirect } from 'react-router';
import { toast } from 'react-toastify';
import PageTop from './PageTop';
import env from 'react-dotenv';

const apiUrl = env.API_URL ? `${env.API_URL}/tasks` : '/tasks';

class TaskEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task_title: '',
      task_description: '',
    };
    this.sendPost = this.sendPost.bind(this);
  }

  async sendPost() {
    try {
      const body = {
        task_title: this.state.task_title,
        task_description: this.state.task_description,
        task_status: '0',
      };
      const response = await fetch(`${apiUrl}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.token,
        },
        body: JSON.stringify(body),
      });

      const parseResponse = await response.json();

      if (!response.ok) throw new Error(parseResponse['message']);

      toast('Sucesso ao adicionar a tarefa!');
      this.setState({ task_title: '' });
      this.setState({ task_description: '' });
    } catch (err) {
      toast.error(err.message);
      console.log('error', err);
    }
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }
    return (
      <div className="container">
        <PageTop
          title={'Adicionar tarefa'}
          desc="Preencha os dados para salvar uma nova tarefa"
        >
          <div className="btn-group" role="group" aria-label="Basic example">
            <button
              className="btn btn-light"
              onClick={() => this.props.history.replace('/')}
            >
              Cancelar
            </button>
            <button
              className="btn btn-primary"
              onClick={() => this.sendPost()}
              data-cy="tag-submit"
            >
              Salvar
            </button>
          </div>
        </PageTop>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="title">
              Título <span>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={this.state.task_title}
              onChange={(e) => this.setState({ task_title: e.target.value })}
              maxLength="40"
              data-cy="tag-input-title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Descrição</label>
            <textarea
              type="text"
              className="form-control"
              id="content"
              value={this.state.task_description}
              rows={4}
              style={{ resize: 'none' }}
              maxLength="600"
              onChange={(e) =>
                this.setState({ task_description: e.target.value })
              }
              data-cy="tag-input-content"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default TaskEdit;
