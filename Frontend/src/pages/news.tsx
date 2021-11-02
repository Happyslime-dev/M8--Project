import React, { ReactElement } from 'react'
import { GetStaticProps} from "next";
import styled from 'styled-components'

  export const Div = styled.div`
    h3{
        padding: 2rem;
        font-size: 1.5rem;
    }
    h4{
        font-size: 3rem;
    }
    .nasa-apod{
        display: flex;
        flex-wrap: wrap;
        justify-content: pace-between;
        padding: 3;
        margin: 3;
    }
    .product{
        display: flex;
        flex-wrap: wrap;
        justify-content: pace-between;
        padding: 3;
        margin: 3;
    }
  `
  export const Header = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
  `
  export const Img = styled.div`
  img{
    width: 40rem;
    height: 30rem;
    margin-right: 30px;

  }
      margin-bottom: 30px;
  `


interface Props {
    data:Data
}
interface Source {
    id: string;
    name: string;
}

interface Article {
    source: Source;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: Date;
    content: string;
}

interface Data {
    status: string;
    totalResults: number;
    articles: Article[];
}

function news({data}: Props): ReactElement {
    const {articles} = data
    return (
        <Div>
        <div>
            <Header>
            <h1>News of the Day </h1>
            </Header>
            <div className='nasa-apod'>
            {articles.map((item) =>(
                <div>
                    <div className='product'>
                        <Img>
                           <a href={item.url} ><img src={item.urlToImage}/></a>
                        </Img>
                        <h3>{item.title}</h3>
                    </div>
                </div>
            ))}
             </div>
        </div>
        </Div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const url =`https://newsapi.org/v2/everything?q=nasa&apiKey=091d6c20465d4e709d53a7af96127c08`
    const res = await fetch(url)
    const result = await res.json()
    const data: Data = result
    return {props:{
        data
    }}
  }

  export default news