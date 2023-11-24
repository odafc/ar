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
          latitude:   35.1912835, 
          longitude: 132.5010980,
        },
      },
        {
        label: 'p3',
        location: {
          latitude:   35.19169271634259, 
          longitude: 132.5011795415442,
        },
      },
  ];
  
  const createEntity = ({ location: { latitude, longitude }, model, scale: [x, y, z] }) => {
    const $entity = document.createRange().createContextualFragment(`
      <a-entity
        gltf-model="${model}"
        scale="${x} ${y} ${z}"
        // light=" type: ambient; color: #ffffff; intensity: 1.5 "
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
      scale: ['1', '1', '1'],
    });
    $scene.appendChild($entity);
  };
  
  const main = async () => {
    console.log('main');
  
    const successCallback = position => {
      console.log('success', position);
    console.log(el.getObject3D('line'));
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
