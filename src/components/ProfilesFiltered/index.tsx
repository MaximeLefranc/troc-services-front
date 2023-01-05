import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { actionFetchAllMessagesForOneUser } from '../../actions/messages';
import { GlobalState } from '../../reducers';
import { findMembersBySkills } from '../../selectors/members';
import Card from '../Cards/Card';
import { User } from '../Cards/ProfilesCards';
import NotFound404 from '../NotFound404';
import Spinner from '../Spinner';
import { variantsCards } from '../../utils/framerMotionVariants';

function ProfileFiltered(): JSX.Element {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: GlobalState) => state.user.isLoading);
  const { slug } = useParams();
  const { pathname } = useLocation();
  const memberList = useSelector(
    (state: GlobalState) => state.user.listOfMembers
  );
  const membersListFromSearchBar = useSelector(
    (state: GlobalState) => state.searchBar.result
  );
  const memberListFiltered: User[] | false = findMembersBySkills(
    memberList,
    slug
  );

  useEffect(() => {
    if (localStorage.getItem('token_troc_services')) {
      dispatch(actionFetchAllMessagesForOneUser());
    }
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  let result;
  if (pathname.split('/')[2] === 'filtre') {
    result = membersListFromSearchBar;
  } else {
    result = memberListFiltered;
  }

  if (!result || result.length === 0) {
    if (slug) {
      return (
        <NotFound404
          message={`Pas de membre trouvé avec la compétence ${slug}`}
        />
      );
    } else {
      return (
        <NotFound404
          message={`Pas de membre trouvée pour votre recherche... Try again`}
        />
      );
    }
  }
  return (
    <section className="main">
      {slug ? (
        <h2 className="main__title">
          Voici nos membres qui possèdent la compétence : {slug}
        </h2>
      ) : (
        <h2 className="main__title">
          Voici nos membres qui correspondent à votre recherche :
        </h2>
      )}
      <motion.section
        className="cards"
        initial="hide"
        animate="show"
        exit="hide"
        variants={variantsCards}
      >
        {result.map((user: User) => (
          <Link
            key={user.id}
            className="cards__link"
            to={`/profils/${user.nickname}`}
          >
            <Card
              key={user.id}
              image={user.imageName}
              title={user.nickname}
              description={user.biography}
              skills={user.skill}
              city={user.city}
              zipCode={user.zip_code}
            />
          </Link>
        ))}
      </motion.section>
    </section>
  );
}

export default ProfileFiltered;
