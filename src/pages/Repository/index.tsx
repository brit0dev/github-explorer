import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import { Header, RepositoryInfo, Issues } from './styles';
import api from '../../services/api';

type RepositoryParams = {
  repository: string;
  owner: string;
};
type RepositoryType = {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
};

type Issue = {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
};

const Repository: React.FC = () => {
  const params = useParams<RepositoryParams>();
  const repositoryFullName = `${params.owner}/${params.repository}`;

  const [repository, setRepository] = useState<RepositoryType | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    api.get(`repos/${repositoryFullName}`).then((response) => {
      setRepository(response.data);
    });

    api.get(`repos/${repositoryFullName}/issues`).then((response) => {
      setIssues(response.data);
    });
  }, [params]);

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>
      {repository && (
        <RepositoryInfo>
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
        </RepositoryInfo>
      )}

      <Issues>
        {issues.map((issue) => (
          <Link key={issue.id} to={issue.html_url} target="_blank">
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Issues>
    </>

    // <h1>
    //   Repository: {params.owner}/{params.repository}
    // </h1>
  );
};

export default Repository;
