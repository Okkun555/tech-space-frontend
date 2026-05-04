export type Gender = "male" | "female" | "other";

export type Occupation = {
  id: number;
  name: string;
};

export type OccupationsResponse = {
  data: Occupation[];
};

export type ProfileCreateRequest = {
  profile: {
    name: string;
    birthday: string;
    gender: Gender;
    occupation_id: number;
    introduction: string;
    programming_languages: [];
    sns_links: [];
  };
};

export type ProfileCreateResponse = {
  data: {
    id: number;
    name: string;
    birthday: string;
    gender: Gender;
    introduction: string;
    occupation: Occupation;
  };
};
