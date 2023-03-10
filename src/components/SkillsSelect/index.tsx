// ---- React Import ----
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

// ---- React-select Import ----
import Select, { MultiValue } from 'react-select';
import makeAnimated from 'react-select/animated';

// ---- Actions Import ----
import { actionAddSkillsNewAdvert } from '../../actions/advertisements';
import { actionAddInscriptionSkills } from '../../actions/inscription';

// ---- TypeScript Import ----
import { GlobalState } from '../../reducers';

// ---- Styles Import ----
import './../InscriptionForm/styles.scss';

export interface Category {
  id: number;
  name: string;
  skills: { id: number; name: string }[];
}

export interface Skills {
  value: number;
  label: string;
  isDisabled?: true;
}

function SkillsSelect(): JSX.Element {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const skillsFromAPI = useSelector(
    (state: GlobalState) => state.advertisements.listOfSkills
  );
  const skillsUser = useSelector(
    (state: GlobalState) => state.inscription.skills
  );
  const skillsAdvert = useSelector(
    (state: GlobalState) => state.advertisements.skills
  );

  const animatedComponents = makeAnimated();

  const optionList: Skills[] = [];
  skillsFromAPI.map((category: Category) => {
    optionList.push({
      value: category.id,
      label: category.name,
      isDisabled: true,
    });
    category.skills.map((skill) => {
      optionList.push({
        value: skill.id,
        label: skill.name,
      });
    });
  });

  const handleChange = (newValue: MultiValue<Skills>) => {
    if (pathname === '/nouvelle-annonce') {
      dispatch(actionAddSkillsNewAdvert(newValue));
    } else {
      dispatch(actionAddInscriptionSkills(newValue));
    }
  };

  let defaultValue;
  let placeholder;
  if (
    pathname === '/nouvelle-annonce' ||
    pathname.split('/')[1] === 'annonces'
  ) {
    placeholder = 'Compétence nécéssaire *';
    defaultValue = skillsAdvert;
  } else {
    placeholder = 'Mes Compétences *';
    defaultValue = skillsUser;
  }

  return (
    <Select
      value={defaultValue}
      isMulti
      name="colors"
      components={animatedComponents}
      options={optionList}
      className="select__skills"
      classNamePrefix="select"
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
}

export default SkillsSelect;
