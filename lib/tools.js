export function getInitials(name) {
  const matches = name.match(/\b(\w)/g);
  return matches.join('');
}
