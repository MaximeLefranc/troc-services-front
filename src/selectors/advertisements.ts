import { Adverts } from '../components/Cards/AdvertsCards';
import { strNoAccent } from '../utils/utils';

/**
 * Search in Advertissements state one advert by this ID
 * @param listOfAdverts Advertisements array in state
 * @param searchedSlug  ID of advertisement to searched
 * @returns {Array | false} One advert or false if doen't exist
 */
export function findAdvert(
  listOfAdverts: [],
  searchedSlug: string | undefined
): Adverts | string | void {
  let advertFiltered: Adverts[] | undefined = [];
  if (typeof searchedSlug === 'string') {
    const id = parseInt(searchedSlug);
    advertFiltered = listOfAdverts.find(
      (advertElement: Adverts) => advertElement.id === id
    );
    if (typeof advertFiltered === 'undefined') {
      return 'not found';
    }
    return advertFiltered;
  }
}

/**
 * Search in Advertissements state advert with this name Skills
 * @param listOfAdverts Advertisements array in state
 * @param searchedSlug  Name(Skills) of advertisement to searched
 * @returns {Adverts[] | false} Array of advert or false if doen't exist
 */
export function findAdvertsBySkills(
  listOfAdverts: [],
  searchedSlug: string | undefined
): Adverts[] | false {
  if (typeof searchedSlug === 'string') {
    const advertFiltered: Adverts[] = [];
    listOfAdverts.filter((advertElement: Adverts) => {
      advertElement.skills.forEach((skill) => {
        if (skill.name === searchedSlug) {
          advertFiltered.push(advertElement);
        }
      });
    });
    if (advertFiltered.length > 0) {
      return advertFiltered;
    } else {
      return false;
    }
  }
  return false;
}

/**
 * Search in Advertissements state advert
 * with this name Skills and/or the zipCode
 * @param listOfAdverts Advertisements array in state
 * @param searchedSkill  Skill of advertisement to searched
 * @param searchedZipCode  zipCode of advertisement to searched
 * @returns {Adverts[] | false} Array of advert or false if doen't exist
 */
export function findAdvertsBySearchBar(
  listOfAdverts: [],
  searchedSkill: string | undefined,
  searchedZipCode: string | undefined
): Adverts[] | false {
  if (
    typeof searchedSkill === 'string' &&
    typeof searchedZipCode === 'string'
  ) {
    const advertFiltered: Adverts[] = [];
    const searchedSkillClean = strNoAccent(searchedSkill).toLowerCase().trim();
    listOfAdverts.filter((advertElement: Adverts) => {
      advertElement.skills.forEach((skill) => {
        const skillClean = strNoAccent(skill.name).toLowerCase().trim();
        if (searchedSkill !== '' && searchedZipCode === '') {
          if (skillClean == searchedSkillClean) {
            advertFiltered.push(advertElement);
          } else if (
            skillClean.substr(0, 4) === searchedSkillClean.substr(0, 4)
          ) {
            advertFiltered.push(advertElement);
          }
        } else if (searchedZipCode !== '' && searchedSkill === '') {
          if (searchedZipCode === advertElement.user.zip_code) {
            advertFiltered.push(advertElement);
          }
        } else {
          if (
            skillClean === searchedSkillClean &&
            searchedZipCode === advertElement.user.zip_code
          ) {
            advertFiltered.push(advertElement);
          } else if (
            skillClean.substr(0, 4) === searchedSkillClean.substr(0, 4)
          ) {
            advertFiltered.push(advertElement);
          }
        }
      });
    });
    if (advertFiltered.length > 0) {
      return advertFiltered;
    } else {
      return false;
    }
  }
  return false;
}
