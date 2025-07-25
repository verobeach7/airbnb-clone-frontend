export interface IRoomPhotoPhoto {
  pk: string;
  file: string;
  description: string;
}

export interface IRoomList {
  pk: number;
  name: string;
  country: string;
  city: string;
  price: number;
  rating: number;
  is_owner: boolean;
  photos: IRoomPhotoPhoto[];
}

export interface IRoomOwner {
  name: string;
  avatar: string;
  username: string;
}

export interface IAmenity {
  pk: number;
  name: string;
  description: string;
}

export interface ICategory {
  pk: number;
  name: string;
  kind: string;
}

export interface IRoomDetail extends IRoomList {
  id: number;
  created_at: string;
  updated_at: string;
  rooms: number;
  toilets: number;
  description: string;
  address: string;
  pet_friendly: true;
  kind: string;
  is_owner: boolean;
  is_liked: boolean;
  category: ICategory;
  owner: IRoomOwner;
  amenities: IAmenity[];
}

export interface IUpdateRoomDetail extends IRoomDetail {
  amenities: number[];
}

export interface IReview {
  payload: string;
  rating: number;
  user: IRoomOwner;
}

export interface IUser {
  last_login: string;
  username: string;
  email: string;
  date_joined: string;
  avatar: string;
  name: string;
  is_host: boolean;
  gender: string;
  language: string;
  currency: string;
}

export interface IUsernameLoginVariables {
  username: string;
  password: string;
}

export interface IUsernameLoginSuccess {
  ok: string;
}
export interface IUsernameLoginError {
  error: string;
}

export interface ISignUpSuccess {
  success: string;
}

// export interface ISignUpError {
//   error: string;
// }

export interface ISignUpVariables {
  username: string;
  password: string;
  name: string;
  email: string;
}

export interface IUserBookingList {
  pk: number;
  room: IRoomList;
  check_in: string;
  check_out: string;
  guests: number;
}

export interface IRoomBookingList {
  pk: number;
  user: IRoomOwner;
  check_in: string;
  check_out: string;
  guests: number;
}
