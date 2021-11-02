import React, { ReactElement } from 'react'
import { GetStaticProps} from "next";
import styled from 'styled-components'

  export const Header = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
  `
  export const Img = styled.div`
  img{
    width: 100rem;
    height: 40rem;

  }
      margin-bottom: 10px;
      margin-left:100px;
  `


interface Props {
    data:Data
}

interface Data {
    copyright: string;
    date: string;
    explanation: string;
    hdurl: string;
    media_type: string;
    service_version: string;
    title: string;
    url: string;
}


function index({data}: Props): ReactElement {
    const {date,explanation,hdurl,title} = data
    return (
        <div >
            <Header>
            <h1>Astronomy Picture of the Day </h1>
            </Header>
            <div className="nasa-apod">
                <Img>
                    <img className='hurl' src={hdurl} /> 
                </Img>
                <Header>
                <h2>{title}</h2>
                <h5>{date}</h5>
                </Header>
                <h4>{explanation}</h4>
             </div>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const url =`https://api.nasa.gov/planetary/apod?api_key=HE5wyoypSnGkCiEo9KKwItYqGQGPlkQ5TWM8NVHj`
    const res = await fetch(url)
    const result = await res.json()
    const data: Data = result
    return {props:{
        data
    }}
  }

  export default index