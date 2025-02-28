import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import { Header, Main, RepositoryInfo, Issues, Pagination, PagButton, PagIndexButton } from './styles';
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
	const listRef = useRef<HTMLDivElement>(null);
  const [itemsPage, setNumItems] = useState<number>(25);  
  const [numPage,setNumPage] = useState<number>(1);
  const [maxPages, setMaxPages] = useState(0);
  const [stickyHeader, setStickyHeader] = useState<boolean>(false);
  const [showIssues, setShowIssues] = useState<boolean>(false);
  const [showHeaderRepo, setShowHeaderRepo] = useState<boolean>(false);

  useEffect(() => {
    api.get(`repos/${repositoryFullName}`).then((response) => {
      setRepository(response.data);
    });
	}, [params]);

	useEffect(() => {
    api.get(`repos/${repositoryFullName}/issues?per_page=${itemsPage}&page=${numPage}`).then((response) => {
      setIssues(response.data);
    });
  }, [params,numPage]);

  useEffect(()=>{
    if(repository) setMaxPages(Math.ceil(repository.open_issues_count/itemsPage))
 }, [repository])

	useEffect(()=>{
		const onScroll = () => {
			if (window.pageYOffset> 40 && !stickyHeader){	
				setStickyHeader(true);
			} else if(window.pageYOffset < 40 && stickyHeader) {
				setStickyHeader(false)
			}

			if (window.pageYOffset > 165 && !showHeaderRepo){
				setShowHeaderRepo(true);
			}	else if (window.pageYOffset < 165 && showHeaderRepo){
				setShowHeaderRepo(false);
			}

			if (window.pageYOffset > 335 && !showIssues){
				setShowIssues(true);
			}	else if (window.pageYOffset < 335 && showIssues){
				setShowIssues(false);
			}		
		};		
 
	 window.addEventListener("scroll", onScroll);

	return () => window.removeEventListener("scroll", onScroll);
	},[stickyHeader, showIssues, showHeaderRepo])


	const setPage = (index:number) => {
		if(index < 0 || index > maxPages) return
		setNumPage(index);
			
		if(index > 1){
			listRef.current?.scrollIntoView({behavior:'smooth'});
		} else {
			window.scroll({top:0,behavior:'smooth'});
		}
	}

  return (
    <>
      <Header sticky={stickyHeader} showissues={showIssues} showrepository={showHeaderRepo}> 
				<div className='headerCont'>
        	<div>
						<img src={logoImg} alt="Github Explorer" />
						{(!!repository && stickyHeader) && (
						<p>
							{repository.full_name}
							<span className="headerIssuesInfo">Issues:
								<span>{numPage}/{maxPages}</span>
							</span>
						</p>)}
					</div>
					<Link to="/">
         	 	<FiChevronLeft size={16} />
          	Voltar
        	</Link>
				</div>
      </Header>
			<Main>
      {repository && (
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <a target="_blank" href={"https://github.com/" + repository.full_name}><strong>{repository.full_name} <span className="box"><FiChevronRight size={14} /></span></strong></a>
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

      <Issues ref={listRef}>
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
			</Main>
	<Pagination>
	<PagButton onClick={()=>setPage(numPage-1)}><FiChevronLeft /> Anterior</PagButton>
	{numPage > 4 && <PagButton onClick={()=>setPage(1)}>Início</PagButton>}
	{
		Array.from(Array(maxPages+1).keys())
			.slice(numPage-1 > 0 ? numPage - 1 : 1,numPage+2)
				.map((e)=>{
					return <PagIndexButton onClick={()=>setPage(e)} state={e == numPage ? 'Active' : ''}>{e}</PagIndexButton>
				})
	}
	{numPage < maxPages-2 && <><span>_</span><PagIndexButton onClick={()=>setPage(maxPages)} state={maxPages == numPage ? 'Active' : ''}>{maxPages}</PagIndexButton></>}
	<PagButton onClick={()=>setPage(numPage+1)}>Próximo <FiChevronRight/> </PagButton>
	</Pagination>
    </>
    // <h1>
    //   Repository: {params.owner}/{params.repository}
    // </h1>
  );
};

export default Repository;
