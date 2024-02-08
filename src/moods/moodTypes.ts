export type AllMoods = GoodMoods | BadMoods;
export type GoodMoods = 'happy' | 'excited' | 'content';
export type BadMoods = 'sad' | 'angry' | 'frustrated';

export const allMoods: AllMoods[] = [
  'happy',
  'excited',
  'content',
  'sad',
  'angry',
  'frustrated',
];
export const goodMoods: GoodMoods[] = ['happy', 'excited', 'content'];
export const badMoods: BadMoods[] = ['sad', 'angry', 'frustrated'];
