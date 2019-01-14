export const loadMapApi = (onLoad: () => void) => {
  if (!window.google) {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = `https://maps.google.com/maps/api/js?key=AIzaSyAcc6j8YatihuK6CU5xwscroqVriVhqIZQ&libraries=places`;
    const x = document.getElementsByTagName('script')[0];
    if (!x.parentNode) {
      throw new Error('No parent node found');
    }
    x.parentNode.insertBefore(s, x);
    s.addEventListener('load', onLoad);
  } else {
    onLoad();
  }
};
