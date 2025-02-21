import styled from 'styled-components';
import { shade } from 'polished';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
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

export const RepositoryInfo = styled.section`
  margin-top: 80px;
  header {
    display: flex;
    align-items: center;

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
export const Issues = styled.div`
  margin-top: 80px;
  //max-width: 700px;

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
