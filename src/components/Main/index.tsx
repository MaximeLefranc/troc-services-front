import AdvertsCards from '../AdvertsCards';
import Footer from '../Footer';
import './styles.scss';

function Main() {
  return (
    <section className="main">
      {/* <Header /> */}
      <h2 className="main__title">Les dernières annonces</h2>
      <AdvertsCards />
      <Footer />
    </section>
  );
}

export default Main;
