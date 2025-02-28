import styled,{css, keyframes} from 'styled-components';
import { shade } from 'polished';

type HeaderParams = {
	sticky:boolean; 
	showissues:boolean;
	showrepository:boolean;
	children?: JSX.Element;
}

const containerSize = css`
	max-width:960px;
	padding: 0px 20px;
`
const flexAlignCenter = css`
	display: flex;
 	align-items: center;
`

export const Header = styled.header<HeaderParams>`
	${flexAlignCenter}
	background: ${({sticky})=> sticky ? '#fff' : 'transparent'};
	justify-content:center;	
	position: sticky;
	top: 0px;
	box-shadow: 1px 1px 2px ${({sticky})=> sticky ? '#00000010' : '#00000000'};
	transition: background 0.25s;	
	z-index: 999;
	
  div.headerCont {
		${containerSize}
		${({sticky})=> sticky ? 'max-width:1100px' : ''};
		${flexAlignCenter}  		
		justify-content: space-between;
		flex: 1;
		transition: all ${({sticky})=> sticky ? '0.25s' : '0.05s'};

		div {
			${flexAlignCenter}
			gap: 12px;

			p {
				color: #999;
				padding: 4px 10px;
				display: inline-flex;
				align-items: center;
				border: 1px #ededed solid;
				border-radius: 8px;
				
				opacity: ${({showrepository}) => showrepository ? 1 : 0};
				transition: ${({showrepository}) => showrepository ? 
				'opacity 0.25s ease-out'  
				: 
				'opacity 0.25s ease-out'};



				span.headerIssuesInfo{
					background: #3d3d4d;
					color: #fff;

					width: ${({showissues}) => showissues ? 104 : 0}px;
					margin-left: ${({showissues}) => showissues ? 8 : 0}px;
					padding: 4px 0px;

					display: inline-flex;
					justify-content: space-evenly;	
					align-items: center;

					font-size: 14px;
					font-weight: normal;
					border-radius: 6px;
					overflow: hidden;
					opacity: ${({showissues}) => showissues ? 1 : 0};

					transition: ${({showissues}) => showissues ? 
					'all 0.25s, 0.25s opacity 0.25s ease-out'  
					: 
					'0.25s all 0.25s, opacity 0.25s ease-out'};

					span {
						background: #fff;
						color: #3d3d4d;
						padding: 2px 4px 1px;
						font-weight: bold;
						border-radius: 4px;
					}
				}	
			}
	}
		
  a {
		background: transparent;
		padding: 16px 0px;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #a8a8b3;
    transition: 0.2s;

    &:hover {
      color: #666;
    }
  }
`;

export const Main = styled.main`
	${containerSize}
	margin: 0 auto;
`;


export const RepositoryInfo = styled.section`
  margin-top: 80px;
  header {
  ${flexAlignCenter}
	
	img {
		width: 120px;
		height: 120px;
		border-radius: 50%;
	}
	div {
		margin-left: 24px;

      a {
        color: #3d3d4d;
        text-decoration: none;
      }

      a:hover{
        text-decoration: none;
      	text-decoration-thickness: 2px;
				color: #2d2d2d;	
        transition: all 0.25s;

				strong {
	  			span {
						transform: scale(1);
						svg {
							opacity: 1;
							transition: all 0.25s;
	    			}
	  			}
				}
			}
  }

      strong {
       	position: relative;
	font-size: 36px;
	padding: 0px 2px;	
        span {
            display: inline-block;
            width:50px;
            height: 50px;
            transform: scale(0.8);
            transition: all 0.25s;
            z-index: -1;

	    &, svg{
            position: absolute;
            top:1px;
            right: 0px;
            }

            svg{
              transform: rotate(-45deg);
              opacity: 0;
              transition: all 0.2s;
            }
      	}
      p {
        font-size: 18px;
        color: #737380;
        margin-top: 4px;
      }
    }
  }

  ul {
    display: flex;
    list-style: none;
    margin-top: 40px;

    li {
      & + li {
        margin-left: 80px;
      }

      strong {
        display: block;
        font-size: 36px;
        color: #3d3d4d;
      }

      span {
        display: block;
        margin-top: 4px;
        color: #6c6c80;
      }
    }
  }
`;

export const Issues = styled.section`
  margin-top: 80px;
  //max-width: 700px;
	scroll-margin-top: 64px;

  a {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;

    text-decoration: none;
    color: inherit;

    display: flex;
    align-items: center;

    & + a {
      margin-top: 14px;
    }

    &:hover {
      background: ${shade(0.02, '#fff')};
    }
    svg {
      transition: transform 0.2s;
    }
    &:hover svg {
      transform: translateX(7px);
    }

    div {
      flex: 1;
      margin-left: 10px;
      strong {
        font-size: 20px;
        color: #3d3d4d;
      }
      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 3px;
      }
    }
  }
`;

export const Pagination = styled.nav`
	margin: 16px 0px;
	display:flex;
	justify-content:center;
	gap:1%;	
	
	span {
		color:#999;

	}
`;

export const PagButton = styled.button`
	background: #fff;
	color: #3d3d4d;
	padding: 8px 12px;
	${flexAlignCenter}
	gap: 4px;
	font-weight: regular;
	border: none;
	border-radius: 4px;
	transition: all 0.25s;

  svg {
      transition: transform 0.2s;
  }

	&:hover{
		background: ${shade(0.02, '#fff')};

	}

	&:last-child:hover svg{
      transform: translateX(2px);
	}
	
	&:first-child:hover svg{
      transform: translateX(-2px);
	}
`

export const PagIndexButton = styled(PagButton)<{state:string}>`
	font-weight: bold;
	opacity:${({state})=>(state=='Active'? 1 : 0.6)};
	
	&:hover{
		background: #fff;
		opacity:1;
	}
`
