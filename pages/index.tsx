import Head from 'next/head'
import requests from '../utils/request'
import {Movie, SectionTitle} from '../typing'

//Components
import Navbar from '../components/Home/Navbar'
import Banner from '../components/Home/Banner'
import RowSection from '../components/Home/RowSection'


interface IProps { 
  netflixOriginals: Movie[]
  topRated: Movie[] 
  trendingNow: Movie[]
  actionMovies: Movie[] 
  comedyMovies: Movie[]
  horrorMovies: Movie[] 
  romanceMovies: Movie[]
  documentaries: Movie[]
}
const Home = ({netflixOriginals, topRated, trendingNow, actionMovies, romanceMovies, documentaries, comedyMovies, horrorMovies}: IProps) => {
  return (
    <div className="relative h-screen">
      <Head>
        <title>N Pro | Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar/>
      <main className="relative">
        <Banner netflixOriginals={netflixOriginals}/>
        <RowSection title="Top Rated Movies" movie={topRated}/>
        <RowSection title="Trending Shows" movie={trendingNow}/>
        <RowSection title="Action Movies" movie={actionMovies}/>
        <RowSection title="Romance Movies" movie={romanceMovies}/>
        <RowSection title="Comedy Movies" movie={comedyMovies}/>
        <RowSection title="Horror Movies" movie={horrorMovies}/>
        <RowSection title="Documentaries" movie={documentaries}/>
      </main>
    </div>
  )
}

export default Home


export const getServerSideProps = async () => {
  const [
    netflixOriginals, 
    topRated, 
    trendingNow, 
    actionMovies, 
    comedyMovies, 
    horrorMovies, 
    romanceMovies, 
    documentaries] = await Promise.all([
      fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
      fetch(requests.fetchTrending).then((res) => res.json()),
      fetch(requests.fetchTopRated).then((res) => res.json()),
      fetch(requests.fetchActionMovies).then((res) => res.json()),
      fetch(requests.fetchComedyMovies).then((res) => res.json()),
      fetch(requests.fetchHorrorMovies).then((res) => res.json()),
      fetch(requests.fetchRomanceMovies).then((res) => res.json()),
      fetch(requests.fetchDocumentaries).then((res) => res.json()),
    ])

    return { 
      props : {
        netflixOriginals: netflixOriginals.results,
        topRated: topRated.results,
        trendingNow: trendingNow.results,
        actionMovies: actionMovies.results,
        comedyMovies: comedyMovies.results,
        horrorMovies: horrorMovies.results,
        romanceMovies: romanceMovies.results,
        documentaries: documentaries.results,
      }
    }
}