import React from 'react'
import Hero from '../../components/Hero/Hero'
import About from '../../components/About/About'
import Projects from '../../components/Projects/Projects'
import Benefits from '../../components/Benefits/Benefits'
import Comfort from '../../components/Comfort/Comfort'
import Plan from '../../components/Plan/Plan'
import SWForm from '../../components/Form/SWForm'


const Home = () => {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Benefits />
      <Comfort />
      <Plan />
      <SWForm />
    </main>
  )
}

export default Home