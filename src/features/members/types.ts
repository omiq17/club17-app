export interface IMember {
  _id?: string;
  userId?: string;
  name: string;
  address: string;
  dob: string;
  email: string;
  avatar: string;
  phone?: number;
}

export interface IAddMemberAttributes {
  name: string;
  address: string;
  dob: string;
  email: string;
  avatar: string;
  phone?: number;
  token?: string;
}

export interface IAddMemberFormErrors {
  name?: string;
  address?: string;
  dob?: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

export interface IAddMemberResponse {
  message: string;
  _id: string;
}

export interface IAddMemberResult {
  newMember: IMember;
}

export interface IGetMembersResult {
  message: string;
  members: IMember[];
}

export interface IError {
  message: string;
}