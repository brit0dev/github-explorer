import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories, Main, SearchPreviewBox , Error } from './styles';

type Repository = {
  name: string;
	full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
	stargazers_count: number;
};
const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@GithubExplorer:repositories'
    );

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }
    return [];
  });
	const [searchedRepositories, setSearchedRepositories] = useState<Repository[] | null>(null);

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories)
    );
  }, [repositories]);

  useEffect(() => {
    if (newRepo.includes("/") && !searchedRepositories){
			handleSearchRepository()
		} else if(!newRepo.includes("/")){
			setSearchedRepositories(null)
		}
  }, [newRepo]);

 async function handleSearchRepository(
    event?: FormEvent<HTMLFormElement>
  ): Promise<void> {
    // Add new repo
    // Get GitHub API
    // Save new repo on state
		if(event) event.preventDefault(); //Prevents page reloading (submit)
    
		if (!newRepo) {
      setInputError('Digite o autor/nome do repositório');
      return;
    }

    try {
      //const response = await api.get<Repository>(`repos/${newRepo}`);
			const user = newRepo.split('/')[0];
      const response = await api.get<Repository[]>(`users/${user}/repos?per_page=100`);

      const repositories = response.data;

			setSearchedRepositories(repositories);
			console.log(repositories);
      //setRepositories([...repositories, repository]);
      //setNewRepo('');
      setInputError('');
    } catch (err) {
      setInputError('Erro na buscar por esse repositório');
    }
  }


  return (
    <Main>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore Repositórios no Github</Title>

      <Form hasError={!!inputError} onSubmit={handleSearchRepository}>
				<div className="input">
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório."
        />
        <button type="submit">Pesquisar</button>
				</div>

				{searchedRepositories && 
					<SearchPreviewBox>
						<ul>
							{searchedRepositories.sort((a,b)=> b.stargazers_count - a.stargazers_count)
							.filter((repo)=>repo.name.includes(newRepo.split('/')[1]))
							.slice(0,5).map((searchedRepo)=>(
								<li>
									<p>{searchedRepo.owner.login}<span>/{searchedRepo.name}</span><br/> {searchedRepo.description ? searchedRepo.description : "No description..."}</p>
								</li>
							))}
					</ul>
				</SearchPreviewBox>}

      </Form>
      {inputError && <Error>{inputError}</Error>}
      <Repositories>
        {repositories.map((repository) => (
          <Link
            key={repository.full_name}
            to={`/repository/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        )).reverse()}
      </Repositories>
    </Main>
  );
};

export default Dashboard;
