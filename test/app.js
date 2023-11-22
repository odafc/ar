const staticLoadPlaces = () => [
    {
      label: 'p1',
      location: {
        latitude:   35.1911417,
        longitude: 132.5009815,
      },
    },
    {
        label: 'p2',
        location: {
          latitude:   35.1911437, 
          longitude: 132.5009862,
        },
      },
  ];
  
  const createEntity = ({ location: { latitude, longitude }, model, scale: [x, y, z] }) => {
    const $entity = document.createRange().createContextualFragment(`
      <a-entity
        gltf-model="${model}"
        scale="${x} ${y} ${z}"
        gps-entity-place="latitude: ${latitude}; longitude: ${longitude};"
      ></a-entity>
    `)
  
    $entity.addEventListener(
      'loaded',
      () => window.dispatchEvent(new CustomEvent('gps-entity-place-loaded')),
    );
  
    return $entity;
  };
  
  const renderPlace = ({ location }) => {
    const $scene = document.querySelector('a-scene');
    const $entity = createEntity({
      location,
      model: '#asset-eevee',
      scale: ['2', '2', '2'],
    });
    $scene.appendChild($entity);
  };
  
  const main = async () => {
    console.log('main');
  
    const successCallback = position => {
      console.log('success', position);
      staticLoadPlaces().forEach(renderPlace);
    };
  
    const errorCallback = error => {
      console.log('error', error);
      alert(error.message);
    };
  
    navigator.geolocation.getCurrentPosition(
      successCallback,
      errorCallback
    );
  };
  
  window.onload = main;
