function PageAccueil() {
  return (
    <div className="card text-center mx-auto" style={{ width: "50rem" }}>
      <img
        style={{ height: "150%" }}
        src={require("./images/montmorency-area.png")}
        className="card-img-top"
        alt="Campus de montmorency"
      />
      <div className="card-body">
        <h5 className="card-title">Édition 2023</h5>
        <p className="card-text text-center">
          Bienvenue sur le site des stages de fin d'études des techniques de
          l'informatique du Collège Montmorency!
          <br></br>À la fin de leurs études, les étudiants sont appelés à mettre
          en pratique les compétences acquises durant le programme. Cela se fait
          grâce à la participation d'entreprises de la région qui les
          accueillent afin de finaliser leurs formations. Le Collège Montmorency
          offre ainsi aux employeurs l'occasion d'obtenir une main-d'œuvre
          compétente, tout en leur permettant de participer à la formation
          finale des étudiants. Le stage de fin d'études est une expérience
          concrète permettant d'acquérir une expérience professionnelle
          formatrice. Les étudiants terminent la portion académique de leurs
          études en informatique selon une des deux voies de sortie du
          programme: Réseaux et sécurité informatique et Développement
          d'applications informatiques.
        </p>
      </div>
      <div></div>
    </div>
  );
}

export default PageAccueil;
