import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { api } from '../../services/api';
import { Header, RepoInfo, Issues } from './styles';
import logo from '../../assets/logo.svg';

// Tipando o retorno do parâmetro da rota do react-router-dom. Ex: 'rafanthx/log-price-comparator'
interface RepositoryParams {
  repository: string;
}

interface GithubRepository {
  full_name: string;
  description: string;
  forks_count: number;
  open_issues_count: number;
  stargazers_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface GithubIssue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

export const Repo: React.FC = () => {
  // STATES

  // Armazena o repositório
  const [repository, setRepository] = React.useState<GithubRepository | null>(
    null,
  );
  // Armazena as issues
  const [issues, setIssues] = React.useState<GithubIssue[]>([]);
  // Vai recuperar o parametro da url pelo raact-router-dom
  const { params } = useRouteMatch<RepositoryParams>();

  // HOOKS: Executada no início e quando os parametors (no caso params.repository ) mudarem)
  // Atravez do useEffect, vamos consumir a API
  // Será executado assim que é inicaiaa
  React.useEffect(() => {
    // pega resumo do repo
    api
      .get(`repos/${params.repository}`)
      .then(response => setRepository(response.data));
    // pega issues do repo
    api
      .get(`repos/${params.repository}/issues`)
      .then(response => setIssues(response.data));
  }, [params.repository]);

  // RENDER
  return (
    <>
      <Header>
        <img src={logo} alt="GitCollection" />
        <Link to="/">
          <FiChevronLeft />
          Voltar
        </Link>
      </Header>

      {/* equivalente ao v-if para se o repositry existir*/}
      {repository && (
        <RepoInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepoInfo>
      )}

      <Issues>
        {issues.map(issue => (
          <a href={issue.html_url} key={issue.id}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
};
