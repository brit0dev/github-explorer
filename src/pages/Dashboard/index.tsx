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

type UserData = {
	login: string;
	avatar_url: string;

	url: string;
	public_repos: number;
}

const Dashboard: React.FC = () => {
  const [repoPath, setRepoPath] = useState('');
	const [repoUser, setRepoUser] = useState('');
	const [repoSearchTerm, setRepoSearchTerm] = useState('');
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
	const [searchedRepoLimitError, setSearchedRepoLimitError] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories)
    );
  }, [repositories]);

  useEffect(() => {
		const user = repoPath.split('/')[0];
		const searchTerm = repoPath.split('/')[1];
		const userChange = user!= repoUser;

		if (searchTerm != repoSearchTerm) setRepoSearchTerm(searchTerm);

		if(userChange){
			setRepoUser(user);
			setSearchedRepoLimitError(false);
			setSearchedRepositories(null);
			setInputError('');
		}

		if (repoPath.includes("/") && !searchedRepositories && (!searchedRepoLimitError || userChange)){
			handlePreviewRepository()
		} else if(!repoPath.includes("/")){
			setSearchedRepositories(null);
			setRepoUser('');
			setRepoSearchTerm('');
		} else if(searchedRepoLimitError && inputError){
			setInputError('');
		}
  }, [repoPath, searchedRepositories]);

function addRepository(repository: Repository):void {
      setRepositories([...repositories, repository]);
}

 async function handlePreviewRepository(): Promise<void> {
		if (!repoPath) {
      setInputError('Digite o autor/nome do repositório');

      return;
    }

    try {
			const user = repoPath.split('/')[0];
			const userData = await api.get<UserData>(`users/${user}`);			
			const userReposCount = userData.data.public_repos;

			console.log(userData)		
	
			if (userReposCount > 500) {
				setInputError('Muitos repositórios, não será possível exibir o preview. Digite o caminho completo do repositório.')
				setSearchedRepoLimitError(true)
				return
			} else if (userReposCount == 0){
				setInputError('Esse usuário não possui repositórios públicos');
				return
			}

			const totalPages = Math.ceil(userReposCount / 100);
			let repositories:Repository[] = [];

			for(let i=1; i <= totalPages; i++){
				const response = await api.get<Repository[]>(`users/${user}/repos?per_page=100&page=${i}`);
				repositories = [...repositories, ...response.data]
			}
			

			setSearchedRepositories(repositories);
			console.log(repositories);
    } catch (err) {
      setInputError('Erro na buscar por esse repositório');
    }
  }

 async function handleSearchRepository(
    event?: FormEvent<HTMLFormElement>
  ): Promise<void> {
    // Add new repo - Get GitHub API - Save new repo on state
		if(event) event.preventDefault(); //Prevents page reloading (submit)
    
		if (!repoPath) {
      setInputError('Digite o autor/nome do repositório');
      return;
    }

    try {
     	const response = await api.get<Repository>(`repos/${repoPath}`);
			const repository = response.data;

			addRepository(repository);

      setRepoPath('');
      setInputError('');
    } catch (err) {
      setInputError('Erro na buscar por esse repositório');
    }
  }

function searchMatchScore(str: string, subStr: string): number {
    str = str.toLowerCase();
    subStr = subStr.toLowerCase();

    let index = str.indexOf(subStr);
    let indexScore = index === -1 ? Infinity : index;

    let commonChars = Array.from(subStr).filter(char => str.includes(char)).length;

    let lengthScore = str.length;

		console.log(str, subStr, indexScore, lengthScore)
    return 100/(indexScore+1) - commonChars - lengthScore;
}

  return (
    <Main>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore Repositórios no Github</Title>

      <Form hasError={!!inputError} onSubmit={handleSearchRepository}>
				<div className="input">
        <input
          value={repoPath}
          onChange={(e) => setRepoPath(e.target.value)}
          placeholder="Digite o nome do repositório."
        />
        <button type="submit">Pesquisar</button>
				</div>

				{(searchedRepositories) && 
					<SearchPreviewBox>
						<ul>
							{searchedRepositories.sort((a,b)=> b.stargazers_count - a.stargazers_count)
							.filter((repo)=>repo.name.toLowerCase().includes(repoSearchTerm.toLowerCase()))
							.sort((a,b)=> searchMatchScore(b.name, repoSearchTerm) - searchMatchScore(a.name, repoSearchTerm))
							.slice(0,5).map((repo)=>(
								<li key={repo.name}>
									<p>{repo.owner.login}<span>/{repo.name}</span><br/> {repo.description ? repo.description : "No description..."}</p>
									<button type="button" onClick={()=>{addRepository(repo)}}>Adicionar</button>
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
