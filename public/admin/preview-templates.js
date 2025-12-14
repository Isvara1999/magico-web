/**
 * PREVIEW: HeroPreview
 * Vista previa para la sección Hero de la página de inicio.
 */
const HeroPreview = ({ entry, widgetFor }) => {
  const data = entry.getIn(['data']).toJS();
  
  // Asegurarse de que data.hero exista si la estructura es anidada
  const heroData = data.hero || data; 

  return React.createElement('div', {
    style: {
      position: 'relative',
      height: '400px',
      backgroundImage: `url(${heroData.bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textAlign: 'center',
      fontFamily: 'sans-serif'
    }
  },
    React.createElement('div', { style: { backgroundColor: 'rgba(0,0,0,0.4)', padding: '20px', borderRadius: '10px' } },
      React.createElement('h1', { style: { fontSize: '48px', marginBottom: '20px', margin: 0 } }, heroData.title || 'Título del Hero'),
      React.createElement('p', { style: { fontSize: '20px', marginTop: '10px' } }, heroData.subtitle || 'Subtítulo descriptivo')
    )
  );
};

// Registrar el preview para la colección "content" o la que corresponda
// Asegúrate de que 'content' coincida con el nombre de tu colección en config.yml
CMS.registerPreviewTemplate('content', HeroPreview);
CMS.registerPreviewTemplate('pages', HeroPreview);