import { ObjectId } from 'mongodb';

export const checkIfObjectIDIsValid = (id: string) => {
  if (ObjectId.isValid(id)) {
    return true;
  } else {
    return false;
  }
};
