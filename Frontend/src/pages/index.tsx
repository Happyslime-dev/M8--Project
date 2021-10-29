import fetch from 'isomorphic-unfetch'
import styled from 'styled-components'

const {
  NASA_APP_ID
} = process.env

export const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
export const Img = styled.div`
    width: 100%;
    margin-right: 50;
    margin-bottom: 30px;
`

const APOD = ({ url,copyright,date,explanation }) => {
  return (
    <div className="nasa-apod">
      <Header>
      <h1>Astronomy Picture of the Day</h1>
      </Header>
      <Img>
        <img src={url} />
      </Img>
      <Header>
      <h1>{copyright}</h1>
      </Header>
      <Header>
      <h2>{date}</h2>
      </Header>
      <h3>{explanation}</h3>
    </div>
  )
}
APOD.getInitialProps = async () => {
  const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=HE5wyoypSnGkCiEo9KKwItYqGQGPlkQ5TWM8NVHj`)
  const data = await res.json()
  return data
}
export default APOD