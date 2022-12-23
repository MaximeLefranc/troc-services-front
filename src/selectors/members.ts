import { User } from '../components/Cards/ProfilesCards';
import { Skills } from '../components/SkillsSelect';
import { strNoAccent } from '../utils/utils';

/**
 * Search in User state one memeber by this nickname
 * @param listOfMembers members array in state
 * @param searchedSlug  pseudo of member to searched
 * @returns {Array | false} One member or false if doen't exist
 */
export function findMember(
  listOfMembers: [],
  searchedSlug: string | undefined
): User | false {
  if (typeof searchedSlug === 'string') {
    const member = listOfMembers.find(
      (memberElement: User) => memberElement.nickname === searchedSlug
    );
    if (member) {
      return member;
    } else {
      return false;
    }
  }
  return false;
}

export function findMembersBySkills(
  memberList: [],
  searchedSlug: string | undefined
): User[] | false {
  if (typeof searchedSlug === 'string') {
    const memberFiltered: User[] = [];
    memberList.filter((memberElement: User) => {
      memberElement.skill.forEach((skill) => {
        if (skill.name === searchedSlug) {
          memberFiltered.push(memberElement);
        }
      });
    });
    if (memberFiltered.length > 0) {
      return memberFiltered;
    } else {
      return false;
    }
  }
  return false;
}

/**
 * Transform skills array from state on ids array skill from DB
 * @param arrayOfSkills array of skills user like this [{ value: 1, label: Ménage}]
 * @returns {Array} of ids skills like this [1, 3, 4]
 */
export function arrayIdsSkills(arrayOfSkills: Skills[]): number[] {
  const id: number[] = [];
  arrayOfSkills.map((skill: Skills) => id.push(skill.value));
  return id;
}

/**
 * Search in User state one memeber by this ID
 * @param listOfMembers members array in state
 * @param searchedSlugId  id of member to searched
 * @returns {Array | false} One member or false if doen't exist
 */
export function findMemberById(
  listOfMembers: [],
  searchedSlugId: string | undefined
): User | false {
  if (typeof searchedSlugId === 'string') {
    const id = parseInt(searchedSlugId);
    const member = listOfMembers.find(
      (memberElement: User) => memberElement.id === id
    );
    if (member) {
      return member;
    } else {
      return false;
    }
  }
  return false;
}

/**
 * Search all of members from searchbar
 * with this name Skills and/or the zipCode
 * @param listOfMembers Members array in state
 * @param searchedSkill  Skill of advertisement to searched
 * @param searchedZipCode  zipCode of advertisement to searched
 * @returns {User[] | false} Array of advert or false if doen't exist
 */
export function findMembersBySearchBar(
  listOfMembers: [],
  searchedSkill: string | undefined,
  searchedZipCode: string | undefined
): User[] | false {
  if (
    typeof searchedSkill === 'string' &&
    typeof searchedZipCode === 'string'
  ) {
    const membersFiltered: User[] = [];
    const searchedSkillClean = strNoAccent(searchedSkill).toLowerCase().trim();

    listOfMembers.filter((memberElement: User) => {
      if (searchedZipCode !== '' && searchedSkill === '') {
        if (searchedZipCode === memberElement.zip_code) {
          membersFiltered.push(memberElement);
        }
      }
      if (searchedSkill !== '' && searchedZipCode === '') {
        memberElement.skill.forEach((skill) => {
          const skillClean = strNoAccent(skill.name).toLowerCase().trim();
          console.log(
            skillClean.replace("'", '') + searchedSkillClean.replace("'", '')
          );
          if (skillClean === searchedSkillClean) {
            membersFiltered.push(memberElement);
          } else if (
            skillClean.substr(0, 5) === searchedSkillClean.substr(0, 5)
          ) {
            membersFiltered.push(memberElement);
          }
        });
      }
      if (searchedZipCode !== '' && searchedSkill !== '') {
        memberElement.skill.forEach((skill) => {
          const skillClean = strNoAccent(skill.name).toLowerCase().trim();
          if (
            skillClean === searchedSkillClean &&
            searchedZipCode === memberElement.zip_code
          ) {
            membersFiltered.push(memberElement);
          } else if (
            skillClean.substr(0, 5) === searchedSkillClean.substr(0, 5) &&
            searchedZipCode === memberElement.zip_code
          ) {
            membersFiltered.push(memberElement);
          }
        });
      }
    });
    if (membersFiltered.length > 0) {
      return membersFiltered;
    } else {
      return false;
    }
  }
  return false;
}
