export type Profile = {
  id: number;
  name: string;
  birthday: string;
  gender: Gender;
  occupation_id: number;
  introduction: string;
  programming_languages: [];
  sns_links: [];
};

export type Gender = "male" | "female" | "other";

export type Occupation = {
  id: number;
  name: string;
};
