// LPU campus-only route lookup. Google Maps coverage of internal paths may vary.
const searchInput = document.getElementById('destinationSearch');
const startInput = document.getElementById('startSearch');
const findButton = document.getElementById('findButton');
const destinationMap = document.getElementById('destinationMap');
const directionsLink = document.getElementById('directionsLink');
const searchLink = document.getElementById('searchLink');
const routeName = document.getElementById('routeName');
const campusSuffix = 'Lovely Professional University campus, Phagwara, Punjab';
const campusPlacePattern = /^(block\s*\d+|hostel(?:\s*[a-z0-9-]+)?|central library|library|uni\s*mall|unipolis|food court|auditorium|shanti devi mittal auditorium|baldev raj mittal unipolis|student activity center|indoor sports complex|sports ground|outdoor play ground|cricket ground|football ground|basketball court|university hospital|lpu main gate|main gate|campus cafeteria)$/i;
function cleanPlace(value) { return value.trim().replace(/\s+/g, ' '); }
function updateMap() {
  const start = cleanPlace(startInput.value);
  const destination = cleanPlace(searchInput.value);
  const feedback = document.getElementById('feedbackMessage');
  if (!campusPlacePattern.test(start) || !campusPlacePattern.test(destination)) {
    routeName.textContent = 'Choose LPU campus locations only';
    feedback.textContent = 'Use an LPU block, hostel, campus facility or sports ground from the suggestions. Outside locations are not accepted.';
    return;
  }
  const originText = `${start}, ${campusSuffix}`;
  const destinationText = `${destination}, ${campusSuffix}`;
  const origin = encodeURIComponent(originText);
  const dest = encodeURIComponent(destinationText);
  // Keep the embedded map centred on the LPU campus. Google Maps' legacy saddr/daddr embed URL can fall back to a world view in some browsers.
  destinationMap.src = 'https://maps.google.com/maps?hl=en&q=Lovely%20Professional%20University%2C%20Phagwara%2C%20Punjab&t=k&z=16&ie=UTF8&iwloc=&output=embed';
  directionsLink.href = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${dest}&travelmode=walking`;
  searchLink.href = `https://www.google.com/maps/search/?api=1&query=${dest}`;
  routeName.textContent = `${start} → ${destination} · LPU Campus`;
  feedback.textContent = 'The embedded map stays centred on the LPU campus. Use Open directions in Google Maps for the selected campus-to-campus walking route; internal paths and pins may need on-campus verification.';
}
findButton.addEventListener('click', updateMap);
searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') updateMap(); });
startInput.addEventListener('keydown', e => { if (e.key === 'Enter') updateMap(); });
document.querySelectorAll('.feedback-button').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.feedback-button').forEach(item => item.classList.remove('selected'));
  button.classList.add('selected');
  document.getElementById('feedbackMessage').textContent = 'Thanks! Feedback shown in this demo view only; it is not stored.';
}));
updateMap();
