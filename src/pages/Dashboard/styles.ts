import styled, { css, keyframes } from 'styled-components';
import { shade } from 'polished';

type FormProps = {
  hasError: boolean;
};

export const Main = styled.main``;

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  max-width: 450px;
  line-height: 56px;

  margin-top: 80px;
`;


const liAnimation = keyframes`
	0%{
		opacity: 0;	
	}
	100%{
		opacity: 1;
	}

`;

export const SearchPreviewBox = styled.div<{open: boolean}>`
	max-height: ${({open}) => (open ? '600px':'0px')};

	background: #fff;
	border-radius: 8px;
	margin-top: 0.5em;
	display: flex;
	flex-direction: column;
	overflow:hidden;

	transition: all 1s;

	ul {
		list-style: none;
		opacity: ${({open}) => (open ? 1:0)};
		transition: 1s opacity 0.2s;
		
		li {
			color: #a3a3a3;
			padding: 0 1em;
			transition: opacity 0.2s;				
			cursor: pointer;
			opacity: 0;

			animation: ${liAnimation} 0.3s ease-out forwards;
			&:hover{
				background: #f9f9f9;
			}

			div{
				display: flex;
				align-items: center;
				justify-content: space-between;
				
				border-bottom: 1px #efefef solid;

				p {
					padding: 0.75em 0.5em;
					user-select: none;
					-webkit-user-select: none;

					span {
						color: #3a3a3a;
						font-weight: bold;
					}
				}
			}

			&:hover button{opacity:1;}
			button {
				background: transparent;
				color: #3a3a3a;
				display: inline;
				padding: 0.3em 0.625em;
				
				font-weight: normal;

				border: 1px #737380 solid;
				border-radius: 0.625em;

				opacity: 0;
			transition: opacity 0.3s ease-out;
			}

			button.added{
				opacity: 0.5;
			}
		}
		
		li:first-child{padding-top: 0.25em;}

		li:last-child div {border:none;}
		li:last-child{padding-bottom: 0.25em;}


		li:nth-child(2) {
			animation-delay: 0.2s;
		}
		li:nth-child(3) {
			animation-delay: 0.3s;
		}
		li:nth-child(4){
			animation-delay: 0.4s;
		}
		li:nth-child(5){
			animation-delay: 0.5s;
		}
	}

`;


export const Form = styled.form<FormProps>`
  margin-top: 40px;
  max-width: 700px;

  display: flex;
	flex-direction: column;
	div.input	{
		display: flex;
		flex: 1;

	  input {
  	  flex: 3;
    	height: 70px;
	    padding: 0 24px;
  	  border: 0;
  	  border-radius: 5px 0 0 5px;
   		min-width: 3em;
   		color: #a3a3a3;
  	  border: 1px solid #fff;
   	 	border-right: 0;

    	${(props) =>
      	props.hasError &&
      	css`
        	border-color: #c53030;
      `}

    	&::placeholder {
    	  color: '#a8a8b3';
    	}
  	}
  button {
    flex: 1;
    background: #04d361;
    border-radius: 0px 5px 5px 0px;
    border: 0;
    color: #fff;
    font-weight: bold;
    min-width: 8em;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.1, '#04d361')};
    }
  }
	}
`;

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
`;

export const Repositories = styled.div`
  margin-top: 80px;
  max-width: 700px;

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

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
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
