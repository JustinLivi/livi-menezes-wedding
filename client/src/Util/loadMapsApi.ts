export const loadMapApi = (onLoad: () => void) => {
  if (!window.google && !(window as any).googleLoading) {
    (window as any).googleLoading = true;
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://maps.google.com/maps/api/js?key=AIzaSyAcc6j8YatihuK6CU5xwscroqVriVhqIZQ&libraries=places`;
    const existingScript = document.getElementsByTagName('script')[0];
    if (!existingScript.parentNode) {
      throw new Error('No parent node found');
    }
    existingScript.parentNode.insertBefore(script, existingScript);
    script.addEventListener('load', onLoad);
    return script;
  } else if (!window.google) {
    const existingScript = document.getElementsByTagName('script')[0];
    existingScript.addEventListener('load', onLoad);
    return existingScript;
  } else {
    onLoad();
  }
};
