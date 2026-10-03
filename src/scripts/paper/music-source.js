// Attach the study to the existing audio instance only after an explicit play.
// No eager WAV request or download URL is exposed by the initial player markup.
(() => {
  const element = document.querySelector('#podcast-audio');
  const nativePlay = element.play.bind(element);
  let pending = null, attached = false;
  element.play = async function () {
    const position = element.currentTime;
    if (!attached) {
      pending ??= (async () => {
        const response = await fetch(element.dataset.studySource);
        if (!response.ok) throw new Error('Music study unavailable');
        const study = await response.json();
        const bytes = Uint8Array.from(atob(study.base64), c => c.charCodeAt(0));
        await new Promise((resolve, reject) => {
          const clean = () => {
            element.removeEventListener('loadedmetadata', ready);
            element.removeEventListener('error', failed);
          };
          const ready = () => { clean(); attached = true; resolve(); };
          const failed = () => { clean(); reject(new Error('Music study could not be decoded')); };
          element.addEventListener('loadedmetadata', ready);
          element.addEventListener('error', failed);
          element.src = URL.createObjectURL(new Blob([bytes], {type: study.mime}));
          element.load();
        });
      })().catch(error => { pending = null; throw error; });
      await pending;
      element.currentTime = Math.min(position, element.duration || 24);
    }
    return nativePlay();
  };
})();
