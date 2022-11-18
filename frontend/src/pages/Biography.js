import React from 'react'
import '../styles/Biography.css'
import bioImg from '../assets/camera.jpg'

function Biography() {
  return (
    <div className="page">
      <div className = "biography">
          <div className = "bioBanner">
          BIOGRAPHY
          </div>
          <div className = "bioBody">
          <h2> Samuel Brett Williams is an award winning playwright,
            screenwriter, and director. His plays have been
            developed/produced at the Eugene O'Neil National Playwrights
            Conference, Cherry Lane Theatre, Ars Nova, New York Theatre
            Workshop, Naked Angels, Partial Comfort, the Lark, the Kennedy
            Center, Yale University, Actors Theatre of Louisville, Boise
            Contemporary Theater, WordBRIDGE, Arkansas Rep, the Seven
            Devils Playwrights Conference, 59E59, Elephant Theatre 
            Company, Project Y Theatre Company, the Joseph Beuys Theater
            (Moscow,Russia), the Gilded Balloon (Edinburgh,Scotland), and
            other theaters across the United States and Canada. Brett has
            received residencies/commissions from P73, the National 
            Theater Institute, the National New Play Network, Theatre
            Squared, and Playwrights Theatre of New Jersey. He is a past
            winner of the Helen Merrill Emerging Playwright Award (other
            winners include: Sarah Ruhl Adam Rapp, and Annie Baker). For
            television, Brett has developed an original pilot
            (with Ryan O'Nan) for 26 Keys Productions (FARGO), and he has worked on various shows for Hot Snakes Media. In
            film, Brett has written screenplays for Aeroplano, Naked Faith Entertainment, and Character Brigade Productions.
            Recently Brett has adapted his play, THE REVIVAL, into a feature film, which finished principal photography in 2016. In
            2017, Brett's original screenplay PRETTY NEAR PERFECT (co-written with Jennifer Gerber) will be filmed. In 2018,
            Brett's original screenplay for the horror series SX_TAPE will be produced by Sebastian Aloi and directed by the
            acclaimed Laurent Briet.
            </h2>
            <img className = 'bioImg' src = {bioImg} />
            </div>
      </div>
    </div>
   
  )
}

export default Biography