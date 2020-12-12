// @flow strict

export default function getLanguage(): string {
  switch (navigator.language) {
    case 'nb':
    case 'no':
    case 'nb-NO':
      return 'nb_NO';
    default:
      return 'en_US';
  }
}
